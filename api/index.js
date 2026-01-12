
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// --- HELPER: Get OAuth Token ---
async function getAccessToken(req, res, next) {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    try {
        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
        const response = await axios.get(url, {
            headers: { Authorization: `Basic ${auth}` },
        });
        req.token = response.data.access_token;
        next();
    } catch (error) {
        console.error("Token Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to get Access Token" });
    }
}

// --- ROUTE: Trigger STK Push ---
app.post('/api/stkpush', getAccessToken, async (req, res) => {
    const { phoneNumber, amount, accountReference, transactionDesc } = req.body;

    const shortCode = process.env.MPESA_SHORTCODE || "174379";
    const passkey = process.env.MPESA_PASSKEY || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    const callbackUrl = process.env.MPESA_CALLBACK_URL;

    const date = new Date();
    const timestamp = date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

    const password = Buffer.from(shortCode + passkey + timestamp).toString("base64");

    const stkData = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: shortCode,
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl,
        AccountReference: accountReference || "Vertex",
        TransactionDesc: transactionDesc || "Payment for Order"
    };

    try {
        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            stkData,
            { headers: { Authorization: `Bearer ${req.token}` } }
        );

        if (response.data.ResponseCode === "0") {
            const { error } = await supabase
                .from('mpesa_transactions')
                .insert({
                    merchant_request_id: response.data.MerchantRequestID,
                    checkout_request_id: response.data.CheckoutRequestID,
                    status: 'requested',
                    amount: amount
                });

            if (error) console.error("Supabase Insert Error:", error);
        }

        res.json(response.data);
    } catch (error) {
        console.error("STK Push Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "STK Push Failed", details: error.response?.data });
    }
});

// --- ROUTE: M-PESA Callback ---
app.post('/api/callback', async (req, res) => {
    console.log("---- STK PUSH CALLBACK RECEIVED ----");
    const callbackData = req.body?.Body?.stkCallback;

    if (callbackData) {
        const checkoutReqID = callbackData.CheckoutRequestID;
        const resultCode = callbackData.ResultCode;
        const resultDesc = callbackData.ResultDesc;
        const status = resultCode === 0 ? "completed" : "failed";

        let receipt = null;
        if (callbackData.CallbackMetadata && callbackData.CallbackMetadata.Item) {
            const receiptItem = callbackData.CallbackMetadata.Item.find(i => i.Name === "MpesaReceiptNumber");
            if (receiptItem) receipt = receiptItem.Value;
        }

        const { error } = await supabase
            .from('mpesa_transactions')
            .update({
                status: status,
                mpesa_receipt_number: receipt,
                result_desc: resultDesc
            })
            .eq('checkout_request_id', checkoutReqID);

        if (error) console.error("Supabase Update Error:", error);
    }

    res.json({ result: "success" });
});

app.get('/api/status/:checkoutRequestId', async (req, res) => {
    const { checkoutRequestId } = req.params;

    const { data, error } = await supabase
        .from('mpesa_transactions')
        .select('status')
        .eq('checkout_request_id', checkoutRequestId)
        .single();

    if (error || !data) {
        return res.json({ status: "UNKNOWN" });
    }

    const statusMap = {
        'requested': 'PENDING',
        'completed': 'SUCCESS',
        'failed': 'FAILED'
    };

    res.json({ status: statusMap[data.status] || data.status.toUpperCase() });
});

export default app;

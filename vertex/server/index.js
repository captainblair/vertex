
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const fs = require('fs');
if (fs.existsSync('.env')) {
    require('dotenv').config();
} else {
    require('dotenv').config({ path: 'config.env' });
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3001;
const transactions = {}; // Simple in-memory store for demo

// Middleware to get access token
const getAccessToken = async (req, res, next) => {
    const consumer_key = process.env.MPESA_CONSUMER_KEY;
    const consumer_secret = process.env.MPESA_CONSUMER_SECRET;
    const auth = Buffer.from(`${consumer_key}:${consumer_secret}`).toString('base64');

    try {
        const response = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );
        req.token = response.data.access_token;
        next();
    } catch (error) {
        console.error("Access Token Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to authenticate with Daraja API" });
    }
};

// Initiate STK Push
app.post('/api/stkpush', getAccessToken, async (req, res) => {
    const { phoneNumber, amount } = req.body;
    const shortCode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL; // Setup ngrok for this

    const date = new Date();
    const timestamp = date.getFullYear() +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        ("0" + date.getDate()).slice(-2) +
        ("0" + date.getHours()).slice(-2) +
        ("0" + date.getMinutes()).slice(-2) +
        ("0" + date.getSeconds()).slice(-2);

    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    const stkData = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline", // or CustomerBuyGoodsOnline
        Amount: amount, // Use 1 for testing
        PartyA: phoneNumber, // Phone sending money
        PartyB: shortCode, // Receving shortcode
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl,
        AccountReference: "VertexStore",
        TransactionDesc: "Payment for Order"
    };

    try {
        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            stkData,
            {
                headers: {
                    Authorization: `Bearer ${req.token}`,
                },
            }
        );
        if (response.data.ResponseCode === "0") {
            transactions[response.data.CheckoutRequestID] = {
                status: "PENDING",
                phoneNumber,
                amount
            };
        }
        res.json(response.data);
    } catch (error) {
        console.error("STK Push Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "STK Push Failed", details: error.response ? error.response.data : error.message });
    }
});

// Callback Route
app.post('/api/callback', (req, res) => {
    console.log("---- STK PUSH CALLBACK RECEIVED ----");

    // Safaricom sends data in req.body.Body.stkCallback
    const callbackData = req.body?.Body?.stkCallback;

    if (callbackData) {
        const checkoutReqID = callbackData.CheckoutRequestID;
        const resultCode = callbackData.ResultCode;

        console.log(`Callback for ${checkoutReqID}: Code ${resultCode}`);

        if (transactions[checkoutReqID]) {
            transactions[checkoutReqID].status = resultCode === 0 ? "SUCCESS" : "FAILED";
            // Store receipt if existing
            if (callbackData.CallbackMetadata && callbackData.CallbackMetadata.Item) {
                const receiptItem = callbackData.CallbackMetadata.Item.find(i => i.Name === "MpesaReceiptNumber");
                if (receiptItem) {
                    transactions[checkoutReqID].mpesaReceipt = receiptItem.Value;
                }
            }
        }
    } else {
        console.log("Invalid callback body received");
    }

    res.json({ result: "success" });
});

app.get('/api/status/:checkoutRequestId', (req, res) => {
    const id = req.params.checkoutRequestId;
    const tx = transactions[id];
    if (!tx) return res.json({ status: "UNKNOWN" });
    res.json({ status: tx.status });
});

app.listen(PORT, () => {
    console.log(`M-PESA Backend running on port ${PORT}`);
});

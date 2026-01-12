
export interface StkPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

const getApiUrl = () => {
  // In development, use local backend port 3001
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:3001/api';
  }
  // In production (Vercel), use relative path which routes to /api function
  return '/api';
};

export const mpesaService = {
  /**
   * Mock STK Push request
   */
  async triggerStkPush(phoneNumber: string, amount: number): Promise<StkPushResponse> {
    console.log(`[Vertex] Triggering Real STK Push for ${phoneNumber}`);

    const API_URL = getApiUrl();

    try {
      const response = await fetch(`${API_URL}/stkpush`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, amount }),
      });

      if (!response.ok) {
        throw new Error('Payment Server Error');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("M-PESA Error:", error);
      throw error;
    }
  },

  /**
   * Mock verification of payment callback
   */
  async verifyPayment(checkoutRequestId: string): Promise<'SUCCESS' | 'FAILED' | 'PENDING'> {
    console.log(`[Vertex] Polling status for ${checkoutRequestId}...`);

    let attempts = 0;
    const maxAttempts = 30; // Poll for 60 seconds (30 * 2s)

    const API_URL = getApiUrl();
    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${API_URL}/status/${checkoutRequestId}`);
        const data = await response.json();

        if (data.status === 'SUCCESS' || data.status === 'COMPLETED') return 'SUCCESS';
        if (data.status === 'FAILED') return 'FAILED';

        // If PENDING or UNKNOWN (early polling), wait and retry
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
      } catch (error) {
        console.error("Polling Error:", error);
        // Continue trying even if one request fails
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
      }
    }

    return 'FAILED'; // Timeout
  }
};

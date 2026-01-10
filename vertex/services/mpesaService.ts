
export interface StkPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

export const mpesaService = {
  /**
   * Mock STK Push request
   */
  async triggerStkPush(phoneNumber: string, amount: number): Promise<StkPushResponse> {
    console.log(`[Daraja API] Triggering STK Push for ${phoneNumber} - Amount: KES ${amount}`);
    
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Return mock success
    return {
      MerchantRequestID: `MRID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      CheckoutRequestID: `CRID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ResponseCode: "0",
      ResponseDescription: "Success. Request accepted for processing",
      CustomerMessage: "Success. Request accepted for processing"
    };
  },

  /**
   * Mock verification of payment callback
   */
  async verifyPayment(checkoutRequestId: string): Promise<'SUCCESS' | 'FAILED' | 'PENDING'> {
    // Simulate polling logic
    console.log(`[Daraja API] Polling status for ${checkoutRequestId}...`);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 90% chance of success for demo purposes
    return Math.random() > 0.1 ? 'SUCCESS' : 'FAILED';
  }
};


import { supabase } from './supabase';
import { Order } from '../types';

export const orderService = {
    async createOrder(userId: string, totalAmount: number, shippingAddress: string, items: { productId: string, quantity: number, unitPrice: number }[]) {
        // 1. Create order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: userId,
                total_amount: totalAmount,
                shipping_address: shippingAddress,
                status: 'pending'
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Create order items
        const orderItems = items.map(item => ({
            order_id: order.id,
            product_id: item.productId,
            quantity: item.quantity,
            unit_price: item.unitPrice
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        return order;
    },

    async getUserOrders(userId: string): Promise<Order[]> {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data.map((item: any) => ({
            id: item.id,
            buyer_id: item.user_id,
            total_amount: item.total_amount,
            status: item.status,
            payment_method: 'M-PESA',
            created_at: item.created_at,
        }));
    },

    async getAllOrders(): Promise<Order[]> {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data.map((item: any) => ({
            id: item.id,
            buyer_id: item.user_id,
            total_amount: item.total_amount,
            status: item.status,
            payment_method: 'M-PESA',
            created_at: item.created_at,
        }));
    },

    async logMpesaTransaction(orderId: string, merchantRequestId: string, checkoutRequestId: string, amount: number) {
        const { error } = await supabase
            .from('mpesa_transactions')
            .insert({
                order_id: orderId,
                merchant_request_id: merchantRequestId,
                checkout_request_id: checkoutRequestId,
                amount: amount,
                status: 'requested'
            });

        if (error) throw error;
    }
};

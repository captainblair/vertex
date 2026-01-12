
import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { orderService } from '../services/orders';
import { Order } from '../types';
import { ArrowLeft, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Orders: React.FC = () => {
    const { user } = useStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            if (user?.id) {
                try {
                    const data = await orderService.getUserOrders(user.id);
                    setOrders(data);
                } catch (error) {
                    console.error("Failed to load orders", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchOrders();
    }, [user?.id]);

    return (
        <div className="min-h-screen bg-bone pt-32 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/')} className="hover:bg-zinc-200 p-2 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-dark" />
                    </button>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-dark">Order History</h1>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-zinc-400 text-xs font-black uppercase tracking-widest">Loading Records...</div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-zinc-100 shadow-sm">
                        <Package size={48} className="mx-auto text-zinc-200 mb-6" />
                        <p className="text-zinc-400 text-xs font-black uppercase tracking-widest">No orders found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={order.id}
                                className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between md:items-center gap-6"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Order ID</span>
                                        <span className="text-sm font-mono font-bold text-dark">#{order.id.slice(0, 8)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
                                        <Clock size={14} />
                                        {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 justify-between md:justify-end">
                                    <div className="text-right">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total</div>
                                        <div className="text-lg font-black text-dark">KSh {order.total_amount.toLocaleString()}</div>
                                    </div>

                                    <div className={`px-4 py-2 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border ${order.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                            order.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                'bg-red-50 text-red-600 border-red-100'
                                        }`}>
                                        {order.status === 'completed' && <CheckCircle size={14} />}
                                        {order.status === 'pending' && <Clock size={14} />}
                                        {order.status === 'cancelled' && <XCircle size={14} />}
                                        {order.status}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;

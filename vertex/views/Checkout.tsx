import React, { useState } from 'react';
import { useStore } from '../store';
import Button from '../components/Button';
import { mpesaService } from '../services/mpesaService';
import { ArrowLeft, Lock, ShieldCheck, Phone, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const Checkout: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { cart, clearCart, user, setProcessing } = useStore();
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || '254');
  const [checkoutStatus, setCheckoutStatus] = useState<'IDLE' | 'WAITING_FOR_PUSH' | 'POLLING' | 'SUCCESS' | 'FAILED'>('IDLE');
  
  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleAcquire = async () => {
    const phoneRegex = /^254(7|1)\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("Verification Protocol Error: Invalid Phone Number format (254XXXXXXXXX expected).");
      return;
    }

    setCheckoutStatus('WAITING_FOR_PUSH');
    setProcessing(true);
    
    try {
      const response = await mpesaService.triggerStkPush(phoneNumber, total);
      setCheckoutStatus('POLLING');
      const result = await mpesaService.verifyPayment(response.CheckoutRequestID);
      
      if (result === 'SUCCESS') {
        setCheckoutStatus('SUCCESS');
        setTimeout(() => {
            clearCart();
            setProcessing(false);
            onBack();
        }, 3500);
      } else {
        setCheckoutStatus('FAILED');
      }
    } catch (e) {
      setCheckoutStatus('FAILED');
    } finally {
      setProcessing(false);
    }
  };

  if (checkoutStatus === 'SUCCESS') {
    return (
      <div className="max-w-2xl mx-auto py-56 px-6 text-center space-y-12 min-h-screen">
        <motion.div 
          initial={{ scale: 0, rotate: -45 }} 
          animate={{ scale: 1, rotate: 0 }} 
          transition={{ type: 'spring', damping: 15 }}
          className="mx-auto w-28 h-28 bg-brand text-white flex items-center justify-center rounded-full shadow-plinth"
        >
          <CheckCircle2 size={56} />
        </motion.div>
        <div className="space-y-6">
          <h2 className="text-5xl font-black tracking-tighter uppercase leading-none text-dark">Registry Updated.</h2>
          <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-md mx-auto">M-PESA Settlement Verified. Your acquisition is confirmed and entering logistical preparation.</p>
        </div>
        <Button onClick={onBack} variant="primary" className="px-12 py-5 bg-dark text-white">Return to Registry</Button>
      </div>
    );
  }

  return (
    <div className="bg-blueprint blueprint-lines min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        
        {/* Left Column: Ledger Summary */}
        <div className="space-y-16 order-2 lg:order-1">
          <div className="flex flex-col gap-12">
            <button onClick={onBack} className="w-fit flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400 hover:text-dark transition-all group">
              <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> Back to Archive
            </button>
            
            <div className="space-y-8">
              <h3 className="text-[12px] font-black uppercase tracking-[0.5em] text-zinc-500 border-b border-zinc-100 pb-6">Current Allotment</h3>
              <div className="space-y-8 max-h-[50vh] overflow-y-auto hide-scrollbar pr-6">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center gap-8 group">
                    <div className="flex gap-8 items-center">
                      <div className="w-24 h-24 bg-white border border-zinc-100 rounded-[2rem] overflow-hidden flex items-center justify-center p-4 transition-all duration-700 hover:shadow-plinth">
                        <img src={item.product.image} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-1000" alt={item.product.title} />
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[12px] md:text-[14px] font-black text-dark uppercase tracking-tight leading-tight max-w-[200px]">{item.product.title}</p>
                        <p className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-[0.2em]">NODE_ID: {item.product.id.substr(0, 6)}</p>
                      </div>
                    </div>
                    <span className="text-[14px] font-mono font-black tracking-tighter text-dark">KSh {(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-12 border-t border-zinc-100">
              <div className="flex justify-between text-[12px] font-black uppercase tracking-widest text-zinc-400">
                <span>Allotment Valuation</span>
                <span className="text-dark font-mono">KSh {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-5xl font-black tracking-tighter pt-12 border-t border-dark text-dark">
                <span>Final Settlement</span>
                <span className="font-mono">KSh {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: THE VAULT UI */}
        <div className="space-y-16 order-1 lg:order-2">
          <div className="bg-white border border-zinc-100 rounded-[3rem] lg:p-16 shadow-plinth space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <h1 className="text-4xl font-black uppercase tracking-tighter">Settlement.</h1>
              <div className="flex items-center gap-3 text-brand text-[10px] font-black uppercase tracking-[0.4em] bg-emerald-50 px-6 py-3 rounded-full border border-emerald-100 shadow-sm">
                <Lock size={16} /> Secure Protocol
              </div>
            </div>

            <div className="space-y-10">
              {/* M-PESA Branding Container */}
              <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-[2.5rem] flex items-center justify-between group cursor-default shadow-inner">
                <div className="flex items-center gap-8">
                  <div className="p-3 bg-white rounded-2xl border border-zinc-100 shadow-sm">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_logo.png" className="h-6 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt="M-PESA" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-dark">M-PESA Global Node</span>
                    <p className="text-[10px] text-zinc-400 font-medium tracking-wide">Instant Settlement Enabled</p>
                  </div>
                </div>
                <ShieldCheck className="text-brand opacity-60" size={24} />
              </div>

              {/* Secure Input Area */}
              <div className="space-y-6">
                <label className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.6em] ml-4">Registry Phone</label>
                <div className="relative group">
                  <input 
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={checkoutStatus !== 'IDLE'}
                    placeholder="254XXXXXXXXX"
                    className={`w-full bg-white border p-10 text-4xl font-mono font-black tracking-tighter rounded-[3rem] outline-none transition-all duration-500 disabled:opacity-40 text-center lg:text-left placeholder:opacity-5 text-dark shadow-sm focus:shadow-md ${
                        checkoutStatus === 'IDLE' ? 'border-zinc-100 focus:border-dark' : 'border-brand'
                    }`}
                  />
                  <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2">
                    <motion.div
                      animate={checkoutStatus !== 'IDLE' ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Lock size={32} className={`transition-colors duration-500 ${checkoutStatus === 'IDLE' ? 'text-zinc-100' : 'text-brand'}`} />
                    </motion.div>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-[0.3em] text-center lg:text-left ml-4">Authorized terminal node for STK Push.</p>
              </div>

              {/* Transaction Progress Tracker: Visual Trust */}
              {checkoutStatus !== 'IDLE' && checkoutStatus !== 'SUCCESS' && (
                <div className="p-8 border border-zinc-100 bg-zinc-50/50 rounded-[2.5rem] space-y-6">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-zinc-400 px-2">
                    <span className={checkoutStatus === 'WAITING_FOR_PUSH' || checkoutStatus === 'POLLING' ? 'text-brand' : ''}>ENCRYPTED</span>
                    <span className={checkoutStatus === 'POLLING' ? 'text-brand' : ''}>HANDSHAKE SENT</span>
                    <span>VERIFIED</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: '10%' }}
                      animate={{ width: checkoutStatus === 'WAITING_FOR_PUSH' ? '40%' : '75%' }}
                      className="h-full bg-brand"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3 text-brand">
                    <RefreshCw size={14} className="animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Synching with Safaricom Node...</span>
                  </div>
                </div>
              )}

              {/* Action Triggers */}
              {checkoutStatus === 'IDLE' && (
                <Button variant="primary" className="w-full py-10 rounded-[3rem] text-[12px] font-black tracking-[0.4em] shadow-2xl hover:bg-zinc-800 transition-all active:scale-[0.99] flex items-center justify-center gap-4" onClick={handleAcquire}>
                  <Lock size={20} strokeWidth={2.5} /> Pay via M-PESA Node
                </Button>
              )}

              {checkoutStatus === 'FAILED' && (
                <div className="p-10 bg-red-50/50 border border-red-100 rounded-[3rem] text-center space-y-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500">
                    <AlertCircle size={32} />
                  </div>
                  <p className="text-[11px] text-red-600 font-black uppercase tracking-[0.4em]">Node Connection Disrupted</p>
                  <Button variant="outline" onClick={() => setCheckoutStatus('IDLE')} className="w-full py-6 rounded-full border-red-100 text-red-600 hover:bg-red-50">Retry Protocol</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
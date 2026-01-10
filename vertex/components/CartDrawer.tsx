import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../store';
import Button from './Button';

interface CartDrawerProps {
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart } = useStore();
  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-[150] backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ink z-[160] flex flex-col shadow-2xl border-l border-zinc-900"
          >
            <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-zinc-950">
              <div className="flex items-center gap-2 text-white">
                <ShoppingBag size={20} className="text-brand" />
                <h2 className="text-[10px] font-black uppercase tracking-widest">Bag Archive ({cart.length})</h2>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-zinc-900 rounded-full transition-colors text-zinc-500">
                <X size={20} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-ink">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag size={48} className="text-zinc-800" />
                  <div className="space-y-1">
                    <p className="text-white font-black uppercase tracking-widest text-[10px]">Registry is empty</p>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-wide">No SKU nodes initialized</p>
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="flex gap-6 p-4 border border-zinc-900 rounded-2xl bg-zinc-950">
                    <img src={item.product.image} alt={item.product.title} className="w-20 h-20 object-contain bg-black rounded-xl" />
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-[10px] font-black uppercase tracking-tight text-white line-clamp-2">{item.product.title}</h4>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-zinc-700 hover:text-red-500"><X size={16} /></button>
                      </div>
                      <p className="text-action font-mono font-black text-xs">KSh {item.product.price.toLocaleString()}</p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 border border-zinc-800 rounded hover:bg-zinc-900 text-zinc-500"><Minus size={14} /></button>
                        <span className="text-xs font-black text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 border border-zinc-800 rounded hover:bg-zinc-900 text-zinc-500"><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-zinc-900 bg-zinc-950 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Total Settlement</span>
                  <span className="text-white text-xl font-mono font-black">KSh {total.toLocaleString()}</span>
                </div>
                <Button 
                  variant="cta" 
                  className="w-full py-6 rounded-full text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-2"
                  onClick={() => {
                    setCartOpen(false);
                    onCheckout();
                  }}
                >
                  Proceed to Vault <ArrowRight size={18} />
                </Button>
                <p className="text-center text-[8px] text-zinc-700 uppercase tracking-[0.4em] font-black">Encrypted Handshake Active</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
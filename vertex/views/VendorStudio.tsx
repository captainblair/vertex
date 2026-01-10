
import React, { useState } from 'react';
import { useStore } from '../store';
import Button from '../components/Button';
import { Package, TrendingUp, AlertCircle, Plus, Edit2, Trash2, CheckCircle, Activity, X, LayoutGrid, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '../types';

const VendorStudio: React.FC = () => {
  const { user, draftProduct, setDraftProduct } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fix: Updated categories array to strictly match the Category type definition ('Electronics' | 'Apparel' | 'Lifestyle').
  const categories: Category[] = ['Electronics', 'Apparel', 'Lifestyle'];

  const mockInventory = [
    { id: 'p1', title: 'iPhone 15 Pro', stock: 12, price: 154000, status: 'Active', sales: 156, approved: true, category: 'Electronics' },
    { id: 'p4', title: 'Hydrating Botanical Serum', stock: 100, price: 4200, status: 'Active', sales: 420, approved: true, category: 'Lifestyle' },
    { id: 'p7', title: 'Smart Sensor Node (Pending)', stock: 5, price: 12000, status: 'In Review', sales: 0, approved: false, category: 'Electronics' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!draftProduct.title) newErrors.title = 'DESIGNATION REQUIRED';
    if (!draftProduct.price || isNaN(Number(draftProduct.price))) newErrors.price = 'INVALID VALUATION';
    if (!draftProduct.stock || isNaN(Number(draftProduct.stock))) newErrors.stock = 'STOCK MUST BE NUMERIC';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostProduct = () => {
    if (validateForm()) {
      alert("SECURE HANDSHAKE SUCCESS: Inventory node added to verification protocol.");
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-zinc-200">
        <div className="space-y-3">
           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">
            <LayoutGrid size={14} /> Production Terminal Node
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter text-emerald-900 leading-none">Vendor Studio</h1>
          <p className="text-slate-500 font-medium max-w-lg leading-relaxed">System-level dashboard for multi-vertical inventory and global distribution oversight.</p>
        </div>
        <Button variant="primary" className="py-5 px-10 rounded-full shadow-2xl" onClick={() => setShowForm(true)}>
          <Plus size={20} /> Register New SKU Node
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-emerald-900/40 backdrop-blur-md flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="px-10 py-8 border-b border-zinc-100 flex justify-between items-center">
                <h2 className="text-xl font-black uppercase tracking-widest text-emerald-900">SKU Registration Protocol</h2>
                <button onClick={() => setShowForm(false)} className="p-3 hover:bg-zinc-100 rounded-full"><X size={20} /></button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-10 space-y-8 custom-scrollbar">
                <div className="grid grid-cols-2 gap-8">
                   <div className="col-span-2 space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Node Designation (Title)</label>
                     <input value={draftProduct.title} onChange={(e) => setDraftProduct({ title: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 p-5 text-xs font-black tracking-widest uppercase rounded-xl" />
                     {errors.title && <p className="text-[9px] font-black text-amber-600 uppercase">{errors.title}</p>}
                   </div>

                   <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Vertical (Category)</label>
                     <select value={draftProduct.category} onChange={(e) => setDraftProduct({ category: e.target.value as Category })} className="w-full bg-zinc-50 border border-zinc-200 p-5 text-xs font-black tracking-widest uppercase rounded-xl">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                     </select>
                   </div>

                   <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Official Store Tag</label>
                     <div className="flex items-center gap-4 p-5 bg-zinc-50 border border-zinc-200 rounded-xl">
                        <input type="checkbox" checked={(draftProduct as any).is_official_store} onChange={(e) => setDraftProduct({ is_official_store: e.target.checked } as any)} className="w-5 h-5 accent-emerald-900" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Apply Official Shield</span>
                     </div>
                   </div>

                   <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Unit Value (KES)</label>
                     <input value={draftProduct.price} onChange={(e) => setDraftProduct({ price: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 p-5 text-xs font-mono font-black rounded-xl" />
                   </div>

                   <div className="space-y-3">
                     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Stock Capacity</label>
                     <input value={draftProduct.stock} onChange={(e) => setDraftProduct({ stock: e.target.value })} className="w-full bg-zinc-50 border border-zinc-200 p-5 text-xs font-black rounded-xl" />
                   </div>
                </div>
              </div>

              <div className="p-10 border-t border-zinc-100 bg-zinc-50">
                <Button variant="primary" className="w-full py-6 rounded-full" onClick={handlePostProduct}>
                  Commit Inventory Change
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <StatCard label="Live Revenue" value="KES 4.2M" trend="+18% MOOD" icon={<TrendingUp size={28} className="text-emerald-900" />} />
        <StatCard label="Inventory Nodes" value="2,451 UNITS" trend="12 LOW STOCK" icon={<Package size={28} className="text-emerald-900" />} />
        <StatCard label="Trust Score" value="98.5%" trend="OFFICIAL STATUS" icon={<BadgeCheck size={28} className="text-emerald-900" />} />
      </div>

      <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-10 py-8 bg-zinc-50 flex justify-between items-center border-b border-zinc-100">
          <h3 className="text-sm font-black uppercase tracking-[0.25em] text-emerald-900">Node Sync Registry</h3>
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-emerald-900 animate-pulse" />
            <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Global Handshake Active</span>
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-zinc-50">
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400">Inventory Node</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400">Vertical</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400">Valuation</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400">Stock</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockInventory.map((item) => (
              <tr key={item.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                       <img src={`https://picsum.photos/seed/${item.id}/100/100`} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-wider text-emerald-900">{item.title}</p>
                      <p className="text-[9px] text-slate-400 font-mono font-bold uppercase">ID: {item.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <span className="text-[9px] font-black uppercase px-3 py-1 bg-zinc-100 rounded-full">{item.category}</span>
                </td>
                <td className="px-10 py-8 text-sm font-mono font-black text-emerald-900">KES {item.price.toLocaleString()}</td>
                <td className="px-10 py-8 text-sm font-black">{item.stock}</td>
                <td className="px-10 py-8 text-right">
                   <div className="flex justify-end gap-4 text-slate-400">
                      <button className="hover:text-emerald-900"><Edit2 size={18} /></button>
                      <button className="hover:text-amber-600"><Trash2 size={18} /></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string; trend: string; icon: React.ReactNode }> = ({ label, value, trend, icon }) => (
  <div className="bg-white border border-zinc-200 p-10 rounded-3xl space-y-6 shadow-sm group">
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">{label}</span>
      <div className="p-3 bg-zinc-50 rounded-2xl group-hover:bg-emerald-50 transition-colors">{icon}</div>
    </div>
    <div className="space-y-2">
      <h4 className="text-4xl font-black tracking-tighter text-emerald-900">{value}</h4>
      <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{trend}</p>
    </div>
  </div>
);

export default VendorStudio;

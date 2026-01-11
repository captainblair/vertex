
import React, { useState } from 'react';
import { useStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Package, CreditCard, Plus, Save, Megaphone, Trash2, Edit2, Search } from 'lucide-react';
import Button from '../components/Button';

import { productService } from '../services/products';

const REVENUE_DATA = [
  { month: 'JAN', rev: 400000 },
  { month: 'FEB', rev: 300000 },
  { month: 'MAR', rev: 550000 },
  { month: 'APR', rev: 480000 },
  { month: 'MAY', rev: 700000 },
  { month: 'JUN', rev: 900000 },
];

const AdminCommandCenter: React.FC<{ onHome: () => void }> = ({ onHome }) => {
  const { products, isLoading, fetchProducts, announcementText, setAnnouncementText, draftProduct, setDraftProduct } = useStore();
  const [localAnnouncement, setLocalAnnouncement] = useState(announcementText);
  const [activeTab, setActiveTab] = useState<'inventory' | 'sales' | 'settings'>('inventory');
  const [isCreating, setIsCreating] = useState(false);

  const handleAnnouncementUpdate = () => {
    setAnnouncementText(localAnnouncement);
    alert("SYSTEM: Global Announcement Bar Synchronized.");
  };

  const handleCreateProduct = async () => {
    try {
      if (!draftProduct.title.trim()) {
        alert("Verification Error: Product Name is required.");
        return;
      }
      if (!draftProduct.price || isNaN(parseFloat(draftProduct.price))) {
        alert("Verification Error: Valid Valuation (Price) is required.");
        return;
      }
      if (!draftProduct.stock || isNaN(parseInt(draftProduct.stock))) {
        alert("Verification Error: Valid Stock Quantity count is required.");
        return;
      }

      await productService.addProduct({
        title: draftProduct.title,
        description: draftProduct.description,
        price: parseFloat(draftProduct.price),
        stock: parseInt(draftProduct.stock),
        category: draftProduct.category,
        image: draftProduct.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', // Use default if empty
        is_featured: false,
      });

      setDraftProduct({ title: '', description: '', price: '', stock: '', category: 'Lifestyle', image: '' });
      setIsCreating(false);
      fetchProducts();
      alert("SUCCESS: New product saved.");
    } catch (e: any) {
      console.error("Product creation failed", e);
      alert(`CRITICAL ERROR: Failed to save product. Details: ${e.message || "Unknown error"}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Confirm: Delete product from list?")) {
      await productService.deleteProduct(id);
      fetchProducts();
    }
  };

  const totalValuation = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div className="bg-dark min-h-screen max-w-full overflow-x-hidden text-white">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/5">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-brand">
              <Activity size={14} /> Admin Dashboard
            </div>
            <h1 className="text-2xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white">Control Panel</h1>
            <p className="text-zinc-500 font-medium tracking-tight">Manage products, orders, and inventory.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={onHome}>View Storefront</Button>
            <Button variant="cta">Sync Data</Button>
          </div>
        </div>

        <div className="flex gap-10 border-b border-white/5 pb-2">
          <TabBtn active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')}>Inventory List</TabBtn>
          <TabBtn active={activeTab === 'sales'} onClick={() => setActiveTab('sales')}>Sales History</TabBtn>
          <TabBtn active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>Control Panel</TabBtn>
        </div>

        {activeTab === 'inventory' && (
          <div className="space-y-12">
            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard label="Active Products" value={`${products.length} Units`} icon={<Package size={24} />} />
              <StatCard label="Inventory Value" value={`KSh ${(totalValuation / 1000000).toFixed(1)}M`} icon={<Activity size={24} />} />
              <StatCard label="M-PESA Payments" value="KSh 8.2M" icon={<CreditCard size={24} />} />
            </div>

            {/* Global Announcement Tool */}
            <div className="bg-zinc-900/50 rounded-3xl p-8 border border-white/5 space-y-6">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] md:tracking-widest text-zinc-500">
                <Megaphone size={14} /> Global Announcements
              </div>
              <div className="flex gap-4">
                <input
                  value={localAnnouncement}
                  onChange={(e) => setLocalAnnouncement(e.target.value)}
                  placeholder="Update global announcement text..."
                  className="flex-grow bg-zinc-950 border border-white/10 p-4 rounded-xl text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-brand/20 transition-all text-white placeholder:text-zinc-700"
                />
                <Button variant="primary" onClick={handleAnnouncementUpdate} className="shrink-0"><Save size={18} /> Update</Button>
              </div>
            </div>

            {/* Inventory Table Container */}
            <div className="bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden">
              <div className="p-8 flex justify-between items-center border-b border-white/5">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Product List</h3>
                <Button
                  variant={isCreating ? "secondary" : "secondary"}
                  onClick={() => setIsCreating(!isCreating)}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 border-white/10 text-white"
                >
                  {isCreating ? "Cancel" : <><Plus size={16} /> Add New Product</>}
                </Button>
              </div>

              {isCreating && (
                <div className="p-8 bg-zinc-950/50 border-b border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block ml-2">Product Name</label>
                    <input
                      value={draftProduct.title}
                      onChange={(e) => setDraftProduct({ ...draftProduct, title: e.target.value })}
                      placeholder="e.g. Carbon Node 01"
                      className="w-full bg-zinc-900 border border-white/5 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-brand/50"
                    />
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block ml-2">Description</label>
                    <textarea
                      value={draftProduct.description}
                      onChange={(e) => setDraftProduct({ ...draftProduct, description: e.target.value })}
                      placeholder="Technical specifications..."
                      className="w-full bg-zinc-900 border border-white/5 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-brand/50 h-32"
                    />
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block ml-2">Product Image URL</label>
                    <input
                      value={draftProduct.image}
                      onChange={(e) => setDraftProduct({ ...draftProduct, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-zinc-900 border border-white/5 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-brand/50"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block ml-2">Price (KES)</label>
                        <input
                          value={draftProduct.price}
                          onChange={(e) => setDraftProduct({ ...draftProduct, price: e.target.value })}
                          placeholder="174000"
                          className="w-full bg-zinc-900 border border-white/5 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-brand/50"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block ml-2">Stock Quantity</label>
                        <input
                          value={draftProduct.stock}
                          onChange={(e) => setDraftProduct({ ...draftProduct, stock: e.target.value })}
                          placeholder="48"
                          className="w-full bg-zinc-900 border border-white/5 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-brand/50"
                        />
                      </div>
                    </div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block ml-2">Category</label>
                    <select
                      value={draftProduct.category}
                      onChange={(e) => setDraftProduct({ ...draftProduct, category: e.target.value as any })}
                      className="w-full bg-zinc-900 border border-white/5 p-4 rounded-xl text-xs font-bold uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-brand/50"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Home & Living">Home & Living</option>
                      <option value="Health & Beauty">Health & Beauty</option>
                      <option value="Supermarket">Supermarket</option>
                      <option value="Sports & Outdoors">Sports & Outdoors</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Phones & Tablets">Phones & Tablets</option>
                      <option value="Lifestyle">Lifestyle (Legacy)</option>
                    </select>
                    <div className="pt-4">
                      <Button variant="cta" onClick={handleCreateProduct} className="w-full py-5"><Plus size={18} /> Save Product</Button>
                    </div>
                  </div>
                </div>
              )}
              <div className="overflow-x-auto hide-scrollbar">
                <table className="w-full text-left min-w-[800px]">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/5">
                      <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-500">Product Name</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-500">Category</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-500">Price</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-500">Stock</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-xl overflow-hidden grayscale">
                              <img src={p.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div>
                              <p className="text-xs font-black uppercase text-white">{p.title}</p>
                              <p className="text-[9px] text-zinc-500 font-mono">ID: {p.id.slice(0, 8)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6"><span className="text-[9px] font-black bg-white/10 text-zinc-300 px-3 py-1 rounded-full uppercase tracking-widest">{p.category}</span></td>
                        <td className="px-8 py-6 text-xs font-mono font-bold text-zinc-300">KSh {p.price.toLocaleString()}</td>
                        <td className="px-8 py-6 text-xs font-bold text-zinc-300">{p.stock} Units</td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-4 text-zinc-600">
                            <button className="hover:text-white transition-colors"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(p.id)} className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-8">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] border-b border-white/5 pb-6 text-white">Recent Payments</h3>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-all">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-brand/10 rounded-full text-brand"><CreditCard size={18} /></div>
                        <div>
                          <p className="text-xs font-black uppercase text-white">M-PESA / {Math.random().toString(36).substr(2, 10).toUpperCase()}</p>
                          <p className="text-[9px] text-zinc-500 uppercase tracking-widest">M-PESA Payments • 2 mins ago</p>
                        </div>
                      </div>
                      <span className="text-sm font-mono font-bold text-brand">+KSh 14,500</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-zinc-950 text-white rounded-3xl p-8 space-y-8 border border-white/5">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-30">Monthly Velocity</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={REVENUE_DATA}>
                    <XAxis dataKey="month" hide />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ background: '#09090b', border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px', color: '#fff' }}
                    />
                    <Bar dataKey="rev" fill="#059669" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Total Revenue</p>
                  <h4 className="text-2xl font-black tracking-tighter">KSh 42.8M</h4>
                </div>
                <span className="text-brand text-[10px] font-black uppercase">+24%</span>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[200] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand">Syncing Data...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Fix: Made children optional in the props type to resolve TypeScript errors where children were considered missing in JSX.
const TabBtn = ({ children, active, onClick }: { children?: React.ReactNode, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`text-[10px] font-black uppercase tracking-[0.4em] pb-3 border-b-2 transition-all ${active ? 'border-brand text-white' : 'border-transparent text-zinc-600 hover:text-zinc-400'}`}
  >
    {children}
  </button>
);

const StatCard = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-zinc-900/40 border border-white/5 p-10 rounded-3xl shadow-sm space-y-6">
    <div className="flex justify-between items-start text-zinc-600">
      <span className="text-[10px] font-black uppercase tracking-[0.3em]">{label}</span>
      <div className="p-3 bg-white/5 rounded-2xl text-zinc-400">{icon}</div>
    </div>
    <h4 className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-white">{value}</h4>
  </div>
);

export default AdminCommandCenter;

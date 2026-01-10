
import React, { useState } from 'react';
import { useStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Package, CreditCard, Plus, Save, Megaphone, Trash2, Edit2, Search } from 'lucide-react';
import Button from '../components/Button';

const REVENUE_DATA = [
  { month: 'JAN', rev: 400000 },
  { month: 'FEB', rev: 300000 },
  { month: 'MAR', rev: 550000 },
  { month: 'APR', rev: 480000 },
  { month: 'MAY', rev: 700000 },
  { month: 'JUN', rev: 900000 },
];

const AdminCommandCenter: React.FC<{ onHome: () => void }> = ({ onHome }) => {
  const { announcementText, setAnnouncementText, draftProduct, setDraftProduct } = useStore();
  const [localAnnouncement, setLocalAnnouncement] = useState(announcementText);
  const [activeTab, setActiveTab] = useState<'inventory' | 'sales' | 'settings'>('inventory');

  const handleAnnouncementUpdate = () => {
    setAnnouncementText(localAnnouncement);
    alert("SYSTEM: Global Announcement Bar Synchronized.");
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12 space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-zinc-100">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-brand">
            <Activity size={14} /> Vertex Master Node
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter leading-none">Command Center</h1>
          <p className="text-zinc-400 font-medium">Internal D2C distribution and protocol management.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={onHome}>View Storefront</Button>
          <Button variant="cta">Global Sync</Button>
        </div>
      </div>

      <div className="flex gap-10 border-b border-zinc-100 pb-2">
        <TabBtn active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')}>Inventory Ledger</TabBtn>
        <TabBtn active={activeTab === 'sales'} onClick={() => setActiveTab('sales')}>Sales Archive</TabBtn>
        <TabBtn active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>Control Panel</TabBtn>
      </div>

      {activeTab === 'inventory' && (
        <div className="space-y-12">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard label="Live SKU Nodes" value="48 Units" icon={<Package size={24} />} />
            <StatCard label="Inventory Valuation" value="KSh 12.4M" icon={<Activity size={24} />} />
            <StatCard label="M-PESA Settlement" value="KSh 8.2M" icon={<CreditCard size={24} />} />
          </div>

          {/* Global Announcement Tool */}
          <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 space-y-6">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <Megaphone size={14} /> Global Announcement Protocol
            </div>
            <div className="flex gap-4">
              <input 
                value={localAnnouncement} 
                onChange={(e) => setLocalAnnouncement(e.target.value)}
                placeholder="Update global announcement text..."
                className="flex-grow bg-white border border-zinc-200 p-4 rounded-xl text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-brand/20 transition-all"
              />
              <Button variant="primary" onClick={handleAnnouncementUpdate} className="shrink-0"><Save size={18} /> Update</Button>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden">
            <div className="p-8 flex justify-between items-center border-b border-zinc-100">
              <h3 className="text-sm font-black uppercase tracking-[0.2em]">Product Archive Ledger</h3>
              <Button variant="secondary" className="px-6 py-2"><Plus size={16} /> New SKU</Button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400">Designation</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400">Category</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400">Valuation</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400">Stock</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-100 rounded-xl overflow-hidden grayscale" />
                        <div>
                          <p className="text-xs font-black uppercase">Carbon Node {i}</p>
                          <p className="text-[9px] text-zinc-400 font-mono">SKU: VTX-00{i}-CN</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6"><span className="text-[9px] font-black bg-zinc-100 px-3 py-1 rounded-full uppercase tracking-widest">Technical</span></td>
                    <td className="px-8 py-6 text-xs font-mono font-bold">KSh 174,000</td>
                    <td className="px-8 py-6 text-xs font-bold">128 Nodes</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-4 text-zinc-300">
                        <button className="hover:text-dark transition-colors"><Edit2 size={16} /></button>
                        <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'sales' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-zinc-100 rounded-3xl p-8 space-y-8">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] border-b border-zinc-100 pb-6">Recent Settlements</h3>
              <div className="space-y-6">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-50 rounded-2xl transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-brand/5 rounded-full text-brand"><CreditCard size={18} /></div>
                      <div>
                        <p className="text-xs font-black uppercase">M-PESA / {Math.random().toString(36).substr(2, 10).toUpperCase()}</p>
                        <p className="text-[9px] text-zinc-400 uppercase tracking-widest">Nairobi, KE • 2 mins ago</p>
                      </div>
                    </div>
                    <span className="text-sm font-mono font-bold text-brand">+KSh 14,500</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-zinc-950 text-white rounded-3xl p-8 space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-40">Monthly Velocity</h3>
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
    </div>
  );
};

// Fix: Made children optional in the props type to resolve TypeScript errors where children were considered missing in JSX.
const TabBtn = ({ children, active, onClick }: { children?: React.ReactNode, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`text-[10px] font-black uppercase tracking-[0.4em] pb-3 border-b-2 transition-all ${active ? 'border-brand text-dark' : 'border-transparent text-zinc-300 hover:text-dark'}`}
  >
    {children}
  </button>
);

const StatCard = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="bg-white border border-zinc-100 p-10 rounded-3xl shadow-sm space-y-6">
    <div className="flex justify-between items-start text-zinc-300">
      <span className="text-[10px] font-black uppercase tracking-[0.3em]">{label}</span>
      <div className="p-3 bg-zinc-50 rounded-2xl">{icon}</div>
    </div>
    <h4 className="text-4xl font-black tracking-tighter uppercase">{value}</h4>
  </div>
);

export default AdminCommandCenter;

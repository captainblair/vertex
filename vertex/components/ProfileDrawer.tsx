import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, ShoppingBag, Heart, Settings, LogOut, ShieldCheck } from 'lucide-react';
import { useStore } from '../store';
import { UserRole } from '../types';
import { authService } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const ProfileDrawer: React.FC = () => {
  const { user, role, setRole, isProfileOpen, setProfileOpen } = useStore();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isProfileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setProfileOpen(false)}
            className="fixed inset-0 bg-black/60 z-[150]"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-[160] flex flex-col shadow-2xl border-l border-zinc-100"
          >
            <div className="p-8 flex justify-between items-center border-b border-zinc-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center text-white text-xs font-black shadow-2xl">
                  {user?.full_name?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-dark">{user?.full_name}</h3>
                  <p className="text-[9px] font-medium text-zinc-400 uppercase tracking-[0.2em]">{user?.email}</p>
                </div>
              </div>
              <button onClick={() => setProfileOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <X size={20} className="text-zinc-300" />
              </button>
            </div>

            <div className="flex-grow p-6 space-y-2">
              <div className="px-4 py-4 text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em]">My Account</div>
              <DrawerItem icon={<ShoppingBag size={18} />} label="Order History" />
              <DrawerItem icon={<Heart size={18} />} label="Saved Items" />
              <DrawerItem icon={<Settings size={18} />} label="Security" />

              <div className="my-8 border-t border-zinc-50" />

              {user?.role === 'admin' && (
                <>
                  <div className="px-4 py-4 text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em]">Admin Panel</div>
                  <DrawerItem
                    icon={<User size={18} />}
                    label="Switch to Store"
                    active={role === UserRole.BUYER}
                    onClick={() => { setRole(UserRole.BUYER); setProfileOpen(false); navigate('/'); }}
                  />
                  <DrawerItem
                    icon={<ShieldCheck size={18} />}
                    label="Dashboard"
                    active={role === UserRole.ADMIN}
                    onClick={() => { setRole(UserRole.ADMIN); setProfileOpen(false); }}
                  />
                </>
              )}
            </div>

            <div className="p-8 border-t border-zinc-50 bg-zinc-50/50">
              <button
                onClick={async () => {
                  try {
                    await authService.signOut();
                    setProfileOpen(false);
                  } catch (e) {
                    console.error("Sign out failed", e);
                  }
                }}
                className="flex items-center gap-4 w-full p-4 text-dark font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white rounded-2xl shadow-sm transition-all border border-transparent hover:border-zinc-100 group"
              >
                <LogOut size={16} className="text-zinc-400 group-hover:text-red-500 transition-colors" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

const DrawerItem: React.FC<{ icon: any, label: string, active?: boolean, onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-5 px-6 py-4.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all ${active ? 'bg-dark text-white shadow-xl' : 'text-zinc-500 hover:bg-zinc-50'}`}
  >
    <span className={active ? 'text-brand' : 'text-zinc-300'}>{icon}</span>
    {label}
  </button>
);

export default ProfileDrawer;

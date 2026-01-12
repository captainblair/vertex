
import React from 'react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, ShieldCheck } from 'lucide-react';
import { authService } from '../services/auth';

const Profile: React.FC = () => {
    const { user, setProfileOpen } = useStore();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bone pt-32 px-6">
            <div className="max-w-2xl mx-auto space-y-12">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/')} className="hover:bg-zinc-200 p-2 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-dark" />
                    </button>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-dark">Account Security</h1>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-zinc-100 shadow-plinth space-y-10">
                    <div className="flex items-center gap-6 pb-10 border-b border-zinc-100">
                        <div className="w-20 h-20 bg-dark rounded-full flex items-center justify-center text-white text-2xl font-black shadow-xl">
                            {user?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-tight text-dark">{user?.full_name || 'User'}</h2>
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full mt-2">
                                <ShieldCheck size={12} /> Verified Account
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Full Name</label>
                            <div className="flex items-center gap-4 bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
                                <User size={18} className="text-zinc-400" />
                                <span className="text-sm font-bold text-dark">{user?.full_name}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Email Address</label>
                            <div className="flex items-center gap-4 bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
                                <Mail size={18} className="text-zinc-400" />
                                <span className="text-sm font-bold text-dark">{user?.email}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Phone Number</label>
                            <div className="flex items-center gap-4 bg-zinc-50 p-5 rounded-2xl border border-zinc-100">
                                <Phone size={18} className="text-zinc-400" />
                                <span className="text-sm font-bold text-dark">{user?.phone_number || 'Not set'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <button
                            onClick={async () => {
                                await authService.signOut();
                                navigate('/');
                            }}
                            className="w-full py-5 border border-red-100 text-red-500 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-red-50 transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

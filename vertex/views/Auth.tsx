
import React, { useState } from 'react';
import { useStore } from '../store';
import { authService } from '../services/auth';
import Button from '../components/Button';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Auth: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { initializeAuth } = useStore();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (mode === 'signin') {
                const user = await authService.signIn(email, password);
                if (user) {
                    initializeAuth();
                    onBack();
                }
            } else {
                const user = await authService.signUp(email, password, fullName, phoneNumber);
                if (user) {
                    alert("PROTOCOL SUCCESS: Account synchronized in Supabase Authentication. IMPORTANT: You MUST check your email for a confirmation link (if enabled) or go to Supabase > Authentication > Settings and turn OFF 'Confirm email' to log in immediately.");
                    setMode('signin');
                }
            }
        } catch (err: any) {
            console.error("Auth Protocol Error:", err);
            setError(err.error_description || err.message || 'Authentication protocol failed.');
        } finally {
            setIsLoading(false);
        }
    };

    const runDiagnostic = async () => {
        setIsLoading(true);
        setError("Running System Diagnostic...");
        try {
            await useStore.getState().fetchProducts();
            alert("DIAGNOSTIC PASSED: App is successfully communicating with Supabase database.");
            setError(null);
        } catch (err: any) {
            setError(`DIAGNOSTIC FAILED: "${err.message}". This usually means your API keys in .env are incorrect.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bone flex flex-col md:flex-row max-w-full overflow-x-hidden">
            {/* Visual Identity Side */}
            <div className="hidden md:flex flex-1 bg-dark relative p-16 items-center justify-center overflow-hidden">
                <div className="absolute inset-0 blueprint-lines opacity-10" />
                <div className="relative z-10 space-y-8 max-w-md">
                    <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-brand border border-brand/30 px-4 py-2 rounded-full">
                        <ShieldCheck size={14} /> Secure Protocol
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-white italic">
                        Access <br /> Vertex Node
                    </h1>
                    <p className="text-zinc-500 font-medium tracking-tight text-lg">
                        Synchronize your credentials to access the global distribution archive and distribution tools.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group hover:border-brand/40 transition-colors">
                            <Github size={20} className="text-white opacity-50 group-hover:opacity-100" />
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 opacity-30 cursor-not-allowed">
                            <div className="w-5 h-5 border-2 border-white/50 border-t-transparent rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Floating elements for "depth" */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-20 w-64 h-64 bg-brand/5 rounded-full blur-3xl opacity-50"
                />
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 left-20 w-96 h-96 bg-brand/10 rounded-full blur-3xl opacity-30"
                />
            </div>

            {/* Auth Interface Side */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-24 relative">
                <button
                    onClick={onBack}
                    className="absolute top-8 left-8 md:top-12 md:left-12 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-dark transition-colors flex items-center gap-2 group"
                >
                    <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Abort Sync
                </button>

                <div className="w-full max-w-sm space-y-10">
                    <div className="space-y-8">
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-dark italic">
                            {mode === 'signin' ? 'System Login' : 'Customer Enrollment'}
                        </h2>

                        {/* Mode Switcher Tabs */}
                        <div className="flex bg-zinc-100 p-1 rounded-2xl">
                            <button
                                onClick={() => setMode('signin')}
                                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'signin' ? 'bg-white text-dark shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setMode('signup')}
                                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'signup' ? 'bg-white text-dark shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
                            >
                                Create Account
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {mode === 'signup' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-4 overflow-hidden"
                                >
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-brand transition-colors" size={18} />
                                            <input
                                                type="text"
                                                required
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="e.g. John Doe"
                                                className="w-full bg-zinc-100/50 border border-zinc-100 p-4 pl-12 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-brand/10 focus:bg-white transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-1">Contact Protocol (254...)</label>
                                        <div className="relative group">
                                            <ArrowRight className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-brand transition-colors" size={18} />
                                            <input
                                                type="text"
                                                required
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                placeholder="254700000000"
                                                className="w-full bg-zinc-100/50 border border-zinc-100 p-4 pl-12 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-brand/10 focus:bg-white transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-1">Email Terminal</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-brand transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@vertex.com"
                                    className="w-full bg-zinc-50 border border-zinc-100 p-4 pl-12 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-brand/10 focus:bg-white transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block ml-1">Security Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-brand transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-zinc-50 border border-zinc-100 p-4 pl-12 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-brand/10 focus:bg-white transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center bg-red-50 py-3 rounded-xl border border-red-100">
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            variant="cta"
                            className="w-full py-5 rounded-2xl shadow-xl hover:shadow-brand/20"
                            isLoading={isLoading}
                        >
                            Initialize Sync <ArrowRight size={16} />
                        </Button>
                    </form>

                    <div className="pt-8 text-center space-y-4">
                        <button
                            onClick={runDiagnostic}
                            className="text-[9px] font-black text-zinc-400 hover:text-brand uppercase tracking-[0.2em] transition-colors"
                        >
                            Verify Connectivity diagnostic
                        </button>
                        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em]">
                            Vertex Core Security Protocol v2.4.0
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;

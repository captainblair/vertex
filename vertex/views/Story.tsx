
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Globe, ArrowRight } from 'lucide-react';

const Story: React.FC<{ onShop: () => void }> = ({ onShop }) => {
    return (
        <div className="min-h-screen bg-[#F0F0F0] text-dark relative">
            {/* Narrative Hero */}
            <section className="relative py-48 px-6 md:px-20 overflow-hidden bg-zinc-50">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-200/30 -skew-x-12 translate-x-24 z-0" />

                <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] text-brand border border-brand/30 px-4 py-2 rounded-full"
                        >
                            <ShieldCheck size={14} /> The Manifest
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85]"
                        >
                            Beyond <br /> Objects.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-500 text-lg font-medium leading-relaxed max-w-lg"
                        >
                            Vertex was founded on a singular principle: that technical essentials should not just function, but endure through architectural integrity and stripped-back simplicity.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                            alt="Vertex Design Philosophy"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Grid */}
            <section className="py-32 bg-dark text-white px-6">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                        <div className="space-y-8">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand">
                                <Cpu size={32} />
                            </div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Technical DNA</h3>
                            <p className="text-zinc-500 text-xs font-medium leading-loose uppercase tracking-widest">
                                Every component in the Vertex registry is subjected to rigorous stress tests—ensuring they thrive in high-intensity urban environments.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand">
                                <Globe size={32} />
                            </div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Nairobi Node</h3>
                            <p className="text-zinc-500 text-xs font-medium leading-loose uppercase tracking-widest">
                                Engineered in the heart of Nairobi, our designs draw inspiration from the city's brutalist architecture and technical resilience.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Longevity Protocol</h3>
                            <p className="text-zinc-500 text-xs font-medium leading-loose uppercase tracking-widest">
                                We reject planned obsolescence. Our objects are built to be timeless nodes in your personal archive, serving you for decades.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Break */}
            <section className="h-[70vh] relative overflow-hidden bg-zinc-900">
                <img
                    src="https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover opacity-50 grayscale"
                    alt="Vertex Philosophy"
                />
                <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-[0.2em] leading-none drop-shadow-2xl">
                        PRECISION <br /> ARCHIVE
                    </h2>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-48 px-6 text-center bg-zinc-100 relative z-10">
                <div className="max-w-2xl mx-auto space-y-12">
                    <p className="text-brand text-[10px] font-black uppercase tracking-[0.5em]">The Next Chapter</p>
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter text-dark">Join the evolution.</h2>
                    <button
                        onClick={onShop}
                        className="inline-flex items-center gap-6 group"
                    >
                        <span className="text-xs font-black uppercase tracking-[0.4em]">Browse Registry</span>
                        <div className="w-20 h-20 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-dark group-hover:text-white transition-all duration-500">
                            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Story;

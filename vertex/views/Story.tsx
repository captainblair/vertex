import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageWithFallback from '../components/ImageWithFallback';

const Story: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen max-w-full overflow-x-hidden bg-[#F0F0F0] text-dark relative">
            {/* Hero Header */}
            {/* Hero Header */}
            <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden bg-white border-b border-zinc-200 w-full max-w-full pt-32 pb-12">
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-32 items-center px-6 relative z-10">
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.5em] text-brand border border-brand/30 px-4 py-2 rounded-full"
                        >
                            <ShieldCheck size={14} /> Our Story
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] text-dark"
                            >
                                More Than <br /> Products.
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-brand text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.4em]"
                            >
                                A Standard of Quality.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <p className="text-xl md:text-2xl font-bold leading-tight text-dark">
                                    Vertex was founded on one simple idea:<br />
                                    <span className="text-zinc-400">Great products should last, look good, and work reliably.</span>
                                </p>
                            </div>
                            <p className="text-zinc-600 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                                We design technical and lifestyle essentials that combine extreme durability, clean brutalist design, and absolute everyday practicality. What started as a search for the perfect backpack evolved into a standard of excellence for everything we create. Our goal is to ensure that whatever you carry, it's built to survive the city and look better with age.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 border border-zinc-100">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                                alt="Vertex Standard"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Grid */}
            <section className="py-12 md:py-20 bg-dark text-white px-6">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="space-y-16 md:space-y-24">
                        <div className="text-center space-y-4">
                            <p className="text-brand text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.6em]">Foundational Principles</p>
                            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Our Design Philosophy</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 lg:gap-16">
                            <div className="space-y-8">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand">
                                    <Cpu size={32} />
                                </div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Built to Perform</h3>
                                <p className="text-zinc-500 text-xs font-medium leading-loose uppercase tracking-widest">
                                    Every Vertex product is tested for strength, reliability, and real-world use in busy city environments.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand">
                                    <Globe size={32} />
                                </div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Inspired by Nairobi</h3>
                                <p className="text-zinc-500 text-xs font-medium leading-loose uppercase tracking-widest">
                                    Designed in Nairobi, our style reflects the city’s bold architecture, resilience, and fast-moving lifestyle.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand">
                                    <ShieldCheck size={32} />
                                </div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Made to Last</h3>
                                <p className="text-zinc-500 text-xs font-medium leading-loose uppercase tracking-widest">
                                    We believe in long-lasting products, not short-term trends. Our focus is on quality you can rely on for years.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Difference Section */}
            <section className="py-20 md:py-32 px-6 bg-zinc-100 overflow-hidden">
                <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                    <div className="order-2 md:order-1 relative">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-zinc-200 shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1542332213-31f87348057f?auto=format&fit=crop&q=80&w=1200"
                                className="w-full h-full object-cover grayscale"
                                alt="Vertex Quality"
                            />
                        </div>
                        <div className="absolute bottom-[-1.5rem] right-[-1.5rem] md:bottom-[-2.5rem] md:right-[-2.5rem] w-40 h-40 md:w-48 md:h-48 bg-brand rounded-[2rem] flex items-center justify-center text-white p-6 md:p-8 text-center rotate-6 shadow-2xl">
                            <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">Vertex Standard Protocol 2026</p>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 space-y-12">
                        <div className="space-y-4">
                            <p className="text-brand text-[10px] font-black uppercase tracking-[0.5em]">The Vertex Edge</p>
                            <h2 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter">What Makes <br /> Vertex Different</h2>
                        </div>

                        <ul className="space-y-6">
                            {[
                                "Strong, durable materials",
                                "Clean, modern design",
                                "Practical for everyday use",
                                "Inspired by African urban life",
                                "Built for long-term value"
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-6"
                                >
                                    <div className="w-2 h-2 bg-brand rounded-full" />
                                    <span className="text-xs font-black uppercase tracking-widest text-zinc-500">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 md:py-48 px-6 text-center bg-white relative z-10 border-t border-zinc-100">
                <div className="max-w-3xl mx-auto space-y-12 md:space-y-16">
                    <div className="space-y-6">
                        <p className="text-brand text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.5em]">The Next Chapter</p>
                        <h2 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter text-dark leading-tight">
                            Join us as we continue to build products that combine function, style, and durability.
                        </h2>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-8 group"
                    >
                        <span className="text-xs font-black uppercase tracking-[0.5em]">Browse Products</span>
                        <div className="w-24 h-24 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-dark group-hover:text-white transition-all duration-500">
                            <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                    </button>

                    <div className="pt-24 space-y-4">
                        <h3 className="text-2xl font-black tracking-tighter">VERTEX</h3>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                            A modern standard for technical and lifestyle essentials.<br />
                            Designed in Nairobi. Built for everyday life.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Story;

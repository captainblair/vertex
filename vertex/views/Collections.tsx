import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Box, Zap, ShoppingBag } from 'lucide-react';
import { useStore } from '../store';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Collections: React.FC = () => {
    const { setActiveCategory } = useStore();
    const navigate = useNavigate();

    const collections = [
        {
            id: 'tech-nodes-01',
            title: 'Technical Nodes',
            tagline: 'High-performance electronics and advanced mobile interfaces.',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
            count: '18 Objects',
            icon: <Zap size={20} />,
            category: 'Electronics' as const
        },
        {
            id: 'structural-fashion-01',
            title: 'Structural Fashion',
            tagline: 'Architectural silhouettes carved for the urban landscape.',
            image: 'https://images.unsplash.com/photo-1594932224010-74f43a054652?auto=format&fit=crop&q=80&w=800',
            count: '14 Objects',
            icon: <Layers size={20} />,
            category: 'Fashion' as const
        },
        {
            id: 'living-environment-01',
            title: 'Living Essentials',
            tagline: 'Refining the interior node with brutalist purity.',
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800',
            count: '22 Objects',
            icon: <Box size={20} />,
            category: 'Home & Living' as const
        }
    ];

    const handleCollectionClick = (category: any) => {
        setActiveCategory(category);
        navigate('/');
    };

    return (
        <div className="min-h-screen max-w-full overflow-x-hidden bg-[#F0F0F0] text-dark relative">
            {/* Hero Header */}
            <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden bg-zinc-900 shadow-2xl">
                <div className="absolute inset-0 z-0 text-white">
                    <img
                        src="https://images.unsplash.com/photo-1441984276008-2e06990d1656?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-60 grayscale scale-105"
                        alt="Archive Node"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/90 z-10" />

                <div className="relative z-10 text-center space-y-6 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-2 border border-brand/30 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-brand"
                    >
                        Archive Index
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-6xl font-black uppercase italic tracking-tighter text-white leading-none"
                    >
                        Curated <br /> Collections
                    </motion.h1>
                </div>
            </section>

            {/* Collections Grid */}
            <section className="max-w-screen-2xl mx-auto px-6 md:px-20 py-10 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {collections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => handleCollectionClick(collection.category)}
                        >
                            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-zinc-100 mb-8 shadow-2xl">
                                <img
                                    src={collection.image}
                                    alt={collection.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500" />

                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 shadow-lg">
                                    <span className="text-dark">{collection.icon}</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-dark">{collection.count}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-dark">{collection.title}</h3>
                                    <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-dark group-hover:text-white transition-all duration-500">
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                                <p className="text-zinc-400 text-xs font-medium max-w-[80%] leading-relaxed">
                                    {collection.tagline}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-zinc-200/30 py-20 md:py-32 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic text-dark">
                        Looking for something specific?
                    </h2>
                    <p className="text-zinc-500 text-sm font-medium leading-loose tracking-tight max-w-xl mx-auto">
                        Our full archive contains over 50 technical essentials engineered for performance and aesthetic longevity.
                    </p>
                    <Button
                        variant="cta"
                        className="px-12 py-6 rounded-full"
                        onClick={() => navigate('/')}
                    >
                        Explore Full Registry <ShoppingBag size={18} className="ml-2" />
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Collections;

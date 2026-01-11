import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Product } from '../types';
import { Plus, ShieldCheck, ArrowRight, SlidersHorizontal, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', title: 'Carbon Node / Phone Zero', description: 'Structural precision met with technical superiority. Titanium skeleton.', price: 174000, stock: 12, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800', category: 'Electronics', is_approved: true, vendor_name: 'Vertex' },
  { id: 'p2', title: '01 Linen Tunic / Graphite', description: 'Architectural silhouette carved from heavyweight Belgian linen.', price: 14500, stock: 45, image: 'https://images.unsplash.com/photo-1594932224010-74f43a054652?auto=format&fit=crop&q=80&w=800', category: 'Fashion', is_approved: true, vendor_name: 'Vertex' },
  { id: 'p3', title: 'Modular Glass Vessel', description: 'Hand-blown technical glass for structural hydration.', price: 5900, stock: 20, image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc53e?auto=format&fit=crop&q=80&w=800', category: 'Lifestyle', is_approved: true, vendor_name: 'Vertex' },
  { id: 'p4', title: 'Brushed Aluminum Node', description: 'Wireless audio node with noise suppression protocols.', price: 32000, stock: 15, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', category: 'Electronics', is_approved: true, vendor_name: 'Vertex' },
  { id: 'p5', title: 'Apex Titanium Chronograph', description: 'Precision time-keeping node. Industrial-grade assembly.', price: 89000, stock: 5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', category: 'Electronics', is_approved: true, vendor_name: 'Vertex' },
  { id: 'p6', title: 'Tech-Shell / Waterproof 02', description: 'Gore-Tex membrane with laser-welded seams.', price: 28500, stock: 18, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800', category: 'Fashion', is_approved: true, vendor_name: 'Vertex' },
  { id: 'p7', title: 'Concrete Base Lamp', description: 'Brutalist illumination for architectural spaces.', price: 12500, stock: 8, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800', category: 'Lifestyle', is_approved: true, vendor_name: 'Vertex' },
  { id: 'p8', title: 'Ceramic Serving Set', description: 'Minimalist dining nodes with matte obsidian finish.', price: 8200, stock: 30, image: 'https://images.unsplash.com/photo-1578749553375-8785836d31bc?auto=format&fit=crop&q=80&w=800', category: 'Lifestyle', is_approved: true, vendor_name: 'Vertex' },
];

const BuyerHome: React.FC<{ onCheckout: () => void }> = ({ onCheckout }) => {
  const { products, isLoading, addToCart, activeCategory, setActiveCategory, setFilterOpen } = useStore();

  const scrollToArchive = () => {
    document.getElementById('archive')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col bg-bone selection:bg-brand/10">

      {/* 1. Kinetic Hero: Constant Bold Glide */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-32 md:pt-64">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover grayscale brightness-[0.7] scale-100"
            alt="Vertex Context"
          />
        </div>

        <div className="relative z-20 text-center space-y-10 px-6 max-w-7xl">
          <motion.div
            animate={{
              y: [15, -15, 15]
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            className="space-y-6 opacity-100"
          >
            <span className="text-white text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] md:tracking-[1.5em] opacity-100 block mb-4 technical-shadow-text text-center">Establishing Excellence</span>
            <h1 className="text-2xl md:text-[140px] font-black text-white leading-[0.85] tracking-tighter uppercase select-none technical-shadow-text">
              THE<br />NEW<br />STANDARD.
            </h1>
          </motion.div>

          <motion.p
            animate={{
              y: [10, -10, 10]
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0.2
            }}
            className="text-white text-base md:text-3xl font-light tracking-wide max-w-3xl mx-auto leading-relaxed technical-shadow-text opacity-100"
          >
            Curated Essentials. Engineered for Quality.
          </motion.p>


          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="pt-12"
          >
            <button
              onClick={scrollToArchive}
              className="bg-white text-dark px-16 py-6 rounded-full font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:bg-zinc-100 transition-all active:scale-95 group"
            >
              Access Archive <ArrowRight size={18} className="ml-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Structural Seam Line */}
      <div className="h-px w-full bg-zinc-200 relative z-30" />

      {/* 2. Department Sub-Nav with Indicator */}
      <nav className="sticky top-[88px] z-50 bg-[#F4F4F5]/80 backdrop-blur-xl border-b border-zinc-200/50 py-4">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center gap-6">
          {/* Scrollable Container with Faders */}
          <div className="relative flex-grow flex items-center overflow-hidden">
            {/* Left Fader */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#F4F4F5] to-transparent z-20 pointer-events-none" />

            {/* Main Category Slider */}
            <div className="flex gap-3 md:gap-4 overflow-x-auto hide-scrollbar scroll-smooth py-2 px-6">
              {['All', 'Electronics', 'Fashion', 'Home & Living', 'Health & Beauty', 'Supermarket', 'Sports & Outdoors', 'Automotive', 'Phones & Tablets'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`relative px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 z-10 whitespace-nowrap rounded-full ${activeCategory === cat ? 'text-white' : 'text-zinc-400 hover:text-dark hover:bg-zinc-200/50'
                    }`}
                >
                  {cat === 'All' ? 'Main category' : cat}
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="dept-capsule"
                      className="absolute inset-0 bg-dark rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right Fader */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F4F4F5] to-transparent z-20 pointer-events-none" />
          </div>

          <div className="h-8 w-px bg-zinc-200 hidden md:block" />

          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-dark transition-all group whitespace-nowrap px-4 shrink-0"
          >
            <SlidersHorizontal size={16} className="group-hover:rotate-180 transition-transform duration-500" />
            <span className="hidden lg:inline">Filter Products</span>
          </button>
        </div>
      </nav>

      {/* 3. Product Archive: Architectural Symmetry */}
      <div id="archive" className="bg-blueprint blueprint-lines min-h-screen relative py-20 md:py-40 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="aspect-[4/5] bg-zinc-100 rounded-[2.5rem] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-16">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Brand Ethos */}
      <section className="bg-dark text-white py-32 md:py-48 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-900/50 skew-x-12 translate-x-24 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
          <div className="space-y-10">
            <span className="text-brand text-[11px] font-black uppercase tracking-[0.4em] md:tracking-[0.8em]">Architectural Vision</span>
            <h3 className="text-2xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              ENGINEERED <br /> SIMPLICITY.
            </h3>
            <p className="text-zinc-500 text-xl font-light leading-relaxed max-w-lg">
              Vertex is a singular vision of quality. We curate objects that redefine technical performance through minimalist architectural principles.
            </p>
            <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.5em] group hover:text-brand transition-colors">
              The Manifest <div className="w-12 h-px bg-brand transition-all group-hover:w-20" />
            </button>
          </div>
          <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-[2s]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
              className="w-full h-full object-cover"
              alt="Vertex Studio"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Explicitly typing ProductCard as React.FC to handle symmetrical sizing and silent hover actions.
const ProductCard: React.FC<{ product: Product, onAdd: () => void }> = ({ product, onAdd }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    className="flex flex-col group h-full"
  >
    {/* Uniform Plinth Card: Strict 4:5 Aspect Ratio */}
    <div className="relative aspect-[4/5] bg-white border border-zinc-100 rounded-[2.5rem] overflow-hidden shadow-plinth transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-plinth-hover group-hover:-translate-y-1.5">
      <div className="absolute inset-0 border border-transparent group-hover:border-zinc-200/50 z-10 rounded-[2.5rem] pointer-events-none transition-all duration-700" />

      {/* Meta Indicators */}
      <div className="absolute top-6 left-6 z-20 flex gap-2">
        <span className="bg-white/90 backdrop-blur px-2.5 py-1 text-[8px] font-mono font-bold uppercase tracking-widest border border-zinc-100 rounded-sm text-zinc-400">
          VTX_REGISTRY
        </span>
      </div>

      {/* Internal Scale Image */}
      <div className="w-full h-full overflow-hidden">
        <img
          src={product.image}
          className={`w-full h-full object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] saturate-[0.9] group-hover:saturate-100 group-hover:scale-110 ${product.category === 'Electronics' ? 'p-10 !object-contain' : ''}`}
          alt={product.title}
        />
      </div>

      {/* Silent Action Slide-Up: Added Price Visibility */}
      <div className="absolute bottom-0 left-0 right-0 z-30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] p-5">
        <button
          onClick={onAdd}
          className="w-full bg-dark text-white py-4.5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-zinc-800 transition-colors flex items-center justify-center gap-3"
        >
          Add to Bag — KSh {product.price.toLocaleString()}
        </button>
      </div>
    </div>

    {/* Text Ledger Container: Fixed Height for Symmetry */}
    <div className="mt-6 px-3 space-y-3 flex flex-col justify-between min-h-[100px]">
      <div className="space-y-1.5">
        <p className="text-[10px] text-zinc-400 font-mono font-bold uppercase tracking-[0.3em]">[ {product.category} ]</p>
        <h3 className="text-[15px] font-medium text-dark tracking-tight leading-snug line-clamp-2">{product.title}</h3>
      </div>
      <div className="flex justify-between items-end pt-3 border-t border-zinc-50">
        <span className="text-sm font-mono font-bold tracking-tighter text-dark uppercase">KSh {product.price.toLocaleString()}</span>
        <span className="text-[8px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-300">[ IN STOCK ]</span>
      </div>
    </div>
  </motion.div>
);

export default BuyerHome;
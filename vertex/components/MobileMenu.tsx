
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Info, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../store';

interface MobileMenuProps {
    onHome: () => void;
    onCollections: () => void;
    onStory: () => void;
    onAuth: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onHome, onCollections, onStory, onAuth }) => {
    const { isMenuOpen, setMenuOpen, user } = useStore();

    const handleNav = (fn: () => void) => {
        fn();
        setMenuOpen(false);
    };

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMenuOpen(false)}
                        className="fixed inset-0 bg-dark/60 z-[200] md:hidden"
                    />
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-bone z-[210] flex flex-col p-8 md:hidden shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-16">
                            <h2 className="text-xl font-black italic tracking-tighter">VERTEX</h2>
                            <button onClick={() => setMenuOpen(false)} className="p-2 bg-zinc-50 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex-grow space-y-12">
                            <NavNode
                                icon={<ShoppingBag size={20} />}
                                label="The Store"
                                sub="Full Objects Archive"
                                onClick={() => handleNav(onHome)}
                            />
                            <NavNode
                                icon={<Layers size={20} />}
                                label="Collections"
                                sub="Curated Registry Nodes"
                                onClick={() => handleNav(onCollections)}
                            />
                            <NavNode
                                icon={<Info size={20} />}
                                label="Our Story"
                                sub="The Vertex Manifest"
                                onClick={() => handleNav(onStory)}
                            />
                            {!user && (
                                <NavNode
                                    icon={<ShieldCheck size={20} />}
                                    label="Auth Sync"
                                    sub="Connect via Protocol"
                                    onClick={() => handleNav(onAuth)}
                                />
                            )}
                        </nav>

                        <div className="pt-12 border-t border-zinc-100">
                            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300">
                                Vertex Core Security Protocol v2.4.0
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const NavNode: React.FC<{ icon: React.ReactNode, label: string, sub: string, onClick: () => void }> = ({ icon, label, sub, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center gap-6 group text-left"
    >
        <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-dark group-hover:text-white transition-all duration-500">
            {icon}
        </div>
        <div className="flex-grow">
            <h3 className="text-sm font-black uppercase tracking-widest text-dark">{label}</h3>
            <p className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest">{sub}</p>
        </div>
        <ArrowRight size={16} className="text-zinc-200 group-hover:translate-x-1 transition-all" />
    </button>
);

export default MobileMenu;

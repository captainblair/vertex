
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../store';
import Button from './Button';

const COLORS = [
  { name: 'Graphite', hex: '#27272a' },
  { name: 'Titanium', hex: '#71717a' },
  { name: 'Linen', hex: '#fafafa' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Amber', hex: '#f59e0b' },
];

const FilterDrawer: React.FC = () => {
  const { isFilterOpen, setFilterOpen } = useStore();

  return (
    <AnimatePresence>
      {isFilterOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFilterOpen(false)}
            className="fixed inset-0 bg-black/40 z-[150]"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-[160] flex flex-col shadow-2xl border-l border-zinc-100"
          >
            <div className="p-8 flex justify-between items-center border-b border-zinc-50">
              <div className="flex items-center gap-4">
                <SlidersHorizontal size={20} className="text-zinc-400" />
                <h3 className="text-xs font-black uppercase tracking-widest text-dark">Refine Archive</h3>
              </div>
              <button onClick={() => setFilterOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                <X size={20} className="text-zinc-300" />
              </button>
            </div>

            <div className="flex-grow p-8 space-y-12 overflow-y-auto hide-scrollbar">
              {/* Price Range */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Valuation Range</h4>
                <div className="space-y-4">
                  <input type="range" className="w-full accent-dark h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer" />
                  <div className="flex justify-between text-[10px] font-mono font-black text-zinc-400">
                    <span>KSh 0</span>
                    <span>KSh 500,000+</span>
                  </div>
                </div>
              </div>

              {/* Color Swatches */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Surface Finish</h4>
                <div className="flex flex-wrap gap-4">
                  {COLORS.map((color) => (
                    <button
                      key={color.name}
                      className="group flex flex-col items-center gap-3 transition-all"
                    >
                      <div
                        className="w-10 h-10 rounded-full border border-zinc-200 transition-all group-hover:scale-110 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[8px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-dark">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filters */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Protocol Status</h4>
                <div className="space-y-3">
                  <FilterCheckbox label="New Arrivals" />
                  <FilterCheckbox label="Limited Edition" />
                  <FilterCheckbox label="Sale / Archive" />
                  <FilterCheckbox label="Verified Refurbished" />
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-zinc-50 bg-zinc-50/50 flex gap-4">
              <Button variant="secondary" className="flex-1 py-4" onClick={() => setFilterOpen(false)}>Clear</Button>
              <Button variant="primary" className="flex-[2] py-4" onClick={() => setFilterOpen(false)}>Apply Protocol</Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

const FilterCheckbox: React.FC<{ label: string }> = ({ label }) => (
  <label className="flex items-center gap-4 cursor-pointer group">
    <div className="w-5 h-5 border-2 border-zinc-200 rounded-md group-hover:border-dark transition-colors flex items-center justify-center">
      <div className="w-2 h-2 bg-dark rounded-sm opacity-0 group-hover:opacity-10" />
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-dark transition-colors">{label}</span>
  </label>
);

export default FilterDrawer;

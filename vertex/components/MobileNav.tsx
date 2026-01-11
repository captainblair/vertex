import React from 'react';
import { Home, Search, ShoppingBag, Menu, UserCircle } from 'lucide-react';
import { useStore } from '../store';
import { Link } from 'react-router-dom';

const MobileNav: React.FC = () => {
  const { setMenuOpen, setCartOpen, setProfileOpen, cart } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] md:hidden px-6 pb-6 pt-2">
      <div className="glass-dock border border-zinc-800/50 shadow-2xl rounded-full h-16 flex justify-around items-center px-4">
        <Link to="/" className="p-3 text-zinc-500 hover:text-white transition-all tap-scale">
          <Home size={22} />
        </Link>
        <button className="p-3 text-zinc-500 hover:text-white transition-all tap-scale">
          <Search size={22} />
        </button>
        <button onClick={() => setCartOpen(true)} className="p-3 relative text-zinc-500 hover:text-white transition-all tap-scale">
          <ShoppingBag size={22} />
          {cartCount > 0 && (
            <span className="absolute top-2 right-2 bg-brand text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-black">
              {cartCount}
            </span>
          )}
        </button>
        <button onClick={() => setProfileOpen(true)} className="p-3 text-zinc-500 hover:text-white transition-all tap-scale">
          <UserCircle size={22} />
        </button>
      </div>
    </nav>
  );
};

export default MobileNav;
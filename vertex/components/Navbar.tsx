import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { UserRole } from '../types';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onHome: () => void;
  onAuth: () => void;
  onCollections: () => void;
  onStory: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onHome, onAuth, onCollections, onStory }) => {
  const {
    cart,
    setMenuOpen,
    setCartOpen,
    setProfileOpen,
    user,
    role
  } = useStore();

  const [scrolled, setScrolled] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[100] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${scrolled
            ? 'top-0 md:top-4 bg-black/80 border-b md:border border-zinc-800/50 py-3 md:mx-6 md:rounded-full shadow-2xl'
            : 'top-0 md:top-6 bg-transparent py-6 md:mx-10 md:rounded-full border-transparent'
          }
          backdrop-blur-2xl
        `}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Simplified Navigation Links */}
          <nav className="hidden lg:flex items-center gap-12">
            <NavLink onClick={onHome}>Shop</NavLink>
            <NavLink onClick={onCollections}>Collections</NavLink>
            <NavLink onClick={onStory}>Our Story</NavLink>
          </nav>

          {/* Architectural Logo */}
          <button
            onClick={onHome}
            className={`text-xl md:text-2xl font-black tracking-tighter md:tracking-[0.4em] uppercase transition-all duration-700 text-white hover:opacity-80 drop-shadow-md`}
          >
            VERTEX
          </button>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-10">
            <button className={`p-2 transition-colors duration-500 text-white hover:text-brand`}>
              <Search size={20} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className={`flex items-center gap-2.5 transition-colors duration-500 text-white hover:text-brand group`}
            >
              <div className="relative">
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-brand text-white text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black group-hover:scale-110 transition-transform">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>

            {/* Profile Node */}
            <button
              onClick={() => user ? setProfileOpen(true) : onAuth()}
              className={`hidden md:flex items-center gap-2 group transition-colors duration-500 text-white`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-black shadow-lg border transition-all duration-500 ${role === UserRole.ADMIN ? 'bg-zinc-800 border-white/10 text-white' : 'bg-dark text-white border-white/10'} group-hover:scale-110 group-active:scale-95 group-hover:border-brand/50`}>
                {user?.full_name?.charAt(0) || <User size={16} />}
              </div>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden transition-colors duration-500 text-white`}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

const NavLink: React.FC<{ children: React.ReactNode, onClick?: () => void }> = ({ children, onClick }) => (
  <button onClick={onClick} className={`relative text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 group py-1 text-white/70 hover:text-white`}>
    {children}
    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-brand transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
  </button>
);

export default Navbar;
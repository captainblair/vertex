
import React, { useState } from 'react';
import { useStore } from './store';
import { UserRole } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BuyerHome from './views/BuyerHome';
import AdminCommandCenter from './views/AdminCommandCenter';
import Checkout from './views/Checkout';
import Auth from './views/Auth';
import Collections from './views/Collections';
import Story from './views/Story';
import CartDrawer from './components/CartDrawer';
import ProfileDrawer from './components/ProfileDrawer';
import FilterDrawer from './components/FilterDrawer';
import MobileNav from './components/MobileNav';
import MobileMenu from './components/MobileMenu';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const { role, isProcessing, announcementText, initializeAuth, fetchProducts, setRole } = useStore();
  const [currentView, setCurrentView] = useState<'home' | 'checkout' | 'auth' | 'collections' | 'story'>('home');

  React.useEffect(() => {
    initializeAuth();
    fetchProducts();
  }, []);

  const handleViewChange = (view: 'home' | 'checkout' | 'auth' | 'collections' | 'story') => {
    if (isProcessing) {
      if (!confirm("Confirm termination of secure session?")) return;
    }

    // Force Buyer role for storefront/brand pages to maintain visual consistency
    if (['home', 'collections', 'story'].includes(view)) {
      setRole(UserRole.BUYER);
    }

    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const renderView = () => {
    if (currentView === 'checkout') {
      return <Checkout onBack={() => handleViewChange('home')} />;
    }

    if (currentView === 'auth') {
      return <Auth onBack={() => handleViewChange('home')} />;
    }

    if (currentView === 'collections') {
      return <Collections onShop={() => handleViewChange('home')} />;
    }

    if (currentView === 'story') {
      return <Story onShop={() => handleViewChange('home')} />;
    }

    switch (role) {
      case UserRole.ADMIN:
        return <AdminCommandCenter onHome={() => handleViewChange('home')} />;
      case UserRole.BUYER:
      default:
        return <BuyerHome onCheckout={() => handleViewChange('checkout')} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-brand/20 ${role === UserRole.ADMIN ? 'bg-dark' : 'bg-bone'}`}>
      {/* Global Announcement Bar */}
      <div className="bg-dark text-white text-[10px] font-black uppercase tracking-[0.3em] py-2.5 px-4 text-center z-[110] relative">
        {announcementText}
      </div>

      <Navbar
        onHome={() => handleViewChange('home')}
        onAuth={() => handleViewChange('auth')}
        onCollections={() => handleViewChange('collections')}
        onStory={() => handleViewChange('story')}
      />
      <CartDrawer onCheckout={() => handleViewChange('checkout')} />
      <ProfileDrawer onHome={() => handleViewChange('home')} />
      <FilterDrawer />
      <MobileMenu
        onHome={() => handleViewChange('home')}
        onCollections={() => handleViewChange('collections')}
        onStory={() => handleViewChange('story')}
        onAuth={() => handleViewChange('auth')}
      />

      <main className="flex-grow z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentView}-${role}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full min-h-screen"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onStory={() => handleViewChange('story')} onCollections={() => handleViewChange('collections')} />
      <MobileNav onHome={() => handleViewChange('home')} />
    </div>
  );
};

export default App;


import React, { useState } from 'react';
import { useStore } from './store';
import { UserRole } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BuyerHome from './views/BuyerHome';
import AdminCommandCenter from './views/AdminCommandCenter';
import Checkout from './views/Checkout';
import CartDrawer from './components/CartDrawer';
import ProfileDrawer from './components/ProfileDrawer';
import FilterDrawer from './components/FilterDrawer';
import MobileNav from './components/MobileNav';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const { role, isProcessing, announcementText } = useStore();
  const [currentView, setCurrentView] = useState<'home' | 'checkout'>('home');

  const handleViewChange = (view: 'home' | 'checkout') => {
    if (isProcessing) {
      if (!confirm("Confirm termination of secure session?")) return;
    }
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const renderView = () => {
    if (currentView === 'checkout') {
      return <Checkout onBack={() => handleViewChange('home')} />;
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
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-brand/20">
      {/* Global Announcement Bar */}
      <div className="bg-dark text-white text-[10px] font-black uppercase tracking-[0.3em] py-2.5 px-4 text-center z-[110] relative">
        {announcementText}
      </div>

      <Navbar onHome={() => handleViewChange('home')} />
      <CartDrawer onCheckout={() => handleViewChange('checkout')} />
      <ProfileDrawer onHome={() => handleViewChange('home')} />
      <FilterDrawer />
      
      <main className="flex-grow z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + role}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
      <MobileNav onHome={() => handleViewChange('home')} />
    </div>
  );
};

export default App;

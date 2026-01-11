
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import ScrollToTop from './components/ScrollToTop';
import { AnimatePresence, motion } from 'framer-motion';

const Layout: React.FC = () => {
  const { role, announcementText, setRole } = useStore();
  const location = useLocation();

  useEffect(() => {
    // Force Buyer role for storefront/brand pages to maintain visual consistency
    if (['/', '/collections', '/story'].includes(location.pathname)) {
      // Only force if we are arguably not in admin mode or if that was the intent.
      // The original logic forced BUYER role on these views.
      // However, for Admin, we usually want them to see the Buyer view BUT maybe as admin?
      // Original: "Force Buyer role ... to maintain visual consistency"
      // This implies if I am Admin and go to Story, I become Buyer?
      // Yes, setRole(UserRole.BUYER).
      if (role === UserRole.ADMIN && location.pathname !== '/') {
        // Wait, if I am admin and I go to home, do I see admin center?
        // Original logic: handleViewChange('home') -> setRole(BUYER).
        // Ah, but AdminCommandCenter was shown if role === ADMIN.
        // So if setRole(BUYER) is called, I lose Admin status?
        // That seems weird for a persistent login but maybe 'role' is just 'view mode'.
        setRole(UserRole.BUYER);
      }
    }
  }, [location.pathname, role, setRole]);

  // Check if we show admin center or buyer home
  const isHome = location.pathname === '/';

  // Determine if we should show dark navbar text (Auth and Story pages)
  // Navbar handles this itself via useLocation or we pass it? 
  // We will let Navbar handle it or pass it. Let's pass it for now to match App structure if we want, 
  // but better to let Navbar use useLocation.
  // However, I will update Navbar signature next. 
  // For now I render Navbar without props and rely on updating Navbar.tsx immediately.

  return (
    <div className={`min-h-screen max-w-full overflow-x-hidden flex flex-col font-sans selection:bg-brand/20 ${role === UserRole.ADMIN && isHome ? 'bg-dark' : 'bg-bone'}`}>
      {/* Global Announcement Bar */}
      <div className="bg-dark text-white text-[10px] font-black uppercase tracking-[0.3em] py-2.5 px-4 text-center z-[110] relative">
        {announcementText}
      </div>

      <Navbar />

      <CartDrawer />
      <ProfileDrawer />
      <FilterDrawer />
      <MobileMenu />

      <main className="flex-grow z-0">
        <AnimatePresence mode="popLayout">
          <Routes location={location}>
            <Route path="/" element={
              <PageWrapper>
                {role === UserRole.ADMIN ? <AdminCommandCenter /> : <BuyerHome />}
              </PageWrapper>
            } />
            <Route path="/auth" element={
              <PageWrapper>
                <Auth />
              </PageWrapper>
            } />
            <Route path="/checkout" element={
              <PageWrapper>
                <Checkout />
              </PageWrapper>
            } />
            <Route path="/collections" element={
              <PageWrapper>
                <Collections />
              </PageWrapper>
            } />
            <Route path="/story" element={
              <PageWrapper>
                <Story />
              </PageWrapper>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    className="w-full min-h-screen"
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const { initializeAuth, fetchProducts } = useStore();

  useEffect(() => {
    initializeAuth();
    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
};

export default App;

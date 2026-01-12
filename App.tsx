
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
import Orders from './views/Orders';
import Profile from './views/Profile';
import Saved from './views/Saved';
import { AnimatePresence, motion } from 'framer-motion';

const Layout: React.FC = () => {
  const { role, announcementText } = useStore();
  const location = useLocation();

  // Check if we show admin center or buyer home
  // Logic simplified: Admin route handles Admin check. Home is always home.

  return (
    <div className={`min-h-screen max-w-full overflow-x-hidden flex flex-col font-sans selection:bg-brand/20 ${location.pathname === '/admin' ? 'bg-dark' : 'bg-bone'}`}>
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
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageWrapper>
                <BuyerHome />
              </PageWrapper>
            } />
            <Route path="/admin" element={
              role === UserRole.ADMIN ? (
                <PageWrapper>
                  <AdminCommandCenter />
                </PageWrapper>
              ) : <Navigate to="/" replace />
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
            {/* New Routes for Profile Functionality */}
            <Route path="/orders" element={
              <PageWrapper>
                <Orders />
              </PageWrapper>
            } />
            <Route path="/profile" element={
              <PageWrapper>
                <Profile />
              </PageWrapper>
            } />
            <Route path="/saved" element={
              <PageWrapper>
                <Saved />
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

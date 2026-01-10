
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const FooterLink: React.FC<{ children: React.ReactNode, onClick?: () => void }> = ({ children, onClick }) => (
  <li>
    <button onClick={onClick} className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-brand transition-colors">{children}</button>
  </li>
);

const SocialIcon: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <button className="w-12 h-12 border border-zinc-800 rounded-full flex items-center justify-center hover:bg-brand hover:border-brand transition-all">
    {icon}
  </button>
);

const Footer: React.FC<{ onStory: () => void, onCollections: () => void }> = ({ onStory, onCollections }) => {
  return (
    <footer className="bg-dark text-white pt-32 pb-12 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">

        {/* Brand Area */}
        <div className="space-y-8">
          <h2 className="text-4xl font-black tracking-tighter text-white">VERTEX</h2>
          <p className="text-xs font-light text-zinc-500 leading-relaxed uppercase tracking-widest">
            A singular standard for technical essentials. Engineered in Nairobi. Built for the global archive.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<Facebook size={16} />} />
            <SocialIcon icon={<Twitter size={16} />} />
            <SocialIcon icon={<Instagram size={16} />} />
          </div>
        </div>

        {/* Collections */}
        <div className="space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Archives</h4>
          <ul className="space-y-4">
            <FooterLink onClick={onCollections}>Technical Node</FooterLink>
            <FooterLink onClick={onCollections}>Apparel 01</FooterLink>
            <FooterLink onClick={onCollections}>Modular Objects</FooterLink>
            <FooterLink onClick={onCollections}>Limited Release</FooterLink>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Company</h4>
          <ul className="space-y-4">
            <FooterLink onClick={onStory}>Our Story</FooterLink>
            <FooterLink>Sustainability</FooterLink>
            <FooterLink>Verified Protocol</FooterLink>
            <FooterLink>Press Archive</FooterLink>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Support</h4>
          <ul className="space-y-4">
            <FooterLink>Help Center</FooterLink>
            <FooterLink>Shipping Policy</FooterLink>
            <FooterLink>Returns Hub</FooterLink>
            <FooterLink>M-PESA Inquiries</FooterLink>
          </ul>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto mt-32 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">
        <span>Vertex © 2026. All Rights Reserved.</span>
        <div className="flex gap-12">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Accessibility</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

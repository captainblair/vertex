
import React from 'react';
import { Facebook, Github, Linkedin } from 'lucide-react';

const FooterLink: React.FC<{ children: React.ReactNode, onClick?: () => void }> = ({ children, onClick }) => (
  <li>
    <button onClick={onClick} className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-brand transition-colors">{children}</button>
  </li>
);

const SocialIcon: React.FC<{ icon: React.ReactNode, href: string }> = ({ icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 border border-zinc-800 rounded-full flex items-center justify-center hover:bg-brand hover:border-brand transition-all text-white"
  >
    {icon}
  </a>
);

const XLogo = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const Footer: React.FC<{ onStory: () => void, onCollections: () => void }> = ({ onStory, onCollections }) => {
  return (
    <footer className="bg-dark text-white pt-32 pb-12 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">

        {/* Brand Area */}
        <div className="space-y-8">
          <h2 className="text-4xl font-black tracking-tighter text-white">VERTEX</h2>
          <p className="text-xs font-light text-zinc-500 leading-relaxed uppercase tracking-widest">
            A modern standard for technical and lifestyle essentials. Designed in Nairobi. Built for everyday life.
          </p>
          <div className="flex gap-4">
            <SocialIcon icon={<XLogo />} href="https://x.com/Tony_Blair01" />
            <SocialIcon icon={<Linkedin size={16} />} href="https://www.linkedin.com/in/tony-wangolo-545b23285/" />
            <SocialIcon icon={<Github size={16} />} href="https://github.com/captainblair/" />
            <SocialIcon icon={<Facebook size={16} />} href="https://x.com/Tony_Blair01" />
          </div>
        </div>

        {/* Products */}
        <div className="space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Products</h4>
          <ul className="space-y-4">
            <FooterLink onClick={onCollections}>Electronics</FooterLink>
            <FooterLink onClick={onCollections}>Fashion</FooterLink>
            <FooterLink onClick={onCollections}>Home & Living</FooterLink>
            <FooterLink onClick={onCollections}>New Arrivals</FooterLink>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Company</h4>
          <ul className="space-y-4">
            <FooterLink onClick={onStory}>About Us</FooterLink>
            <FooterLink>Sustainability</FooterLink>
            <FooterLink>News</FooterLink>
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Support</h4>
          <ul className="space-y-4">
            <FooterLink>Help Center</FooterLink>
            <FooterLink>Shipping Policy</FooterLink>
            <FooterLink>Returns</FooterLink>
            <FooterLink>M-PESA Support</FooterLink>
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

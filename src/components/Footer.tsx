import React from 'react';
import { ArrowUpRight, Crown, Heart, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onSelectLoyaltyTier: (tierId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectLoyaltyTier }) => {
  const exploreLinks = [
    { label: 'About Us', id: 'about' },
    { label: 'Stores', id: 'stores' },
    { label: 'Promos', id: 'promos' },
    { label: 'Programs', id: 'programs' },
    { label: 'Careers', id: 'careers' }
  ];

  const discoverLinks = [
    { label: 'Royalty', tierId: 'royalty' },
    { label: 'Royalty Gold', tierId: 'royalty-gold' },
    { label: 'Royalty Platinum', tierId: 'royalty-platinum' },
    { label: 'Royalty Diamond', tierId: 'royalty-diamond' },
    { label: 'Shop Online', id: 'shop' }
  ];

  const connectLinks = [
    { label: 'Contact Us', id: 'contact' },
    { label: 'Facebook', href: 'https://facebook.com', external: true },
    { label: 'Instagram', href: 'https://instagram.com', external: true },
    { label: 'Customer Care', id: 'contact' }
  ];

  return (
    <footer className="bg-[#252927] text-white pt-16 pb-12 relative overflow-hidden">
      {/* Decorative hairline border top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Slogan Strip with Official Logo */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-12 mb-12 border-b border-white/10 gap-6">
          <div className="flex items-center gap-4">
            <img 
              src={getAssetUrl('assets/aistudio/Glossy_Prince_Sabay_sa_Buhay_Badge_eb175b40.png')}
              alt="Prince Retail - Sabay sa Buhay Official Logo"
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-full drop-shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white">
                  PRINCE RETAIL
                </span>
                <span className="w-2 h-2 rounded-full bg-[#EF777B]"></span>
              </div>
              <p className="text-xs uppercase tracking-[0.25em] font-extrabold text-[#F7DF8B] mt-1">
                SABAY SA BUHAY
              </p>
            </div>
          </div>

          <div className="text-xs text-white/60 max-w-md leading-relaxed">
            Your neighborhood retail partner bringing everyday value, fresh essentials, and community pride across Luzon, Visayas, and Mindanao.
          </div>
        </div>

        {/* 3 Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Explore Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#B8D9C4] mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="group flex items-center text-xs font-medium text-white/70 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {/* Arrow slides in from left, label nudges right per prompt specs */}
                    <span className="w-0 overflow-hidden opacity-0 -translate-x-2 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out inline-flex items-center text-[#EF777B]">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="transform transition-transform duration-200 ease-out group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7DF8B] mb-4">
              Discover
            </h4>
            <ul className="space-y-3">
              {discoverLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      if (link.tierId) {
                        onSelectLoyaltyTier(link.tierId);
                      } else if (link.id) {
                        onNavigate(link.id);
                      }
                    }}
                    className="group flex items-center text-xs font-medium text-white/70 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <span className="w-0 overflow-hidden opacity-0 -translate-x-2 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out inline-flex items-center text-[#F7DF8B]">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="transform transition-transform duration-200 ease-out group-hover:translate-x-1">
                      {link.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#EF777B] mb-4">
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center text-xs font-medium text-white/70 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      <span className="w-0 overflow-hidden opacity-0 -translate-x-2 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out inline-flex items-center text-[#EF777B]">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="transform transition-transform duration-200 ease-out group-hover:translate-x-1">
                        {link.label}
                      </span>
                    </a>
                  ) : (
                    <button
                      onClick={() => onNavigate(link.id!)}
                      className="group flex items-center text-xs font-medium text-white/70 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      <span className="w-0 overflow-hidden opacity-0 -translate-x-2 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out inline-flex items-center text-[#EF777B]">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="transform transition-transform duration-200 ease-out group-hover:translate-x-1">
                        {link.label}
                      </span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Promise Summary */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-2">
              <Crown className="w-4 h-4 text-[#F7DF8B]" />
              <span>Royalty Member Club</span>
            </div>
            <p className="text-[11px] text-white/60 leading-relaxed mb-4">
              Join over 1 million Filipino families earning daily rewards on every purchase across all branches.
            </p>
            <button
              onClick={() => onNavigate('loyalty')}
              className="w-full py-2 px-3 rounded-lg bg-[#EF777B] text-white text-[11px] font-bold hover:bg-[#e46468] transition-colors cursor-pointer"
            >
              Sign Up Free
            </button>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            Copyright © {new Date().getFullYear()} PRINCE RETAIL. All rights reserved.
          </div>

          {/* Mandatory Creator Credit */}
          <div className="flex items-center gap-2">
            <span className="text-white/40">Crafted by</span>
            <span className="font-extrabold text-[#F7DF8B] tracking-wider text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
              DECStudioAiCreation
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

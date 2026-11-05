import React, { useState } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Crown, 
  Download, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface HeroProps {
  onExploreShop: () => void;
  onFindStore: () => void;
  onOpenLoyalty: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreShop,
  onFindStore,
  onOpenLoyalty
}) => {
  const [appNotice, setAppNotice] = useState<string | null>(null);

  return (
    <section id="home" className="relative pt-20 sm:pt-22 pb-12 lg:pb-16 overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-[#FFFDF8] to-[#FBE3DF]/30 scroll-mt-18">
      {/* Subtle background ambient pastel glows */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#FBE3DF]/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-36 right-10 w-96 h-96 bg-[#FFF0BF]/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#DCEEE2]/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Brand, Headline, Supporting, Badges, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            
            {/* Brand Kicker with Unboxed Metadata */}
            <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-[#6C7470] mb-4">
              <span className="text-[#EF777B]">Prince Retail</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#252927]">Sabay sa Buhay</span>
              <span aria-hidden="true">·</span>
              <span>Since 1990</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[clamp(2rem,8vw,3rem)] sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#252927] leading-[1.08] mb-6 max-w-xl text-balance">
              Everyday Finds.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#252927] via-[#252927] to-[#EF777B]">
                Everyday Smiles.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#6C7470] leading-relaxed max-w-xl mb-8">
              Bringing value, quality, and convenience closer to every Filipino family. Your daily essentials, your favorite finds—always within reach.
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onExploreShop}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#EF777B] hover:bg-[#e46468] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Explore Shop</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onFindStore}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-[#FFFDF8] text-[#252927] font-bold text-sm border border-[#252927]/15 shadow-2xs hover:border-[#252927]/30 transition-all active:scale-[0.98] cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#EF777B]" />
                <span>Find a Store</span>
              </button>
            </div>

            {/* Trust and Program Badges */}
            <div className="w-full pt-6 border-t border-[#252927]/10 flex flex-wrap items-center justify-between gap-4">
              
              {/* Store Locator Badge */}
              <button
                onClick={onFindStore}
                className="flex items-center gap-3 group text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FBE3DF] flex items-center justify-center text-[#EF777B] group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#252927] group-hover:text-[#EF777B] transition-colors">
                    70+ Stores Nationwide
                  </div>
                  <div className="text-[11px] text-[#6C7470]">
                    Luzon, Visayas & Mindanao
                  </div>
                </div>
              </button>

              {/* Royalty Rewards Badge */}
              <button
                onClick={onOpenLoyalty}
                className="flex items-center gap-3 group text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF0BF] flex items-center justify-center text-[#252927] group-hover:scale-105 transition-transform">
                  <Crown className="w-5 h-5 text-[#EF777B]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#252927] group-hover:text-[#EF777B] transition-colors">
                    Royalty Rewards Club
                  </div>
                  <div className="text-[11px] text-[#6C7470]">
                    1M+ Pinoy Members
                  </div>
                </div>
              </button>

              {/* App Store & Google Play Badges */}
              <div className="flex items-center gap-2">
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    setAppNotice('Prince Retail App is available on Apple App Store & Google Play!');
                    setTimeout(() => setAppNotice(null), 3000);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#252927] text-white rounded-lg text-[11px] font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3 text-[#F7DF8B]" />
                  <span>App Store</span>
                </a>
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    setAppNotice('Prince Retail App is available on Apple App Store & Google Play!');
                    setTimeout(() => setAppNotice(null), 3000);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#252927] text-white rounded-lg text-[11px] font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3 text-[#B8D9C4]" />
                  <span>Google Play</span>
                </a>
              </div>
              {appNotice && (
                <div className="text-[11px] font-medium text-[#252927] bg-[#B8D9C4]/40 px-3 py-1 rounded-full border border-[#B8D9C4] animate-fade-in">
                  ✓ {appNotice}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SIDE: Single-screen app preview */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-[min(310px,calc(100vw_-_3rem))]">
              <div aria-hidden="true" className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-[#FBE3DF]/80 via-white/70 to-[#DCEEE2]/80 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-white/70 p-2 shadow-[0_32px_80px_-28px_rgba(37,41,39,0.38)] backdrop-blur-xl">
                <img
                  src={getAssetUrl('assets/aistudio/2_2df6d4e6.jpg')}
                  alt="Prince Retail app storefront showing wholesale deals and featured categories"
                  fetchPriority="high"
                  decoding="async"
                  className="block aspect-[1/2] w-full rounded-[1.8rem] object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

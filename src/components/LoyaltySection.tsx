import React, { useState } from 'react';
import { 
  Check, 
  UserCheck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Gift,
  Crown
} from 'lucide-react';
import { loyaltyTiers } from '../data/loyaltyData';
import { LoyaltyTier } from '../types';
import { getAssetUrl } from '../utils/assets';

interface LoyaltySectionProps {
  initialTierId?: string | null;
}

export const LoyaltySection: React.FC<LoyaltySectionProps> = ({ initialTierId }) => {
  const [selectedTier, setSelectedTier] = useState<LoyaltyTier>(
    loyaltyTiers.find((t) => t.id === initialTierId) || loyaltyTiers[0]
  );
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [memberName, setMemberName] = useState('Maria Dela Cruz');
  const [memberPhone, setMemberPhone] = useState('0917-888-2026');
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

  // React to prop change if clicked from navbar or quick link
  React.useEffect(() => {
    if (initialTierId) {
      const match = loyaltyTiers.find((t) => t.id === initialTierId);
      if (match) setSelectedTier(match);
    }
  }, [initialTierId]);

  // Autoplay every 3 Seconds across the 4 Loyalty Card Tiers
  React.useEffect(() => {
    if (isAutoplayPaused) return;

    const interval = setInterval(() => {
      setSelectedTier((prev) => {
        const currentIndex = loyaltyTiers.findIndex((t) => t.id === prev.id);
        const nextIndex = (currentIndex + 1) % loyaltyTiers.length;
        return loyaltyTiers[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoplayPaused]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisteredSuccess(true);
    setTimeout(() => {
      setShowRegisterModal(false);
      setRegisteredSuccess(false);
    }, 2400);
  };

  return (
    <section id="loyalty" className="py-20 lg:py-28 bg-[#FFFDF8] relative overflow-hidden">
      {/* Decorative ambient subtle background gradients */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#FFF0BF]/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#DCEEE2]/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#6C7470] mb-3">
            <span className="text-[#EF777B]">Royalty Rewards Program</span>
            <span aria-hidden="true">·</span>
            <span>Customer Loyalty</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252927] leading-tight">
            Meet the Royalty Rewards Family.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6C7470] leading-relaxed">
            Every peso you spend brings you closer to greater rewards. Choose your membership tier, earn points on daily family essentials, and enjoy priority checkout lane privileges.
          </p>
        </div>

        {/* MAIN LOYALTY SHOWCASE: NO WHITE BACKGROUND BOX */}
        {/* Clean 2-column layout matching image_6305ae9d.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-24">
          
          {/* Card Showcase Left */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Authentic Card Image Render without white card container */}
            <div className="w-full max-w-md relative group">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                <img
                  src={getAssetUrl(selectedTier.cardImage)}
                  alt={selectedTier.name}
                  className="w-full h-auto object-cover block rounded-2xl sm:rounded-3xl"
                />
              </div>

              {/* Registration CTA directly under card */}
              <button
                onClick={() => setShowRegisterModal(true)}
                className="mt-6 w-full py-3.5 px-6 rounded-xl bg-[#252927] hover:bg-[#343a37] text-white text-sm font-bold flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-[#F7DF8B]" />
                <span>Register for {selectedTier.name} Card</span>
              </button>
            </div>
          </div>

          {/* Tier Detail & Selector Right */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            
            {/* Centered / aligned Pill Segment Menu from image_6305ae9d.png */}
            <div className="inline-flex flex-wrap items-center gap-1 sm:gap-1.5 p-1.5 bg-white/80 border border-[#252927]/10 rounded-full mb-8 shadow-xs max-w-full">
              {loyaltyTiers.map((tier) => {
                const isActive = selectedTier.id === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`py-2 sm:py-2.5 px-4 sm:px-6 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#252927] text-white shadow-xs' 
                        : 'text-[#6C7470] hover:text-[#252927] hover:bg-black/5'
                    }`}
                  >
                    {tier.name}
                  </button>
                );
              })}
            </div>

            {/* Tier Content */}
            <div>
              {/* Badge */}
              <div 
                className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 bg-[#DCEEE2] text-[#252927]"
              >
                {selectedTier.badge.toUpperCase()}
              </div>

              {/* Heading */}
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#252927] mb-1.5 tracking-tight">
                {selectedTier.name}
              </h3>
              
              {/* Subtitle in Pastel Red */}
              <p className="text-sm sm:text-base font-semibold text-[#EF777B] mb-4">
                {selectedTier.tagline}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#6C7470] leading-relaxed mb-6 max-w-xl">
                {selectedTier.description}
              </p>

              {/* Perks list with green checkmark circles */}
              <div className="space-y-3 mb-8">
                {selectedTier.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#252927]">
                    <div className="w-5 h-5 rounded-full bg-[#B8D9C4] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#252927] stroke-[3]" />
                    </div>
                    <span className="font-medium text-[#252927]">{perk}</span>
                  </div>
                ))}
              </div>

              {/* Multiplier / Rewards Accrual Banner */}
              <div className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#FFF0BF]/50 border border-[#F7DF8B]/60 text-xs sm:text-sm font-bold text-[#252927]">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Rewards Multiplier: <strong className="text-[#252927] font-extrabold">{selectedTier.multiplier}</strong></span>
              </div>
            </div>

          </div>

        </div>

        {/* EXPLORE ALL 4 ROYALTY CARD TIERS — INTERACTIVE WALLET POCKET */}
        <div className="mt-12 pt-14 border-t border-[#252927]/10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6C7470] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#EF777B]"></span>
                <span>Interactive Member Wallet</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#252927]">
                Explore All 4 Royalty Card Tiers
              </h3>
            </div>
          </div>

          {/* Quick Mobile / Desktop Tier Tab Switcher */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 mb-6 overflow-x-auto pb-2">
            {loyaltyTiers.map((tier) => {
              const isSelected = selectedTier.id === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => {
                    setSelectedTier(tier);
                    setIsAutoplayPaused(true);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#252927] text-white shadow-xs'
                      : 'bg-white/80 text-[#6C7470] border border-[#252927]/10'
                  }`}
                >
                  {tier.name.replace('ROYALTY', '').trim() || 'Royalty'}
                </button>
              );
            })}
          </div>

          {/* WALLET STAGE CONTAINER — INCREASED WIDTH & BALANCED HEIGHT */}
          <div 
            onMouseEnter={() => setIsAutoplayPaused(true)}
            onMouseLeave={() => setIsAutoplayPaused(false)}
            className="relative max-w-5xl lg:max-w-6xl mx-auto pt-28 sm:pt-36 pb-6 px-2 sm:px-6"
          >
            
            {/* TUCKED PASS CARDS LAYER (Under/Within the Pocket) */}
            <div className="relative z-10 w-full flex items-end justify-center">
              <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-7 w-full max-w-5xl">
                {loyaltyTiers.map((tier, idx) => {
                  const isSelected = selectedTier.id === tier.id;
                  
                  // Resting fan angles inspired by physical pass wallet: -4.5°, -1.5°, +1.5°, +4.5°
                  const restingRotations = [-4.5, -1.5, 1.5, 4.5];
                  const restingRotation = restingRotations[idx];

                  // Barcode dummy numbers for visual pass authenticism
                  const passSerials = ['PR-2026-0482', 'PR-2026-1736', 'PR-2026-3841', 'PR-2026-9900'];

                  return (
                    <div
                      key={tier.id}
                      onClick={() => {
                        setSelectedTier(tier);
                        setIsAutoplayPaused(true);
                      }}
                      onMouseEnter={() => {
                        setSelectedTier(tier);
                        setIsAutoplayPaused(true);
                      }}
                      style={{
                        transformOrigin: 'bottom center',
                      }}
                      className={`group relative rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        isSelected 
                          ? 'z-30 -translate-y-24 sm:-translate-y-32 md:-translate-y-36 rotate-0 scale-[1.03] sm:scale-105 shadow-2xl ring-2 ring-[#252927]/20' 
                          : 'z-10 hover:z-30 hover:-translate-y-24 sm:hover:-translate-y-32 md:hover:-translate-y-36 hover:rotate-0 hover:scale-[1.03] sm:hover:scale-105 shadow-md'
                      }`}
                    >
                      {/* Pass Card Shell — Reduced Height & Increased Horizontal Width */}
                      <div 
                        style={{
                          transform: isSelected ? 'none' : `rotate(${restingRotation}deg)`,
                        }}
                        className={`w-full h-[235px] sm:h-[265px] md:h-[285px] rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 border transition-all duration-500 flex flex-col justify-between overflow-hidden bg-white ${
                          isSelected 
                            ? 'border-[#252927] shadow-xl ring-1 ring-black/5' 
                            : 'border-[#252927]/15 hover:border-[#252927]/40'
                        }`}
                      >
                        
                        {/* Upper Section: Always Peeking out of the pocket */}
                        <div>
                          {/* Pass Header Label with Full Non-Truncated Typography */}
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wide text-[#252927] whitespace-nowrap">
                              {tier.name}
                            </span>
                            <span className="text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-[#B8D9C4]/50 text-[#252927] whitespace-nowrap shrink-0">
                              {tier.badge.replace(' Tier', '')}
                            </span>
                          </div>

                          {/* Authentic Card Image */}
                          <div className="aspect-[1.8/1] sm:aspect-[1.85/1] max-h-[85px] sm:max-h-[105px] rounded-xl overflow-hidden shadow-xs border border-black/5 bg-[#FFFDF8]">
                            <img
                              src={getAssetUrl(tier.cardImage)}
                              alt={tier.name}
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>

                          {/* Multiplier / Rewards Accrual Tag */}
                          <div className="mt-1.5 sm:mt-2 px-2 py-0.5 sm:py-1 rounded-md bg-[#FFF0BF]/80 border border-[#F7DF8B]/60 text-center">
                            <span className="text-[9px] sm:text-[11px] font-extrabold text-[#252927] block truncate">
                              {tier.multiplier}
                            </span>
                          </div>
                        </div>

                        {/* Lower Section: Hidden inside pocket when resting, fully revealed when raised! */}
                        <div className="pt-2 sm:pt-2.5 border-t border-dashed border-[#252927]/15 flex flex-col gap-1.5 mt-auto">
                          
                          {/* Digital Pass Barcode Lines */}
                          <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center gap-[2px] h-4 sm:h-5 w-full opacity-70 overflow-hidden">
                              <span className="w-0.5 h-full bg-[#252927]"></span>
                              <span className="w-1 h-full bg-[#252927]"></span>
                              <span className="w-0.5 h-full bg-[#252927]"></span>
                              <span className="w-1.5 h-full bg-[#252927]"></span>
                              <span className="w-0.5 h-full bg-[#252927]"></span>
                              <span className="w-2 h-full bg-[#252927]"></span>
                              <span className="w-0.5 h-full bg-[#252927]"></span>
                              <span className="w-1 h-full bg-[#252927]"></span>
                              <span className="w-0.5 h-full bg-[#252927]"></span>
                              <span className="w-1.5 h-full bg-[#252927]"></span>
                              <span className="w-0.5 h-full bg-[#252927]"></span>
                              <span className="w-1 h-full bg-[#252927]"></span>
                              <span className="w-2 h-full bg-[#252927]"></span>
                              <span className="w-0.5 h-full bg-[#252927]"></span>
                              <span className="w-1 h-full bg-[#252927]"></span>
                            </div>
                            <span className="font-mono text-[8px] sm:text-[9px] text-[#6C7470] tracking-wider mt-0.5">
                              {passSerials[idx]}
                            </span>
                          </div>

                          {/* Quick Perk Bullet Highlight */}
                          <div className="text-[9px] sm:text-[10px] text-[#252927] font-semibold leading-tight line-clamp-1 px-1 text-center">
                            ✓ {tier.perks[0]}
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTier(tier);
                              setShowRegisterModal(true);
                            }}
                            className={`w-full py-1.5 px-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs ${
                              isSelected
                                ? 'bg-[#252927] text-white hover:bg-black'
                                : 'bg-[#EF777B] text-white hover:bg-[#e46468]'
                            }`}
                          >
                            <span>{isSelected ? 'Register Card' : 'Select'}</span>
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </button>

                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* WALLET POCKET FRONT SLEEVE (Foreground Layer covering bottom of tucked cards) */}
            <div className="relative z-20 -mt-16 sm:-mt-22 w-full rounded-b-3xl rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-b from-[#E7EFEA] via-[#DCE8E0] to-[#CFDDD3] border border-[#252927]/15 shadow-xl p-5 sm:p-7 overflow-hidden">
              
              {/* Wallet Top Stitch Line (Dashed Stitching Detail as shown in reference) */}
              <div className="absolute top-2.5 left-4 right-4 border-t-2 border-dashed border-white/80"></div>
              
              {/* Subtle Leather Shading / Embossed Brand Pouch Details */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                
                {/* Brand Seal Left */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/80 border border-[#252927]/10 flex items-center justify-center shadow-xs">
                    <Crown className="w-5 h-5 text-[#EF777B]" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#252927]">
                      PRINCE ROYALTY CLUB PASSES
                    </div>
                    <div className="text-[11px] text-[#6C7470]">
                      Pull any card out of the wallet to inspect full tier perks
                    </div>
                  </div>
                </div>

                {/* Interactive Tier Status Indicator Pills */}
                <div className="flex items-center gap-1.5 p-1 bg-white/70 border border-[#252927]/10 rounded-full shadow-2xs">
                  {loyaltyTiers.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => {
                          setSelectedTier(tier);
                          setIsAutoplayPaused(true);
                        }}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#252927] text-white shadow-2xs'
                            : 'text-[#6C7470] hover:text-[#252927]'
                        }`}
                      >
                        {tier.name.replace('ROYALTY', '').trim() || 'Royalty'}
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Active Pulled Card Quick Summary Bar inside the Wallet Pocket */}
              <div className="mt-4 pt-3 border-t border-[#252927]/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#252927]">
                  <span className="font-extrabold">{selectedTier.name}</span>
                  <span className="text-[#6C7470]">·</span>
                  <span className="text-[#EF777B] font-bold">{selectedTier.multiplier}</span>
                  <span className="text-[#6C7470]">·</span>
                  <span className="text-[#6C7470] truncate max-w-xs">{selectedTier.tagline}</span>
                </div>

                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="px-4 py-1.5 rounded-xl bg-[#252927] hover:bg-[#343a37] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#F7DF8B]" />
                  <span>Register for {selectedTier.name}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Free Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#252927]/10 relative animate-scaleIn">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EF777B]">
                  Join Royalty Club
                </span>
                <h3 className="text-xl font-extrabold text-[#252927]">
                  Register for {selectedTier.name}
                </h3>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#252927] flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {registeredSuccess ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#DCEEE2] text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-[#252927]">Welcome to the Family!</h4>
                <p className="text-xs text-[#6C7470] mt-1">
                  Your digital Royalty Rewards card is active. An activation SMS has been sent to {memberPhone}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Visual card summary thumbnail */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFFDF8] border border-[#252927]/10">
                  <img
                    src={getAssetUrl(selectedTier.cardImage)}
                    alt={selectedTier.name}
                    className="w-16 h-10 object-cover rounded-lg shadow-xs"
                  />
                  <div>
                    <div className="text-xs font-extrabold text-[#252927]">{selectedTier.name}</div>
                    <div className="text-[11px] text-[#EF777B] font-semibold">{selectedTier.multiplier}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252927] mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs font-medium focus:outline-none focus:border-[#EF777B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252927] mb-1">Mobile Number (Philippines)</label>
                  <input
                    type="tel"
                    required
                    value={memberPhone}
                    onChange={(e) => setMemberPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs font-medium focus:outline-none focus:border-[#EF777B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252927] mb-1">Preferred Home Branch</label>
                  <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs font-medium focus:outline-none focus:border-[#EF777B]">
                    <option>Cebu Flagship (Colon Street)</option>
                    <option>Batangas City Center</option>
                    <option>Davao City Bajada</option>
                    <option>Tacloban City Leyte</option>
                    <option>San Fernando Pampanga</option>
                    <option>Bacolod Singcang</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-[#FFF0BF]/50 border border-[#F7DF8B]/50 text-[11px] text-[#252927]">
                  🎁 Instant benefit: ₱150 grocery discount voucher credited upon successful card generation!
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#EF777B] hover:bg-[#e46468] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Generate Digital Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#252927] text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

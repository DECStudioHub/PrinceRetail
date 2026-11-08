import React, { useState, useRef, useEffect } from 'react';
import { 
  Check, 
  UserCheck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Gift,
  Crown,
  Search,
  ChevronDown,
  MapPin,
  X
} from 'lucide-react';
import { loyaltyTiers } from '../data/loyaltyData';
import { storesData } from '../data/storesData';
import { LoyaltyTier, StoreLocation } from '../types';
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

  // Searchable Preferred Home Branch state with all Prince Retail stores
  const [selectedBranch, setSelectedBranch] = useState<StoreLocation>(() => {
    return storesData.find((s) => s.id === 'store-vs-binalbagan') || storesData[0];
  });
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [branchSearchQuery, setBranchSearchQuery] = useState('');
  const branchDropdownRef = useRef<HTMLDivElement>(null);
  const branchSearchInputRef = useRef<HTMLInputElement>(null);

  // Close branch dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        branchDropdownRef.current &&
        !branchDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBranchDropdownOpen(false);
      }
    };
    if (isBranchDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isBranchDropdownOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isBranchDropdownOpen) {
      const timer = setTimeout(() => {
        branchSearchInputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isBranchDropdownOpen]);

  // Filter all Prince stores by name, city, province, or region
  const filteredBranches = storesData.filter((store) => {
    const query = branchSearchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      store.name.toLowerCase().includes(query) ||
      store.city.toLowerCase().includes(query) ||
      store.province.toLowerCase().includes(query) ||
      store.region.toLowerCase().includes(query)
    );
  });

  // React to prop change if clicked from navbar or quick link
  React.useEffect(() => {
    if (initialTierId) {
      const match = loyaltyTiers.find((t) => t.id === initialTierId);
      if (match) setSelectedTier(match);
    }
  }, [initialTierId]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisteredSuccess(true);
    setTimeout(() => {
      setShowRegisterModal(false);
      setRegisteredSuccess(false);
    }, 2800);
  };

  return (
    <section id="loyalty" className="pt-8 pb-14 lg:pt-10 lg:pb-16 bg-[#FCFBF7] relative overflow-hidden scroll-mt-18">
      {/* Decorative ambient subtle background gradients */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#FEF9C3]/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#E8F5EC]/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#55635C] mb-3">
            <span className="text-[#E22C28]">Royalty Rewards Program</span>
            <span aria-hidden="true">·</span>
            <span>Customer Loyalty</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1B221E] leading-tight">
            Meet the Royalty Rewards Family.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#55635C] leading-relaxed">
            Every peso you spend brings you closer to greater rewards. Choose your membership tier, earn points on daily family essentials, and enjoy priority checkout lane privileges.
          </p>
        </div>

        {/* MAIN LOYALTY SHOWCASE: NO WHITE BACKGROUND BOX */}
        {/* Clean 2-column layout matching image_6305ae9d.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-24">
          
          {/* Card Showcase Left */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Authentic Card Image Render without white card container */}
            <div className="w-full max-w-md relative">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={getAssetUrl(selectedTier.cardImage)}
                  alt={selectedTier.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover block rounded-2xl sm:rounded-3xl"
                />
              </div>

              {/* Registration CTA directly under card */}
              <button
                onClick={() => setShowRegisterModal(true)}
                className="mt-6 w-full py-3.5 px-6 rounded-xl bg-[#1B221E] hover:bg-[#26302B] text-white text-sm font-bold flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-[#F0E901]" />
                <span>Register for {selectedTier.name} Card</span>
              </button>
            </div>
          </div>

          {/* Tier Detail & Selector Right */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            
            {/* Centered / aligned Pill Segment Menu from image_6305ae9d.png */}
            <div className="inline-flex flex-wrap items-center gap-1 sm:gap-1.5 p-1.5 bg-white/80 border border-[#1B221E]/10 rounded-full mb-8 shadow-xs max-w-full">
              {loyaltyTiers.map((tier) => {
                const isActive = selectedTier.id === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`py-2 sm:py-2.5 px-4 sm:px-6 rounded-full text-xs font-extrabold tracking-wider uppercase cursor-pointer ${
                      isActive 
                        ? 'bg-[#1B221E] text-white shadow-xs' 
                        : 'text-[#55635C] hover:text-[#1B221E] hover:bg-black/5'
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
                className={`inline-block px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 ${selectedTier.bgClass} ${selectedTier.textColor} border border-[#1B221E]/10`}
              >
                {selectedTier.badge.toUpperCase()}
              </div>

              {/* Heading */}
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1B221E] mb-1.5 tracking-tight">
                {selectedTier.name}
              </h3>
              
              {/* Subtitle in Pastel Red */}
              <p className="text-sm sm:text-base font-semibold text-[#E22C28] mb-4">
                {selectedTier.tagline}
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#55635C] leading-relaxed mb-6 max-w-xl">
                {selectedTier.description}
              </p>

              {/* Perks list with green checkmark circles */}
              <div className="space-y-3 mb-8">
                {selectedTier.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-[#1B221E]">
                    <div className="w-5 h-5 rounded-full bg-[#036936] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#1B221E] stroke-[3]" />
                    </div>
                    <span className="font-medium text-[#1B221E]">{perk}</span>
                  </div>
                ))}
              </div>

              {/* Multiplier / Rewards Accrual Banner */}
              <div className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#FEF9C3]/50 border border-[#F0E901]/60 text-xs sm:text-sm font-bold text-[#1B221E]">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Rewards Multiplier: <strong className="text-[#1B221E] font-extrabold">{selectedTier.multiplier}</strong></span>
              </div>
            </div>

          </div>

        </div>

        {/* EXPLORE ALL 4 ROYALTY CARD TIERS — INTERACTIVE WALLET POCKET */}
        <div className="mt-12 pt-14 border-t border-[#1B221E]/10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#55635C] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#E22C28]"></span>
                <span>Interactive Member Wallet</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B221E]">
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
                  onClick={() => setSelectedTier(tier)}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B221E] text-white shadow-xs'
                      : 'bg-white/80 text-[#55635C] border border-[#1B221E]/10'
                  }`}
                >
                  {tier.name.replace('ROYALTY', '').trim() || 'Royalty'}
                </button>
              );
            })}
          </div>

          {/* WALLET STAGE CONTAINER — INCREASED WIDTH & BALANCED HEIGHT */}
          <div className="relative max-w-5xl lg:max-w-6xl mx-auto pt-28 sm:pt-36 pb-6 px-2 sm:px-6">
            
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
                      onClick={() => setSelectedTier(tier)}
                      onMouseEnter={() => setSelectedTier(tier)}
                      style={{
                        transformOrigin: 'bottom center',
                      }}
                      className={`group relative rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                        isSelected 
                          ? 'z-30 -translate-y-24 sm:-translate-y-32 md:-translate-y-36 rotate-0 scale-[1.03] sm:scale-105 shadow-2xl ring-2 ring-[#1B221E]/20' 
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
                            ? 'border-[#1B221E] shadow-xl ring-1 ring-black/5' 
                            : 'border-[#1B221E]/15 hover:border-[#1B221E]/40'
                        }`}
                      >
                        
                        {/* Upper Section: Always Peeking out of the pocket */}
                        <div>
                          {/* Pass Header Label with Full Non-Truncated Typography */}
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wide text-[#1B221E] whitespace-nowrap">
                              {tier.name}
                            </span>
                            <span className="text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-[#036936]/50 text-[#1B221E] whitespace-nowrap shrink-0">
                              {tier.badge.replace(' Tier', '')}
                            </span>
                          </div>

                          {/* Authentic Card Image */}
                          <div className="aspect-[1.8/1] sm:aspect-[1.85/1] max-h-[85px] sm:max-h-[105px] rounded-xl overflow-hidden shadow-xs border border-black/5 bg-[#FCFBF7]">
                            <img
                              src={getAssetUrl(tier.cardImage)}
                              alt={tier.name}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover rounded-xl"
                            />
                          </div>

                          {/* Multiplier / Rewards Accrual Tag */}
                          <div className="mt-1.5 sm:mt-2 px-2 py-0.5 sm:py-1 rounded-md bg-[#FEF9C3]/80 border border-[#F0E901]/60 text-center">
                            <span className="text-[9px] sm:text-[11px] font-extrabold text-[#1B221E] block truncate">
                              {tier.multiplier}
                            </span>
                          </div>
                        </div>

                        {/* Lower Section: Hidden inside pocket when resting, fully revealed when raised! */}
                        <div className="pt-2 sm:pt-2.5 border-t border-dashed border-[#1B221E]/15 flex flex-col gap-1.5 mt-auto">
                          
                          {/* Digital Pass Barcode Lines */}
                          <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center justify-center gap-[2px] h-4 sm:h-5 w-full opacity-70 overflow-hidden">
                              <span className="w-0.5 h-full bg-[#1B221E]"></span>
                              <span className="w-1 h-full bg-[#1B221E]"></span>
                              <span className="w-0.5 h-full bg-[#1B221E]"></span>
                              <span className="w-1.5 h-full bg-[#1B221E]"></span>
                              <span className="w-0.5 h-full bg-[#1B221E]"></span>
                              <span className="w-2 h-full bg-[#1B221E]"></span>
                              <span className="w-0.5 h-full bg-[#1B221E]"></span>
                              <span className="w-1 h-full bg-[#1B221E]"></span>
                              <span className="w-0.5 h-full bg-[#1B221E]"></span>
                              <span className="w-1.5 h-full bg-[#1B221E]"></span>
                              <span className="w-0.5 h-full bg-[#1B221E]"></span>
                              <span className="w-1 h-full bg-[#1B221E]"></span>
                              <span className="w-2 h-full bg-[#1B221E]"></span>
                              <span className="w-0.5 h-full bg-[#1B221E]"></span>
                              <span className="w-1 h-full bg-[#1B221E]"></span>
                            </div>
                            <span className="font-mono text-[8px] sm:text-[9px] text-[#55635C] tracking-wider mt-0.5">
                              {passSerials[idx]}
                            </span>
                          </div>

                          {/* Quick Perk Bullet Highlight */}
                          <div className="text-[9px] sm:text-[10px] text-[#1B221E] font-semibold leading-tight line-clamp-1 px-1 text-center">
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
                                ? 'bg-[#1B221E] text-white hover:bg-black'
                                : 'bg-[#E22C28] text-white hover:bg-[#C9221F]'
                            }`}
                          >
                            <span>Register Card</span>
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
            <div className="relative z-20 -mt-16 sm:-mt-22 w-full rounded-b-3xl rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-b from-[#F0F9F3] via-[#DCEDE1] to-[#D5EBDC] border border-[#1B221E]/15 shadow-xl p-5 sm:p-7 overflow-hidden">
              
              {/* Wallet Top Stitch Line (Dashed Stitching Detail as shown in reference) */}
              <div className="absolute top-2.5 left-4 right-4 border-t-2 border-dashed border-white/80"></div>
              
              {/* Subtle Leather Shading / Embossed Brand Pouch Details */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                
                {/* Brand Seal Left */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/80 border border-[#1B221E]/10 flex items-center justify-center shadow-xs">
                    <Crown className="w-5 h-5 text-[#E22C28]" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#1B221E]">
                      PRINCE ROYALTY CLUB PASSES
                    </div>
                    <div className="text-[11px] text-[#55635C]">
                      Pull any card out of the wallet to inspect full tier perks
                    </div>
                  </div>
                </div>

                {/* Interactive Tier Status Indicator Pills */}
                <div className="flex items-center gap-1.5 p-1 bg-white/70 border border-[#1B221E]/10 rounded-full shadow-2xs">
                  {loyaltyTiers.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#1B221E] text-white shadow-2xs'
                            : 'text-[#55635C] hover:text-[#1B221E]'
                        }`}
                      >
                        {tier.name.replace('ROYALTY', '').trim() || 'Royalty'}
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Active Pulled Card Quick Summary Bar inside the Wallet Pocket */}
              <div className="mt-4 pt-3 border-t border-[#1B221E]/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#1B221E]">
                  <span className="font-extrabold">{selectedTier.name}</span>
                  <span className="text-[#55635C]">·</span>
                  <span className="text-[#E22C28] font-bold">{selectedTier.multiplier}</span>
                  <span className="text-[#55635C]">·</span>
                  <span className="text-[#55635C] truncate max-w-xs">{selectedTier.tagline}</span>
                </div>

                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="px-4 py-1.5 rounded-xl bg-[#1B221E] hover:bg-[#26302B] text-white text-[11px] font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#F0E901]" />
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
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#1B221E]/10 relative animate-scaleIn max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E22C28]">
                  Join Royalty Club
                </span>
                <h3 className="text-xl font-extrabold text-[#1B221E]">
                  Register for {selectedTier.name}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowRegisterModal(false);
                  setIsBranchDropdownOpen(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1B221E] flex items-center justify-center text-xs font-bold cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* 4 Card Tier Selector Pills (Supports all 4 cards) */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#FCFBF7] rounded-xl border border-[#1B221E]/10 mb-3.5">
              {loyaltyTiers.map((tier) => {
                const isTierActive = selectedTier.id === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`py-1 px-1 rounded-lg text-[10px] font-bold text-center transition-all truncate cursor-pointer ${
                      isTierActive
                        ? 'bg-[#1B221E] text-white shadow-2xs'
                        : 'text-[#55635C] hover:text-[#1B221E]'
                    }`}
                    title={`Switch to ${tier.name}`}
                  >
                    {tier.name.replace('ROYALTY', '').trim() || 'Royalty'}
                  </button>
                );
              })}
            </div>

            {registeredSuccess ? (
              <div className="py-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[#E8F5EC] text-[#036936] flex items-center justify-center mx-auto mb-3">
                  <Check className="w-7 h-7 stroke-[2.5]" />
                </div>
                <h4 className="text-lg font-bold text-[#1B221E]">Welcome to Royalty Rewards!</h4>
                <p className="text-xs text-[#55635C] mt-1">
                  Your digital <strong className="text-[#1B221E]">{selectedTier.name}</strong> card is now active.
                </p>
                <div className="mt-4 p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#1B221E]/10 text-xs text-left space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#55635C]">Member Name:</span>
                    <strong className="text-[#1B221E] font-bold">{memberName}</strong>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#55635C]">Tier:</span>
                    <strong className="text-[#E22C28] font-bold">{selectedTier.name} ({selectedTier.multiplier})</strong>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#55635C]">Home Branch:</span>
                    <strong className="text-[#1B221E] font-bold truncate max-w-[190px] text-right">{selectedBranch.name}</strong>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-[#55635C]">Mobile:</span>
                    <strong className="text-[#1B221E] font-bold">{memberPhone}</strong>
                  </div>
                </div>
                <p className="text-[11px] text-[#55635C] mt-3">
                  An activation SMS with digital pass credentials has been sent to your phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3.5">
                {/* Visual card summary thumbnail matching user attachment image_95749edb.png */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FCFBF7] border border-[#1B221E]/10">
                  <img
                    src={getAssetUrl(selectedTier.cardImage)}
                    alt={selectedTier.name}
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-10 object-cover rounded-lg shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold text-[#1B221E] truncate">{selectedTier.name}</div>
                    <div className="text-[11px] text-[#E22C28] font-semibold">{selectedTier.multiplier}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B221E] mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1B221E]/15 bg-[#FCFBF7] text-xs font-medium focus:outline-none focus:border-[#E22C28]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B221E] mb-1">Mobile Number (Philippines)</label>
                  <input
                    type="tel"
                    required
                    value={memberPhone}
                    onChange={(e) => setMemberPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1B221E]/15 bg-[#FCFBF7] text-xs font-medium focus:outline-none focus:border-[#E22C28]"
                  />
                </div>

                {/* PREFERRED HOME BRANCH: Searchable Dropdown with ALL Prince Stores */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#1B221E]">
                      Preferred Home Branch
                    </label>
                    <span className="text-[10px] font-semibold text-[#55635C]">
                      {storesData.length} branches
                    </span>
                  </div>

                  <div className="relative" ref={branchDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsBranchDropdownOpen((prev) => !prev)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#FCFBF7] text-xs font-medium text-left flex items-center justify-between gap-2 transition-all cursor-pointer shadow-2xs ${
                        isBranchDropdownOpen
                          ? 'border-[#E22C28] ring-2 ring-[#E22C28]/10'
                          : 'border-[#1B221E]/15 hover:border-[#E22C28]/40'
                      }`}
                      aria-expanded={isBranchDropdownOpen}
                      aria-haspopup="listbox"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <MapPin className="w-4 h-4 text-[#E22C28] shrink-0" />
                        <div className="min-w-0">
                          <div className="font-bold text-[#1B221E] truncate">
                            {selectedBranch ? selectedBranch.name : 'Select a Prince Retail Store'}
                          </div>
                          <div className="text-[10px] text-[#55635C] truncate">
                            {selectedBranch
                              ? `${selectedBranch.city}, ${selectedBranch.province} · ${selectedBranch.region}`
                              : 'Choose your home branch'}
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#55635C] shrink-0 transition-transform duration-200 ${
                          isBranchDropdownOpen ? 'rotate-180 text-[#E22C28]' : ''
                        }`}
                      />
                    </button>

                    {/* Popover Dropdown with Search Bar */}
                    {isBranchDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white rounded-2xl shadow-2xl border border-[#1B221E]/15 p-2.5 animate-fadeIn">
                        {/* Search Bar to easily type store name */}
                        <div className="relative mb-2">
                          <Search className="w-3.5 h-3.5 text-[#55635C] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            ref={branchSearchInputRef}
                            type="text"
                            value={branchSearchQuery}
                            onChange={(e) => setBranchSearchQuery(e.target.value)}
                            placeholder="Type store name (e.g. Binalbagan, Jaen, Baybay)..."
                            className="w-full pl-8.5 pr-8 py-2 rounded-xl bg-[#FCFBF7] border border-[#1B221E]/15 text-xs text-[#1B221E] font-medium placeholder:text-[#55635C] focus:outline-none focus:border-[#E22C28]"
                            onClick={(e) => e.stopPropagation()}
                          />
                          {branchSearchQuery && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setBranchSearchQuery('');
                                branchSearchInputRef.current?.focus();
                              }}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-[10px] cursor-pointer"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>

                        {/* Store Network Counter */}
                        <div className="flex items-center justify-between px-1.5 pb-1.5 text-[10px] font-semibold text-[#55635C] border-b border-[#1B221E]/8">
                          <span>All Prince Retail Stores</span>
                          <span>{filteredBranches.length} {filteredBranches.length === 1 ? 'store' : 'stores'}</span>
                        </div>

                        {/* Scrollable List of All Prince Stores */}
                        <div className="max-h-48 overflow-y-auto space-y-1 pt-1.5 pr-1" role="listbox">
                          {filteredBranches.length > 0 ? (
                            filteredBranches.map((store) => {
                              const isSelected = selectedBranch?.id === store.id;
                              const regionBadge =
                                store.region === 'Visayas'
                                  ? 'bg-[#FEF9C3] text-[#854D0E] border-[#F0E901]/60'
                                  : store.region === 'Luzon'
                                  ? 'bg-[#FEE2E2] text-[#991B1B] border-[#E22C28]/30'
                                  : 'bg-[#E8F5EC] text-[#036936] border-[#036936]/30';

                              return (
                                <div
                                  key={store.id}
                                  onClick={() => {
                                    setSelectedBranch(store);
                                    setIsBranchDropdownOpen(false);
                                    setBranchSearchQuery('');
                                  }}
                                  className={`p-2 rounded-xl flex items-center justify-between gap-2 cursor-pointer transition-colors text-xs ${
                                    isSelected
                                      ? 'bg-[#FEF9C3]/50 border border-[#F0E901] font-bold'
                                      : 'hover:bg-[#FCFBF7] border border-transparent'
                                  }`}
                                  role="option"
                                  aria-selected={isSelected}
                                >
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-bold text-[#1B221E] truncate">{store.name}</span>
                                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${regionBadge}`}>
                                        {store.region}
                                      </span>
                                    </div>
                                    <div className="text-[10px] text-[#55635C] truncate mt-0.5">
                                      {store.city}, {store.province}
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <Check className="w-4 h-4 text-[#036936] shrink-0 stroke-[2.5]" />
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <div className="py-4 text-center text-xs text-[#55635C]">
                              No Prince store found matching "{branchSearchQuery}".
                              <div className="text-[10px] mt-0.5 text-[#55635C]/80">Try typing a city or province name.</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FEF9C3]/50 border border-[#F0E901]/50 text-[11px] text-[#1B221E]">
                  🎁 Instant benefit: ₱150 grocery discount voucher credited upon successful card generation!
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#E22C28] hover:bg-[#C9221F] text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
                  >
                    Generate Digital Card
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowRegisterModal(false);
                      setIsBranchDropdownOpen(false);
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1B221E] text-xs font-bold cursor-pointer transition-colors"
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

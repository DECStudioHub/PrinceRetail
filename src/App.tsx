/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { StoresSection } from './components/StoresSection';
import { PromosSection } from './components/PromosSection';
import { ProgramsSection } from './components/ProgramsSection';
import { LoyaltySection } from './components/LoyaltySection';
import { ShopOnline } from './components/ShopOnline';
import { CareersSection } from './components/CareersSection';
import { ContactUs } from './components/ContactUs';
import { FAQChat } from './components/FAQChat';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickSearchModal } from './components/QuickSearchModal';
import { CartItem, Product } from './types';
import { X, Sparkles } from 'lucide-react';
import { getAssetUrl } from './utils/assets';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<'Luzon' | 'Visayas' | 'Mindanao' | null>(null);
  const [selectedLoyaltyTierId, setSelectedLoyaltyTierId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
    showToast(`Added ${quantity}x "${product.name}" to cart`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('All items cleared from cart');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 66;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleSelectStoreRegion = (region: 'Luzon' | 'Visayas' | 'Mindanao') => {
    setSelectedRegionFilter(region);
    scrollToSection('stores');
  };

  const handleSelectLoyaltyTier = (tierId: string) => {
    setSelectedLoyaltyTierId(tierId);
    scrollToSection('loyalty');
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFBF7] text-[#1B221E]">
      
      {/* Top Slim Promotional Announcement Bar */}
      {showTopBanner && (
        <div className="bg-[#1B221E] text-white py-2 px-4 text-[11px] font-semibold text-center relative z-50 flex items-center justify-center gap-2 border-b border-white/10">
          <span className="text-[#F0E901]">✨ Sabay sa Buhay 2026:</span>
          <span>Use code <strong className="text-white bg-[#E22C28] px-2 py-0.5 rounded-md tracking-wider uppercase font-mono text-[10px] ml-1">SABAY2026</strong> for 10% OFF + Free Delivery over ₱1,500</span>
          <button
            onClick={() => setShowTopBanner(false)}
            aria-label="Close announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Sticky Main Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectStoreRegion={handleSelectStoreRegion}
        onSelectLoyaltyTier={handleSelectLoyaltyTier}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 3: Hero Section */}
        <Hero
          onExploreShop={() => scrollToSection('shop')}
          onFindStore={() => scrollToSection('stores')}
          onOpenLoyalty={() => scrollToSection('loyalty')}
        />

        {/* Section 4: About Us Section */}
        <AboutUs />

        {/* Section 5: Stores Section */}
        <StoresSection selectedRegionFilter={selectedRegionFilter} />

        {/* Section 6: Promos Section */}
        <PromosSection onShopPromo={() => scrollToSection('shop')} />

        {/* Section 7: Programs Section */}
        <ProgramsSection />


        {/* Section 8 & 14: Loyalty Section (with Stacking Cards Effect) */}
        <LoyaltySection initialTierId={selectedLoyaltyTierId} />

        {/* Section 9: Shop Online Section */}
        <ShopOnline onAddToCart={handleAddToCart} cartItems={cartItems} />

        {/* Section 10: Careers Section */}
        <CareersSection />

        {/* Customer FAQ Chat */}
        <FAQChat />

        {/* Section 11: Contact Us Section */}
        <ContactUs />
      </main>

      {/* Section 12: Premium Dark Charcoal Footer with DECStudioAiCreation */}
      <Footer
        onNavigate={scrollToSection}
        onSelectLoyaltyTier={handleSelectLoyaltyTier}
      />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          handleAddToCart(p, 1);
        }}
        onNavigateSection={scrollToSection}
      />

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B221E] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2 animate-slideUp">
          <span className="w-2 h-2 rounded-full bg-[#E22C28]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

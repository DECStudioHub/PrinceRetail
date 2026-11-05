import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  MapPin, 
  Crown,
  Sparkles
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onSelectStoreRegion?: (region: 'Luzon' | 'Visayas' | 'Mindanao') => void;
  onSelectLoyaltyTier?: (tierId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onSelectStoreRegion,
  onSelectLoyaltyTier
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storesDropdownOpen, setStoresDropdownOpen] = useState(false);
  const [loyaltyDropdownOpen, setLoyaltyDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'stores', 'promos', 'programs', 'loyalty', 'shop', 'careers', 'contact'];
      const scrollPosition = window.scrollY + 90;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setStoresDropdownOpen(false);
    setLoyaltyDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 66;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleRegionClick = (region: 'Luzon' | 'Visayas' | 'Mindanao') => {
    scrollTo('stores');
    if (onSelectStoreRegion) {
      onSelectStoreRegion(region);
    }
  };

  const handleTierClick = (tierId: string) => {
    scrollTo('loyalty');
    if (onSelectLoyaltyTier) {
      onSelectLoyaltyTier(tierId);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FFFDF8]/95 backdrop-blur-md shadow-xs border-b border-[#252927]/8 py-2.5 sm:py-3' 
          : 'bg-[#FFFDF8] border-b border-[#252927]/5 py-3 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Wordmark & Slogan with Official Logo */}
          <button 
            onClick={() => scrollTo('home')} 
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none text-left shrink-0 cursor-pointer"
          >
            <img 
              src={getAssetUrl('assets/aistudio/Glossy_Prince_Sabay_sa_Buhay_Badge_eb175b40.png')}
              alt="Prince Retail - Sabay sa Buhay Official Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-300 rounded-full"
            />
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#252927] group-hover:text-[#EF777B] transition-colors leading-tight">
                  PRINCE RETAIL
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF777B]"></span>
              </div>
              <span className="text-[10px] tracking-[0.18em] font-bold text-[#6C7470] uppercase">
                Sabay sa Buhay
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-semibold text-[#6C7470]">
            <button
              onClick={() => scrollTo('home')}
              className={`hover:text-[#252927] transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
                activeSection === 'home' ? 'text-[#252927] border-b-2 border-[#EF777B]' : ''
              }`}
            >
              Home
            </button>

            <button
              onClick={() => scrollTo('about')}
              className={`hover:text-[#252927] transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
                activeSection === 'about' ? 'text-[#252927] border-b-2 border-[#EF777B]' : ''
              }`}
            >
              About Us
            </button>

            {/* Stores Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setStoresDropdownOpen(true)}
              onMouseLeave={() => setStoresDropdownOpen(false)}
            >
              <button
                onClick={() => scrollTo('stores')}
                className={`flex items-center gap-1 hover:text-[#252927] transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
                  activeSection === 'stores' ? 'text-[#252927] border-b-2 border-[#EF777B]' : ''
                }`}
              >
                <span>Stores</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${storesDropdownOpen ? 'rotate-180 text-[#EF777B]' : ''}`} />
              </button>

              {storesDropdownOpen && (
                <div className="absolute top-full -left-4 pt-2 w-52 animate-fadeIn z-50">
                  <div className="bg-white border border-[#252927]/10 rounded-xl shadow-lg p-2 flex flex-col gap-1">
                    <button
                      onClick={() => handleRegionClick('Luzon')}
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#252927] rounded-lg hover:bg-[#FBE3DF]/50 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#EF777B]" />
                        Luzon Stores
                      </span>
                      <span className="text-[10px] text-[#6C7470]">4 Hubs</span>
                    </button>
                    <button
                      onClick={() => handleRegionClick('Visayas')}
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#252927] rounded-lg hover:bg-[#FFF0BF]/50 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#F7DF8B]" />
                        Visayas Stores
                      </span>
                      <span className="text-[10px] text-[#6C7470]">Flagship</span>
                    </button>
                    <button
                      onClick={() => handleRegionClick('Mindanao')}
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-[#252927] rounded-lg hover:bg-[#DCEEE2]/50 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#B8D9C4]" />
                        Mindanao Stores
                      </span>
                      <span className="text-[10px] text-[#6C7470]">4 Hubs</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollTo('promos')}
              className={`hover:text-[#252927] transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
                activeSection === 'promos' ? 'text-[#252927] border-b-2 border-[#EF777B]' : ''
              }`}
            >
              Promos
            </button>

            <button
              onClick={() => scrollTo('programs')}
              className={`hover:text-[#252927] transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
                activeSection === 'programs' ? 'text-[#252927] border-b-2 border-[#EF777B]' : ''
              }`}
            >
              Programs
            </button>

            {/* Loyalty Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setLoyaltyDropdownOpen(true)}
              onMouseLeave={() => setLoyaltyDropdownOpen(false)}
            >
              <button
                onClick={() => scrollTo('loyalty')}
                className={`flex items-center gap-1 hover:text-[#252927] transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
                  activeSection === 'loyalty' ? 'text-[#252927] border-b-2 border-[#EF777B]' : ''
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-[#EF777B]" />
                <span>Loyalty</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${loyaltyDropdownOpen ? 'rotate-180 text-[#EF777B]' : ''}`} />
              </button>

              {loyaltyDropdownOpen && (
                <div className="absolute top-full -left-4 pt-2 w-56 animate-fadeIn z-50">
                  <div className="bg-white border border-[#252927]/10 rounded-xl shadow-lg p-2 flex flex-col gap-1">
                    <button
                      onClick={() => handleTierClick('royalty')}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#252927] rounded-lg hover:bg-[#DCEEE2]/60 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#B8D9C4]"></span>
                        Royalty
                      </span>
                      <span className="text-[10px] text-[#6C7470]">1x Pts</span>
                    </button>
                    <button
                      onClick={() => handleTierClick('royalty-gold')}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#252927] rounded-lg hover:bg-[#FFF0BF]/60 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#F7DF8B]"></span>
                        Royalty Gold
                      </span>
                      <span className="text-[10px] text-[#6C7470]">1.5x Pts</span>
                    </button>
                    <button
                      onClick={() => handleTierClick('royalty-platinum')}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#252927] rounded-lg hover:bg-[#FBE3DF]/60 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#EF777B]"></span>
                        Royalty Platinum
                      </span>
                      <span className="text-[10px] text-[#6C7470]">2x Pts</span>
                    </button>
                    <button
                      onClick={() => handleTierClick('royalty-diamond')}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#252927] rounded-lg hover:bg-slate-100 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-slate-800" />
                        Royalty Diamond
                      </span>
                      <span className="text-[10px] text-[#6C7470]">3x VIP</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollTo('shop')}
              className={`hover:text-[#252927] transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
                activeSection === 'shop' ? 'text-[#252927] border-b-2 border-[#EF777B]' : ''
              }`}
            >
              Shop Online
            </button>

            <button
              onClick={() => scrollTo('careers')}
              className={`hover:text-[#252927] transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
                activeSection === 'careers' ? 'text-[#252927] border-b-2 border-[#EF777B]' : ''
              }`}
            >
              Careers
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className={`hover:text-[#252927] transition-colors pb-0.5 whitespace-nowrap cursor-pointer ${
                activeSection === 'contact' ? 'text-[#252927] border-b-2 border-[#EF777B]' : ''
              }`}
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action Icons: Search & Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              aria-label="Search catalog and stores"
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-[#252927] hover:bg-[#252927]/5 border border-transparent hover:border-[#252927]/10 transition-colors flex items-center gap-2 text-xs font-medium cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#6C7470]" />
              <span className="hidden md:inline text-[#6C7470]">Search...</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#252927] hover:bg-[#343a37] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#F7DF8B]" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#EF777B] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-scaleIn">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="xl:hidden p-2 rounded-xl text-[#252927] hover:bg-[#252927]/5 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FFFDF8] border-b border-[#252927]/10 px-4 pt-4 pb-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => scrollTo('home')}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#252927] hover:bg-[#252927]/5 text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#252927] hover:bg-[#252927]/5 text-left"
            >
              About Us
            </button>

            {/* Mobile Stores Accordion */}
            <div className="border-t border-b border-[#252927]/5 py-1 my-1">
              <button
                onClick={() => setStoresDropdownOpen(!storesDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-[#252927]"
              >
                <span>Stores</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${storesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {storesDropdownOpen && (
                <div className="pl-6 pr-2 py-1 flex flex-col gap-1">
                  <button onClick={() => handleRegionClick('Luzon')} className="py-1.5 text-xs font-medium text-[#6C7470] hover:text-[#EF777B] text-left">
                    • Luzon Stores
                  </button>
                  <button onClick={() => handleRegionClick('Visayas')} className="py-1.5 text-xs font-medium text-[#6C7470] hover:text-[#EF777B] text-left">
                    • Visayas Stores (Flagship)
                  </button>
                  <button onClick={() => handleRegionClick('Mindanao')} className="py-1.5 text-xs font-medium text-[#6C7470] hover:text-[#EF777B] text-left">
                    • Mindanao Stores
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollTo('promos')}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#252927] hover:bg-[#252927]/5 text-left"
            >
              Promos & Deals
            </button>

            <button
              onClick={() => scrollTo('programs')}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#252927] hover:bg-[#252927]/5 text-left"
            >
              Customer Programs
            </button>

            {/* Mobile Loyalty Accordion */}
            <div className="border-t border-b border-[#252927]/5 py-1 my-1">
              <button
                onClick={() => setLoyaltyDropdownOpen(!loyaltyDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-[#252927]"
              >
                <span className="flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-[#EF777B]" />
                  Royalty Rewards
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${loyaltyDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {loyaltyDropdownOpen && (
                <div className="pl-6 pr-2 py-1 flex flex-col gap-1">
                  <button onClick={() => handleTierClick('royalty')} className="py-1.5 text-xs font-medium text-[#6C7470] text-left">
                    • Royalty (Foundation)
                  </button>
                  <button onClick={() => handleTierClick('royalty-gold')} className="py-1.5 text-xs font-medium text-[#6C7470] text-left">
                    • Royalty Gold (1.5x)
                  </button>
                  <button onClick={() => handleTierClick('royalty-platinum')} className="py-1.5 text-xs font-medium text-[#6C7470] text-left">
                    • Royalty Platinum (2x)
                  </button>
                  <button onClick={() => handleTierClick('royalty-diamond')} className="py-1.5 text-xs font-medium text-[#6C7470] text-left">
                    • Royalty Diamond (3x VIP)
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollTo('shop')}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#252927] hover:bg-[#252927]/5 text-left"
            >
              Shop Online
            </button>
            <button
              onClick={() => scrollTo('careers')}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#252927] hover:bg-[#252927]/5 text-left"
            >
              Careers
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#252927] hover:bg-[#252927]/5 text-left"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

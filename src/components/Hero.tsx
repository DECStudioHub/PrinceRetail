import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  Crown, 
  Download, 
  ShoppingBag, 
  Sparkles, 
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Exact 1 to 8 sequence requested by user matching the uploaded filenames
  const slides = [
    {
      id: 1,
      number: '01',
      title: 'Store Selection',
      subtitle: 'Prince Hypermart Sagay · Add MySuki Store',
      image: '/public/assets/aistudio/1_268d1ae3.jpg'
    },
    {
      id: 2,
      number: '02',
      title: 'Wholesale Deals Storefront',
      subtitle: 'Prince Asenso Negosyo Club · Featured Categories',
      image: '/public/assets/aistudio/2_2df6d4e6.jpg'
    },
    {
      id: 3,
      number: '03',
      title: 'Shop by Category',
      subtitle: 'Christmas Bundles, Value Picks & Fresh Produce',
      image: '/public/assets/aistudio/3_82ea7325.jpg'
    },
    {
      id: 4,
      number: '04',
      title: 'Bulk Wholesale Cases',
      subtitle: 'Safeguard, Go Fresh Water & Mystery Deals',
      image: '/public/assets/aistudio/4_54245243.jpg'
    },
    {
      id: 5,
      number: '05',
      title: 'Sari-Sari Best Sellers',
      subtitle: 'Suki Prices on Bioderm, Silka, Doreen & Chippy',
      image: '/public/assets/aistudio/5_f9d53d6f.jpg'
    },
    {
      id: 6,
      number: '06',
      title: 'Discount Coupons',
      subtitle: 'Promos Just For You! ₱50 OFF Vouchers',
      image: '/public/assets/aistudio/6_94fd91ca.jpg'
    },
    {
      id: 7,
      number: '07',
      title: 'Orders & Tracking',
      subtitle: 'Ongoing, Completed & Cancelled Deliveries',
      image: '/public/assets/aistudio/7_79022b86.jpg'
    },
    {
      id: 8,
      number: '08',
      title: 'Profile & MySuki QR',
      subtitle: 'Store Info, Settings, Legal & Digital Barcode',
      image: '/public/assets/aistudio/8_7a0cecb1.jpg'
    }
  ];

  // Auto-slide every 2.1 seconds per prompt specification
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2100);

    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      // Swiped left -> next
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (diff < -45) {
      // Swiped right -> prev
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-[#FFFDF8] to-[#FBE3DF]/30">
      {/* Subtle background ambient pastel glows */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#FBE3DF]/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-36 right-10 w-96 h-96 bg-[#FFF0BF]/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#DCEEE2]/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Brand, Headline, Supporting, Badges, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Brand Kicker with Unboxed Metadata */}
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#6C7470] mb-4">
              <span className="text-[#EF777B]">Prince Retail</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#252927]">Sabay sa Buhay</span>
              <span aria-hidden="true">·</span>
              <span>Since 1990</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#252927] leading-[1.08] mb-6 max-w-xl text-balance">
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
                  onClick={(e) => { e.preventDefault(); alert("Prince Retail Mobile App is available on Apple App Store & Google Play!"); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#252927] text-white rounded-lg text-[11px] font-semibold hover:bg-black transition-colors"
                >
                  <Download className="w-3 h-3 text-[#F7DF8B]" />
                  <span>App Store</span>
                </a>
                <a
                  href="#download"
                  onClick={(e) => { e.preventDefault(); alert("Prince Retail Mobile App is available on Apple App Store & Google Play!"); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#252927] text-white rounded-lg text-[11px] font-semibold hover:bg-black transition-colors"
                >
                  <Download className="w-3 h-3 text-[#B8D9C4]" />
                  <span>Google Play</span>
                </a>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE: Realistic Smartphone Mockup with 1 to 8 Sequential Real App Screens */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div 
              className="relative w-[285px] sm:w-[310px] md:w-[325px] select-none"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              
              {/* Outer Glow & Shadow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#EF777B]/20 via-[#F7DF8B]/20 to-[#B8D9C4]/20 rounded-[48px] filter blur-xl transform scale-105 -z-10"></div>

              {/* Navigation Arrows for Easy Browsing through all 8 screens */}
              <button
                onClick={goToPrev}
                aria-label="Previous screen"
                className="absolute -left-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#252927] shadow-md border border-[#252927]/10 flex items-center justify-center z-40 transition-transform active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={goToNext}
                aria-label="Next screen"
                className="absolute -right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#252927] shadow-md border border-[#252927]/10 flex items-center justify-center z-40 transition-transform active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Phone Hardware Shell */}
              <div className="relative bg-[#1A1D1C] p-2.5 rounded-[46px] shadow-2xl border-4 border-[#3A403D]">
                
                {/* Volume Rocker & Power Buttons (Realistic accents) */}
                <div className="absolute -left-4 top-24 w-1 h-10 bg-[#3A403D] rounded-l-md"></div>
                <div className="absolute -left-4 top-38 w-1 h-10 bg-[#3A403D] rounded-l-md"></div>
                <div className="absolute -right-4 top-28 w-1 h-14 bg-[#3A403D] rounded-r-md"></div>

                {/* Inner Bezel Screen */}
                <div className="relative bg-white rounded-[36px] overflow-hidden aspect-[9/18.5] flex flex-col">
                  
                  {/* Dynamic Island Notch */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 w-24 h-5 bg-[#1A1D1C] rounded-full flex items-center justify-end pr-2 pointer-events-none">
                    <div className="w-2 h-2 rounded-full bg-[#2A302D] border border-white/10"></div>
                  </div>

                  {/* Rotating Screens Container: 8 Real App Screens 1 to 8 */}
                  <div className="relative w-full h-full overflow-hidden bg-slate-100">
                    {slides.map((slide, idx) => {
                      const isActive = idx === currentSlide;
                      return (
                        <div
                          key={slide.id}
                          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                            isActive 
                              ? 'opacity-100 translate-x-0 pointer-events-auto' 
                              : idx < currentSlide 
                                ? 'opacity-0 -translate-x-full pointer-events-none' 
                                : 'opacity-0 translate-x-full pointer-events-none'
                          }`}
                        >
                          <img
                            src={slide.image}
                            alt={`Prince Retail Mobile App Screen ${slide.number} - ${slide.title}`}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-[#252927]/40 rounded-full z-20 pointer-events-none"></div>

                </div>

              </div>

              {/* Dynamic 8 Pagination Dots */}
              <div className="mt-5 flex items-center justify-center gap-1.5">
                {slides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to screen ${slide.number}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx
                        ? 'w-6 bg-[#EF777B]'
                        : 'w-2 bg-[#252927]/20 hover:bg-[#252927]/40'
                    }`}
                  />
                ))}
              </div>

              {/* Active Screen Information Title */}
              <div className="mt-2 text-center">
                <div className="text-xs font-bold text-[#252927] truncate">
                  Screen {slides[currentSlide].number}: {slides[currentSlide].title}
                </div>
                <div className="text-[11px] text-[#6C7470] truncate mt-0.5">
                  {slides[currentSlide].subtitle}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider font-semibold text-[#EF777B]">
                  {isPaused ? 'Paused on Hover' : 'Rotating every 2.1s (1 to 8)'}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

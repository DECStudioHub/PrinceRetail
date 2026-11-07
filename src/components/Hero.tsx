import React, { lazy, Suspense, useEffect, useState } from 'react';
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
import { getAssetUrl } from '../utils/assets';

const MobileMock3D = lazy(() =>
  import('./MobileMock3D.jsx').then(({ MobileMock3D }) => ({ default: MobileMock3D }))
);

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
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [is3DEnabled, setIs3DEnabled] = useState(false);
  const [appNotice, setAppNotice] = useState<string | null>(null);

  const slides = [
    { id: 1, title: 'Store Selection', image: getAssetUrl('assets/aistudio/1_268d1ae3.jpg') },
    { id: 2, title: 'Wholesale Deals Storefront', image: getAssetUrl('assets/aistudio/2_2df6d4e6.jpg') },
    { id: 3, title: 'Shop by Category', image: getAssetUrl('assets/aistudio/3_82ea7325.jpg') },
    { id: 4, title: 'Bulk Wholesale Cases', image: getAssetUrl('assets/aistudio/4_54245243.jpg') },
    { id: 5, title: 'Sari-Sari Best Sellers', image: getAssetUrl('assets/aistudio/5_f9d53d6f.jpg') },
    { id: 6, title: 'Discount Coupons', image: getAssetUrl('assets/aistudio/6_94fd91ca.jpg') },
    { id: 7, title: 'Orders & Tracking', image: getAssetUrl('assets/aistudio/7_79022b86.jpg') },
    { id: 8, title: 'Profile & MySuki QR', image: getAssetUrl('assets/aistudio/8_7a0cecb1.jpg') }
  ];

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (is3DEnabled) {
      const timer = setInterval(() => setCurrentSlide((slide) => (slide + 1) % slides.length), 5000);
      return () => clearInterval(timer);
    }
    const timer = setTimeout(() => {
      setPreviousSlide(currentSlide);
      setCurrentSlide((slide) => (slide + 1) % slides.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentSlide, is3DEnabled, isPaused, slides.length]);

  useEffect(() => {
    if (previousSlide === null) return;
    const timer = setTimeout(() => setPreviousSlide(null), 650);
    return () => clearTimeout(timer);
  }, [previousSlide]);

  const showSlide = (nextSlide: number) => {
    if (nextSlide === currentSlide) return;
    if (!is3DEnabled) setPreviousSlide(currentSlide);
    setCurrentSlide(nextSlide);
  };

  return (
    <section id="home" className="relative pt-8 pb-12 lg:pt-10 lg:pb-16 overflow-hidden bg-gradient-to-b from-[#FCFBF7] via-[#FCFBF7] to-[#FEE2E2]/30 scroll-mt-18">
      {/* Subtle background ambient pastel glows */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-[#FEE2E2]/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-36 right-10 w-96 h-96 bg-[#FEF9C3]/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#E8F5EC]/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Brand, Headline, Supporting, Badges, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            
            {/* Brand Kicker with Unboxed Metadata */}
            <div className="inline-flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-[#55635C] mb-4">
              <span className="text-[#E22C28]">Prince Retail</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#1B221E]">Sabay sa Buhay</span>
              <span aria-hidden="true">·</span>
              <span>Since 1990</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[clamp(2rem,8vw,3rem)] sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1B221E] leading-[1.08] mb-6 max-w-xl text-balance">
              Everyday Finds.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B221E] via-[#1B221E] to-[#E22C28]">
                Everyday Smiles.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#55635C] leading-relaxed max-w-xl mb-8">
              Bringing value, quality, and convenience closer to every Filipino family. Your daily essentials, your favorite finds—always within reach.
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={onExploreShop}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#E22C28] hover:bg-[#C9221F] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Explore Shop</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onFindStore}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-[#FCFBF7] text-[#1B221E] font-bold text-sm border border-[#1B221E]/15 shadow-2xs hover:border-[#1B221E]/30 transition-all active:scale-[0.98] cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#E22C28]" />
                <span>Find a Store</span>
              </button>
            </div>

            {/* Trust and Program Badges */}
            <div className="w-full pt-6 border-t border-[#1B221E]/10 flex flex-wrap items-center justify-between gap-4">
              
              {/* Store Locator Badge */}
              <button
                onClick={onFindStore}
                className="flex items-center gap-3 group text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] flex items-center justify-center text-[#E22C28] group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1B221E] group-hover:text-[#E22C28] transition-colors">
                    70+ Stores Nationwide
                  </div>
                  <div className="text-[11px] text-[#55635C]">
                    Luzon, Visayas & Mindanao
                  </div>
                </div>
              </button>

              {/* Royalty Rewards Badge */}
              <button
                onClick={onOpenLoyalty}
                className="flex items-center gap-3 group text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FEF9C3] flex items-center justify-center text-[#1B221E] group-hover:scale-105 transition-transform">
                  <Crown className="w-5 h-5 text-[#E22C28]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1B221E] group-hover:text-[#E22C28] transition-colors">
                    Royalty Rewards Club
                  </div>
                  <div className="text-[11px] text-[#55635C]">
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1B221E] text-white rounded-lg text-[11px] font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3 text-[#F0E901]" />
                  <span>App Store</span>
                </a>
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    setAppNotice('Prince Retail App is available on Apple App Store & Google Play!');
                    setTimeout(() => setAppNotice(null), 3000);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1B221E] text-white rounded-lg text-[11px] font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  <Download className="w-3 h-3 text-[#036936]" />
                  <span>Google Play</span>
                </a>
              </div>
              {appNotice && (
                <div className="text-[11px] font-medium text-[#036936] bg-[#E8F5EC] px-3 py-1 rounded-full border border-[#036936]/30 animate-fade-in">
                  ✓ {appNotice}
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SIDE: Interactive 3D app screen slider */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div
              className="relative w-[min(330px,calc(100vw_-_3rem),max(150px,calc(50svh_-_4.5rem)))]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div aria-hidden="true" className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-[#1B221E]/15 via-[#FEE2E2]/50 to-[#E8F5EC]/55 blur-2xl" />
              <div aria-hidden="true" className="absolute inset-x-8 bottom-7 h-12 rounded-full bg-[#1B221E]/25 blur-2xl" />
              <div className="relative aspect-[1/2] w-full">
                {is3DEnabled ? (
                  <Suspense fallback={
                    <img
                      src={slides[currentSlide].image}
                      alt={`Prince Retail mobile app screen: ${slides[currentSlide].title}`}
                      decoding="async"
                      className="absolute inset-0 h-full w-full rounded-[2rem] object-cover"
                    />
                  }>
                    <MobileMock3D
                      image={slides[currentSlide].image}
                      alt={`Prince Retail mobile app screen: ${slides[currentSlide].title}`}
                      setIsPaused={setIsPaused}
                    />
                  </Suspense>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIs3DEnabled(true)}
                    aria-label={`Load interactive 3D preview: ${slides[currentSlide].title}`}
                    className="group relative block h-full w-full rounded-[2rem] border-[9px] border-[#171a1c] bg-[#171a1c] p-1 shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E22C28]"
                  >
                    {previousSlide !== null && (
                      <img
                        key={`previous-${slides[previousSlide].id}`}
                        src={slides[previousSlide].image}
                        alt=""
                        aria-hidden="true"
                        decoding="async"
                        className="hero-screen-crossfade-out absolute inset-0 h-full w-full rounded-[1.3rem] object-cover"
                      />
                    )}
                    <img
                      key={slides[currentSlide].id}
                      src={slides[currentSlide].image}
                      alt={`Prince Retail mobile app screen: ${slides[currentSlide].title}`}
                      fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
                      decoding="async"
                      className={`h-full w-full rounded-[1.3rem] object-cover ${previousSlide !== null ? 'hero-screen-crossfade-in' : ''}`}
                    />
                    <span aria-hidden="true" className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1B221E]/85 px-3 py-1.5 text-[10px] font-bold text-white opacity-90 transition-opacity group-hover:opacity-100">
                      Tap to explore in 3D
                    </span>
                  </button>
                )}
              </div>
              <button
                onClick={() => showSlide((currentSlide + slides.length - 1) % slides.length)}
                aria-label="Previous app screen"
                className="group absolute -left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-[#1B221E] transition-transform active:scale-95"
              >
                <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1B221E]/10 bg-white/90 shadow-sm transition-colors group-hover:bg-white">
                  <ChevronLeft className="h-4 w-4" />
                </span>
              </button>
              <button
                onClick={() => showSlide((currentSlide + 1) % slides.length)}
                aria-label="Next app screen"
                className="group absolute -right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-[#1B221E] transition-transform active:scale-95"
              >
                <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1B221E]/10 bg-white/90 shadow-sm transition-colors group-hover:bg-white">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </button>
              <div className="mt-4 flex justify-center gap-2" aria-label="Choose app screen">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => showSlide(index)}
                    aria-label={`Show ${slide.title}`}
                    aria-current={index === currentSlide ? 'true' : undefined}
                    className={`h-2.5 rounded-full transition-all ${index === currentSlide ? 'w-6 bg-[#E22C28]' : 'w-2.5 bg-[#1B221E]/20 hover:bg-[#1B221E]/40'}`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

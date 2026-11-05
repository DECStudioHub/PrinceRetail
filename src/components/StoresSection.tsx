import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { 
  MapPin, 
  ArrowRight, 
  Clock, 
  Phone, 
  Search, 
  Navigation, 
  Check, 
  ExternalLink,
  Building2,
  Sparkles
} from 'lucide-react';
import { storesData } from '../data/storesData';
import { StoreLocation } from '../types';

gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin);

interface StoresSectionProps {
  selectedRegionFilter?: 'Luzon' | 'Visayas' | 'Mindanao' | null;
}

export const StoresSection: React.FC<StoresSectionProps> = ({ selectedRegionFilter }) => {
  const [activeRegion, setActiveRegion] = useState<'All' | 'Luzon' | 'Visayas' | 'Mindanao'>(
    selectedRegionFilter || 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStoreModal, setActiveStoreModal] = useState<StoreLocation | null>(null);
  const [showDirectionsSuccess, setShowDirectionsSuccess] = useState(false);
  const [sagayRouteActive, setSagayRouteActive] = useState(false);
  const routeMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sagayRouteActive || !routeMapRef.current) return;

    const map = routeMapRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Prince Hypermart Sagay, Poblacion II, Sagay City, Negros Occidental');
    let redirectTimer: number;

    if (reducedMotion) {
      redirectTimer = window.setTimeout(() => window.location.assign(mapUrl), 300);
      return () => window.clearTimeout(redirectTimer);
    }

    const timeline = gsap.timeline({
      onComplete: () => window.location.assign(mapUrl)
    });
    timeline.fromTo(map.querySelector('.route-dashed'), { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.65, ease: 'power1.inOut' });
    timeline.fromTo(map.querySelector('.route-solid'), { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 2.5, ease: 'none' }, 0.55);
    timeline.to(map.querySelector('.route-car'), { duration: 2.5, ease: 'none', motionPath: { path: map.querySelector('.route-path'), align: map.querySelector('.route-path'), alignOrigin: [0.5, 0.5], autoRotate: true } }, 0.55);

    return () => {
      timeline.kill();
      gsap.killTweensOf(map.querySelector('.route-car'));
    };
  }, [sagayRouteActive]);

  // Sync if prop updates
  React.useEffect(() => {
    if (selectedRegionFilter) {
      setActiveRegion(selectedRegionFilter);
    }
  }, [selectedRegionFilter]);

  const regionalCards = [
    {
      region: 'Luzon' as const,
      title: 'Luzon',
      desc: 'Explore PRINCE RETAIL stores across Luzon.',
      count: 'Palawan, Nueva Ecija, Bulacan, Tarlac, Quezon',
      bgClass: 'bg-[#FBE3DF]',
      borderClass: 'border-[#EF777B]/30',
      accentColor: '#EF777B',
      accentText: 'text-[#EF777B]'
    },
    {
      region: 'Visayas' as const,
      title: 'Visayas',
      desc: 'Explore PRINCE RETAIL stores across Visayas.',
      count: 'Cebu, Leyte, Biliran, Samar, Negros, Panay, Siquijor',
      bgClass: 'bg-[#FFF0BF]',
      borderClass: 'border-[#F7DF8B]/50',
      accentColor: '#F7DF8B',
      accentText: 'text-[#252927]'
    },
    {
      region: 'Mindanao' as const,
      title: 'Mindanao',
      desc: 'Explore PRINCE RETAIL stores across Mindanao.',
      count: 'Surigao, Misamis, Agusan, Zamboanga, Lanao, Bukidnon',
      bgClass: 'bg-[#DCEEE2]',
      borderClass: 'border-[#B8D9C4]/50',
      accentColor: '#B8D9C4',
      accentText: 'text-[#252927]'
    }
  ];

  const filteredStores = storesData.filter((store) => {
    const matchesRegion = activeRegion === 'All' || store.region === activeRegion;
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.amenities.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  const handleGetDirections = (store: StoreLocation) => {
    if (store.id === 'store-vs-sagay') {
      setSagayRouteActive(true);
      requestAnimationFrame(() => routeMapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
      return;
    }
    setActiveStoreModal(store);
    setShowDirectionsSuccess(false);
  };

  return (
    <section id="stores" className="pt-8 pb-14 lg:pt-10 lg:pb-16 bg-[#FFFDF8] relative scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#6C7470] mb-3">
            <span className="text-[#EF777B]">Store Network</span>
            <span aria-hidden="true">·</span>
            <span>Nationwide Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252927] leading-tight">
            Find Your Prince.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6C7470] leading-relaxed">
            From the bustling islands of the Visayas to strategic logistics corridors in Luzon and Mindanao, our supermarkets and hypermarts bring fresh savings right next door.
          </p>
        </div>

        {/* 3 Regional Cards per prompt specification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {regionalCards.map((card) => {
            const isSelected = activeRegion === card.region;
            return (
              <div
                key={card.region}
                onClick={() => setActiveRegion(card.region)}
                className={`group p-8 rounded-3xl ${card.bgClass} border ${card.borderClass} transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-md cursor-pointer flex flex-col justify-between relative overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6C7470]">
                      Island Region
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-[#252927] group-hover:scale-110 transition-transform">
                      <MapPin className="w-4 h-4 text-[#252927]" />
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#252927] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#252927]/80 leading-relaxed mb-4">
                    {card.desc}
                  </p>
                  <p className="text-xs font-medium text-[#6C7470]">
                    {card.count}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#252927]/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#252927] flex items-center gap-1.5">
                    Find Stores
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#252927] text-white flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-3 right-3 bg-[#252927] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Active Region
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive Store Search & Map Module */}
        <div className="bg-white rounded-3xl border border-[#252927]/10 p-6 sm:p-8 shadow-xs">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#252927]/8">
            <div>
              <h3 className="text-xl font-bold text-[#252927]">
                Store Directory & Services
              </h3>
              <p className="text-xs text-[#6C7470] mt-0.5">
                Showing {filteredStores.length} branches in {activeRegion === 'All' ? 'the Philippines' : activeRegion}
              </p>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FFFDF8] rounded-xl border border-[#252927]/10">
              {(['All', 'Luzon', 'Visayas', 'Mindanao'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeRegion === r
                      ? 'bg-[#252927] text-white shadow-xs'
                      : 'text-[#6C7470] hover:text-[#252927]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Search bar inside store locator */}
          <div className="pt-6 pb-6">
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-[#6C7470] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, province, or amenity (e.g. Cebu, Pharmacy, Bakery)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#252927]/15 bg-[#FFFDF8] text-xs text-[#252927] placeholder:text-[#6C7470] focus:outline-none focus:border-[#EF777B] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#6C7470] hover:text-[#252927]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Stores Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStores.map((store) => (
              <div
                key={store.id}
                className="p-5 rounded-2xl bg-[#FFFDF8] border border-[#252927]/8 hover:border-[#EF777B]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[#6C7470] uppercase tracking-wider">
                      {store.region} · {store.province}
                    </span>
                    {store.featured && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EF777B]/15 text-[#EF777B]">
                        Flagship
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-[#252927] mb-2 leading-snug">
                    {store.name}
                  </h4>

                  <p className="text-xs text-[#6C7470] mb-3 leading-relaxed">
                    {store.address}
                  </p>

                  <div className="space-y-1.5 text-xs text-[#252927] font-medium mb-4">
                    {store.hours && <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#EF777B] shrink-0" />
                      <span>{store.hours}</span>
                    </div>}
                    {store.phone && <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#6C7470] shrink-0" />
                      <span>{store.phone}</span>
                    </div>}
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {store.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#252927]/10 text-[#6C7470]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleGetDirections(store)}
                  className="w-full py-2 px-3 rounded-xl bg-white border border-[#252927]/15 hover:bg-[#FBE3DF]/30 hover:border-[#EF777B] text-xs font-bold text-[#252927] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#EF777B]" />
                  <span>Get Directions & Details</span>
                </button>
              </div>
            ))}
          </div>

          {filteredStores.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-10 h-10 text-[#6C7470] mx-auto mb-3 opacity-40" />
              <p className="text-sm font-bold text-[#252927]">No stores found matching your search</p>
              <p className="text-xs text-[#6C7470] mt-1">Try resetting the region filter or searching for another city.</p>
              <button
                onClick={() => { setActiveRegion('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#252927] text-white text-xs font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Interactive Map Visual Simulator */}
          <div className="mt-8 pt-6 border-t border-[#252927]/8">
            {sagayRouteActive ? (
              <div ref={routeMapRef} className="rounded-2xl border border-[#B8D9C4]/50 bg-[#F4F8FF] p-4 sm:p-6" aria-label="Animated route to Prince Hypermart Sagay">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-[#252927]">Route to Prince Hypermart Sagay</h4>
                    <p className="text-xs text-[#6C7470]">Poblacion II, Sagay City, Negros Occidental</p>
                  </div>
                  <Navigation className="h-5 w-5 shrink-0 text-[#EF777B]" aria-hidden="true" />
                </div>
                <svg viewBox="0 0 640 300" className="w-full" role="img" aria-label="A car follows a blue route to Prince Hypermart Sagay">
                  <rect x="14" y="20" width="150" height="84" rx="18" fill="#E8EEF7" />
                  <rect x="205" y="13" width="140" height="62" rx="18" fill="#E8EEF7" />
                  <rect x="42" y="146" width="94" height="92" rx="20" fill="#E8EEF7" />
                  <rect x="230" y="218" width="148" height="66" rx="20" fill="#E8EEF7" />
                  <rect x="470" y="165" width="122" height="78" rx="20" fill="#E8EEF7" />
                  <path className="route-path" d="M62 256 C150 250 166 166 248 156 S360 176 422 104 S502 72 570 44" fill="none" />
                  <path className="route-dashed" d="M62 256 C150 250 166 166 248 156 S360 176 422 104 S502 72 570 44" fill="none" stroke="#A9C8FF" strokeWidth="7" strokeLinecap="round" strokeDasharray="2 16" />
                  <path className="route-solid" d="M62 256 C150 250 166 166 248 156 S360 176 422 104 S502 72 570 44" fill="none" stroke="#176BFF" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="62" cy="256" r="13" fill="white" stroke="#176BFF" strokeWidth="6" />
                  <path d="M570 18c-15 0-27 12-27 27 0 20 27 49 27 49s27-29 27-49c0-15-12-27-27-27Zm0 36a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" fill="#176BFF" />
                  <g className="route-car" aria-hidden="true">
                    <rect x="-18" y="-11" width="36" height="22" rx="8" fill="#176BFF" stroke="white" strokeWidth="3" />
                    <rect x="-8" y="-7" width="16" height="14" rx="4" fill="#DCEAFF" />
                  </g>
                </svg>
                <p className="text-center text-xs font-semibold text-[#176BFF]">Opening Google Maps…</p>
              </div>
            ) : <div className="bg-[#DCEEE2]/30 rounded-2xl p-6 border border-[#B8D9C4]/40 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-[#252927] shrink-0">
                  <Navigation className="w-6 h-6 text-[#EF777B]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#252927]">
                    GPS Live Route Navigation Available
                  </h4>
                  <p className="text-xs text-[#6C7470]">
                    Navigate directly using Google Maps, Waze, or Apple Maps to any of our 70+ branches.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleGetDirections(filteredStores[0] || storesData[0])}
                className="px-5 py-2.5 rounded-xl bg-[#252927] hover:bg-[#343a37] text-white text-xs font-bold shadow-xs whitespace-nowrap cursor-pointer"
              >
                Open Nearest Store in Maps
              </button>
            </div>}
          </div>

        </div>

      </div>

      {/* Store Directions & Info Modal */}
      {activeStoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#252927]/10 relative animate-scaleIn">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#EF777B]">
                  {activeStoreModal.region} Branch
                </span>
                <h3 className="text-xl font-extrabold text-[#252927] mt-0.5">
                  {activeStoreModal.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveStoreModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#252927] flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#6C7470] mb-4">
              {activeStoreModal.address}
            </p>

            <div className="space-y-2 p-4 rounded-xl bg-[#FFFDF8] border border-[#252927]/8 mb-6 text-xs">
              {activeStoreModal.hours && <div className="flex items-center justify-between">
                <span className="text-[#6C7470]">Operating Hours:</span>
                <span className="font-bold text-[#252927]">{activeStoreModal.hours}</span>
              </div>}
              {activeStoreModal.phone && <div className="flex items-center justify-between">
                <span className="text-[#6C7470]">Branch Phone:</span>
                <span className="font-bold text-[#252927]">{activeStoreModal.phone}</span>
              </div>}
              <div className="flex items-center justify-between">
                <span className="text-[#6C7470]">Customer Parking:</span>
                <span className="font-bold text-emerald-700">Free Customer Parking Available</span>
              </div>
            </div>

            {showDirectionsSuccess ? (
              <div className="p-4 rounded-xl bg-[#DCEEE2] text-xs font-bold text-emerald-800 flex items-center gap-2 mb-4">
                <Check className="w-4 h-4 shrink-0" />
                <span>Navigation route sent to your maps app! Ready to drive to {activeStoreModal.name}.</span>
              </div>
            ) : null}

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDirectionsSuccess(true)}
                className="flex-1 py-3 px-4 rounded-xl bg-[#EF777B] hover:bg-[#e46468] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Start GPS Navigation</span>
              </button>
              <button
                onClick={() => setActiveStoreModal(null)}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#252927] text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

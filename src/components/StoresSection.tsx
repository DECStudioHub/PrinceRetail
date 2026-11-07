import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  ArrowRight, 
  Clock, 
  Phone, 
  Search, 
  Navigation, 
  Building2,
  RotateCw
} from 'lucide-react';
import { storesData } from '../data/storesData';
import { StoreLocation } from '../types';

const googleMapsUrl = (store: StoreLocation) => {
  const destination = store.coordinates
    ? `${store.coordinates.lat},${store.coordinates.lng}`
    : `${store.name}, ${store.address}, ${store.city}, ${store.province}, Philippines`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
};

interface StoreCardItemProps {
  store: StoreLocation;
  onGetDirections: (store: StoreLocation) => void;
}

const StoreCardItem: React.FC<StoreCardItemProps> = ({ store, onGetDirections }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  if (!store.image) {
    return (
      <div className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#1B221E]/8 hover:border-[#E22C28]/40 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-[#55635C] uppercase tracking-wider">
              {store.region} · {store.province}
            </span>
            {store.featured && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E22C28]/15 text-[#E22C28]">
                Flagship
              </span>
            )}
          </div>

          <h4 className="text-sm font-bold text-[#1B221E] mb-1.5 leading-snug">
            {store.name}
          </h4>

          <p className="text-xs text-[#55635C] mb-2 leading-relaxed">
            {store.address}
          </p>

          <div className="space-y-1 text-xs text-[#1B221E] font-medium mb-3">
            {store.hours && (
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E22C28] shrink-0" />
                <span>{store.hours}</span>
              </div>
            )}
            {store.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#55635C] shrink-0" />
                <span>{store.phone}</span>
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {store.amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-[#1B221E]/10 text-[#55635C]"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onGetDirections(store)}
          className="w-full min-h-11 px-3 rounded-xl bg-white border border-[#1B221E]/15 hover:bg-[#FEE2E2]/30 hover:border-[#E22C28] text-xs font-bold text-[#1B221E] flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5 text-[#E22C28]" />
          <span>Get Directions & Details</span>
        </button>
      </div>
    );
  }

  // Interactive 3D Flip Card with 760ms overshooting spring for Prince Hypermart Binalbagan
  return (
    <div
      className="perspective-1000 min-h-[255px] sm:min-h-[270px] h-full group select-none"
      onMouseEnter={() => !isTouchDevice && setIsFlipped(true)}
      onMouseLeave={() => !isTouchDevice && setIsFlipped(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`${store.name}. Store card with interactive details and directions.`}
    >
      <div
        className={`relative w-full h-full transform-style-3d spring-flip-760 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT FACE: Store Photo (Clean view of storefront, no red-boxed text badges) */}
        <div 
          onClick={() => setIsFlipped(true)}
          style={{ transform: 'rotateY(0deg) translateZ(1px)' }}
          className={`absolute inset-0 backface-hidden rounded-2xl overflow-hidden border-2 border-[#E22C28]/40 shadow-xs flex flex-col justify-end bg-[#1B221E] transition-all duration-300 ${
            isFlipped 
              ? 'pointer-events-none opacity-0 invisible z-0' 
              : 'pointer-events-auto opacity-100 visible z-10 cursor-pointer'
          }`}
          title="Click to view store details & directions"
        >
          <img
            src={store.image}
            alt={`${store.name} storefront`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle gradient at the bottom only so store title remains readable without obscuring upper signage */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Bottom Store Title */}
          <div className="relative z-10 p-3.5">
            <h4 className="text-sm sm:text-base font-extrabold text-white leading-snug drop-shadow-md">
              {store.name}
            </h4>
            <p className="text-[11px] text-white/90 font-medium mt-0.5">
              {store.city}, {store.province}
            </p>
          </div>
        </div>

        {/* BACK FACE: Store Details & Action Button (matches attached image_4bfd8e67.png) */}
        <div 
          style={{ transform: 'rotateY(180deg) translateZ(1px)' }}
          className={`absolute inset-0 backface-hidden rounded-2xl bg-[#FCFBF7] border-2 border-[#E22C28]/45 p-4 shadow-sm flex flex-col justify-between transition-all duration-300 ${
            isFlipped 
              ? 'pointer-events-auto opacity-100 visible z-30' 
              : 'pointer-events-none opacity-0 invisible z-0'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-bold text-[#55635C] uppercase tracking-wider">
                {store.region} · {store.province}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                title="Flip back to store photo"
                className="text-[10px] font-bold text-[#55635C] hover:text-[#E22C28] hover:border-[#E22C28]/40 flex items-center gap-1 cursor-pointer px-2 py-0.5 rounded-lg bg-white border border-[#1B221E]/10 transition-colors"
              >
                <RotateCw className="w-2.5 h-2.5" />
                <span>Photo</span>
              </button>
            </div>

            <h4 className="text-sm font-bold text-[#1B221E] mb-1.5 leading-snug">
              {store.name}
            </h4>

            <p className="text-xs text-[#55635C] mb-2 leading-relaxed">
              {store.address}
            </p>

            <div className="space-y-1 text-xs text-[#1B221E] font-medium mb-3">
              {store.hours && (
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#E22C28] shrink-0" />
                  <span>{store.hours}</span>
                </div>
              )}
              {store.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#55635C] shrink-0" />
                  <span>{store.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Button: Get Directions & Details */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onGetDirections(store);
            }}
            className="w-full min-h-11 px-3 rounded-xl bg-white border border-[#1B221E]/15 hover:bg-[#FEE2E2]/35 hover:border-[#E22C28] text-xs font-bold text-[#1B221E] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-[0.98] relative z-40"
          >
            <Navigation className="w-3.5 h-3.5 text-[#E22C28]" />
            <span>Get Directions & Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface StoresSectionProps {
  selectedRegionFilter?: 'Luzon' | 'Visayas' | 'Mindanao' | null;
}

export const StoresSection: React.FC<StoresSectionProps> = ({ selectedRegionFilter }) => {
  const [activeRegion, setActiveRegion] = useState<'All' | 'Luzon' | 'Visayas' | 'Mindanao'>(
    selectedRegionFilter || 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStoreModal, setActiveStoreModal] = useState<StoreLocation | null>(null);
  const [routeMapReady, setRouteMapReady] = useState(false);
  const routeMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeStoreModal || !routeMapRef.current) return;

    const map = routeMapRef.current;
    const mapsUrl = googleMapsUrl(activeStoreModal);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const openMaps = () => {
      window.open(mapsUrl, '_blank', 'noopener,noreferrer');
      setRouteMapReady(true);
    };

    if (reducedMotion) {
      openMaps();
      return;
    }

    let cancelled = false;
    let stopAnimation = () => {};
    void Promise.all([
      import('gsap'),
      import('gsap/DrawSVGPlugin'),
      import('gsap/MotionPathPlugin')
    ]).then(([{ gsap }, { DrawSVGPlugin }, { MotionPathPlugin }]) => {
      if (cancelled) return;
      (gsap as any).registerPlugin(DrawSVGPlugin, MotionPathPlugin);
      const timeline = gsap.timeline({ onComplete: openMaps });
      (timeline as any).fromTo(map.querySelector('.route-dashed'), { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 0.65, ease: 'power1.inOut' });
      (timeline as any).fromTo(map.querySelector('.route-solid'), { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: 2.5, ease: 'none' }, 0.55);
      (timeline as any).to(map.querySelector('.route-car'), { duration: 2.5, ease: 'none', motionPath: { path: map.querySelector('.route-path'), align: map.querySelector('.route-path'), alignOrigin: [0.5, 0.5], autoRotate: true } }, 0.55);
      stopAnimation = () => {
        timeline.kill();
        (gsap as any).killTweensOf(map.querySelector('.route-car'));
      };
    }).catch(() => {
      if (!cancelled) openMaps();
    });

    return () => {
      cancelled = true;
      stopAnimation();
    };
  }, [activeStoreModal]);

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
      bgClass: 'bg-[#FEE2E2]',
      borderClass: 'border-[#E22C28]/30',
      accentColor: '#E22C28',
      accentText: 'text-[#E22C28]'
    },
    {
      region: 'Visayas' as const,
      title: 'Visayas',
      desc: 'Explore PRINCE RETAIL stores across Visayas.',
      count: 'Cebu, Leyte, Biliran, Samar, Negros, Panay, Siquijor',
      bgClass: 'bg-[#FEF9C3]',
      borderClass: 'border-[#F0E901]/50',
      accentColor: '#F0E901',
      accentText: 'text-[#CA8A04]'
    },
    {
      region: 'Mindanao' as const,
      title: 'Mindanao',
      desc: 'Explore PRINCE RETAIL stores across Mindanao.',
      count: 'Surigao, Misamis, Agusan, Zamboanga, Lanao, Bukidnon',
      bgClass: 'bg-[#E8F5EC]',
      borderClass: 'border-[#036936]/50',
      accentColor: '#036936',
      accentText: 'text-[#036936]'
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
    setRouteMapReady(false);
    setActiveStoreModal(store);
  };

  const closeStoreModal = () => {
    setActiveStoreModal(null);
  };

  return (
    <section id="stores" className="pt-8 pb-14 lg:pt-10 lg:pb-16 bg-[#FCFBF7] relative scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#55635C] mb-3">
            <span className="text-[#E22C28]">Store Network</span>
            <span aria-hidden="true">·</span>
            <span>Nationwide Presence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1B221E] leading-tight">
            Find Your Prince.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#55635C] leading-relaxed">
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
                    <span className="text-xs font-bold uppercase tracking-wider text-[#55635C]">
                      Island Region
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/70 flex items-center justify-center text-[#1B221E] group-hover:scale-110 transition-transform">
                      <MapPin className="w-4 h-4 text-[#1B221E]" />
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#1B221E] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#1B221E]/80 leading-relaxed mb-4">
                    {card.desc}
                  </p>
                  <p className="text-xs font-medium text-[#55635C]">
                    {card.count}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1B221E]/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1B221E] flex items-center gap-1.5">
                    Find Stores
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#1B221E] text-white flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute top-3 right-3 bg-[#1B221E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Active Region
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive Store Search & Map Module */}
        <div className="bg-white rounded-3xl border border-[#1B221E]/10 p-6 sm:p-8 shadow-xs">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1B221E]/8">
            <div>
              <h3 className="text-xl font-bold text-[#1B221E]">
                Store Directory & Services
              </h3>
              <p className="text-xs text-[#55635C] mt-0.5">
                Showing {filteredStores.length} branches in {activeRegion === 'All' ? 'the Philippines' : activeRegion}
              </p>
            </div>

            {/* Region Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FCFBF7] rounded-xl border border-[#1B221E]/10">
              {(['All', 'Luzon', 'Visayas', 'Mindanao'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRegion(r)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    activeRegion === r
                      ? 'bg-[#1B221E] text-white shadow-xs'
                      : 'text-[#55635C] hover:text-[#1B221E]'
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
              <Search className="w-4 h-4 text-[#55635C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, province, or amenity (e.g. Cebu, Pharmacy, Bakery)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#1B221E]/15 bg-[#FCFBF7] text-xs text-[#1B221E] placeholder:text-[#55635C] focus:outline-none focus:border-[#E22C28] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#55635C] hover:text-[#1B221E]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Stores Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredStores.map((store) => (
              <StoreCardItem
                key={store.id}
                store={store}
                onGetDirections={handleGetDirections}
              />
            ))}
          </div>

          {filteredStores.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-10 h-10 text-[#55635C] mx-auto mb-3 opacity-40" />
              <p className="text-sm font-bold text-[#1B221E]">No stores found matching your search</p>
              <p className="text-xs text-[#55635C] mt-1">Try resetting the region filter or searching for another city.</p>
              <button
                onClick={() => { setActiveRegion('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 rounded-xl bg-[#1B221E] text-white text-xs font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Interactive Map Visual Simulator */}
          <div className="mt-8 pt-6 border-t border-[#1B221E]/8">
            <div className="bg-[#E8F5EC]/30 rounded-2xl p-6 border border-[#036936]/40 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-[#1B221E] shrink-0">
                  <Navigation className="w-6 h-6 text-[#E22C28]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B221E]">
                    GPS Live Route Navigation Available
                  </h4>
                  <p className="text-xs text-[#55635C]">
                    Navigate directly using Google Maps, Waze, or Apple Maps to any of our 70+ branches.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleGetDirections(filteredStores[0] || storesData[0])}
                className="px-5 py-2.5 rounded-xl bg-[#1B221E] hover:bg-[#26302B] text-white text-xs font-bold shadow-xs whitespace-nowrap cursor-pointer"
              >
                Open Nearest Store in Maps
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Store Directions & Info Modal */}
      {activeStoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn" onClick={closeStoreModal}>
          <div role="dialog" aria-modal="true" aria-labelledby="store-modal-title" className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-[#1B221E]/10 relative animate-scaleIn" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E22C28]">
                  {activeStoreModal.region} Branch
                </span>
                <h3 id="store-modal-title" className="text-xl font-extrabold text-[#1B221E] mt-0.5">
                  {activeStoreModal.name}
                </h3>
              </div>
              <button
                onClick={closeStoreModal}
                aria-label="Close store details"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#1B221E] flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#55635C] mb-2">{activeStoreModal.address}</p>
            <p className="text-[11px] text-[#55635C] mb-3">
              {activeStoreModal.hours}{activeStoreModal.hours && activeStoreModal.phone ? ' · ' : ''}{activeStoreModal.phone}{activeStoreModal.hours || activeStoreModal.phone ? ' · ' : ''}Free customer parking available
            </p>
            <div ref={routeMapRef} className="rounded-2xl border border-[#036936]/50 bg-[#F4F8FF] p-3 sm:p-4" aria-label={`Animated route to ${activeStoreModal.name}`}>
              <svg viewBox="0 0 640 300" className="mx-auto block h-auto max-h-[300px] w-full max-w-[640px]" role="img" aria-label={`A car follows a blue route to ${activeStoreModal.name}`}>
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
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#1B221E]/10">
              <a
                href={googleMapsUrl(activeStoreModal)}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E22C28] hover:bg-[#C9201C] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-white" />
                <span>Open in Google Maps</span>
              </a>
              <p className="text-xs text-[#55635C]" aria-live="polite">
                {routeMapReady ? 'Route simulation complete.' : 'Simulating live GPS route to branch…'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

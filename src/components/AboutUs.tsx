import React, { useState } from 'react';
import { 
  Heart, 
  Users, 
  Store, 
  CheckCircle2, 
  History, 
  Building2, 
  Leaf, 
  Globe2, 
  ShoppingBag,
  Award,
  ChevronRight,
  Sparkles,
  Target,
  Compass,
  ShieldCheck,
  Scale,
  TrendingUp,
  Flame,
  Handshake,
  Check,
  ArrowRight,
  BarChart3,
  Activity,
  MapPin
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const AboutUs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'history' | 'profile'>('history');
  const [activeOpticIndex, setActiveOpticIndex] = useState(0);

  // OPTIC Core Values
  const opticValues = [
    {
      letter: 'O',
      word: 'OWNERSHIP',
      subtitle: 'Accountability & Stewardship',
      icon: ShieldCheck,
      color: '#EF777B',
      bgClass: 'bg-[#FBE3DF]',
      borderClass: 'border-[#EF777B]',
      accentBg: 'from-[#EF777B] to-[#e46468]',
      description:
        'Every member of Pamilyang Prince acts as an empowered custodian of our customer relationships, store operations, and community trust. We embrace personal responsibility, treat company resources as our own, and deliver proactive solutions with deep pride and accountability.',
      behavioralPoints: [
        'Taking proactive initiative without waiting to be told',
        'Caring for customer satisfaction as a personal commitment',
        'Protecting company assets and honoring community trust'
      ]
    },
    {
      letter: 'P',
      word: 'PURSUIT OF EXCELLENCE',
      subtitle: 'Continuous Improvement & Quality',
      icon: Award,
      color: '#252927',
      bgClass: 'bg-[#FFF0BF]',
      borderClass: 'border-[#F7DF8B]',
      accentBg: 'from-[#F7DF8B] to-[#eed06e]',
      description:
        'We never settle for good enough. From clean and organized hypermart aisles to high-speed supply chain logistics, we continually raise benchmarks to deliver world-class retail standards tailored specifically to everyday Filipino families.',
      behavioralPoints: [
        'Relentless drive for everyday retail service mastery',
        'Embracing customer feedback to refine store processes',
        'Maintaining pristine hygiene, safety, and inventory standards'
      ]
    },
    {
      letter: 'T',
      word: 'TEAMWORK',
      subtitle: 'Sabay sa Buhay as One Family',
      icon: Users,
      color: '#252927',
      bgClass: 'bg-[#DCEEE2]',
      borderClass: 'border-[#B8D9C4]',
      accentBg: 'from-[#B8D9C4] to-[#9fcab0]',
      description:
        'True to our official slogan "Sabay sa Buhay," we advance together as one unified family. We collaborate across branches and departments, celebrate shared milestones, uplift our colleagues, and recognize that our collective strength serves the nation best.',
      behavioralPoints: [
        'Open communication and cross-departmental alignment',
        'Fostering an inclusive, caring "Pamilyang Prince" culture',
        'Standing together through every operational season'
      ]
    },
    {
      letter: 'I',
      word: 'INTEGRITY',
      subtitle: 'Honesty, Fairness & Moral Compass',
      icon: Scale,
      color: '#252927',
      bgClass: 'bg-[#FFFDF8]',
      borderClass: 'border-[#252927]/20',
      accentBg: 'from-[#252927] to-[#3a403d]',
      description:
        'Trust is our most sacred foundation. We practice honest pricing on every register, conduct business with total transparency toward suppliers and agrarian partners, and adhere to strict ethical standards in every town and municipality we operate.',
      behavioralPoints: [
        'Accurate, transparent everyday low pricing with zero hidden fees',
        'Fair and dignified dealings with local farmers and suppliers',
        'Doing what is right even when no one is watching'
      ]
    },
    {
      letter: 'C',
      word: 'COST-BENEFIT MINDSET',
      subtitle: 'Prudent Efficiency Passed to Customers',
      icon: TrendingUp,
      color: '#EF777B',
      bgClass: 'bg-[#FBE3DF]',
      borderClass: 'border-[#EF777B]/60',
      accentBg: 'from-[#EF777B] to-[#F7DF8B]',
      description:
        'We operate with disciplined frugality and optimal operational efficiency. Every cost saved in warehousing, green energy, and logistics is directly channeled back into lower grocery prices and higher margins for our Kasosyo sari-sari store partners.',
      behavioralPoints: [
        'Eliminating operational waste and streamlining store workflows',
        'Passing logistical cost savings directly into family grocery baskets',
        'Smart capital allocation for sustainable grassroots expansion'
      ]
    }
  ];

  const historyMilestones = [
    {
      year: '1990',
      title: 'The Pioneering Warehouse & Single Register',
      detail: 'Founded by Robert Lim Go in Cebu City, Philippines, Prince Retail Group was formerly known as Prince Warehouse Club, Inc. The pioneering branch opened at the North Reclamation Area by converting a warehouse into a store with a single cash register, initially offering glassware, kitchenware, plastic ware, and essential household items.'
    },
    {
      year: '1991',
      title: 'Expansion into Supermarket & Grocery',
      detail: 'Driven by surging customer demand and community trust, Prince Warehouse Club expanded into selling everyday grocery lines, quickly capturing a wider base of retail shoppers, local families, and wholesale buyers.'
    },
    {
      year: '1993',
      title: 'Second Branch at A.C. Cortes, Mandaue',
      detail: 'Building on rapid success, Prince opened its second and larger store at A.C. Cortes, Mandaue City in Cebu. This milestone venture flourished and was later assigned to Robert’s brother, who now separately and independently manages the Prince Warehouse Club – Mandaue group chain of stores.'
    },
    {
      year: 'Sari-Sari Era',
      title: 'Sari-Sari Store Society (SSS) & Royalty Program',
      detail: 'To continually uphold customer satisfaction, the Sari-Sari Store Society (SSS) was organized. It became instrumental in empowering neighborhood sari-sari store owners who shopped at Prince to grow and thrive in their local communities. This pioneering initiative has evolved into what is celebrated today as the Prince Royalty Program.'
    },
    {
      year: 'Growth',
      title: 'Complete General Merchandise Expansion',
      detail: 'Prince broadened its product lines to include home furniture, consumer appliances, school and office supplies, garments, and footwear, completing its transformation into a full-scale, one-stop retail and wholesale destination.'
    }
  ];

  const profileHighlights = [
    {
      icon: Store,
      title: 'Prince Hypermart One-Stop Experience',
      desc: 'Rebranded from Prince Warehouse Club to PRINCE HYPERMART, operating as a comprehensive one-stop destination offering affordable Grocery/Supermarket, General Merchandise, and Department Store goods with value-added community services.',
      badge: 'Brand Rebranding',
      color: '#EF777B',
      bgColor: 'bg-[#FBE3DF]'
    },
    {
      icon: Users,
      title: 'Second-Generation Driven Leadership',
      desc: 'Guided by the founder’s well-educated and driven second generation, his children now occupy key management roles, transitioning Prince from a traditional enterprise into a dynamic, modern corporation of agile retail professionals.',
      badge: 'Modern Corporation',
      color: '#F7DF8B',
      bgColor: 'bg-[#FFF0BF]'
    },
    {
      icon: Leaf,
      title: 'Green Technology & Sustainable Stores',
      desc: 'Prince Hypermart stores incorporate unique eco-conscious green technologies, energy-efficient fixtures, and sustainable warehousing to minimize carbon impact while delivering maximum cost efficiency to shoppers.',
      badge: 'Sustainability',
      color: '#B8D9C4',
      bgColor: 'bg-[#DCEEE2]'
    },
    {
      icon: Globe2,
      title: 'Base of the Pyramid (BOP) Initiative',
      desc: 'Upholding our core commitment to the "Base of the Pyramid initiative", we focus relentlessly on serving grassroots Filipino families in urban centers and provincial rural towns—delivering dignity, fair pricing, and food security where it matters most.',
      badge: 'Grassroots Mission',
      color: '#EF777B',
      bgColor: 'bg-[#FBE3DF]'
    }
  ];

  const milestones = [
    { value: '1990', label: 'Founded by Robert Lim Go' },
    { value: '85%+', label: 'Filipinos at Base of the Pyramid Served' },
    { value: '70+', label: 'Stores Across Luzon, Visayas & Mindanao' },
    { value: '100%', label: 'Dedicated: OTOP & Serving the Underserved' }
  ];

  return (
    <section id="about" className="pt-8 pb-14 lg:pt-10 lg:pb-16 bg-[#FFFDF8] border-b border-[#252927]/5 relative scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#6C7470] mb-3">
            <span className="text-[#EF777B]">Our Legacy & Heritage</span>
            <span aria-hidden="true">·</span>
            <span>Prince Retail Group of Companies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#252927] leading-tight text-balance">
            Rooted in Community.<br />
            <span className="text-[#EF777B]">Made for Everyday.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6C7470] leading-relaxed">
            From a single-register converted warehouse in Cebu to a nationwide hypermart presence, Prince Retail has championed grassroots Filipino families with everyday affordability, entrepreneurial empowerment, and unwavering devotion.
          </p>
        </div>

        {/* Hero Visual & Core Mission Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          
          {/* Store Interior Photography */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-md aspect-[16/10] bg-slate-100 border border-[#252927]/8">
              <img
                src={getAssetUrl('assets/images/prince_store_community_1793803410656.jpg')}
                alt="Prince Retail community supermarket interior with Filipino shoppers and local produce"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-wider font-extrabold text-[#F7DF8B]">
                  Pamilyang Prince · Sabay sa Buhay
                </span>
                <p className="text-sm sm:text-base font-bold mt-1">
                  Serving grassroots Filipino families across Luzon, Visayas, and Mindanao with dignity and unbeatable everyday value.
                </p>
              </div>
            </div>

            {/* Floating Mission Quote Card */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-lg border border-[#252927]/10 items-center gap-3.5 max-w-sm">
              <div className="w-11 h-11 rounded-xl bg-[#FBE3DF] flex items-center justify-center text-[#EF777B] shrink-0">
                <Heart className="w-6 h-6 fill-[#EF777B]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#252927]">Our Slogan & Creed</div>
                <div className="text-[11px] text-[#6C7470] leading-tight mt-0.5">
                  "Sabay sa Buhay" — walking alongside every Filipino family through life's triumphs and daily needs.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Mission Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-white border border-[#252927]/8 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF777B]"></span>
                <h3 className="text-sm font-bold text-[#252927]">Base of the Pyramid (BOP) Focus</h3>
              </div>
              <p className="text-xs text-[#6C7470] leading-relaxed">
                Dedicated to serving more than 85% of the Philippine population who need accessible, high-quality, and affordable essentials the most.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#252927]/8 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F7DF8B]"></span>
                <h3 className="text-sm font-bold text-[#252927]">One Town, One Prince (OTOP)</h3>
              </div>
              <p className="text-xs text-[#6C7470] leading-relaxed">
                Establishing a welcoming, modern retail anchor in every municipality to bring convenience, livelihood, and lower prices to provincial communities.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#252927]/8 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B8D9C4]"></span>
                <h3 className="text-sm font-bold text-[#252927]">To Serve the Underserved</h3>
              </div>
              <p className="text-xs text-[#6C7470] leading-relaxed">
                Our ultimate mission is empowering total workforce and communities through entrepreneurship, warm service, and dependable food security.
              </p>
            </div>
          </div>

        </div>

        {/* Milestone Numbers Strip with Data Visualizations (Line Graph, Bar Distribution, Demographics, Radial Ring) */}
        <div className="rounded-3xl bg-white border border-[#252927]/10 p-6 sm:p-8 shadow-sm mb-20">
          
          {/* Header above stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 mb-6 border-b border-[#252927]/8">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#252927]">
              <BarChart3 className="w-4 h-4 text-[#EF777B]" />
              <span>Prince Retail Impact & Growth Metrics</span>
            </div>
            <span className="text-[11px] text-[#6C7470]">
              Empowering grassroots communities from 1990 to present
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            
            {/* 1. 1990: Growth Line / Trend Curve */}
            <div className="flex flex-col justify-between p-4 rounded-2xl bg-[#FFFDF8] border border-[#252927]/8 hover:border-[#EF777B]/40 transition-colors">
              <div>
                <span className="text-3xl sm:text-4xl font-black text-[#252927] tabular-nums tracking-tight block">
                  1990
                </span>
                <span className="text-xs sm:text-sm text-[#6C7470] font-medium mt-1 block">
                  Founded by Robert Lim Go
                </span>
              </div>

              {/* Visual: SVG Growth Curve Line Chart */}
              <div className="my-4 pt-2">
                <div className="h-14 w-full relative">
                  <svg viewBox="0 0 160 50" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EF777B" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#EF777B" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <path
                      d="M 5,42 Q 40,40 75,30 T 120,18 T 155,6 L 155,48 L 5,48 Z"
                      fill="url(#growthGradient)"
                    />
                    {/* Growth line */}
                    <path
                      d="M 5,42 Q 40,40 75,30 T 120,18 T 155,6"
                      fill="none"
                      stroke="#EF777B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Milestones markers */}
                    <circle cx="5" cy="42" r="3" fill="#252927" />
                    <circle cx="75" cy="30" r="3" fill="#F7DF8B" stroke="#252927" strokeWidth="1" />
                    <circle cx="155" cy="6" r="4" fill="#EF777B" className="animate-pulse" />
                  </svg>
                </div>
                
                {/* Micro indicators below line graph */}
                <div className="flex items-center justify-between text-[10px] text-[#6C7470] font-bold pt-1 border-t border-[#252927]/5">
                  <span>1990: 1 Register</span>
                  <span className="text-[#EF777B]">2026: 70+ Stores</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FBE3DF]/60 text-[10px] font-bold text-[#EF777B] self-start">
                <TrendingUp className="w-3 h-3" />
                <span>36 Years of Resilience</span>
              </div>
            </div>

            {/* 2. 85%+: Base of the Pyramid Demographics Bar & Pyramid */}
            <div className="flex flex-col justify-between p-4 rounded-2xl bg-[#FFFDF8] border border-[#252927]/8 hover:border-[#EF777B]/40 transition-colors">
              <div>
                <span className="text-3xl sm:text-4xl font-black text-[#252927] tabular-nums tracking-tight block">
                  85%+
                </span>
                <span className="text-xs sm:text-sm text-[#6C7470] font-medium mt-1 block">
                  Filipinos at Base of the Pyramid Served
                </span>
              </div>

              {/* Visual: Stacked Demographic Progress Bar */}
              <div className="my-4 space-y-2">
                {/* Horizontal Stacked Bar */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex p-0.5 border border-[#252927]/10">
                  <div 
                    className="h-full bg-gradient-to-r from-[#EF777B] via-[#F7DF8B] to-[#EF777B] rounded-full transition-all duration-700" 
                    style={{ width: '85%' }}
                    title="85% Base of Pyramid (C, D, E market)"
                  ></div>
                  <div 
                    className="h-full bg-slate-300/80 rounded-full ml-1" 
                    style={{ width: '15%' }}
                    title="15% Other segments"
                  ></div>
                </div>

                {/* Percentage Breakdown tags */}
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-[#EF777B] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF777B]"></span>
                    85% BOP Market
                  </span>
                  <span className="text-[#6C7470]">15% Mid/Upper</span>
                </div>

                {/* Visual Demographic Pyramid representation */}
                <div className="flex items-center gap-2 pt-1 text-[10px] text-[#252927]">
                  <div className="flex flex-col items-center gap-[2px] w-6">
                    <div className="w-2 h-1 bg-slate-300 rounded-xs"></div>
                    <div className="w-4 h-1.5 bg-slate-400 rounded-xs"></div>
                    <div className="w-6 h-2 bg-[#EF777B] rounded-xs animate-pulse"></div>
                  </div>
                  <span className="text-[10px] text-[#6C7470] leading-tight">
                    Dedicated focus on socioeconomic classes C, D & E
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFF0BF]/70 text-[10px] font-bold text-[#252927] self-start">
                <Users className="w-3 h-3 text-amber-700" />
                <span>Grassroots Primary Priority</span>
              </div>
            </div>

            {/* 3. 70+: Stores Across Luzon, Visayas & Mindanao (Tri-Island Bar Chart) */}
            <div className="flex flex-col justify-between p-4 rounded-2xl bg-[#FFFDF8] border border-[#252927]/8 hover:border-[#EF777B]/40 transition-colors">
              <div>
                <span className="text-3xl sm:text-4xl font-black text-[#252927] tabular-nums tracking-tight block">
                  70+
                </span>
                <span className="text-xs sm:text-sm text-[#6C7470] font-medium mt-1 block">
                  Stores Across Luzon, Visayas & Mindanao
                </span>
              </div>

              {/* Visual: Comparative Regional Store Breakdown Bars */}
              <div className="my-4 space-y-2">
                {/* Visayas Bar */}
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-0.5">
                    <span className="font-bold text-[#252927]">Visayas (Flagship)</span>
                    <span className="font-extrabold text-[#252927]">42 Stores (60%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#B8D9C4] rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                {/* Mindanao Bar */}
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-0.5">
                    <span className="font-bold text-[#252927]">Mindanao</span>
                    <span className="font-extrabold text-[#252927]">20 Stores (28%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F7DF8B] rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>

                {/* Luzon Bar */}
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-0.5">
                    <span className="font-bold text-[#252927]">Luzon</span>
                    <span className="font-extrabold text-[#252927]">10+ Stores (12%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#EF777B] rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#DCEEE2]/70 text-[10px] font-bold text-emerald-900 self-start">
                <Store className="w-3 h-3 text-emerald-700" />
                <span>Tri-Island Network Expansion</span>
              </div>
            </div>

            {/* 4. 100%: Dedicated: OTOP & Serving the Underserved (Radial Gauge Ring) */}
            <div className="flex flex-col justify-between p-4 rounded-2xl bg-[#FFFDF8] border border-[#252927]/8 hover:border-[#EF777B]/40 transition-colors">
              <div>
                <span className="text-3xl sm:text-4xl font-black text-[#252927] tabular-nums tracking-tight block">
                  100%
                </span>
                <span className="text-xs sm:text-sm text-[#6C7470] font-medium mt-1 block">
                  Dedicated: OTOP & Serving the Underserved
                </span>
              </div>

              {/* Visual: Circular Radial Gauge Ring */}
              <div className="my-4 flex items-center gap-3.5">
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#EF777B]"
                      strokeDasharray="100, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <CheckCircle2 className="w-4 h-4 text-[#EF777B]" />
                  </div>
                </div>

                <div className="text-[10px] space-y-1 text-[#6C7470]">
                  <div className="flex items-center gap-1 font-bold text-[#252927]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>100% OTOP Model</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF777B]"></span>
                    <span>Fair Suki Pricing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F7DF8B]"></span>
                    <span>Zero Underserved Left Behind</span>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#DCEEE2]/70 text-[10px] font-bold text-emerald-900 self-start">
                <Target className="w-3 h-3 text-emerald-700" />
                <span>Total Mission Alignment</span>
              </div>
            </div>

          </div>

        </div>

        {/* SECTION: VISION & MISSION CARDS */}
        <div className="mb-20">
          
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EF777B]">
              Guiding Principles
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#252927] mt-1">
              Vision & Mission of Prince Retail Group
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* VISION CARD */}
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#FFF0BF]/70 via-[#FFFDF8] to-[#FBE3DF]/50 border border-[#F7DF8B]/60 shadow-xs flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#252927]/10 text-xs font-extrabold text-[#252927]">
                    <Compass className="w-3.5 h-3.5 text-[#EF777B]" />
                    <span>VISION</span>
                  </div>
                  <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#252927] text-white">
                    OTOP
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-black text-[#252927] leading-tight mb-4">
                  ONE TOWN, ONE PRINCE
                </h4>

                <p className="text-xs sm:text-sm text-[#252927]/90 leading-relaxed mb-6 font-medium">
                  The Prince Retail Group of Companies’ vision is <strong>OTOP – ONE TOWN, ONE PRINCE</strong>.
                </p>

                <div className="p-5 rounded-2xl bg-white/90 border border-[#252927]/8 shadow-2xs mb-6 space-y-3 text-xs text-[#6C7470] leading-relaxed">
                  <p>
                    We serve the <strong>base of the pyramid of the Philippine market</strong>, which comprises of <strong>more than 85% of the population</strong>. These underserved communities are the Filipinos who need our products and services the most.
                  </p>
                  <p>
                    We offer to them the right and quality products at affordable prices in a convenient and comfortable shopping experience.
                  </p>
                  <p className="text-[#252927] font-semibold">
                    With our affordable prices and personalized customer service, it is our vision to make a significant and sustainable positive impact in the lives of every Filipino in every town in the country.
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-[#252927]/10 flex items-center justify-between text-xs font-bold text-[#252927]">
                <span>Serving &gt;85% of the Philippine Population</span>
                <span className="text-[#EF777B]">Sustainable Impact</span>
              </div>
            </div>

            {/* MISSION CARD */}
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#FBE3DF]/70 via-[#FFFDF8] to-[#DCEEE2]/50 border border-[#EF777B]/40 shadow-xs flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#252927]/10 text-xs font-extrabold text-[#252927]">
                    <Target className="w-3.5 h-3.5 text-[#EF777B]" />
                    <span>MISSION</span>
                  </div>
                  <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#EF777B] text-white">
                    Grassroots
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-black text-[#252927] leading-tight mb-4">
                  TO SERVE THE UNDERSERVED
                </h4>

                <p className="text-xs sm:text-sm text-[#252927]/90 leading-relaxed mb-6 font-medium">
                  The Prince Retail Group of Companies’ mission is <strong>TO SERVE THE UNDERSERVED</strong>.
                </p>

                {/* 3 Core Mission Commitments */}
                <div className="space-y-3.5 mb-6">
                  <div className="p-4 rounded-2xl bg-white/90 border border-[#252927]/8 shadow-2xs">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#EF777B] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        1
                      </div>
                      <p className="text-xs text-[#252927] leading-relaxed">
                        <strong>Value & Everyday Consumption:</strong> We exist to provide significant value to every Filipino we serve – through more affordable, acceptable and available products for their everyday consumption and use, with a distinct personalized service to delight every customer in town.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/90 border border-[#252927]/8 shadow-2xs">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#F7DF8B] text-[#252927] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        2
                      </div>
                      <p className="text-xs text-[#252927] leading-relaxed">
                        <strong>Entrepreneurship & Livelihood:</strong> We uplift the lives of the Filipino community through entrepreneurship and livelihood opportunities to improve their way of living.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/90 border border-[#252927]/8 shadow-2xs">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#B8D9C4] text-[#252927] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        3
                      </div>
                      <p className="text-xs text-[#252927] leading-relaxed">
                        <strong>Local Economic Impact:</strong> We impact the cities and towns we are in by boosting the local economies, enhancing the Filipino urban and rural life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-[#252927]/10 flex items-center justify-between text-xs font-bold text-[#252927]">
                <span>Affordable · Acceptable · Available</span>
                <span className="text-[#EF777B]">Empowering Livelihoods</span>
              </div>
            </div>

          </div>

        </div>

        {/* SECTION: CORE VALUES — OPTIC (World-Class Interactive Visual & Motion UI) */}
        <div className="mb-20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#6C7470] mb-2">
                <span className="text-[#EF777B]">The Moral Compass of Prince</span>
                <span aria-hidden="true">·</span>
                <span>Our Principles in Action</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#252927] tracking-tight">
                CORE VALUES · <span className="text-[#EF777B]">OPTIC</span>
              </h3>
              <p className="mt-2 text-sm text-[#6C7470] max-w-xl leading-relaxed">
                The five foundational pillars guiding every decision, interaction, and innovation across the Prince Retail Group of Companies.
              </p>
            </div>

            {/* Hint / Instructions */}
            <div className="text-xs font-semibold text-[#6C7470] flex items-center gap-1.5 self-start md:self-auto bg-white px-3.5 py-2 rounded-xl border border-[#252927]/10">
              <Sparkles className="w-3.5 h-3.5 text-[#F7DF8B]" />
              <span>Select any value below to explore</span>
            </div>
          </div>

          {/* 5-Letter OPTIC Interactive Selector Bar */}
          <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-8">
            {opticValues.map((optic, idx) => {
              const isSelected = activeOpticIndex === idx;
              const IconComponent = optic.icon;
              return (
                <button
                  key={optic.letter}
                  onClick={() => setActiveOpticIndex(idx)}
                  className={`p-3 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer group relative ${
                    isSelected
                      ? 'bg-[#252927] text-white border-[#252927] shadow-md scale-102 sm:scale-105'
                      : 'bg-white hover:bg-[#FFFDF8] text-[#252927] border-[#252927]/10 hover:border-[#EF777B]/50'
                  }`}
                >
                  {/* Giant Letter Badge */}
                  <div className="flex items-center justify-center mb-1 sm:mb-2">
                    <span 
                      className={`text-2xl sm:text-4xl font-black tracking-tight transition-transform duration-300 ${
                        isSelected ? 'scale-110 text-[#F7DF8B]' : 'text-[#252927] group-hover:scale-105'
                      }`}
                    >
                      {optic.letter}
                    </span>
                  </div>

                  <span className={`text-[10px] sm:text-xs font-extrabold uppercase tracking-wider truncate w-full ${
                    isSelected ? 'text-white' : 'text-[#6C7470]'
                  }`}>
                    {optic.word}
                  </span>

                  {/* Active Indicator Arrow */}
                  {isSelected && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#252927] rotate-45"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Expanded Showcase of the Active Value */}
          <div className="rounded-3xl p-8 sm:p-12 bg-white border border-[#252927]/10 shadow-sm relative overflow-hidden transition-all duration-500">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Letter Emblem & Core Philosophy */}
              <div className="lg:col-span-5 flex flex-col items-start">
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${opticValues[activeOpticIndex].bgClass} border ${opticValues[activeOpticIndex].borderClass} flex items-center justify-center shadow-xs`}>
                    {React.createElement(opticValues[activeOpticIndex].icon, {
                      className: 'w-7 h-7 text-[#252927]'
                    })}
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#EF777B]">
                      OPTIC Principle 0{activeOpticIndex + 1}
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-black text-[#252927] leading-tight">
                      {opticValues[activeOpticIndex].word}
                    </h4>
                  </div>
                </div>

                <div className="text-sm font-bold text-[#6C7470] mb-4">
                  {opticValues[activeOpticIndex].subtitle}
                </div>

                <p className="text-xs sm:text-sm text-[#252927]/85 leading-relaxed mb-6">
                  {opticValues[activeOpticIndex].description}
                </p>

                {/* Progress Indicators */}
                <div className="flex items-center gap-1.5 pt-2">
                  {opticValues.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveOpticIndex(i)}
                      aria-label={`Select ${opticValues[i].word}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeOpticIndex === i ? 'w-8 bg-[#EF777B]' : 'w-2 bg-[#252927]/15 hover:bg-[#252927]/30'
                      }`}
                    />
                  ))}
                </div>

              </div>

              {/* Right Column: Behavioral Standards & Living the Value */}
              <div className="lg:col-span-7 bg-[#FFFDF8] p-6 sm:p-8 rounded-2xl border border-[#252927]/8">
                
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#252927] mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#EF777B]" />
                  <span>How We Live This Value Everyday:</span>
                </h5>

                <div className="space-y-3 mb-6">
                  {opticValues[activeOpticIndex].behavioralPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#252927]/6">
                      <div className="w-5 h-5 rounded-full bg-[#DCEEE2] text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs font-medium text-[#252927] leading-relaxed">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#252927]/8 flex items-center justify-between text-xs">
                  <span className="text-[#6C7470] font-medium">Prince Retail Moral Commitment</span>
                  <button
                    onClick={() => setActiveOpticIndex((activeOpticIndex + 1) % opticValues.length)}
                    className="font-bold text-[#EF777B] hover:text-[#252927] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Next Value</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* SECTION: COMPANY HISTORY & COMPANY PROFILE TABS */}
        <div className="bg-white rounded-3xl border border-[#252927]/10 p-6 sm:p-10 shadow-xs">
          
          {/* Tab Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#252927]/8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#6C7470] mb-1">
                <span>Company Background</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#EF777B]">Authentic Corporate Chronicle</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#252927]">
                History & Corporate Profile
              </h3>
            </div>

            <div className="flex items-center gap-2 p-1.5 bg-[#FFFDF8] rounded-2xl border border-[#252927]/10 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'history'
                    ? 'bg-[#252927] text-white shadow-xs'
                    : 'text-[#6C7470] hover:text-[#252927]'
                }`}
              >
                <History className="w-4 h-4" />
                <span>History (1990 – Present)</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-[#252927] text-white shadow-xs'
                    : 'text-[#6C7470] hover:text-[#252927]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Company Profile</span>
              </button>
            </div>
          </div>

          {/* TAB 1: HISTORY */}
          {activeTab === 'history' && (
            <div className="pt-8 animate-fadeIn">
              
              <div className="max-w-3xl mb-8">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#EF777B] bg-[#FBE3DF] px-3 py-1 rounded-md inline-block mb-3">
                  Company Chronicle
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-[#252927] leading-snug">
                  The Genesis of Prince Retail Group: From Single Register to Nationwide Hypermarts
                </h4>
                <p className="text-xs sm:text-sm text-[#6C7470] leading-relaxed mt-2">
                  Founded in 1990 by visionary entrepreneur <strong>Robert Lim Go</strong>, Prince Retail Group was formerly known as <strong>Prince Warehouse Club, Inc.</strong>, establishing roots as a chain of retail and wholesale stores headquartered in Cebu City, Philippines.
                </p>
              </div>

              {/* Chronological Timeline */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-6 before:w-0.5 before:bg-[#252927]/10 pl-10 sm:pl-16">
                {historyMilestones.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-10 sm:-left-16 top-1 w-8 h-8 rounded-full bg-white border-2 border-[#EF777B] flex items-center justify-center text-[10px] font-extrabold text-[#252927] shadow-xs group-hover:bg-[#EF777B] group-hover:text-white transition-colors">
                      {idx + 1}
                    </div>

                    <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF8] border border-[#252927]/8 hover:border-[#EF777B]/40 transition-colors">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-[#FFF0BF] text-[#252927] tracking-wider uppercase">
                          {item.year}
                        </span>
                        <h5 className="text-base font-extrabold text-[#252927]">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-xs sm:text-sm text-[#6C7470] leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* History Summary Footer Note */}
              <div className="mt-8 p-5 rounded-2xl bg-[#FBE3DF]/40 border border-[#EF777B]/30 text-xs text-[#252927] leading-relaxed">
                <strong>Continuous Innovation:</strong> In the following years, numerous programs to uplift customer livelihood were established. Prince continuously expanded into comprehensive product lines including home furniture, appliances, school and office supplies, garments, and footwear, completing a diverse catalog tailored to Filipino homes.
              </div>

            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <div className="pt-8 animate-fadeIn">
              
              <div className="max-w-3xl mb-8">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#252927] bg-[#FFF0BF] px-3 py-1 rounded-md inline-block mb-3">
                  Enterprise Overview
                </span>
                <h4 className="text-xl sm:text-2xl font-extrabold text-[#252927] leading-snug">
                  PRINCE HYPERMART: Modern Corporation Driven by Purpose & Second-Generation Leadership
                </h4>
                <p className="text-xs sm:text-sm text-[#6C7470] leading-relaxed mt-2">
                  To date, Prince has rebranded to become <strong>PRINCE HYPERMART</strong>—celebrated as a one-stop shop for affordable Grocery/Supermarket, General Merchandise, and Department Store items with vital added services for local communities.
                </p>
              </div>

              {/* 4 Profile Core Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {profileHighlights.map((profile, i) => {
                  const IconComp = profile.icon;
                  return (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-[#FFFDF8] border border-[#252927]/8 hover:border-[#EF777B]/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-10 h-10 rounded-xl ${profile.bgColor} flex items-center justify-center text-[#252927]`}>
                            <IconComp className="w-5 h-5 text-[#252927]" />
                          </div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-[#252927]/10 text-[#6C7470]">
                            {profile.badge}
                          </span>
                        </div>

                        <h5 className="text-base font-extrabold text-[#252927] mb-2">
                          {profile.title}
                        </h5>

                        <p className="text-xs sm:text-sm text-[#6C7470] leading-relaxed">
                          {profile.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mission Statement Callout */}
              <div className="p-8 rounded-3xl bg-[#252927] text-white relative overflow-hidden">
                <div className="max-w-2xl relative z-10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F7DF8B] mb-2">
                    <Sparkles className="w-4 h-4 text-[#F7DF8B]" />
                    <span>Serving the Underserved</span>
                  </div>
                  <h5 className="text-xl sm:text-2xl font-black leading-tight mb-3">
                    Reaching Every Filipino in Every Town
                  </h5>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
                    "As one of the fastest growing retailers in the country, Prince Hypermart continues to widen their reach to every Filipino in every town to achieve their ultimate mission of serving the underserved. Through total workforce empowerment and commitment to personalized customer care, Prince remains a trusted household name for quality, affordable merchandise."
                  </p>
                  <div className="text-[11px] font-extrabold tracking-wider uppercase text-[#B8D9C4]">
                    Prince Retail Group of Companies · Sabay sa Buhay
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  Gift, 
  Clock, 
  Store, 
  CheckCircle2, 
  Coins, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ChevronRight,
  TrendingUp,
  Percent,
  Tv,
  Sofa,
  Award,
  Layers,
  Building,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

export const ProgramsSection: React.FC = () => {
  // Tab menu state matching the uploaded screenshot: 'GC REBATE' | 'PO CASH BOND' | 'LAYAWAY PLAN' | 'PAPUNO PUHONAN'
  const [selectedProgram, setSelectedProgram] = useState<'gc-rebate' | 'po-cash-bond' | 'layaway-plan' | 'papuno-puhonan'>('gc-rebate');

  // GC Calculator State
  const [gcAmountInput, setGcAmountInput] = useState<number>(50000);
  
  // PO Guarantor Simulator State
  const [cashBondInput, setCashBondInput] = useState<number>(30000);
  const [poCardsSold, setPoCardsSold] = useState<number>(60); // 60 cards * ₱500 = ₱30,000 face value

  // Layaway Calculator State
  const [layawayPriceInput, setLayawayPriceInput] = useState<number>(15000);

  // Papuno Puhonan Checklist State
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    'req-cedula': true,
    'req-id': true
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper calculations for GC Rebate
  const calculateGcRebate = (amount: number) => {
    if (amount < 20000) {
      return { rate: '0%', value: 0, perk: 'Below minimum ₱20,000 threshold' };
    }
    if (amount < 40000) {
      return { rate: '0.5%', value: 100, perk: '₱100 worth of Prince GC' };
    }
    if (amount < 50000) {
      return { rate: '0.5%', value: 200, perk: '₱200 worth of Prince GC' };
    }
    if (amount < 500000) {
      const val = Math.floor(amount * 0.01);
      return { rate: '1.0%', value: val, perk: `₱${val.toLocaleString()} worth of Prince GC (1% per ₱10K increment)` };
    }
    if (amount < 1000000) {
      const val = Math.floor(amount * 0.01);
      return { 
        rate: '1.0%', 
        value: val, 
        perk: `Choice of: (a) ₱${val.toLocaleString()} GC Rebate (1%) OR (b) Featured Appliance/Furniture from monthly matrix` 
      };
    }
    // 1,000,000 and above
    const val = Math.floor(amount * 0.015);
    return { 
      rate: '1.5%', 
      value: val, 
      perk: `Choice of: (a) ₱${val.toLocaleString()} GC Rebate (1.5%) OR (b) Featured Appliance/Furniture from monthly matrix` 
    };
  };

  const gcResult = calculateGcRebate(gcAmountInput);

  // Helper calculations for PO Cash Bond
  const calculatePoEarnings = (bond: number, cards: number) => {
    const cardCommission = cards * 25; // ₱25 per ₱500 card (5%)
    let dividendRate = 0.03;
    let dividendLabel = '3% Dividend Bracket';
    if (bond >= 100000) {
      dividendRate = 0.06;
      dividendLabel = '6% Dividend Bracket (Highest Bracket)';
    } else if (bond >= 30500) {
      dividendRate = 0.04;
      dividendLabel = '4% Dividend Bracket';
    }
    const annualDividend = Math.floor(bond * dividendRate);
    const quotaTarget = bond * 3;
    const currentSales = cards * 500;
    const quotaProgress = Math.min(100, Math.round((currentSales / quotaTarget) * 100));

    return { cardCommission, dividendRate, dividendLabel, annualDividend, quotaTarget, currentSales, quotaProgress };
  };

  const poResult = calculatePoEarnings(cashBondInput, poCardsSold);

  // Helper calculation for Layaway Plan
  const layawayDownpayment = Math.round(layawayPriceInput * 0.10);
  const layawayBalance = layawayPriceInput - layawayDownpayment;
  const layawayBiWeekly = Math.round(layawayBalance / 4); // 4 bi-weekly payments in 60 days

  // Menu tab items matching the screenshot visual design
  const menuTabs = [
    { id: 'gc-rebate', label: 'GC REBATE' },
    { id: 'po-cash-bond', label: 'PO CASH BOND' },
    { id: 'layaway-plan', label: 'LAYAWAY PLAN' },
    { id: 'papuno-puhonan', label: 'PAPUNO PUHONAN' }
  ];

  return (
    <section id="programs" className="pt-8 pb-14 lg:pt-10 lg:pb-16 bg-[#FCFBF7] border-b border-[#1B221E]/5 relative scroll-mt-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#55635C] mb-2.5">
            <span className="text-[#E22C28]">Empowering Filipino Families & Entrepreneurs</span>
            <span aria-hidden="true">·</span>
            <span>Prince Retail Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1B221E]">
            Customer & Enterprise Programs
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#55635C] leading-relaxed">
            Select a program below to explore official guidelines, eligibility, and interactive simulators without excessive scrolling.
          </p>
        </div>

        {/* SEGMENTED TAB MENU (Matching user's attached design) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center p-1.5 sm:p-2 bg-white rounded-full border border-[#1B221E]/12 shadow-xs max-w-full overflow-x-auto no-scrollbar">
            {menuTabs.map((tab) => {
              const isActive = selectedProgram === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedProgram(tab.id as any)}
                  className={`px-4 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm tracking-wide font-extrabold uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1B221E] text-white shadow-xs'
                      : 'text-[#55635C] hover:text-[#1B221E]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: GC REBATE */}
        {selectedProgram === 'gc-rebate' && (
          <div className="bg-white rounded-3xl border border-[#1B221E]/10 p-6 sm:p-10 shadow-sm animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Details & Official Terms */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-[#FEE2E2] text-[#E22C28]">
                      Bulk Rebate Program
                    </span>
                    <span className="text-xs text-[#55635C] font-semibold">Available Nationwide</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1B221E]">
                    GC REBATE
                  </h3>
                  <p className="text-sm font-bold text-[#E22C28] mt-1">
                    A rebate is given to customers who purchase Gift Certificates in bulk.
                  </p>
                </div>

                {/* Terms and Conditions Box */}
                <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#1B221E]/8 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1B221E] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E22C28]" />
                    <span>Terms and Conditions</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#55635C] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#E22C28] font-bold">•</span>
                      <span>A rebate in the form of Gift Certificate (GC) will be given to Customers purchasing <strong>at least Php 20,000 worth of GCs through cash or check payment only</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E22C28] font-bold">•</span>
                      <span>Any check payment with an amount <strong>greater than P50,000 is subject for management’s approval</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#E22C28] font-bold">•</span>
                      <span>All GC purchases paid through <strong>Credit/Debit card must reach a minimum amount of P3,000</strong>, and are <strong>not allowed to purchase GC denominations of P100</strong>. Rebates and other promotions will not be applicable.</span>
                    </li>
                  </ul>
                </div>

                {/* Rebates Mechanics Matrix */}
                <div className="p-5 rounded-2xl bg-white border border-[#1B221E]/10">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1B221E] mb-3">
                    Rebates Mechanics
                  </h4>
                  <div className="divide-y divide-[#1B221E]/8 text-xs">
                    <div className="py-2.5 flex justify-between items-center">
                      <span className="font-bold text-[#1B221E]">Php 20,000</span>
                      <span className="text-[#55635C]">0.5% rebate or <strong>Php 100 worth of GC</strong></span>
                    </div>
                    <div className="py-2.5 flex justify-between items-center">
                      <span className="font-bold text-[#1B221E]">Php 40,000</span>
                      <span className="text-[#55635C]">0.5% rebate or <strong>Php 200 worth of GC</strong></span>
                    </div>
                    <div className="py-2.5 flex justify-between items-center">
                      <span className="font-bold text-[#1B221E]">Php 50,000 to Php 490,000</span>
                      <span className="text-[#55635C]"><strong>1% rebate</strong> (every increment of Php 10,000)</span>
                    </div>
                    <div className="py-2.5 flex justify-between items-start gap-4">
                      <span className="font-bold text-[#1B221E] shrink-0">Php 500,000 to Php 990,000</span>
                      <span className="text-[#55635C] text-right">Choice of: <strong>(a) 1% GC rebate</strong> (every increment of Php 10,000) or <strong>(b) featured appliance or furniture</strong> (refer to store matrix)</span>
                    </div>
                    <div className="py-2.5 flex justify-between items-start gap-4">
                      <span className="font-bold text-[#1B221E] shrink-0">Php 1,000,000 and above</span>
                      <span className="text-[#55635C] text-right">Choice of: <strong>(a) 1.5% GC rebate</strong> (every increment of Php 10,000) or <strong>(b) featured appliance or furniture</strong> (refer to store matrix)</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive GC Calculator */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FCFBF7] border border-[#E22C28]/30 shadow-2xs">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#E22C28]">
                  <Gift className="w-4 h-4" />
                  <span>Interactive Calculator</span>
                </div>
                <h4 className="text-lg font-black text-[#1B221E] mb-1">
                  Simulate Your GC Rebate
                </h4>
                <p className="text-xs text-[#55635C] mb-4">
                  Adjust the purchase volume to calculate your exact rebate rate and perks.
                </p>

                <div className="mb-5">
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-[#55635C]">GC Purchase Amount:</span>
                    <span className="text-[#1B221E] text-base font-black tabular-nums">₱{gcAmountInput.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="1500000"
                    step="10000"
                    value={gcAmountInput}
                    onChange={(e) => setGcAmountInput(Number(e.target.value))}
                    className="w-full accent-[#E22C28] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#55635C] mt-1 font-mono">
                    <span>₱20,000</span>
                    <span>₱500,000</span>
                    <span>₱1,500,000+</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#1B221E]/10 space-y-2.5 text-xs mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[#55635C]">Rebate Percentage:</span>
                    <span className="font-extrabold text-sm text-[#1B221E]">{gcResult.rate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#55635C]">Calculated GC Rebate:</span>
                    <span className="font-black text-lg text-[#E22C28] tabular-nums">₱{gcResult.value.toLocaleString()} GC</span>
                  </div>
                  <div className="pt-2 border-t border-[#1B221E]/8 text-[11px] text-[#1B221E] font-semibold leading-relaxed">
                    {gcResult.perk}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FEE2E2]/50 border border-[#E22C28]/20 text-[11px] text-[#1B221E] leading-relaxed">
                  💡 <strong>How to Avail:</strong> Visit the Customer Service Counter or Treasury Office of your nearest Prince branch with your cash or approved check payment.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: PO CASH BOND */}
        {selectedProgram === 'po-cash-bond' && (
          <div className="bg-white rounded-3xl border border-[#1B221E]/10 p-6 sm:p-10 shadow-sm animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Overview, Requirements, Dividends */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-[#FEF9C3] text-[#1B221E]">
                      Guarantor Livelihood Program
                    </span>
                    <span className="text-xs text-[#55635C] font-semibold">Earn Higher Than Bank Interest</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1B221E]">
                    PO CASH BOND
                  </h3>
                  <p className="text-xs sm:text-sm text-[#55635C] mt-1 leading-relaxed">
                    Be a PO Guarantor and start your business with as low as <strong>P3,000</strong> and earn interest on your money that are much higher than the bank interest rates today! With every Prince PO Card worth <strong>P500 face value sold</strong>, you earn <strong>P25 (5%) commission</strong> right away.
                  </p>
                </div>

                {/* Requirements for PO Guarantors */}
                <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#1B221E]/10">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1B221E] mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#E22C28]" />
                    <span>Requirements for P.O. Guarantors</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#1B221E]">
                    <div className="p-2.5 rounded-xl bg-white border border-[#1B221E]/6 font-semibold flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>P 3,000.00 – Minimum Cash Bond</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#1B221E]/6 font-semibold flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>2 valid Government-issued ID</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#1B221E]/6 font-semibold flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Barangay Clearance</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#1B221E]/6 font-semibold flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>2pcs 1×1 picture</span>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions Accordion/Details */}
                <div className="p-5 rounded-2xl bg-white border border-[#1B221E]/10 space-y-3 text-xs leading-relaxed">
                  <h4 className="font-extrabold text-[#1B221E] text-xs uppercase tracking-wider">
                    Terms and Conditions for PO Guarantors
                  </h4>
                  <ul className="space-y-1.5 text-[#55635C]">
                    <li>• <strong>Minimum Cash Bond:</strong> Php 3,000.00</li>
                    <li>• <strong>Commission:</strong> 5% for every PO Card consumed (P25 per P500 card)</li>
                    <li>• <strong>Sales Quota:</strong> 300% of cash bond amount to earn the highest interest bracket at the end of the year.</li>
                  </ul>

                  {/* Dividend Brackets */}
                  <div className="p-3.5 rounded-xl bg-[#FCFBF7] border border-[#1B221E]/8 space-y-1.5 font-semibold">
                    <div className="text-[11px] font-extrabold text-[#1B221E] uppercase">Interest on Dividends:</div>
                    <div className="flex justify-between">
                      <span className="text-[#55635C]">P 3,000 – P30,000 cash bond:</span>
                      <span className="text-[#1B221E] font-bold">3% interest income</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#55635C]">P 30,500 – P100,000 cash bond:</span>
                      <span className="text-[#1B221E] font-bold">4% interest income</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#55635C]">P 100,000 and above cash bond:</span>
                      <span className="text-emerald-700 font-black">6% interest income</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#55635C]">
                    <strong>Penalty:</strong> 5% surcharge for late payments based on the unpaid amount due. Guarantors are given <strong>7 days to pay their dues without penalty</strong> starting from the date of the Statement of Account (SOA). If paid on the 8th day onwards, penalty will be computed to start on the 1st day. Advance payments are highly encouraged to claim more PO Cards!
                  </p>
                </div>

                {/* PO Cards & Cash Bond Policies */}
                <div className="p-4 rounded-2xl bg-[#FCFBF7] border border-[#1B221E]/8 text-xs text-[#55635C] space-y-2">
                  <div className="font-bold text-[#1B221E]">PO Cards & Cash Bond Specifics:</div>
                  <p>• <strong>PO Cards:</strong> Card fee of Php3.00 per card. Check or Credit Card payment is not accepted for purchase of PO Cards. Conversion of unused, torn or lost PO Cards to cash is not allowed. Upon redemption, there is a <strong>10% add-on only for Grocery items</strong>. <strong>NO Add-on</strong> for General Merchandise and Department Store items.</p>
                  <p>• <strong>Cash Bond Maintenance:</strong> Payment of cash bond should be in increments of Php 500.00. Check or credit card payment is not allowed. Partial withdrawal of cash bond is not allowed (must never fall below Php 3,000.00). Transfer to another guarantor is not allowed.</p>
                  <p>• <strong>Refund Lead Time:</strong> Refund of cash bond will only be released 2 months after the date the letter of withdrawal was received by Accounting.</p>
                </div>

              </div>

              {/* Right Column: Interactive Guarantor Simulator */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FCFBF7] border border-[#1B221E]/12 shadow-2xs">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#1B221E]">
                  <Coins className="w-4 h-4 text-[#F0E901]" />
                  <span>Guarantor Simulator</span>
                </div>
                <h4 className="text-lg font-black text-[#1B221E] mb-1">
                  Estimate Your Earnings
                </h4>
                <p className="text-xs text-[#55635C] mb-4">
                  See your instant 5% commission and annual dividend potential.
                </p>

                <div className="space-y-4 mb-5">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#55635C]">Cash Bond Amount:</span>
                      <span className="text-[#1B221E] font-black tabular-nums">₱{cashBondInput.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min="3000"
                      max="150000"
                      step="2500"
                      value={cashBondInput}
                      onChange={(e) => setCashBondInput(Number(e.target.value))}
                      className="w-full accent-[#1B221E] cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#55635C]">PO Cards Sold (₱500 face value):</span>
                      <span className="text-[#1B221E] font-black tabular-nums">{poCardsSold} Cards (₱{(poCardsSold * 500).toLocaleString()})</span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="300"
                      step="6"
                      value={poCardsSold}
                      onChange={(e) => setPoCardsSold(Number(e.target.value))}
                      className="w-full accent-[#1B221E] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#1B221E]/10 space-y-2.5 text-xs mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[#55635C]">Instant 5% Commission:</span>
                    <span className="font-black text-emerald-700 text-base tabular-nums">₱{poResult.cardCommission.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#55635C]">Annual Dividend Tier:</span>
                    <span className="font-bold text-[#1B221E]">{poResult.dividendLabel}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#55635C]">Estimated Annual Dividend:</span>
                    <span className="font-black text-sm text-[#1B221E] tabular-nums">₱{poResult.annualDividend.toLocaleString()} / yr</span>
                  </div>
                  <div className="pt-2 border-t border-[#1B221E]/8">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#55635C]">300% Sales Quota Progress:</span>
                      <span className="font-bold text-[#1B221E]">{poResult.quotaProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1B221E]/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${poResult.quotaProgress}%` }}></div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FEF9C3]/50 border border-[#F0E901] text-[11px] text-[#1B221E] leading-relaxed">
                  📢 <strong>Get Started:</strong> Bring your 2 valid IDs, Barangay Clearance, and 2 pcs 1×1 photo to any Prince Customer Service counter to register as a PO Guarantor today.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: LAYAWAY PLAN */}
        {selectedProgram === 'layaway-plan' && (
          <div className="bg-white rounded-3xl border border-[#1B221E]/10 p-6 sm:p-10 shadow-sm animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Layaway Inclusions & Rules */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-[#E8F5EC] text-[#1B221E]">
                      Appliances & Furniture Installment
                    </span>
                    <span className="text-xs text-[#55635C] font-semibold">10% Down Payment · 60 Days</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1B221E]">
                    LAYAWAY PLAN
                  </h3>
                  <p className="text-xs sm:text-sm text-[#55635C] mt-1 leading-relaxed">
                    Easy installment reservation plan allowing customers to secure home appliances and quality furniture without interest, with fixed locked-in prices at the time of reservation.
                  </p>
                </div>

                {/* Application & Inclusions Box */}
                <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#1B221E]/8 space-y-2.5 text-xs text-[#55635C] leading-relaxed">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1B221E] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Application and Inclusions of the Layaway Plan</span>
                  </h4>
                  <ul className="space-y-1.5 list-disc pl-5">
                    <li>Layaway plan is open to customers, <strong>ages 18 years old and above</strong>.</li>
                    <li><strong>Minimum amount:</strong> Php3,000.00 per item.</li>
                    <li><strong>Down payment is ten percent (10%)</strong> to be paid in cash upon reservation.</li>
                    <li>Item chosen is not subject to change. However, if item is found defective upon claiming of item, the customer may change the item or request for refund (lead time: 2 weeks).</li>
                    <li>In the event customer decides to discontinue, a <strong>cancellation fee of 10% of total amount deposited</strong> shall be charged and remaining amount refunded.</li>
                    <li>The chosen item will be held in custody of Prince until it is fully paid.</li>
                    <li><strong>Term of payment:</strong> 60 days from the date of down payment. Customers have the option to pay any day of the week as long as it is within the 60 day period given.</li>
                    <li><strong>Grace period:</strong> 30 days grace period after the 60 day period with a <strong>surcharge of 5% from total remaining amount due</strong>. If unpaid after 30 days, item will automatically be forfeited in favor of Prince (previous payments non-refundable).</li>
                    <li><strong>Claiming:</strong> Customer is given <strong>three (3) days to claim the item once fully paid</strong>. Failure to do so authorizes Prince to charge <strong>Php200 per day as storage fee</strong> until 15 days from full payment, after which item is forfeited. Bring valid ID (or authorization letter for representatives).</li>
                  </ul>
                </div>

                {/* Availment Box */}
                <div className="p-5 rounded-2xl bg-white border border-[#1B221E]/10 space-y-2 text-xs text-[#55635C]">
                  <h4 className="font-extrabold text-[#1B221E] text-xs uppercase tracking-wider">
                    Availment of Layaway Plan
                  </h4>
                  <p>• <strong>Eligible Items:</strong> <strong>Appliances and furniture are the only items eligible for layaway</strong>. But if the last item is reserved for layaway, this shall not be sold to customers.</p>
                  <p>• <strong>Store Guarantee:</strong> If item has been accidentally sold, store shall refund all deposits made or offer exchange of item.</p>
                  <p>• <strong>Price Protection:</strong> Price of layaway item should <strong>follow the price at the time of layaway application</strong> despite new promotions at the time of full payment.</p>
                </div>

              </div>

              {/* Right Column: Interactive Layaway Calculator */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FCFBF7] border border-emerald-700/20 shadow-2xs">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-800">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Layaway 60-Day Calculator</span>
                </div>
                <h4 className="text-lg font-black text-[#1B221E] mb-1">
                  Plan Your Installment
                </h4>
                <p className="text-xs text-[#55635C] mb-4">
                  Select your desired appliance or furniture price to view the 10% cash down payment and bi-weekly payment schedule.
                </p>

                <div className="mb-5">
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-[#55635C]">Appliance / Furniture Price:</span>
                    <span className="text-[#1B221E] text-base font-black tabular-nums">₱{layawayPriceInput.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="60000"
                    step="1000"
                    value={layawayPriceInput}
                    onChange={(e) => setLayawayPriceInput(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#55635C] mt-1 font-mono">
                    <span>₱3,000 (Min)</span>
                    <span>₱30,000</span>
                    <span>₱60,000</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#1B221E]/10 space-y-2.5 text-xs mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[#55635C]">10% Cash Down Payment:</span>
                    <span className="font-extrabold text-base text-[#E22C28] tabular-nums">₱{layawayDownpayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#55635C]">Remaining Balance:</span>
                    <span className="font-bold text-[#1B221E] tabular-nums">₱{layawayBalance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#1B221E]/8">
                    <span className="text-[#55635C]">Bi-Weekly Payment (4 payments in 60d):</span>
                    <span className="font-black text-emerald-700 text-sm tabular-nums">₱{layawayBiWeekly.toLocaleString()} / 2 wks</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#E8F5EC]/60 border border-[#036936] text-[11px] text-[#1B221E] leading-relaxed">
                  🔒 <strong>Price Locked:</strong> Your price is locked upon depositing 10% down payment. Enjoy zero price escalation during your 60-day layaway period.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: PAPUNO PUHONAN */}
        {selectedProgram === 'papuno-puhonan' && (
          <div className="bg-white rounded-3xl border border-[#1B221E]/10 p-6 sm:p-10 shadow-sm animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Overview & How It Works */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-[#FEE2E2] text-[#E22C28]">
                      Micro-Financing Partnership
                    </span>
                    <span className="text-xs text-[#55635C] font-semibold">In Partnership with R&J7 Credit Corp.</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1B221E]">
                    PAPUNO PUHONAN
                  </h3>
                  <p className="text-xs sm:text-sm text-[#55635C] mt-1 leading-relaxed">
                    <strong>R&J7 Credit Corp.</strong> is the micro-financing partner of Prince Retail Group to support sari-sari store owners who have limited capital to grow their business.
                  </p>
                </div>

                {/* Value Proposition */}
                <div className="p-5 rounded-2xl bg-[#FCFBF7] border border-[#1B221E]/8 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1B221E] flex items-center gap-2">
                    <Store className="w-4 h-4 text-[#E22C28]" />
                    <span>How Papuno Puhonan Works</span>
                  </h4>
                  <p className="text-xs text-[#1B221E] leading-relaxed">
                    With a <strong>minimum of P3,000 grocery loan without collateral</strong>, micro-entrepreneurs can increase their merchandise inventory to sell in their sari-sari stores for higher revenue and profit.
                  </p>
                  <p className="text-xs text-[#1B221E] leading-relaxed font-semibold">
                    If the borrower shows good payment habits, they can be recommended to borrow higher amounts of loan to even further increase their basket size!
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-[#1B221E]/10 text-xs text-[#55635C]">
                    📍 <strong>Where to Inquire:</strong> Please approach the nearest Prince Retail stores’ customer service counter to inquire and apply.
                  </div>
                </div>

                {/* Important Sari-Sari Tips */}
                <div className="p-4 rounded-2xl bg-[#FEE2E2]/40 border border-[#E22C28]/20 text-xs text-[#1B221E] space-y-1">
                  <span className="font-extrabold">Tips for Fast Approval:</span>
                  <p className="text-[#55635C]">Prepare clear photocopies of your valid IDs and accurate landmark sketch of your store location to expedite verification by the R&J7 credit officer.</p>
                </div>

              </div>

              {/* Right Column: Interactive Documentary Requirements Checklist */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#FCFBF7] border border-[#1B221E]/12 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-[#E22C28] flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>Application Checklist</span>
                  </div>
                  <span className="text-[10px] text-[#55635C]">Click to check off</span>
                </div>
                <h4 className="text-lg font-black text-[#1B221E] mb-1">
                  Required Documents
                </h4>
                <p className="text-xs text-[#55635C] mb-4">
                  Make sure you have all required documents ready before proceeding to the counter:
                </p>

                <div className="space-y-2 mb-5">
                  {[
                    { id: 'req-cedula', label: 'Cedula (Community Tax Certificate)' },
                    { id: 'req-brgy', label: 'Barangay Clearance' },
                    { id: 'req-billing', label: 'Proof of Billing (electric bill, water bill, telephone bill, etc.)' },
                    { id: 'req-pic', label: '2×2 picture (2 pcs)' },
                    { id: 'req-id', label: 'Photocopy of at least 1 valid ID' },
                    { id: 'req-sketch', label: 'Sketch of Residence / Store' }
                  ].map((req) => (
                    <div
                      key={req.id}
                      onClick={() => toggleCheck(req.id)}
                      className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        checkedItems[req.id]
                          ? 'bg-[#E8F5EC] border-[#036936] text-[#1B221E]'
                          : 'bg-white border-[#1B221E]/10 hover:border-[#E22C28]/40'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        checkedItems[req.id] ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-[#1B221E]/30 bg-white'
                      }`}>
                        {checkedItems[req.id] && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-semibold">{req.label}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#1B221E]/10 text-center">
                  <span className="text-xs font-bold text-[#1B221E]">
                    {Object.values(checkedItems).filter(Boolean).length} of 6 Requirements Prepared
                  </span>
                  <div className="w-full h-1.5 bg-[#1B221E]/10 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 transition-all duration-300"
                      style={{ width: `${(Object.values(checkedItems).filter(Boolean).length / 6) * 100}%` }}
                    ></div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

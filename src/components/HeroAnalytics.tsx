import React from 'react';

const sources = [
  { name: 'Direct', value: 38, color: '#EF777B' },
  { name: 'Search', value: 27, color: '#F7DF8B' },
  { name: 'Social', value: 21, color: '#B8D9C4' },
  { name: 'Referral', value: 14, color: '#252927' }
];

const circumference = 251.2;
const counterEmbed = `<!doctype html><html><body style="margin:0;font:12px Arial,sans-serif;color:#6C7470;white-space:nowrap"><a href="https://www.versicherungen.at/studenten-versicherung/" target="_blank" rel="noopener">Auslandssemester Krankenversicherung</a><script type="text/javascript" src="https://www.freevisitorcounters.com/auth.php?id=f5e71b7484f1346c5b87ca63e12b23512cef66e0"><\/script><script type="text/javascript" src="https://www.freevisitorcounters.com/en/home/counter/1694972/t/6"><\/script></body></html>`;

export const HeroAnalytics: React.FC = () => (
  <section aria-label="Website traffic overview" className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-[0.95fr_1.25fr] mb-7">
    <div className="min-w-0 rounded-2xl border border-[#252927]/8 bg-white/85 p-3 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-[11px] font-bold text-[#252927]">Traffic sources</h2>
        <span className="text-[9px] font-semibold uppercase tracking-wide text-[#6C7470]">Sample</span>
      </div>
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 100 100" className="h-[76px] w-[76px] shrink-0 -rotate-90" role="img" aria-label="Illustrative traffic sources: direct 38%, search 27%, social 21%, referral 14%">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#252927" strokeOpacity=".06" strokeWidth="13" />
          {sources.map((source, index) => {
            const length = source.value / 100 * circumference;
            const offset = sources.slice(0, index).reduce((sum, item) => sum + item.value / 100 * circumference, 0);
            return <circle key={source.name} className="traffic-segment" style={{ '--segment-length': `${length} ${circumference}`, '--segment-offset': -offset, animationDelay: `${index * 450}ms` } as React.CSSProperties} cx="50" cy="50" r="40" fill="none" stroke={source.color} strokeWidth="13" strokeDasharray={`${length} ${circumference}`} strokeDashoffset={-offset} strokeLinecap="butt" />;
          })}
        </svg>
        <ul className="min-w-0 flex-1 space-y-1" aria-label="Traffic source legend">
          {sources.map((source, index) => (
            <li key={source.name} className="traffic-legend-row flex items-center justify-between gap-2 text-[10px] text-[#6C7470]" style={{ animationDelay: `${index * 450 + 400}ms` }}>
              <span className="flex min-w-0 items-center gap-1.5"><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: source.color }} /><span className="truncate">{source.name}</span></span>
              <span className="font-semibold tabular-nums text-[#252927]">{source.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="min-w-0 rounded-2xl border border-[#252927]/8 bg-white/85 p-3 shadow-sm">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-[11px] font-bold text-[#252927]">Visitors</h2>
        <span className="text-[9px] font-semibold uppercase tracking-wide text-[#6C7470]">Illustrative · 7 days</span>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div className="shrink-0 pb-1">
          <div className="text-xl font-extrabold leading-none tracking-tight text-[#252927]">1,284</div>
          <div className="mt-1 text-[9px] text-[#6C7470]">sample visits</div>
        </div>
        <svg viewBox="0 0 200 66" preserveAspectRatio="none" className="h-[66px] min-w-0 flex-1 overflow-visible" role="img" aria-label="Illustrative visitor trend over seven days, rising overall">
          <defs><linearGradient id="visitor-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#EF777B" stopOpacity=".26" /><stop offset="100%" stopColor="#EF777B" stopOpacity="0" /></linearGradient></defs>
          <path className="visitor-area" d="M0 55 L0 46 L32 40 L64 44 L96 27 L128 33 L160 15 L198 8 L198 55 Z" fill="url(#visitor-area)" />
          <path className="visitor-line" d="M0 46 L32 40 L64 44 L96 27 L128 33 L160 15 L198 8" fill="none" stroke="#EF777B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" />
          <circle className="visitor-dot" cx="198" cy="8" r="3.5" fill="#EF777B" />
        </svg>
      </div>
      <div className="mt-1 flex h-5 items-center gap-2 overflow-hidden border-t border-[#252927]/8 pt-1">
        <span className="shrink-0 text-[9px] text-[#6C7470]">Live counter</span>
        <iframe title="Free Visitor Counters" srcDoc={counterEmbed} sandbox="allow-scripts allow-popups" className="h-[18px] min-w-0 flex-1 border-0 text-[9px]" />
      </div>
    </div>
  </section>
);

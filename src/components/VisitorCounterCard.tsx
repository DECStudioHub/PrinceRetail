import React from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';

const counterEmbed = `<!doctype html><html><head><style>
*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden}
body{display:flex;align-items:center;gap:8px;white-space:nowrap;font:600 13px Arial,sans-serif;color:#252927}
input{width:52px;height:28px;padding:0 4px;border:1px solid #dceee2;border-radius:8px;background:#fff;color:#252927;text-align:center;font:800 15px Arial,sans-serif}
input[type=number]{appearance:textfield}input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
img{max-height:28px}table{border-collapse:collapse}
</style></head><body><script type="text/javascript" src="https://www.freevisitorcounters.com/auth.php?id=f5e71b7484f1346c5b87ca63e12b23512cef66e0"><\/script><script type="text/javascript" src="https://www.freevisitorcounters.com/en/home/counter/1694972/t/6"><\/script></body></html>`;

export const VisitorCounterCard: React.FC = () => (
  <section aria-label="Live visitor counter" className="mb-7 flex w-full flex-col gap-4 rounded-2xl border border-[#252927]/8 bg-white/90 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCEEE2] text-[#252927]">
        <Eye aria-hidden="true" className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-[#252927]">Visitors online</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#DCEEE2] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#355442]"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#4C9A69]" />Live</span>
        </div>
        <p className="mt-0.5 text-[11px] text-[#6C7470]">People browsing Prince Retail right now</p>
      </div>
    </div>
    <div className="flex items-center justify-between gap-3 rounded-xl bg-[#F4F8F2] px-3 py-2 sm:justify-start">
      <iframe title="Live visitor count" srcDoc={counterEmbed} sandbox="allow-scripts" scrolling="no" className="h-7 w-[118px] border-0" />
      <a href="https://www.versicherungen.at/studenten-versicherung/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 border-l border-[#252927]/10 pl-3 text-[10px] font-semibold leading-snug text-[#6C7470] hover:text-[#252927]">
        Auslandssemester<br />Krankenversicherung
        <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#EF777B]" />
      </a>
    </div>
  </section>
);

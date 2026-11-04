import React from 'react';
import { CAMPAIGN_COPY } from '../data/campaignData';

interface MockupOverlayProps {
  mode: 'raw' | 'arabic' | 'english' | 'custom';
  customHeadline?: string;
  customSubhead?: string;
}

export const MockupOverlay: React.FC<MockupOverlayProps> = ({
  mode,
  customHeadline,
  customSubhead,
}) => {
  if (mode === 'raw') return null;

  if (mode === 'arabic' || mode === 'custom') {
    const headline = mode === 'custom' && customHeadline ? customHeadline : CAMPAIGN_COPY.arabic.headline;
    const tagline = mode === 'custom' && customSubhead ? customSubhead : CAMPAIGN_COPY.arabic.tagline;

    return (
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-8 md:p-10 text-white font-arabic select-none">
        {/* Upper-Left Negative Space Placement (in RTL, it sits cleanly in the upper quadrant) */}
        <div className="max-w-[52%] space-y-2 text-left self-start" dir="rtl">
          {/* Category kicker */}
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F7941D] tracking-wide">
            <span>دورات الذكاء الاصطناعي والبرمجة للناشئين</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            {headline}
          </h2>

          {/* Subhead Tagline */}
          <p className="text-xs sm:text-sm md:text-base font-medium text-slate-200 leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {tagline}
          </p>

          {/* Key Course Pillars */}
          <div className="hidden sm:flex flex-wrap gap-x-3 gap-y-1 pt-1 text-[11px] text-slate-300">
            <span>بايثون</span>
            <span className="text-[#1D75BC]">·</span>
            <span>الذكاء الاصطناعي</span>
            <span className="text-[#1D75BC]">·</span>
            <span>المدن الذكية</span>
            <span className="text-[#1D75BC]">·</span>
            <span>الروبوتات</span>
          </div>
        </div>

        {/* Lower Margin: Uncluttered Course Details & Contact Bar */}
        <div className="w-full pt-4 border-t border-slate-700/60 bg-gradient-to-t from-[#242A38]/95 via-[#242A38]/70 to-transparent p-3 rounded-b-xl backdrop-blur-[2px]" dir="rtl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-200 font-medium">
              <span className="h-2 w-2 rounded-full bg-[#F7941D]" />
              <span>{CAMPAIGN_COPY.arabic.footerInfo}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400">الفئات العمرية: ٨ - ١٦ سنة</span>
              <div className="rounded bg-gradient-to-r from-[#1D75BC] to-[#155d96] px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-[#1D75BC]/30">
                سجل الآن
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // English Campaign Mockup
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-8 md:p-10 text-white select-none">
      {/* Upper-Left Negative Space */}
      <div className="max-w-[50%] space-y-2 text-left self-start">
        <div className="text-xs font-bold text-[#F7941D] tracking-wider uppercase">
          Next-Gen Coding &amp; AI Academy
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
          {CAMPAIGN_COPY.english.headline}
        </h2>
        <p className="text-xs sm:text-sm md:text-base font-medium text-slate-200 leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          {CAMPAIGN_COPY.english.tagline}
        </p>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 pt-1">
          <span>Python</span>
          <span className="text-[#1D75BC]">·</span>
          <span>GenAI &amp; Neural Nets</span>
          <span className="text-[#1D75BC]">·</span>
          <span>Smart Metropolises</span>
        </div>
      </div>

      {/* Lower Zone */}
      <div className="w-full pt-4 border-t border-slate-700/60 bg-gradient-to-t from-[#242A38]/95 via-[#242A38]/70 to-transparent p-3 rounded-b-xl backdrop-blur-[2px]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-200">
            <span className="h-2 w-2 rounded-full bg-[#F7941D]" />
            <span>{CAMPAIGN_COPY.english.footerInfo}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">Ages 8–16</span>
            <div className="rounded bg-gradient-to-r from-[#1D75BC] to-[#155d96] px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-[#1D75BC]/30">
              Apply for Spring Cohort
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

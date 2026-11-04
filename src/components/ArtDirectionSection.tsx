import React, { useState } from 'react';
import { Grid3X3, Layers, Sliders, CheckCircle2, AlertCircle } from 'lucide-react';
import { validateAdvertisingCopy } from '../utils/campaignLogic';

export const ArtDirectionSection: React.FC = () => {
  const [testHeadline, setTestHeadline] = useState<string>('المستقبل قيد البناء');
  const [testSubhead, setTestSubhead] = useState<string>('نصنع مبتكري الغد في البرمجة والذكاء الاصطناعي');

  const validation = validateAdvertisingCopy(testHeadline, testSubhead);

  return (
    <div className="space-y-8 rounded-2xl border border-slate-800 bg-[#1A1F2C] p-6 sm:p-8">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D75BC]">
          <Grid3X3 className="h-4 w-4" />
          <span>Compositional Geometry &amp; Grid Strategy</span>
        </div>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
          Rule of Thirds &amp; Negative Space Engineering
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-3xl leading-relaxed">
          The 1080×1080 square canvas is architected around an asymmetrical balance: the Egyptian child subject and futuristic metropolis are anchored on the right and lower-middle thirds, leaving a clean, unencumbered 45% negative space quadrant in the upper-left specifically for high-impact Arabic typography.
        </p>
      </div>

      {/* Geometry Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-slate-800 bg-[#212735] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-sky-400">ZONE 01</span>
            <span className="rounded bg-sky-950 px-2 py-0.5 text-[10px] font-mono text-sky-300">Upper Left</span>
          </div>
          <h3 className="mt-3 text-sm font-bold text-white">Reserved Negative Space</h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            Spans from X: 5% to 50% and Y: 5% to 37%. Kept uniformly in deep charcoal #242A38 with smooth vignetting to ensure that Arabic calligraphic or bold grotesque typography achieves maximum legibility without cluttering the visual.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#212735] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400">ZONE 02</span>
            <span className="rounded bg-amber-950 px-2 py-0.5 text-[10px] font-mono text-amber-300">Apex Catalyst</span>
          </div>
          <h3 className="mt-3 text-sm font-bold text-white">The Keystone Focal Anchor</h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            Positioned at the upper intersection of the right vertical third (X: 49%, Y: 59%). This focal nexus naturally draws the viewer&apos;s eye right after reading the headline, creating a diagonal narrative line from words to action.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#212735] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400">ZONE 03</span>
            <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-mono text-emerald-300">Lower Margin</span>
          </div>
          <h3 className="mt-3 text-sm font-bold text-white">Clean Baseline Info Zone</h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            The dark reflective table provides a soft, untextured surface along the bottom 15% of the frame. Perfect for housing course accreditations, cohort dates, website links, or contact numbers without obscuring the cityscape.
          </p>
        </div>
      </div>

      {/* Interactive Negative Space Safe-Zone Tester */}
      <div className="rounded-xl border border-slate-800 bg-[#161B24] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Interactive Negative Space Safe-Zone Validator
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Type custom Arabic or English headlines to test against the reserved negative space dimensions.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {validation.valid ? (
              <span className="flex items-center gap-1 rounded bg-emerald-500/10 text-emerald-400 px-2.5 py-1 text-xs font-semibold border border-emerald-500/20">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Fits Safe Zone Perfectly
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded bg-amber-500/10 text-amber-400 px-2.5 py-1 text-xs font-semibold border border-amber-500/20">
                <AlertCircle className="h-3.5 w-3.5" />
                {validation.warning}
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Headline (Main Arabic Title)
            </label>
            <input
              type="text"
              value={testHeadline}
              onChange={(e) => setTestHeadline(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-[#212735] px-3.5 py-2 text-sm text-white font-arabic focus:border-[#1D75BC] focus:outline-none"
              dir="rtl"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Word count: {validation.headlineWordCount} / 10 max</span>
              <span>Optimal: 3–6 words</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Subhead / Tagline
            </label>
            <input
              type="text"
              value={testSubhead}
              onChange={(e) => setTestSubhead(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-[#212735] px-3.5 py-2 text-sm text-white font-arabic focus:border-[#1D75BC] focus:outline-none"
              dir="rtl"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Characters: {validation.subheadCharCount} / 160 max</span>
              <span>Optimal: 50–120 chars</span>
            </div>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="mt-5 rounded-lg border border-slate-800 bg-[#242A38] p-5 text-right font-arabic" dir="rtl">
          <div className="text-[11px] font-semibold text-[#F7941D] tracking-wide mb-1">
            معاينة فورية في المساحة السلبية المخصصة:
          </div>
          <h4 className="text-2xl font-black text-white">{testHeadline || 'المستقبل قيد البناء'}</h4>
          <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
            {testSubhead || 'نصنع مبتكري الغد في البرمجة والذكاء الاصطناعي'}
          </p>
        </div>
      </div>
    </div>
  );
};

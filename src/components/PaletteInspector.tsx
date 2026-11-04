import React, { useState } from 'react';
import { Check, Copy, Droplets, Sun, Moon, ShieldCheck } from 'lucide-react';
import { CAMPAIGN_COLORS } from '../data/campaignData';
import { calculateContrastRatio } from '../utils/campaignLogic';

export const PaletteInspector: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="space-y-8 rounded-2xl border border-slate-800 bg-[#1A1F2C] p-6 sm:p-8">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D75BC]">
          <Droplets className="h-4 w-4" />
          <span>Art Direction Color Science &amp; Lighting System</span>
        </div>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
          Chiaroscuro &amp; Studio Lighting Palette
        </h2>
        <p className="mt-2 text-sm text-slate-400 max-w-3xl leading-relaxed">
          The campaign visual employs a high-contrast dual-temperature studio lighting setup:
          deep charcoal non-reflective background (<span className="text-slate-200 font-mono font-medium">#242A38</span>),
          cool directional blue key illumination (<span className="text-[#1D75BC] font-mono font-medium">#1D75BC</span>) to represent technical rigor,
          and delicate warm orange rim highlights (<span className="text-[#F7941D] font-mono font-medium">#F7941D</span>) contouring the Egyptian child&apos;s face and the keystone block.
        </p>
      </div>

      {/* Swatch Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {CAMPAIGN_COLORS.map((color) => {
          const contrast = calculateContrastRatio(color.hex, '#242A38');
          const isCopied = copiedHex === color.hex;

          return (
            <div
              key={color.hex}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-700/60 bg-[#212735] p-4 transition-all hover:border-slate-500"
            >
              <div>
                <div
                  className="h-20 w-full rounded-lg shadow-inner border border-white/10 flex items-end justify-end p-2 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: color.hex }}
                >
                  <button
                    onClick={() => handleCopy(color.hex)}
                    className="flex h-7 w-7 items-center justify-center rounded bg-black/60 text-white backdrop-blur-sm hover:bg-black/90 transition-all cursor-pointer"
                    title="Copy Hex Code"
                    aria-label={`Copy hex code for ${color.name}`}
                  >
                    {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-white tracking-wide">
                      {color.hex}
                    </span>
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">
                      {contrast}:1
                    </span>
                  </div>
                  <h3 className="mt-1 text-xs font-semibold text-slate-200">{color.name}</h3>
                  <p className="mt-0.5 text-[11px] font-medium text-[#1D75BC]">{color.role}</p>
                </div>
              </div>

              <p className="mt-3 text-[11px] text-slate-400 leading-snug">
                {color.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Lighting Architecture Ratio Strip */}
      <div className="rounded-xl border border-slate-800 bg-[#151922] p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          60-30-10 Color &amp; Lighting Distribution Law
        </h3>
        <div className="mt-3 flex h-4 w-full overflow-hidden rounded-full shadow-inner">
          <div className="h-full bg-[#242A38] border-r border-slate-700" style={{ width: '60%' }} title="60% Studio Charcoal Canvas" />
          <div className="h-full bg-[#1D75BC] border-r border-slate-700" style={{ width: '30%' }} title="30% Key Blue Tech Light" />
          <div className="h-full bg-[#F7941D]" style={{ width: '10%' }} title="10% Amber Curiosity Highlight" />
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#242A38] border border-slate-600" />
            <span><strong>60% Studio Backdrop:</strong> Charcoal #242A38</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#1D75BC]" />
            <span><strong>30% Directional Key:</strong> Cyan Blue #1D75BC</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#F7941D]" />
            <span><strong>10% Human Spark:</strong> Warm Orange #F7941D</span>
          </div>
        </div>
      </div>

      {/* Technical Lighting Rules Audit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#212735]/60 p-4">
          <div className="mt-0.5 rounded-lg bg-sky-950 p-2 text-sky-400 border border-sky-800/40">
            <Moon className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Controlled Cinematic Blue (#1D75BC)</h4>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Functions as key rim lighting across the child&apos;s arms and the sleek faces of the miniature skyscrapers. It conveys precision, intelligence, and modern algorithmic structure without devolving into gaudy neon or sci-fi cliché.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#212735]/60 p-4">
          <div className="mt-0.5 rounded-lg bg-amber-950 p-2 text-amber-400 border border-amber-800/40">
            <Sun className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Subtle Warm Amber-Orange (#F7941D)</h4>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Provides warm emotional resonance on the child&apos;s fingertips and the glowing core of the final keystone block. It grounds the technological narrative in genuine human childhood curiosity and wonder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

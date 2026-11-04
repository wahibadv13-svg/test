import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles, Building2, Brain, Compass, Copy } from 'lucide-react';
import { CAMPAIGN_COPY } from '../data/campaignData';

export const CreativeConceptSheet: React.FC = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const restrictionsList = [
    { rule: 'Zero in-image typography, letters or numbers', status: 'Compliant' },
    { rule: 'Zero corporate logos or watermarks in artwork', status: 'Compliant' },
    { rule: 'No cartoon, vector or 3D pastel rendering', status: 'Compliant' },
    { rule: 'No exaggerated fantasy effects or excessive neon glow', status: 'Compliant' },
    { rule: 'No random floating matrix code or generic robot mascot', status: 'Compliant' },
    { rule: 'Realistic Egyptian child proportions, skin tone and hands', status: 'Compliant' },
    { rule: 'Generous clean negative space in upper-left reserved for Arabic copy', status: 'Compliant' },
    { rule: 'Uncluttered lower table edge for contact and accreditation info', status: 'Compliant' },
  ];

  return (
    <div className="space-y-8 rounded-2xl border border-slate-800 bg-[#1A1F2C] p-6 sm:p-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F7941D]">
          <Compass className="h-4 w-4" />
          <span>Campaign Core Thesis &amp; Strategy</span>
        </div>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-white">
          &quot;The Future Is Under Construction&quot; — Art Direction Brief
        </h2>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-3xl">
          Designed for a premier children&apos;s artificial intelligence and computer science academy in Egypt and the MENA region. Rather than generic educational tropes (smiling kids pointing at laptops or cartoon robots), this visual adopts the visual language of an international technology flagship campaign (reminiscent of Apple, IBM, or Siemens).
        </p>
      </div>

      {/* 3 Core Metaphor Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-xl border border-slate-800 bg-[#212735] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-[#1D75BC] border border-[#1D75BC]/30">
            <Building2 className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-white">1. The Metamorphism</h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            The structure begins with simple tactile geometric blocks (representing algorithmic loops, variables, and logic). As the child builds upward, the blocks seamlessly transition into an extraordinary miniature smart city of sustainable skyscrapers and interconnected systems.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#212735] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-[#F7941D] border border-[#F7941D]/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-white">2. The Keystone Block</h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            Held deliberately between the child&apos;s fingertips, the final block is the conceptual bridge. It is translucent with a faint inner luminescence, representing the spark of human intelligence, agency, and creative problem solving that activates technology.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#212735] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Brain className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-white">3. Egyptian Child Protagonist</h3>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            A realistic 10-year-old Egyptian boy with authentic olive-bronze skin, expressive dark eyes, and a thoughtful, focused expression. He is depicted not as a passive consumer of video games, but as an active architect of future society.
          </p>
        </div>
      </div>

      {/* Strict Restrictions Compliance Audit */}
      <div className="rounded-xl border border-slate-800 bg-[#161B24] p-5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">
            Strict Production Constraints Compliance Checklist
          </h3>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          The artwork strictly adheres to all negative constraints provided in the art direction directive.
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {restrictionsList.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg bg-[#202634] px-3.5 py-2 text-xs">
              <span className="text-slate-300">{item.rule}</span>
              <span className="flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-400">
                <Check className="h-3 w-3" />
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Copywriting Kit (Arabic & English) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Arabic Copy Deck */}
        <div className="rounded-xl border border-slate-800 bg-[#212735] p-5 font-arabic" dir="rtl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">حزمة النصوص الإعلانية (باللغة العربية)</h3>
            <button
              onClick={() => handleCopyText(`${CAMPAIGN_COPY.arabic.headline}\n${CAMPAIGN_COPY.arabic.tagline}\n${CAMPAIGN_COPY.arabic.cta}`, 'arabic')}
              className="flex items-center gap-1.5 rounded bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-700 cursor-pointer transition-colors"
            >
              {copiedType === 'arabic' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>نسخ النص</span>
            </button>
          </div>
          <div className="mt-4 space-y-3 text-right">
            <div>
              <span className="text-[11px] font-semibold text-[#F7941D]">العنوان الرئيسي (Headline):</span>
              <p className="text-xl font-black text-white">{CAMPAIGN_COPY.arabic.headline}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#1D75BC]">العنوان الفرعي (Subhead):</span>
              <p className="text-sm text-slate-200">{CAMPAIGN_COPY.arabic.tagline}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">الفئات المستهدفة:</span>
              <p className="text-xs text-slate-300">{CAMPAIGN_COPY.arabic.ageRange}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">الدعوة لاتخاذ إجراء (CTA):</span>
              <p className="text-xs font-bold text-[#F7941D]">{CAMPAIGN_COPY.arabic.cta}</p>
            </div>
          </div>
        </div>

        {/* English Copy Deck */}
        <div className="rounded-xl border border-slate-800 bg-[#212735] p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Copywriting Deck (English Tech Global)</h3>
            <button
              onClick={() => handleCopyText(`${CAMPAIGN_COPY.english.headline}\n${CAMPAIGN_COPY.english.tagline}\n${CAMPAIGN_COPY.english.cta}`, 'english')}
              className="flex items-center gap-1.5 rounded bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-700 cursor-pointer transition-colors"
            >
              {copiedType === 'english' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>Copy Copydeck</span>
            </button>
          </div>
          <div className="mt-4 space-y-3 text-left">
            <div>
              <span className="text-[11px] font-semibold text-[#F7941D]">Main Headline:</span>
              <p className="text-lg font-black tracking-tight text-white">{CAMPAIGN_COPY.english.headline}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#1D75BC]">Subhead Tagline:</span>
              <p className="text-sm text-slate-200">{CAMPAIGN_COPY.english.tagline}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">Target Audience:</span>
              <p className="text-xs text-slate-300">{CAMPAIGN_COPY.english.ageRange}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400">Primary CTA:</span>
              <p className="text-xs font-bold text-[#F7941D]">{CAMPAIGN_COPY.english.cta}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

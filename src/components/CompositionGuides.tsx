import React from 'react';
import { getFormatMetadata, CampaignFormat } from '../utils/campaignLogic';

interface CompositionGuidesProps {
  format: CampaignFormat;
  visible: boolean;
}

export const CompositionGuides: React.FC<CompositionGuidesProps> = ({ format, visible }) => {
  if (!visible) return null;

  const meta = getFormatMetadata(format);
  const { upperLeftNegativeSpace, lowerMarginalZone, finalBlockAnchor, childSubjectAnchor } = meta.safeZones;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {/* Rule of Thirds Lines */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
        <div className="border-r border-b border-sky-400/20" />
        <div className="border-r border-b border-sky-400/20" />
        <div className="border-b border-sky-400/20" />
        <div className="border-r border-b border-sky-400/20" />
        <div className="border-r border-b border-sky-400/20" />
        <div className="border-b border-sky-400/20" />
        <div className="border-r border-sky-400/20" />
        <div className="border-r border-sky-400/20" />
        <div />
      </div>

      {/* Reserved Upper-Left Negative Space */}
      <div
        className="absolute border-2 border-dashed border-[#1D75BC]/80 bg-[#1D75BC]/10 rounded-lg transition-all"
        style={{
          left: `${upperLeftNegativeSpace.x}%`,
          top: `${upperLeftNegativeSpace.y}%`,
          width: `${upperLeftNegativeSpace.w}%`,
          height: `${upperLeftNegativeSpace.h}%`,
        }}
      >
        <div className="absolute top-2 left-2 rounded bg-[#1D75BC]/90 px-2 py-0.5 text-[10px] font-semibold text-white tracking-wide uppercase">
          Reserved Negative Space (Arabic Headline)
        </div>
      </div>

      {/* Reserved Lower Marginal Zone */}
      <div
        className="absolute border-2 border-dashed border-emerald-500/70 bg-emerald-500/10 rounded-lg transition-all"
        style={{
          left: `${lowerMarginalZone.x}%`,
          top: `${lowerMarginalZone.y}%`,
          width: `${lowerMarginalZone.w}%`,
          height: `${lowerMarginalZone.h}%`,
        }}
      >
        <div className="absolute bottom-2 left-2 rounded bg-emerald-600/90 px-2 py-0.5 text-[10px] font-semibold text-white tracking-wide uppercase">
          Lower Clean Zone (Course Details &amp; Contact)
        </div>
      </div>

      {/* Final Keystone Block Marker */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all flex flex-col items-center"
        style={{
          left: `${finalBlockAnchor.x}%`,
          top: `${finalBlockAnchor.y}%`,
        }}
      >
        <div className="relative flex items-center justify-center">
          <div className="h-10 w-10 rounded-full border-2 border-[#F7941D] bg-[#F7941D]/20 animate-pulse" />
          <div className="absolute h-2 w-2 rounded-full bg-[#F7941D]" />
        </div>
        <div className="mt-1 whitespace-nowrap rounded bg-slate-900/90 px-2 py-0.5 text-[10px] font-bold text-[#F7941D] border border-[#F7941D]/40 backdrop-blur-sm">
          Final Block Anchor (Catalyst)
        </div>
      </div>

      {/* Child Subject Marker */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all flex flex-col items-center"
        style={{
          left: `${childSubjectAnchor.x}%`,
          top: `${childSubjectAnchor.y}%`,
        }}
      >
        <div className="relative flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-2 border-sky-400/80 bg-sky-400/10" />
          <div className="absolute h-2 w-2 rounded-full bg-sky-400" />
        </div>
        <div className="mt-1 whitespace-nowrap rounded bg-slate-900/90 px-2 py-0.5 text-[10px] font-bold text-sky-300 border border-sky-400/40 backdrop-blur-sm">
          Subject: Egyptian Child (Right of Center)
        </div>
      </div>
    </div>
  );
};

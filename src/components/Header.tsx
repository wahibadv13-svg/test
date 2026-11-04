import React from 'react';
import { Download, Sparkles } from 'lucide-react';

interface HeaderProps {
  onDownloadRaw: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onDownloadRaw, activeTab, onTabChange }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#171B24]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#1D75BC] to-[#F7941D] text-white shadow-md shadow-[#1D75BC]/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              FUTURE UNDER CONSTRUCTION
            </h1>
            <p className="text-[11px] font-medium text-slate-400 font-arabic -mt-0.5 whitespace-nowrap">
              المستقبل قيد البناء · الحملة الإعلانية
            </p>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Clean, single-line, hover underlines) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onTabChange('viewer')}
            className={`transition-colors whitespace-nowrap pb-0.5 cursor-pointer ${
              activeTab === 'viewer'
                ? 'text-white border-b-2 border-[#1D75BC] font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Artwork &amp; Canvas
          </button>
          <button
            onClick={() => onTabChange('composition')}
            className={`transition-colors whitespace-nowrap pb-0.5 cursor-pointer ${
              activeTab === 'composition'
                ? 'text-white border-b-2 border-[#1D75BC] font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Art Direction &amp; Grid
          </button>
          <button
            onClick={() => onTabChange('palette')}
            className={`transition-colors whitespace-nowrap pb-0.5 cursor-pointer ${
              activeTab === 'palette'
                ? 'text-white border-b-2 border-[#1D75BC] font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Palette &amp; Lighting
          </button>
          <button
            onClick={() => onTabChange('concept')}
            className={`transition-colors whitespace-nowrap pb-0.5 cursor-pointer ${
              activeTab === 'concept'
                ? 'text-white border-b-2 border-[#1D75BC] font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Creative Concept &amp; Copy
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onDownloadRaw}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#1D75BC] to-[#155d96] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
            aria-label="Download pristine 1080x1080 artwork"
          >
            <Download className="h-4 w-4" />
            <span>Download 1080p Art</span>
          </button>
        </div>
      </div>
    </header>
  );
};

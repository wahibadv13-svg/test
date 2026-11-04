import React, { useState, useRef } from 'react';
import {
  Maximize2,
  ZoomIn,
  Grid3X3,
  Eye,
  Sliders,
  Sparkles,
  Download,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { CAMPAIGN_ASSETS, CampaignAsset } from '../data/campaignData';
import { MockupOverlay } from './MockupOverlay';
import { CompositionGuides } from './CompositionGuides';
import { LoupeMagnifier } from './LoupeMagnifier';

interface ArtworkViewerProps {
  onOpenExport: (asset: CampaignAsset) => void;
}

export type ViewMode = 'raw' | 'arabic' | 'english' | 'guides';
export type FilterGrade = 'neutral' | 'contrast' | 'blue-accent' | 'warm-amber';

export const ArtworkViewer: React.FC<ArtworkViewerProps> = ({ onOpenExport }) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string>('primary-square');
  const [viewMode, setViewMode] = useState<ViewMode>('raw');
  const [filterGrade, setFilterGrade] = useState<FilterGrade>('neutral');
  const [loupeActive, setLoupeActive] = useState<boolean>(false);
  const [loupePos, setLoupePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentAsset =
    CAMPAIGN_ASSETS.find((a) => a.id === selectedAssetId) || CAMPAIGN_ASSETS[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLoupePos({ x, y });
  };

  const getFilterStyle = (): React.CSSProperties => {
    switch (filterGrade) {
      case 'contrast':
        return { filter: 'contrast(1.08) brightness(0.98)' };
      case 'blue-accent':
        return { filter: 'hue-rotate(-5deg) contrast(1.04)' };
      case 'warm-amber':
        return { filter: 'sepia(0.08) contrast(1.02)' };
      default:
        return {};
    }
  };

  const downloadDirect = () => {
    const link = document.createElement('a');
    link.href = currentAsset.imageSrc;
    link.download = `future-is-under-construction-${currentAsset.format}-1080p.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-[#1A1F2C] p-4">
        {/* Left: View Modes */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode('raw')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'raw'
                ? 'bg-[#1D75BC] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Pure Raw Artwork (No Text)</span>
          </button>
          <button
            onClick={() => setViewMode('arabic')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'arabic'
                ? 'bg-[#1D75BC] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ad Mockup (Arabic)</span>
          </button>
          <button
            onClick={() => setViewMode('english')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'english'
                ? 'bg-[#1D75BC] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ad Mockup (English)</span>
          </button>
          <button
            onClick={() => setViewMode('guides')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'guides'
                ? 'bg-[#F7941D] text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid3X3 className="h-3.5 w-3.5" />
            <span>Composition &amp; Negative Space</span>
          </button>
        </div>

        {/* Right: Inspection & Export Controls */}
        <div className="flex items-center gap-3">
          {/* Loupe Toggle */}
          <button
            onClick={() => setLoupeActive(!loupeActive)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              loupeActive
                ? 'border-amber-500/60 bg-amber-500/10 text-amber-400'
                : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle precision zoom loupe to inspect keystone block & child fingertips"
          >
            <ZoomIn className="h-3.5 w-3.5" />
            <span>2.4x Loupe</span>
          </button>

          {/* Quick Download */}
          <button
            onClick={downloadDirect}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
            title="Download pure artwork image directly"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </button>

          {/* Media Kit Modal */}
          <button
            onClick={() => onOpenExport(currentAsset)}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#1D75BC] to-[#155d96] px-3.5 py-1.5 text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Export Spec &amp; Kit</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport Area */}
      <div className="relative mx-auto flex flex-col items-center justify-center rounded-2xl border border-slate-800/90 bg-[#12151D] p-3 sm:p-6 shadow-2xl">
        {/* Verification Banner */}
        <div className="mb-4 flex flex-wrap items-center justify-between w-full max-w-[820px] text-xs text-slate-400 px-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-200">{currentAsset.title}</span>
            <span className="text-slate-500">({currentAsset.dimensions})</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              Negative Space Verified
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-400">Strict Restrictions: 100% Met</span>
          </div>
        </div>

        {/* Master Image Frame */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`relative overflow-hidden rounded-xl border border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-crosshair transition-all ${
            currentAsset.format === 'wide'
              ? 'aspect-video max-w-4xl w-full'
              : currentAsset.format === 'vertical'
              ? 'aspect-[3/4] max-w-lg w-full'
              : 'aspect-square max-w-[720px] w-full'
          }`}
          style={{ backgroundColor: '#242A38' }}
        >
          {/* The High-Resolution Photography Visual */}
          <img
            src={currentAsset.imageSrc}
            alt="Conceptual advertising visual for Egyptian children AI and programming academy showing a 10-year-old Egyptian boy placing the final block on a miniature smart city"
            className="h-full w-full object-cover select-none transition-all duration-300"
            style={getFilterStyle()}
            referrerPolicy="no-referrer"
          />

          {/* Ad Mockup Overlay (Arabic / English) */}
          <MockupOverlay mode={viewMode === 'guides' ? 'raw' : viewMode} />

          {/* Composition & Negative Space Guides */}
          <CompositionGuides
            format={currentAsset.format}
            visible={viewMode === 'guides'}
          />

          {/* Interactive Inspection Loupe */}
          <LoupeMagnifier
            imageSrc={currentAsset.imageSrc}
            x={loupePos.x}
            y={loupePos.y}
            visible={loupeActive && isHovering}
            zoomLevel={2.4}
          />
        </div>

        {/* Format Switcher Thumbnails */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {CAMPAIGN_ASSETS.map((asset) => {
            const isSelected = asset.id === selectedAssetId;
            return (
              <button
                key={asset.id}
                onClick={() => setSelectedAssetId(asset.id)}
                className={`flex items-center gap-2.5 rounded-xl border p-2 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#1D75BC] bg-[#1D75BC]/15 text-white ring-1 ring-[#1D75BC]'
                    : 'border-slate-800 bg-[#1A1F2C] text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-slate-700/70 bg-slate-900">
                  <img
                    src={asset.imageSrc}
                    alt={asset.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold leading-tight">{asset.aspectRatio} · {asset.format.toUpperCase()}</div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{asset.dimensions}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Art Direction Detail Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-800 bg-[#1A1F2C] p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1D75BC]">
            Negative Space Execution
          </div>
          <h4 className="mt-1 text-sm font-semibold text-white">
            Reserved Upper-Left Quadrant
          </h4>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Maintains unbroken, pristine deep charcoal tone (<span className="text-slate-300 font-mono">#242A38</span>). Clean gradient drop provides 14:1 contrast ratio for Arabic advertising typography without requiring artificial drop shadows.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#1A1F2C] p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#F7941D]">
            The Catalyst Keystone
          </div>
          <h4 className="mt-1 text-sm font-semibold text-white">
            Transformational Final Block
          </h4>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Positioned at the apex between simple geometric wooden blocks and the futuristic smart skyline. Delicately held in the child&apos;s fingers, glowing with internal intelligence.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#1A1F2C] p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Subject Placement
          </div>
          <h4 className="mt-1 text-sm font-semibold text-white">
            Egyptian Child (Right of Center)
          </h4>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
            Positioned at 67% horizontal axis. Natural bronze olive skin, thoughtful gaze, authentic 10-year-old child proportions, reflecting genuine concentration and architectural ambition.
          </p>
        </div>
      </div>
    </div>
  );
};

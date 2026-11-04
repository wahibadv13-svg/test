import React, { useState } from 'react';
import { Header } from './components/Header';
import { ArtworkViewer } from './components/ArtworkViewer';
import { ArtDirectionSection } from './components/ArtDirectionSection';
import { PaletteInspector } from './components/PaletteInspector';
import { CreativeConceptSheet } from './components/CreativeConceptSheet';
import { ExportModal } from './components/ExportModal';
import { CAMPAIGN_ASSETS, CampaignAsset } from './data/campaignData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('viewer');
  const [exportAsset, setExportAsset] = useState<CampaignAsset | null>(null);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const handleDownloadMaster = () => {
    const primary = CAMPAIGN_ASSETS[0];
    const link = document.createElement('a');
    link.href = primary.imageSrc;
    link.download = 'the-future-is-under-construction-1080x1080.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenExport = (asset: CampaignAsset) => {
    setExportAsset(asset);
    setIsExportOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#171B24] text-slate-100 flex flex-col font-sans selection:bg-[#1D75BC]/40 selection:text-white">
      {/* Universal Top Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onDownloadRaw={handleDownloadMaster}
      />

      {/* Main Campaign Stage */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Indicator / Sub-header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Advertising Campaign Master Visual</span>
              <span>·</span>
              <span className="text-[#1D75BC]">1080 × 1080 Square Master</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
              {activeTab === 'viewer' && 'Artwork Canvas & Production Master'}
              {activeTab === 'composition' && 'Compositional Geometry & Rule of Thirds'}
              {activeTab === 'palette' && 'Color Science & Studio Lighting Scheme'}
              {activeTab === 'concept' && 'Creative Briefing & Copywriting Strategy'}
            </h2>
          </div>

          {/* Quick Tab Switcher for mobile & desktop */}
          <div className="flex items-center gap-1 p-1 bg-[#1A1F2C] rounded-lg border border-slate-800 self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('viewer')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'viewer'
                  ? 'bg-[#1D75BC] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Artwork
            </button>
            <button
              onClick={() => setActiveTab('composition')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'composition'
                  ? 'bg-[#1D75BC] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Grid &amp; Space
            </button>
            <button
              onClick={() => setActiveTab('palette')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'palette'
                  ? 'bg-[#1D75BC] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Lighting &amp; Palette
            </button>
            <button
              onClick={() => setActiveTab('concept')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'concept'
                  ? 'bg-[#1D75BC] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Brief &amp; Copy
            </button>
          </div>
        </div>

        {/* Tab Contents */}
        {activeTab === 'viewer' && (
          <ArtworkViewer onOpenExport={handleOpenExport} />
        )}

        {activeTab === 'composition' && (
          <ArtDirectionSection />
        )}

        {activeTab === 'palette' && (
          <PaletteInspector />
        )}

        {activeTab === 'concept' && (
          <CreativeConceptSheet />
        )}
      </main>

      {/* Export & Media Kit Dialog */}
      <ExportModal
        asset={exportAsset}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Quiet, Human Editorial Footer */}
      <footer className="border-t border-slate-800/80 bg-[#12151D] py-8 text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-400">THE FUTURE IS UNDER CONSTRUCTION</span>
            <span>·</span>
            <span className="font-arabic">المستقبل قيد البناء</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Square 1080×1080 Master</span>
            <span>·</span>
            <span>Charcoal #242A38</span>
            <span>·</span>
            <span>Blue #1D75BC</span>
            <span>·</span>
            <span>Orange #F7941D</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

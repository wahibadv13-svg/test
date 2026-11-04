import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, Sparkles, Image as ImageIcon } from 'lucide-react';
import { CampaignAsset, CAMPAIGN_COLORS, CAMPAIGN_COPY } from '../data/campaignData';

interface ExportModalProps {
  asset: CampaignAsset | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ asset, isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen || !asset) return null;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = asset.imageSrc;
    link.download = `campaign-artwork-${asset.format}-1080p.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const jsonSpec = JSON.stringify(
    {
      campaign: 'The Future is Under Construction (المستقبل قيد البناء)',
      target: "Children's AI & Computer Science Courses (Ages 8-16)",
      format: asset.dimensions,
      aspectRatio: asset.aspectRatio,
      subject: '10-year-old Egyptian boy, placing the final keystone block',
      lighting: {
        background: '#242A38 (Sophisticated Charcoal)',
        keyLight: '#1D75BC (Controlled Cyan-Blue)',
        rimHighlight: '#F7941D (Subtle Amber-Orange)',
      },
      negativeSpace: 'Upper-left quadrant clean for Arabic copy',
      lowerMargin: 'Uncluttered for course credentials',
      restrictionsAudit: {
        inImageText: 'None (Strict 100% compliant)',
        logosOrWatermarks: 'None',
        style: 'High-end international tech advertising photography',
      },
    },
    null,
    2
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-[#1A1F2C] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1D75BC]/20 text-[#1D75BC]">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Campaign Media Kit &amp; Export</h3>
              <p className="text-xs text-slate-400">{asset.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Close export dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-5 space-y-5 max-h-[70vh] overflow-y-auto pr-1">
          {/* Preview Thumbnail and Quick Specs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-slate-800 bg-[#12151D] p-4">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-slate-700 shadow-md">
              <img
                src={asset.imageSrc}
                alt={asset.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1 text-xs text-slate-300 w-full">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">{asset.dimensions}</span>
                <span className="rounded bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-mono border border-emerald-500/20">
                  Ready for Production
                </span>
              </div>
              <p className="text-slate-400">{asset.description}</p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-slate-400 font-mono">
                <span className="rounded bg-slate-800 px-2 py-0.5">Ratio: {asset.aspectRatio}</span>
                <span className="rounded bg-slate-800 px-2 py-0.5">Charcoal: #242A38</span>
                <span className="rounded bg-slate-800 px-2 py-0.5">Blue: #1D75BC</span>
                <span className="rounded bg-slate-800 px-2 py-0.5">Orange: #F7941D</span>
              </div>
            </div>
          </div>

          {/* Action 1: Download Pristine Raw Artwork */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#212735] p-4">
            <div>
              <h4 className="text-sm font-semibold text-white">Download Raw Artwork (Pure Photography)</h4>
              <p className="text-xs text-slate-400">
                Pristine 1080p master image without any typography, text or logos.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#1D75BC] to-[#155d96] px-4 py-2 text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="h-4 w-4" />
              <span>Download File</span>
            </button>
          </div>

          {/* Action 2: Copy Technical Spec JSON */}
          <div className="rounded-xl border border-slate-800 bg-[#212735] p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-white">Art Director Technical Spec Sheet</h4>
                <p className="text-xs text-slate-400">JSON schema for design agency and media buy teams.</p>
              </div>
              <button
                onClick={() => handleCopy(jsonSpec, 'spec')}
                className="flex items-center gap-1.5 rounded bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {copiedType === 'spec' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>Copy JSON</span>
              </button>
            </div>
            <pre className="mt-3 max-h-36 overflow-x-auto rounded-lg bg-[#141720] p-3 text-[11px] font-mono text-slate-300 border border-slate-800/80">
              {jsonSpec}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-end border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

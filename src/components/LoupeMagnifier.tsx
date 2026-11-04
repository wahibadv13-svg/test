import React from 'react';

interface LoupeMagnifierProps {
  imageSrc: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  visible: boolean;
  zoomLevel?: number;
}

export const LoupeMagnifier: React.FC<LoupeMagnifierProps> = ({
  imageSrc,
  x,
  y,
  visible,
  zoomLevel = 2.4,
}) => {
  if (!visible) return null;

  const loupeSize = 180; // diameter in px

  return (
    <div
      className="pointer-events-none absolute z-30 rounded-full border-2 border-white/80 shadow-2xl overflow-hidden transition-opacity duration-150"
      style={{
        width: `${loupeSize}px`,
        height: `${loupeSize}px`,
        left: `calc(${x}% - ${loupeSize / 2}px)`,
        top: `calc(${y}% - ${loupeSize / 2}px)`,
        boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(29, 117, 188, 0.5), inset 0 0 20px rgba(0,0,0,0.3)',
      }}
    >
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: `${zoomLevel * 100}%`,
          backgroundPosition: `${x}% ${y}%`,
        }}
      />
      {/* Precision reticle crosshairs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-6 w-[1px] bg-white/40" />
        <div className="absolute w-6 h-[1px] bg-white/40" />
        <div className="h-2 w-2 rounded-full border border-amber-400/80 bg-amber-400/20" />
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-mono font-medium text-slate-200 backdrop-blur-sm">
        {zoomLevel}x Loupe
      </div>
    </div>
  );
};

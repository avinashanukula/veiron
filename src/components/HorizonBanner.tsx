import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface HorizonBannerProps {
  headline?: string;
  subtext?: string;
  tag?: string;
  onNavigate?: (page: any) => void;
  ctaText?: string;
  ctaPage?: string;
  indexNumber?: string;
}

export const HorizonBanner: React.FC<HorizonBannerProps> = ({
  headline = "Ship world models that don't break.",
  subtext = "Continuous, self-updating intelligence for high-stakes institutional environments.",
  tag = "VEIRON COGNITIVE ARCHITECTURE",
  onNavigate,
  ctaText = "Talk to an engineer",
  ctaPage = "contact",
  indexNumber = "15"
}) => {
  return (
    <section className="w-full bg-[#111110] border-y border-[#2C2C29] text-[#8F8F87] select-none">
      <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row">
        
        {/* Left Index Number Rail matching inspo */}
        <div className="hidden md:flex w-24 border-r border-[#2C2C29] p-8 shrink-0 flex-col justify-between">
          <span className="font-mono text-xs text-[#8F8F87]">{indexNumber}</span>
          <span className="font-mono text-[10px] text-[#2C2C29]">SEC_END</span>
        </div>

        {/* Content Column */}
        <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-[#2C2C29]">
          
          {/* Left Text Block */}
          <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#FF4F00]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00] animate-pulse" />
                <span>{tag}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-medium text-white tracking-[-0.04em] leading-[1.05]">
                {headline}
              </h2>

              <p className="text-sm sm:text-base text-[#8F8F87] font-sans leading-relaxed max-w-lg">
                {subtext}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              {onNavigate && (
                <button
                  onClick={() => onNavigate(ctaPage)}
                  className="px-6 py-3 bg-[#FF4F00] hover:bg-[#E54500] text-white text-xs font-sans font-medium rounded-full flex items-center gap-2 shadow-lg shadow-[#FF4F00]/25 transition-all cursor-pointer active:scale-95"
                >
                  <span>{ctaText}</span>
                  <ArrowRight size={14} />
                </button>
              )}
              
              <div className="font-mono text-[11px] text-[#8F8F87]">
                DETERMINISTIC COGNITIVE VERIFICATION
              </div>
            </div>
          </div>

          {/* Right SVG Graphic: Concentric Signal Rings matching inspo */}
          <div className="lg:w-[420px] p-8 sm:p-12 flex items-center justify-center relative overflow-hidden bg-[#141413]">
            {/* Ambient Ember Gradient Glow */}
            <div className="absolute inset-0 bg-radial from-[#FF4F00]/10 via-transparent to-transparent pointer-events-none" />

            {/* SVG Concentric Square Signal Rings */}
            <svg 
              viewBox="0 0 400 400" 
              className="w-full max-w-[320px] h-auto aspect-square" 
              shapeRendering="crispEdges"
            >
              {/* Outer boundary */}
              <rect x="20" y="20" width="360" height="360" fill="none" stroke="#2C2C29" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Concentric rings */}
              <rect x="50" y="50" width="300" height="300" fill="none" stroke="#8F8F87" strokeOpacity="0.25" strokeWidth="1" />
              <rect x="85" y="85" width="230" height="230" fill="none" stroke="#8F8F87" strokeOpacity="0.35" strokeWidth="1" />
              <rect x="120" y="120" width="160" height="160" fill="none" stroke="#8F8F87" strokeOpacity="0.45" strokeWidth="1" />
              <rect x="155" y="155" width="90" height="90" fill="none" stroke="#8F8F87" strokeOpacity="0.6" strokeWidth="1" />
              <rect x="180" y="180" width="40" height="40" fill="none" stroke="#FF4F00" strokeWidth="1" />
              
              {/* Axis crosshair lines */}
              <line x1="200" y1="20" x2="200" y2="380" stroke="#2C2C29" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="20" y1="200" x2="380" y2="200" stroke="#2C2C29" strokeWidth="1" strokeDasharray="2 2" />

              {/* Pulsing Core node */}
              <circle cx="200" cy="200" r="4" fill="#FF4F00" />
              <circle cx="200" cy="200" r="10" fill="none" stroke="#FF4F00" strokeOpacity="0.5" strokeWidth="1" className="animate-ping" style={{ transformOrigin: 'center' }} />

              {/* Corner corner-bracket ticks */}
              <path d="M 20 30 V 20 H 30" fill="none" stroke="#8F8F87" strokeWidth="1" />
              <path d="M 370 20 H 380 V 30" fill="none" stroke="#8F8F87" strokeWidth="1" />
              <path d="M 20 370 V 380 H 30" fill="none" stroke="#8F8F87" strokeWidth="1" />
              <path d="M 370 380 H 380 V 370" fill="none" stroke="#8F8F87" strokeWidth="1" />
            </svg>

            {/* Bottom Tag */}
            <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#8F8F87]">
              SR-11-7 :: TELEMETRY_GRID
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
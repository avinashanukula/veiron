import React, { useEffect, useState } from 'react';
import { Page } from '../types';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface SwarmicComingSoonPageProps {
  onNavigate: (page: Page) => void;
}

export const SwarmicComingSoonPage: React.FC<SwarmicComingSoonPageProps> = ({ onNavigate }) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 90);
    return () => clearInterval(interval);
  }, []);

  // Subtle animated dots
  const dots = Array.from({ length: 36 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141413] flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">

      {/* Animated background grid dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #D5D0C5 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.45,
          }}
        />
      </div>

      {/* Pulsing circle accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="w-[480px] h-[480px] rounded-full border border-[#E5182B]/10 animate-ping"
          style={{ animationDuration: '3s' }}
        />
        <div
          className="absolute inset-8 rounded-full border border-[#E5182B]/8 animate-ping"
          style={{ animationDuration: '4.5s', animationDelay: '0.8s' }}
        />
      </div>

      <div className="relative z-10 max-w-xl w-full mx-auto text-center space-y-8">

        {/* Back to Products link */}
        <div>
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#87857F] hover:text-[#141413] transition-colors cursor-pointer group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Products</span>
          </button>
        </div>

        {/* Product Badge */}
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#141413] text-white text-[10px] font-mono font-semibold tracking-widest uppercase">
            <Sparkles size={11} className="text-[#E5182B]" />
            <span>Product 01 · Swarmic</span>
          </div>

          {/* Animated Logo Mark */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#E3E0D8]" />
            <div
              className="absolute inset-1 rounded-full border border-[#E5182B]/30"
              style={{
                transform: `rotate(${tick * 1.5}deg)`,
                transition: 'transform 0.09s linear',
              }}
            />
            <div className="w-8 h-8 bg-[#141413] rounded-sm flex items-center justify-center">
              <Sparkles size={16} className="text-[#E5182B]" />
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-serif text-[#141413] tracking-tight leading-tight">
            Something new is<br />
            <span className="italic text-[#E5182B]">taking shape.</span>
          </h1>
          <p className="text-sm text-[#66645E] leading-relaxed max-w-sm mx-auto">
            Swarmic is under active development. We're not ready to share details yet — but something meaningful is on its way.
          </p>
        </div>

        {/* Status line */}
        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#87857F]">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span>STATUS: IN DEVELOPMENT · NO LAUNCH DATE</span>
        </div>

        {/* Divider */}
        <div className="w-12 h-[1px] bg-[#D5D0C5] mx-auto" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('products')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#141413] text-white text-xs font-semibold tracking-wide hover:bg-[#2B2A28] transition-colors cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Products</span>
          </button>
          <button
            onClick={() => onNavigate('aakashavani')}
            className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-[#D5D0C5] text-[#141413] text-xs font-semibold tracking-wide hover:bg-[#F0EEE6] hover:border-[#141413] transition-colors cursor-pointer"
          >
            <span>Explore Aakashavani →</span>
          </button>
        </div>

      </div>
    </div>
  );
};

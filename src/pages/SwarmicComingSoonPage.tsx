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
    <div className="min-h-screen bg-[#F4F4F1] text-[#111111] flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">

      {/* Animated background grid dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #E2E2DC 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px',
            opacity: 0.65,
          }}
        />
      </div>

      {/* Pulsing circle accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className="w-[480px] h-[480px] rounded-full border border-[#E5182B]/15 animate-ping"
          style={{ animationDuration: '3s' }}
        />
        <div
          className="absolute inset-8 rounded-full border border-[#E5182B]/10 animate-ping"
          style={{ animationDuration: '4.5s', animationDelay: '0.8s' }}
        />
      </div>

      <div className="relative z-10 max-w-xl w-full mx-auto text-center space-y-8">

        {/* Back to Products link */}
        <div>
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-2 text-xs font-mono text-[#88887F] hover:text-[#111111] transition-colors cursor-pointer group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Products</span>
          </button>
        </div>

        {/* Product Badge */}
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#111110] text-white text-[10px] font-mono font-medium tracking-widest uppercase border border-[#2C2C29]">
            <Sparkles size={11} className="text-[#FF4F00]" />
            <span>Product 01 · Swarmic</span>
          </div>

          {/* Animated Logo Mark */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#E2E2DC]" />
            <div
              className="absolute inset-1 rounded-full border border-[#E5182B]/40"
              style={{
                transform: `rotate(${tick * 1.5}deg)`,
                transition: 'transform 0.09s linear',
              }}
            />
            <div className="w-8 h-8 bg-[#111110] rounded-sm flex items-center justify-center">
              <Sparkles size={16} className="text-[#FF4F00]" />
            </div>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-heading font-medium text-[#111111] tracking-[-0.04em] leading-tight">
            Something new is<br />
            <span className="text-[#E5182B]">taking shape.</span>
          </h1>
          <p className="text-sm text-[#66665F] leading-relaxed max-w-sm mx-auto font-sans">
            Swarmic is under active development. We're not ready to share details yet — but something meaningful is on its way.
          </p>
        </div>

        {/* Status line */}
        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#88887F]">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
          <span>STATUS: IN DEVELOPMENT · NO LAUNCH DATE</span>
        </div>

        {/* Divider */}
        <div className="w-12 h-[1px] bg-[#E2E2DC] mx-auto" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('products')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#111110] text-white text-xs font-medium tracking-wide rounded-full hover:bg-[#2C2C29] transition-all cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Back to Products</span>
          </button>
          <button
            onClick={() => onNavigate('aakashavani')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E2E2DC] text-[#111111] text-xs font-medium tracking-wide rounded-full hover:border-[#111111] hover:bg-[#F4F4F1] transition-all cursor-pointer"
          >
            <span>Explore Aakashavani →</span>
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import PixelGlyph from './PixelGlyph';
import PixelDissolveButton from './PixelDissolveButton';
import PixelUnderlineLink from './PixelUnderlineLink';

export interface HeroProps {
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({ className = '' }) => {
  const [copied, setCopied] = useState(false);
  const installCmd = 'pip install @veiron/model';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      className={`relative w-full pt-16 pb-20 border-b border-[#e2e2dc] overflow-hidden ${className}`}
      style={{ backgroundColor: 'var(--token-3b27429e-42d0-4067-9918-f4d89b9e72fd, #f4f4f1)' }}
    >
      <div className="max-w-[1120px] mx-auto px-6 flex flex-col items-start gap-8">
        {/* Ticker / Live Activity Badge */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#e2e2dc]/80 border border-[#cfcfc7] text-xs font-mono text-[#111111]">
          <span className="w-2 h-2 rounded-full bg-[#ff4f00] animate-pulse" />
          <span className="text-[#66665f]">ACTIVE WORLD MODEL</span>
          <span className="font-semibold text-[#111111]">40,000+ CAUSAL NODES</span>
          <span className="text-[#66665f]">CONTINUOUS EVALUATION</span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="flex flex-col gap-5 max-w-[840px]">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#111111] leading-[1.05]"
            style={{ fontFamily: '"Geist", "Inter", sans-serif' }}
          >
            Complex systems.{' '}
            <span className="text-[#ff4f00] inline-block">One world model.</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-[#66665f] leading-relaxed max-w-[720px]"
            style={{ fontFamily: '"Geist", "Inter", sans-serif' }}
          >
            Veiron builds world models that understand non-linear, continuously
            changing environments. Helping institutions reason, simulate
            counterfactuals, and make decisions under uncertainty.
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <PixelDissolveButton
            label="Request a briefing on your situation"
            href="#access"
            proximity={true}
            reach={160}
            magnetic={true}
            strength={0.3}
          />

          <PixelUnderlineLink
            label="Read the research"
            href="#research"
            decoration="key"
            shortcut="R"
          />
        </div>

        {/* Quick Install SDK Bar */}
        <div className="pt-3 w-full max-w-[420px]">
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#ffffff] border border-[#e2e2dc] shadow-sm font-mono text-xs text-[#111111]">
            <div className="flex items-center gap-2.5">
              <span className="text-[#ff4f00] select-none font-bold">$</span>
              <span className="select-all">{installCmd}</span>
            </div>
            <button
              onClick={handleCopy}
              className="text-xs px-2 py-0.5 bg-[#f4f4f1] border border-[#cfcfc7] hover:border-[#111111] transition-colors cursor-pointer text-[#66665f] hover:text-[#111111]"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Institutional Domains Strip */}
        <div className="w-full pt-16 border-t border-[#e2e2dc] mt-6">
          <p className="text-xs font-mono uppercase tracking-widest text-[#88887f] mb-6">
            Calibrated for institutional environments
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all">
            <div className="font-mono font-bold text-base tracking-widest text-[#111111] flex items-center gap-2">
              <PixelGlyph pattern="router" color="#111111" pixel={2} />
              HEDGE FUNDS
            </div>
            <div className="font-mono font-bold text-base tracking-widest text-[#111111] flex items-center gap-2">
              <PixelGlyph pattern="cube" color="#111111" pixel={2} />
              CENTRAL BANKS
            </div>
            <div className="font-mono font-bold text-base tracking-widest text-[#111111] flex items-center gap-2">
              <PixelGlyph pattern="bolt" color="#111111" pixel={2} />
              SOVEREIGN ASSETS
            </div>
            <div className="font-mono font-bold text-base tracking-widest text-[#111111] flex items-center gap-2">
              <PixelGlyph pattern="cloud" color="#111111" pixel={2} />
              ENERGY NETWORKS
            </div>
            <div className="font-mono font-bold text-base tracking-widest text-[#111111] flex items-center gap-2">
              <PixelGlyph pattern="verify" color="#111111" pixel={2} />
              TREASURY DESKS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

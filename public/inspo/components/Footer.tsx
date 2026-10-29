import React from 'react';
import PixelGlyph from './PixelGlyph';

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer
      className={`w-full bg-[#111110] text-[#f4f4f1] border-t border-[#2c2c29] py-16 ${className}`}
      style={{
        backgroundColor: 'var(--token-c014b93a-5e34-4a27-aeb0-024f5dfb9b25, #111110)',
        borderColor: 'var(--token-54bd0ee1-1b60-475b-8272-698e105678e9, #2c2c29)',
      }}
    >
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#2c2c29]">
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-[#1a1a18] border border-[#2c2c29]">
                <PixelGlyph pattern="logo" color="#ff4f00" pixel={2} />
              </div>
              <span
                className="font-bold text-lg tracking-tight uppercase text-[#ffffff]"
                style={{ fontFamily: '"Geist", "Inter", sans-serif' }}
              >
                Veiron
              </span>
            </div>
            <p className="text-xs text-[#8f8f87] max-w-[320px]">
              AI-native world models that understand complex environments and
              help institutions reason, simulate, and decide under uncertainty.
            </p>
          </div>

          {/* Nav Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 font-mono text-xs">
            <div className="flex flex-col gap-3">
              <span className="text-[#8f8f87] uppercase tracking-wider">World Model</span>
              <a href="#aakashavani" className="text-[#cfcfc7] hover:text-[#ff4f00] no-underline transition-colors">
                Aakashavani
              </a>
              <a href="#methodology" className="text-[#cfcfc7] hover:text-[#ff4f00] no-underline transition-colors">
                Causal Pipeline
              </a>
              <a href="#simulations" className="text-[#cfcfc7] hover:text-[#ff4f00] no-underline transition-colors">
                Forward Rollouts
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[#8f8f87] uppercase tracking-wider">Research</span>
              <a href="#publications" className="text-[#cfcfc7] hover:text-[#ff4f00] no-underline transition-colors">
                Methodology Papers
              </a>
              <a href="#benchmarks" className="text-[#cfcfc7] hover:text-[#ff4f00] no-underline transition-colors">
                Evaluation Hub
              </a>
              <a href="#changelog" className="text-[#cfcfc7] hover:text-[#ff4f00] no-underline transition-colors">
                Model Changelog
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[#8f8f87] uppercase tracking-wider">Deployments</span>
              <a href="#institutional" className="text-[#cfcfc7] hover:text-[#ff4f00] no-underline transition-colors">
                Institutional Core
              </a>
              <a href="#sovereign" className="text-[#cfcfc7] hover:text-[#ff4f00] no-underline transition-colors">
                Sovereign VPC
              </a>
              <a href="#contact" className="text-[#cfcfc7] hover:text-[#ff4f00] no-underline transition-colors">
                Request Access
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Operational Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-mono text-[#8f8f87]">
          <div>© 2026 Veiron Systems, Inc. All rights reserved.</div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1f9d55] animate-pulse" />
              <span className="text-[#cfcfc7]">World Model Active</span>
            </div>
            <span>·</span>
            <span>Continuous Real-Time Convergence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

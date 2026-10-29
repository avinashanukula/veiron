import React from 'react';
import PixelGlyph from './PixelGlyph';

export interface NavbarProps {
  className?: string;
  onCtaClick?: () => void;
}

/**
 * Navbar - Veiron technical header with real-time model convergence status and pixel typography
 */
export const Navbar: React.FC<NavbarProps> = ({ className = '', onCtaClick }) => {
  return (
    <header
      className={`w-full border-b border-[#e2e2dc] bg-[#f4f4f1]/90 backdrop-blur-md sticky top-0 z-50 transition-colors ${className}`}
      style={{ borderColor: 'var(--token-2da7c71e-0478-499a-a3a4-a3a8e8f3f38c, #e2e2dc)' }}
    >
      <div className="max-w-[1120px] mx-auto h-[72px] px-6 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="/"
          className="flex items-center gap-3 no-underline text-[#111111] group"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-[#111110] text-[#f4f4f1] border border-[#2c2c29] transition-transform group-hover:scale-105">
            <PixelGlyph pattern="logo" color="#ff4f00" pixel={2} />
          </div>
          <span
            className="font-bold text-lg tracking-tight uppercase"
            style={{ fontFamily: '"Geist", "Inter", sans-serif' }}
          >
            Veiron
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#66665f]">
          <a
            href="#world-model"
            className="hover:text-[#111111] transition-colors no-underline"
          >
            World Model
          </a>
          <a
            href="#methodology"
            className="hover:text-[#111111] transition-colors no-underline"
          >
            Methodology
          </a>
          <a
            href="#architecture"
            className="hover:text-[#111111] transition-colors no-underline"
          >
            Architecture
          </a>
          <a
            href="#institutions"
            className="hover:text-[#111111] transition-colors no-underline"
          >
            Institutions
          </a>
          <a
            href="#research"
            className="hover:text-[#111111] transition-colors no-underline"
          >
            Research
          </a>
        </nav>

        {/* System Status & CTA */}
        <div className="flex items-center gap-4">
          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 text-xs font-mono bg-[#e2e2dc]/60 border border-[#cfcfc7] text-[#111111]">
            <span className="w-2 h-2 rounded-full bg-[#1f9d55] animate-pulse" />
            <span>MODEL CONVERGED</span>
          </div>

          {/* Action Button */}
          <a
            href="#access"
            onClick={onCtaClick}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#111110] text-[#ffffff] border border-[#111110] hover:bg-[#ff4f00] hover:border-[#ff4f00] transition-colors no-underline cursor-pointer"
          >
            Request access
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

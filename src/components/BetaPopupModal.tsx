import React from 'react';
import { AakashavaniLogo } from './logos/AakashavaniLogo';
import { 
  ArrowRight, 
  X, 
  ShieldCheck, 
  Activity 
} from 'lucide-react';

interface BetaPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOptIn: () => void;
  onSignIn: () => void;
}

export const BetaPopupModal: React.FC<BetaPopupModalProps> = ({
  isOpen,
  onClose,
  onOptIn,
  onSignIn
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111110]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="beta-popup-title"
        className="w-full max-w-xl bg-[#F4F4F1] border border-[#E2E2DC] shadow-[0_20px_60px_rgba(0,0,0,0.18)] rounded-2xl relative overflow-hidden"
      >
        {/* Top Accent Strip */}
        <div className="h-1 w-full bg-gradient-to-r from-[#E5182B] via-[#111110] to-[#E5182B]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8F8F87] hover:text-[#111111] hover:bg-[#E2E2DC]/50 rounded-lg transition-colors cursor-pointer"
          title="Close modal"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Metadata */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#8F8F87]">
              <span className="px-2.5 py-0.5 bg-[#E5182B]/10 text-[#E5182B] font-medium border border-[#E5182B]/20 rounded-full">
                LIMITED COHORT ACCESS
              </span>
              <span>·</span>
              <span className="text-[#111111] font-medium">INSTANCE AKHVNI-0.1.2</span>
              <span>·</span>
              <span>Q3/Q4 2026</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <AakashavaniLogo size={40} showWordmark={false} color="#111111" />
              <div>
                <h3 id="beta-popup-title" className="text-2xl sm:text-3xl font-heading font-medium text-[#111111] tracking-tight">
                  Get Registered for Beta Testing
                </h3>
                <p className="text-xs font-mono text-[#66665F] uppercase tracking-wider mt-0.5">
                  Be part of the early institutional cohort
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base font-sans text-[#333330] leading-relaxed">
            Experience Veiron's financial world model firsthand. Register now to evaluate live adversarial dialectics, inspect recursive belief surfaces, and test custom macroeconomic shock scenarios.
          </p>

          {/* Highlights Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
            <div className="p-3.5 bg-white border border-[#E2E2DC] rounded-xl space-y-1 shadow-sm">
              <div className="font-semibold text-[#111111] flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#E5182B]" />
                <span>5 Specialized Roles</span>
              </div>
              <p className="text-[#66665F] text-[11px] leading-snug">
                Quant Researcher, Macro Risk, FX Trader, Dialectic Evaluator, or Compliance Officer.
              </p>
            </div>

            <div className="p-3.5 bg-white border border-[#E2E2DC] rounded-xl space-y-1 shadow-sm">
              <div className="font-semibold text-[#111111] flex items-center gap-1.5">
                <Activity size={14} className="text-[#E5182B]" />
                <span>Instant Approval Keys</span>
              </div>
              <p className="text-[#66665F] text-[11px] leading-snug">
                Receive role credentials and access letters directly in your dedicated Inbox.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={onOptIn}
              className="w-full py-3.5 px-6 bg-[#E5182B] hover:bg-[#FF2A3D] text-white text-sm font-medium rounded-full shadow-lg shadow-[#E5182B]/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Opt Me In for Beta Testing</span>
              <ArrowRight size={16} />
            </button>

            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                onClick={onSignIn}
                className="font-medium text-[#111111] hover:text-[#E5182B] underline underline-offset-4 transition-colors cursor-pointer"
              >
                Already registered? Sign In here
              </button>

              <button
                onClick={onClose}
                className="text-[#8F8F87] hover:text-[#111111] transition-colors cursor-pointer"
              >
                Dismiss & Continue Browsing
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-white px-6 py-2.5 border-t border-[#E2E2DC] flex items-center justify-between text-[11px] font-mono text-[#8F8F87]">
          <span>VEIRON COGNITIVE ARCHITECTURE</span>
          <span>SR-11-7 COMPLIANT VERIFICATION</span>
        </div>
      </div>
    </div>
  );
};
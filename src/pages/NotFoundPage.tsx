import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { 
  Home, 
  ShieldCheck, 
  ArrowRight, 
  Terminal, 
  AlertTriangle, 
  Compass, 
  Activity, 
  Cpu, 
  RefreshCw 
} from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: Page) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const [requestedPath, setRequestedPath] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [isCalibrating, setIsCalibrating] = useState(false);

  useEffect(() => {
    setRequestedPath(window.location.pathname + window.location.search);
    setTimestamp(new Date().toISOString());
  }, []);

  const handleRecalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      onNavigate('home');
    }, 450);
  };

  return (
    <div className="min-h-[85vh] bg-[#F4F4F1] text-[#111111] flex items-center justify-center py-16 px-4 sm:px-6 border-b border-[#E2E2DC]">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* Top Institutional Badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E2E2DC] text-xs font-mono tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#E5182B] animate-ping" />
            <span className="font-bold text-[#E5182B]">ROUTING EXCEPTION</span>
            <span className="text-[#88887F]">·</span>
            <span className="text-[#111111]">STATE VECTOR OUT OF BOUNDS</span>
          </div>
        </div>

        {/* Central Display Header */}
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <h1 className="text-8xl sm:text-9xl font-heading font-medium tracking-[-0.04em] text-[#111111] select-none">
              404
            </h1>
            <span className="absolute -top-1 -right-4 px-2 py-0.5 bg-[#E5182B] text-white text-[10px] font-mono font-bold uppercase tracking-widest">
              COLLAPSED
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-heading font-medium text-[#111111] tracking-[-0.02em]">
            Unresolved Recursive Manifold Trajectory
          </h2>

          <p className="text-sm sm:text-base text-[#66665F] max-w-xl mx-auto leading-relaxed font-sans">
            The requested trajectory does not exist within the observable institutional state space. 
            The latent vector has either been relocated, purged from the routing registry, or requires elevated clearance.
          </p>
        </div>

        {/* Diagnostic Dossier / Telemetry Terminal */}
        <div className="bg-[#111110] text-white p-5 sm:p-6 border border-[#2C2C29] shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#2C2C29] pb-3 text-xs font-mono text-[#8F8F87]">
            <div className="flex items-center gap-2 text-white">
              <Terminal size={14} className="text-[#FF4F00]" />
              <span className="font-bold tracking-wider">VEIRON // MANIFOLD_EXCEPTION_TRACE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>NON-CONVERGENT</span>
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono text-[#8F8F87]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-[#2C2C29]/60 gap-1">
              <span className="text-[#8F8F87]">REQUESTED_COORDINATE:</span>
              <span className="text-emerald-400 font-semibold break-all">{requestedPath || '/undefined'}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-[#2C2C29]/60 gap-1">
              <span className="text-[#8F8F87]">COLLAPSE_SIGNATURE:</span>
              <span className="text-amber-400">ERR_UNRESOLVED_MANIFOLD_NODE</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-[#2C2C29]/60 gap-1">
              <span className="text-[#8F8F87]">DIAGNOSTIC_TIMESTAMP:</span>
              <span className="text-[#8F8F87]">{timestamp}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 gap-1">
              <span className="text-[#8F8F87]">EPISTEMIC_PRIOR:</span>
              <span className="text-[#E5182B] font-bold">0.0000000000 (ABSOLUTE_UNCERTAINTY)</span>
            </div>
          </div>

          <div className="bg-[#1A1A18] p-3 border border-[#2C2C29] text-[11px] font-mono text-[#8F8F87] flex items-start gap-2">
            <AlertTriangle size={14} className="text-[#FF4F00] shrink-0 mt-0.5" />
            <span>
              Administrator access routes are intentionally hidden from this view. Please use approved internal channels for privileged access requests.
            </span>
          </div>
        </div>

        {/* Action Shortcuts Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Action 1: Return to Root Manifold */}
          <button
            onClick={handleRecalibrate}
            disabled={isCalibrating}
            className="p-5 bg-white hover:bg-[#F4F4F1] border border-[#E2E2DC] hover:border-[#111111] text-left transition-all hover:-translate-y-0.5 cursor-pointer shadow-none group flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[#88887F]">
                <Home size={18} className="text-[#111111] group-hover:text-[#E5182B] transition-colors" />
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="font-heading font-medium text-sm text-[#111111] pt-2">
                Root Manifold
              </div>
              <p className="text-[11px] text-[#66665F] font-sans">
                Re-anchor state to the primary institutional homepage.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#88887F] pt-3 uppercase tracking-wider">
              {isCalibrating ? 'CALIBRATING...' : 'NAVIGATE /'}
            </div>
          </button>

          {/* Action 2: Beta Testing Workspace */}
          <button
            onClick={() => onNavigate('beta-dashboard')}
            className="p-5 bg-white hover:bg-[#F4F4F1] border border-[#E2E2DC] hover:border-[#111111] text-left transition-all hover:-translate-y-0.5 cursor-pointer shadow-none group flex flex-col justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[#88887F]">
                <ShieldCheck size={18} className="text-[#E5182B]" />
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="font-heading font-medium text-sm text-[#111111] pt-2">
                Beta Workspace
              </div>
              <p className="text-[11px] text-[#66665F] font-sans">
                Test Aakashavani Instance 01 and submit continuous evaluations.
              </p>
            </div>
            <div className="text-[10px] font-mono text-[#88887F] pt-3 uppercase tracking-wider">
              NAVIGATE /BETA-TESTING
            </div>
          </button>
        </div>

        {/* Secondary Quick Jump Directory */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#88887F] pt-2">
          <span>OR EXPLORE MANIFOLD NODES:</span>
          <button onClick={() => onNavigate('aakashavani')} className="text-[#111111] hover:text-[#E5182B] underline cursor-pointer">
            Aakashavani Model
          </button>
          <span>·</span>
          <button onClick={() => onNavigate('approach')} className="text-[#111111] hover:text-[#E5182B] underline cursor-pointer">
            Approach & Dialectics
          </button>
          <span>·</span>
          <button onClick={() => onNavigate('applications')} className="text-[#111111] hover:text-[#E5182B] underline cursor-pointer">
            Institutional Applications
          </button>
          <span>·</span>
          <button onClick={() => onNavigate('contact')} className="text-[#111111] hover:text-[#E5182B] underline cursor-pointer">
            Institutional Briefing
          </button>
        </div>

      </div>
    </div>
  );
};

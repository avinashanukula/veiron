import React, { useState } from 'react';
import { Page } from '../types';
import { useAuth } from '../context/AuthContext';
import { getBetaRoleInfo } from '../data/betaRoles';
import { AakashavaniLogo } from '../components/logos/AakashavaniLogo';
import { SimulationConsole } from '../components/SimulationConsole';
import { ModelEvaluationHub } from '../components/ModelEvaluationHub';
import { HorizonBanner } from '../components/HorizonBanner';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Activity, 
  ShieldCheck, 
  RefreshCw,
  Lock
} from 'lucide-react';

interface AakashavaniPageProps {
  onNavigate: (page: Page) => void;
}

export const AakashavaniPage: React.FC<AakashavaniPageProps> = ({ onNavigate }) => {
  const { currentUser, launchLiveBeta, refreshUserStatus } = useAuth();
  const [isRefreshingStatus, setIsRefreshingStatus] = useState(false);

  const handleRefreshStatus = async () => {
    setIsRefreshingStatus(true);
    try {
      await refreshUserStatus();
    } finally {
      setIsRefreshingStatus(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F1] text-[#111111]">
      
      {/* SECTION 01: Hero Header matching Overview 02 Hero Text structure */}
      <section className="w-full border-b border-[#E2E2DC]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Index Column */}
          <div className="hidden md:flex w-24 border-r border-[#E2E2DC] p-8 shrink-0 flex-col justify-start">
            <span className="font-mono text-xs text-[#8F8F87]">01</span>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 sm:p-10 md:p-16 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#8F8F87]">
                  <span className="px-2.5 py-0.5 bg-[#FF4F00]/10 text-[#FF4F00] border border-[#FF4F00]/20 rounded-full font-medium">
                    VEIRON WORLD MODEL · INSTANCE 01
                  </span>
                  <span>·</span>
                  <span className="text-[#111111]">AKHVNI-0.1.2</span>
                </div>

                <div className="flex items-center gap-4">
                  <AakashavaniLogo size={64} showWordmark={false} color="#111111" />
                  <div>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-medium text-[#111111] tracking-[-0.04em] leading-[1.0]">
                      Aakashavani
                    </h1>
                    <p className="text-sm font-mono text-[#66665F] uppercase tracking-wider mt-1">
                      A World Model for Financial Intelligence
                    </p>
                  </div>
                </div>

                <p className="text-base sm:text-xl font-sans text-[#474540] leading-relaxed max-w-2xl">
                  Veiron's first world-model prototype for financial environments. The market is not a static equation or an NLP query box; it is an interconnected, living, continuous system.
                </p>

                <div className="p-4 bg-white border border-[#E2E2DC] text-sm text-[#474540] font-sans leading-relaxed">
                  <span className="font-semibold text-[#111111]">Core Thesis: </span>
                  Aakashavani continuously builds a probabilistic understanding of the market, investigates competing explanations, uses specialized AI reasoning systems, challenges its own conclusions, verifies outputs, and produces an evolving decision state.
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => launchLiveBeta(onNavigate)}
                    className="px-6 py-3 bg-[#FF4F00] hover:bg-[#E54500] text-white text-xs font-sans font-medium rounded-full shadow-lg shadow-[#FF4F00]/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95 group"
                  >
                    <Activity size={15} className="text-white group-hover:scale-110 transition-transform" />
                    <span>Preview Beta Version</span>
                    <ArrowUpRight size={14} className="text-white/80 group-hover:text-white transition-colors" />
                  </button>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-5 py-3 text-sm text-[#474540] hover:text-[#111111] font-sans font-medium transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Prototype Briefing</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

              {/* System Metrics Sidebar Card */}
              <div className="lg:col-span-4 bg-white border border-[#E2E2DC] p-6 space-y-4 shadow-sm">
                <div className="font-mono text-xs text-[#8F8F87] uppercase tracking-wider pb-3 border-b border-[#E2E2DC]">
                  <span>SYSTEM METRICS</span>
                </div>
                <div className="space-y-3 font-mono text-xs text-[#474540]">
                  <div className="flex justify-between">
                    <span className="text-[#8F8F87]">SYSTEM BUILD:</span>
                    <span className="text-[#111111] font-medium">AKHVNI-0.1.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8F8F87]">ENVIRONMENT:</span>
                    <span className="text-[#111111] font-medium">GLOBAL_MACRO_FX</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8F8F87]">EPISTEMIC UNCERTAINTY:</span>
                    <span className="text-[#111111]">0.142 (BOUNDED)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8F8F87]">RECURSIVE CYCLE:</span>
                    <span className="text-[#111111]">14.8ms CONTINUOUS</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#E2E2DC] text-[11px] font-mono text-[#8F8F87]">
                  "The world changes. The model changes with it."
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: Interactive Simulation Console */}
      <section id="simulation-section" className="w-full border-b border-[#E2E2DC]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Index Column */}
          <div className="hidden md:flex w-24 border-r border-[#E2E2DC] p-8 shrink-0 flex-col justify-start">
            <span className="font-mono text-xs text-[#8F8F87]">02</span>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 sm:p-10 md:p-16 space-y-8">
            <div className="space-y-3 max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-widest text-[#FF4F00] font-medium">
                INTERACTIVE WORLD MODEL SIMULATOR
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-medium text-[#111111] tracking-[-0.03em] leading-[1.08]">
                Aakashavani In Action: Resolving Uncertainty in Real Time
              </h2>
              <p className="text-sm sm:text-base text-[#66665F] font-sans">
                Test real institutional market shock scenarios to observe how Aakashavani establishes competing hypotheses, runs adversarial dialectics, and updates its decision state.
              </p>
            </div>

            {/* Beta Session Clearance Status Strip */}
            <div className="p-4 bg-white border border-[#E2E2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              {currentUser ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${currentUser.approvalStatus === 'approved' ? 'bg-[#111110] text-white' : 'bg-amber-100 text-amber-900 border border-amber-300'}`}>
                      {currentUser.approvalStatus === 'approved' ? (
                        <ShieldCheck size={18} className="text-[#FF4F00]" />
                      ) : (
                        <Lock size={18} className="text-amber-700" />
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="font-semibold text-[#111110]">AUTHORIZED BETA SESSION:</span>
                        {currentUser.approvalStatus === 'approved' ? (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-medium rounded-full border border-emerald-300">
                            APPROVED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-medium rounded-full border border-amber-300">
                            PENDING MANUAL SUPABASE APPROVAL
                          </span>
                        )}
                        <span className="text-[#8F8F87]">· {currentUser.clearanceCode}</span>
                      </div>
                      <div className="text-xs text-[#66665F] font-sans">
                        {currentUser.approvalStatus === 'approved' ? (
                          <>Auditing as <span className="font-semibold text-[#111110]">{getBetaRoleInfo(currentUser.role).title}</span> ({currentUser.institution || 'Institutional Desk'})</>
                        ) : (
                          <>Role <span className="font-semibold text-[#111110]">{getBetaRoleInfo(currentUser.role).title}</span> pending administrator review in the Supabase Table Editor. Live simulations locked.</>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentUser.approvalStatus === 'approved' ? (
                      <button
                        onClick={() => launchLiveBeta(onNavigate)}
                        className="px-5 py-2.5 bg-[#FF4F00] hover:bg-[#E54500] text-white text-xs font-medium rounded-full transition-all shrink-0 cursor-pointer shadow-sm flex items-center gap-2"
                      >
                        <Activity size={14} />
                        <span>Launch Live Simulation Desk</span>
                        <ArrowUpRight size={13} />
                      </button>
                    ) : (
                      <button
                        onClick={handleRefreshStatus}
                        disabled={isRefreshingStatus}
                        className="px-4 py-2 bg-[#111110] hover:bg-[#2C2C29] disabled:opacity-50 text-white text-xs font-medium rounded-full transition-all shrink-0 cursor-pointer shadow-sm flex items-center gap-2"
                        title="Check if administrator has approved your record in Supabase Table Editor"
                      >
                        <RefreshCw size={13} className={isRefreshingStatus ? 'animate-spin text-[#FF4F00]' : ''} />
                        <span>{isRefreshingStatus ? 'Checking Supabase...' : 'Refresh Approval Status'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F4F4F1] border border-[#E2E2DC] rounded text-[#8F8F87]">
                      <Activity size={18} />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 font-mono text-xs text-[#8F8F87]">
                        <span className="font-semibold text-[#111110]">GUEST BETA PREVIEW</span>
                        <span>·</span>
                        <span>PUBLIC TELEMETRY STREAM</span>
                      </div>
                      <div className="text-xs text-[#66665F] font-sans">
                        Institutional authentication is required to access live simulation capabilities and shock injection controls.
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('auth')}
                    className="px-4 py-2 bg-[#FF4F00] hover:bg-[#E54500] text-white text-xs font-medium rounded-full transition-all shrink-0 cursor-pointer shadow-sm"
                  >
                    Opt-In for Beta Testing
                  </button>
                </div>
              )}
            </div>

            <SimulationConsole />
          </div>
        </div>
      </section>

      {/* SECTION 03: Full Transparency & Model Evaluation Hub */}
      <section className="w-full border-b border-[#E2E2DC]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Index Column */}
          <div className="hidden md:flex w-24 border-r border-[#E2E2DC] p-8 shrink-0 flex-col justify-start">
            <span className="font-mono text-xs text-[#8F8F87]">03</span>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 sm:p-10 md:p-16">
            <ModelEvaluationHub />
          </div>
        </div>
      </section>

      {/* SECTION 04: Signature Dark CTA Section matching inspo Final CTA */}
      <HorizonBanner 
        indexNumber="04"
        tag="PILOT DEPLOYMENT"
        headline="Deploy Aakashavani in Your Fund or Desk"
        subtext="Contact the research and engineering team for private instance deployment and proprietary venue data ingestion."
        ctaText="Request Institutional Pilot"
        ctaPage="contact"
        onNavigate={onNavigate}
      />
    </div>
  );
};
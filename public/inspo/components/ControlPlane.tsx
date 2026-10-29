import React, { useState } from 'react';
import PixelGlyph from './PixelGlyph';

export interface ControlPlaneProps {
  className?: string;
}

export const ControlPlane: React.FC<ControlPlaneProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'belief' | 'causal' | 'simulate'>('belief');

  return (
    <section
      className={`relative w-full py-20 bg-[#111110] text-[#f4f4f1] border-b border-[#2c2c29] overflow-hidden ${className}`}
      style={{
        backgroundColor: 'var(--token-c014b93a-5e34-4a27-aeb0-024f5dfb9b25, #111110)',
        borderColor: 'var(--token-54bd0ee1-1b60-475b-8272-698e105678e9, #2c2c29)',
      }}
    >
      <div className="max-w-[1120px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff4f00] uppercase tracking-wider mb-2">
              <PixelGlyph pattern="router" color="#ff4f00" pixel={2} />
              <span>LIVING COGNITIVE ARCHITECTURE</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#ffffff]"
              style={{ fontFamily: '"Geist", "Inter", sans-serif' }}
            >
              Causal understanding and simulation in real time.
            </h2>
          </div>
          <p className="text-sm text-[#8f8f87] max-w-[420px] leading-relaxed">
            Every streaming signal, macro revision, and order book shock updates
            probabilistic belief states with continuous sub-millisecond precision.
          </p>
        </div>

        {/* The Main Control Plane Console Window */}
        <div className="border border-[#2c2c29] bg-[#1a1a18] shadow-2xl rounded-none overflow-hidden">
          {/* Window Title Bar */}
          <div className="h-12 bg-[#111110] border-b border-[#2c2c29] px-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff4f00]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#2c2c29]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#2c2c29]" />
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-[#8f8f87]">
                <span>model_state:</span>
                <span className="text-[#ffffff]">akhvni_0.1.2</span>
                <span className="text-[#1f9d55] ml-2">● CONVERGED</span>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 font-mono text-xs">
              <button
                onClick={() => setActiveTab('belief')}
                className={`px-3 py-1 cursor-pointer transition-colors ${
                  activeTab === 'belief'
                    ? 'bg-[#2c2c29] text-[#ffffff]'
                    : 'text-[#8f8f87] hover:text-[#ffffff]'
                }`}
              >
                Belief State
              </button>
              <button
                onClick={() => setActiveTab('causal')}
                className={`px-3 py-1 cursor-pointer transition-colors ${
                  activeTab === 'causal'
                    ? 'bg-[#2c2c29] text-[#ffffff]'
                    : 'text-[#8f8f87] hover:text-[#ffffff]'
                }`}
              >
                Causal Graph
              </button>
              <button
                onClick={() => setActiveTab('simulate')}
                className={`px-3 py-1 cursor-pointer transition-colors ${
                  activeTab === 'simulate'
                    ? 'bg-[#2c2c29] text-[#ffffff]'
                    : 'text-[#8f8f87] hover:text-[#ffffff]'
                }`}
              >
                Forward Rollouts
              </button>
            </div>
          </div>

          {/* Console Body */}
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#2c2c29]">
            {/* Col 1 & 2: Pipeline Diagram & Logs */}
            <div className="lg:col-span-2 p-6 flex flex-col gap-6">
              {/* Pipeline Nodes Flow */}
              <div className="p-4 bg-[#111110] border border-[#2c2c29]">
                <div className="text-xs font-mono text-[#8f8f87] mb-3 uppercase tracking-wider">
                  Causal Reasoning Pipeline
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 border border-[#2c2c29] bg-[#1a1a18]">
                    <div className="text-[#8f8f87]">01. INGEST</div>
                    <div className="text-[#ffffff] font-semibold mt-1">Multi-Modal Streams</div>
                  </div>
                  <div className="p-2.5 border border-[#ff4f00] bg-[#ff4f00]/10 text-[#ffffff]">
                    <div className="text-[#ff4f00]">02. BELIEF</div>
                    <div className="font-semibold mt-1">Causal Graph (4.2ms)</div>
                  </div>
                  <div className="p-2.5 border border-[#2c2c29] bg-[#1a1a18]">
                    <div className="text-[#8f8f87]">03. SIMULATE</div>
                    <div className="text-[#ffffff] font-semibold mt-1">Counterfactual Stress</div>
                  </div>
                  <div className="p-2.5 border border-[#1f9d55] bg-[#1f9d55]/10 text-[#ffffff]">
                    <div className="text-[#1f9d55]">04. DECIDE</div>
                    <div className="font-semibold mt-1">Verified Policy Action</div>
                  </div>
                </div>
              </div>

              {/* Terminal Logs */}
              <div className="font-mono text-xs text-[#cfcfc7] bg-[#111110] border border-[#2c2c29] p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-[#8f8f87] border-b border-[#2c2c29] pb-2 mb-1">
                  <span>CAUSAL INFERENCE STREAM</span>
                  <span>FILTER: ALL REGIME TRANSITIONS</span>
                </div>
                <div className="text-[#8f8f87]">
                  [00:00.002] <span className="text-[#ffffff]">INGESTION</span> Aggregated 14,200 cross-asset observations from continuous tape
                </div>
                <div>
                  [00:00.012] <span className="text-[#ff4f00]">[CAUSAL]</span> Detected non-linear shift in swap spread transmission
                </div>
                <div>
                  [00:00.024] <span className="text-[#1f9d55]">[DEBATE]</span> Evaluated 3 competing causal hypotheses for liquidity contraction
                </div>
                <div className="text-[#ff4f00] bg-[#ff4f00]/10 p-1 border-l-2 border-[#ff4f00]">
                  [00:00.038] [SIMULATE] 5,000 forward rollouts: Hypothesis B survives under energy spread stress test
                </div>
                <div>
                  [00:00.042] <span className="text-[#1f9d55]">[DECISION]</span> Emitted recommended duration hedge with explicit invalidation trigger
                </div>
                <div className="text-[#8f8f87]">
                  [00:00.046] [FEEDBACK] Realized tick observations updating Bayesian state for subsequent interval
                </div>
              </div>
            </div>

            {/* Col 3: Side Metrics & Epistemic Guards */}
            <div className="p-6 bg-[#111110] flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-5">
                <div className="text-xs font-mono text-[#8f8f87] uppercase tracking-wider">
                  Belief State Convergence
                </div>

                <div className="flex flex-col gap-1 border-b border-[#2c2c29] pb-4">
                  <span className="text-xs text-[#8f8f87]">State Update Latency</span>
                  <div className="text-3xl font-bold font-mono text-[#ffffff]">
                    4.2 <span className="text-sm font-normal text-[#8f8f87]">ms</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 border-b border-[#2c2c29] pb-4">
                  <span className="text-xs text-[#8f8f87]">Hypothesis Invalidation Precision</span>
                  <div className="text-3xl font-bold font-mono text-[#1f9d55]">
                    99.4%
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[#8f8f87]">Downside Risk Envelope</span>
                  <div className="text-3xl font-bold font-mono text-[#ff4f00]">
                    -68% <span className="text-xs font-normal text-[#8f8f87]">variance</span>
                  </div>
                </div>
              </div>

              {/* Hardware / Engine Chip */}
              <div className="p-3 bg-[#1a1a18] border border-[#2c2c29] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <PixelGlyph pattern="shield" color="#1f9d55" pixel={2} />
                  <span className="text-[#cfcfc7]">EPISTEMIC SAFETY</span>
                </div>
                <span className="text-[#1f9d55]">ENFORCED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ControlPlane;

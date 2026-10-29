import React from 'react';
import PixelGlyph from './PixelGlyph';

export interface FeatureGridProps {
  className?: string;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ className = '' }) => {
  const features = [
    {
      title: 'Causal Transmission Graphs',
      category: 'CAUSALITY',
      description:
        'Discovers the structural transmission mechanisms driving complex systems rather than relying on brittle, surface-level correlations.',
      glyph: 'verify' as const,
    },
    {
      title: 'Belief State Tracking',
      category: 'BAYESIAN INFERENCE',
      description:
        'Maintains continuous probability distributions across latent market states instead of making fragile single-point forecasts.',
      glyph: 'cost' as const,
    },
    {
      title: 'Counterfactual Rollout Engine',
      category: 'SIMULATION',
      description:
        'Simulates proposed decisions across thousands of synthetic stress branches to measure downstream tail risks before capital is committed.',
      glyph: 'router' as const,
    },
    {
      title: 'Dialectical Red-Teaming',
      category: 'REASONING',
      description:
        'Pits competing models against each other in structured debate, forcing the system to actively challenge its own working hypotheses.',
      glyph: 'trace' as const,
    },
    {
      title: 'Explicit Invalidation Triggers',
      category: 'EPISTEMIC SAFETY',
      description:
        'Every decision outputs the exact empirical observations that would prove the model wrong, automatically halting exposure if triggered.',
      glyph: 'models' as const,
    },
    {
      title: 'Air-Gapped Sovereign Deployment',
      category: 'GOVERNANCE',
      description:
        'Deploy entirely within institutional VPCs or sovereign on-premises infrastructure. Zero telemetry, order flow, or proprietary data leaves your perimeter.',
      glyph: 'lock' as const,
    },
  ];

  return (
    <section
      className={`w-full py-24 border-b border-[#e2e2dc] bg-[#f4f4f1] ${className}`}
      style={{
        backgroundColor: 'var(--token-3b27429e-42d0-4067-9918-f4d89b9e72fd, #f4f4f1)',
        borderColor: 'var(--token-2da7c71e-0478-499a-a3a4-a3a8e8f3f38c, #e2e2dc)',
      }}
    >
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="max-w-[720px] mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff4f00] uppercase tracking-wider mb-2">
            <PixelGlyph pattern="shield" color="#ff4f00" pixel={2} />
            <span>ARCHITECTURE</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]"
            style={{ fontFamily: '"Geist", "Inter", sans-serif' }}
          >
            Engineered for high-stakes institutional environments.
          </h2>
          <p className="text-base sm:text-lg text-[#66665f] mt-4 leading-relaxed">
            Core architectural primitives designed for institutions managing
            capital, systemic risk, and complex infrastructure under uncertainty.
          </p>
        </div>

        {/* Features 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#e2e2dc] bg-[#ffffff]">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-8 border-r border-b border-[#e2e2dc] flex flex-col justify-between min-h-[260px] hover:bg-[#f4f4f1]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono tracking-widest uppercase text-[#88887f]">
                    {item.category}
                  </span>
                  <PixelGlyph pattern={item.glyph} color="#111111" pixel={3} />
                </div>
                <h3 className="text-lg font-bold text-[#111111] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#66665f] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;

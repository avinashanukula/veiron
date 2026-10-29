import React from 'react';
import PixelGlyph from './PixelGlyph';

export interface TheProblemProps {
  className?: string;
}

export const TheProblem: React.FC<TheProblemProps> = ({ className = '' }) => {
  const painPoints = [
    {
      stat: '01',
      label: 'Fragmented dashboards',
      description: 'Every desk relies on isolated charts with no shared model of underlying causal reality.',
      glyph: 'scripts' as const,
    },
    {
      stat: '04',
      label: 'Counterfactual simulations',
      description: 'Standard statistical models forecast a single number, unable to simulate "what-if" regime shifts.',
      glyph: 'models' as const,
    },
    {
      stat: '95%',
      label: 'Correlation fragility',
      description: 'Linear regressions and historical baselines break the moment systemic market dynamics change.',
      glyph: 'alert' as const,
    },
    {
      stat: '04',
      label: 'Self-critical debate',
      description: 'Standard AI models output fluent predictions without challenging their own conclusions or defining invalidation rules.',
      glyph: 'verify' as const,
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
        {/* Header */}
        <div className="max-w-[680px] mb-16">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ff4f00] uppercase tracking-wider mb-2">
            <PixelGlyph pattern="alert" color="#ff4f00" pixel={2} />
            <span>THE GAP</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]"
            style={{ fontFamily: '"Geist", "Inter", sans-serif' }}
          >
            Static systems break when reality shifts.
          </h2>
          <p className="text-base sm:text-lg text-[#66665f] mt-4 leading-relaxed">
            When environments change, retrospective charts and reactive chat
            assistants collapse into hallucinations. Complex institutions need
            causal understanding, counterfactual depth, and continuous model
            evolution.
          </p>
        </div>

        {/* 4 Pain Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-[#e2e2dc] bg-[#ffffff]">
          {painPoints.map((item, idx) => (
            <div
              key={idx}
              className="p-8 border-r border-b border-[#e2e2dc] flex flex-col justify-between min-h-[220px] hover:bg-[#f4f4f1]/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-4xl font-bold font-mono text-[#111111]"
                  style={{ fontFamily: '"Martian Mono", monospace' }}
                >
                  {item.stat}
                </span>
                <PixelGlyph pattern={item.glyph} color="#66665f" pixel={2} />
              </div>
              <div>
                <h3 className="font-semibold text-base text-[#111111] mb-1">
                  {item.label}
                </h3>
                <p className="text-xs text-[#66665f] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Solution Callout Card */}
        <div className="mt-12 p-8 bg-[#111110] border border-[#2c2c29] text-[#ffffff] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#ff4f00] flex items-center justify-center shrink-0">
              <PixelGlyph pattern="verify" color="#111110" pixel={3} />
            </div>
            <div>
              <div className="text-xs font-mono text-[#ff4f00] uppercase tracking-wider">
                WITH VEIRON
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight">
                Causal, self-testing, and simulated in 4.2ms.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-[#8f8f87]">
            <div>
              <span className="text-[#ffffff] font-bold">BAYESIAN</span> PRIORS
            </div>
            <div>
              <span className="text-[#1f9d55] font-bold">ADVERSARIAL</span> DEBATE
            </div>
            <div>
              <span className="text-[#ff4f00] font-bold">BOUNDED</span> RISK
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheProblem;

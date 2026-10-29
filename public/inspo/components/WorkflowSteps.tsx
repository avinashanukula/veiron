import React from 'react';
import PixelGlyph from './PixelGlyph';

export interface WorkflowStepsProps {
  className?: string;
}

export const WorkflowSteps: React.FC<WorkflowStepsProps> = ({ className = '' }) => {
  const steps = [
    {
      num: '01',
      title: 'Observe the environment',
      subtitle: 'Multi-Modal Signal Alignment',
      description:
        'Ingest continuous order book flows, macroeconomic indicators, yield curves, and regulatory filings into an aligned high-dimensional observation space.',
      glyph: 'plug' as const,
      snippet: `import { WorldModel, Environment } from '@veiron/core';\nconst model = new WorldModel({ env: Environment.FINANCIAL });\nmodel.observe(['rates', 'liquidity', 'filings']);`,
    },
    {
      num: '02',
      title: 'Construct causal belief states',
      subtitle: 'Bayesian Dynamics & Causal Graphs',
      description:
        'Constructs living causal graphs mapping what drives what, isolating temporary noise from genuine structural regime shifts.',
      glyph: 'router' as const,
      snippet: `const graph = model.inferCausalGraph({ window: '30d' });\nconst belief = model.currentBeliefState();\nconsole.log(belief.regime, belief.probabilitySpread);`,
    },
    {
      num: '03',
      title: 'Reason & adversarial debate',
      subtitle: 'Dialectical Stress Testing',
      description:
        'Dispatches specialized analytical models with competing hypotheses to challenge conclusions before recommendations are accepted.',
      glyph: 'verify' as const,
      snippet: `const theses = model.generateCompetingHypotheses();\nconst verifiedThesis = model.redTeam(theses, {\n  adversarialDebate: true\n});`,
    },
    {
      num: '04',
      title: 'Simulate & decide under uncertainty',
      subtitle: 'Forward Rollouts & Invalidation Rules',
      description:
        'Runs counterfactual rollouts across thousands of stress paths, outputting optimal decisions with explicit empirical invalidation triggers.',
      glyph: 'trace' as const,
      snippet: `const decision = model.simulatePolicy({\n  policy: 'duration_hedge',\n  horizon: '14d'\n});\nconsole.log(decision.action, decision.invalidationTriggers);`,
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
            <PixelGlyph pattern="tool" color="#ff4f00" pixel={2} />
            <span>METHODOLOGY</span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#111111]"
            style={{ fontFamily: '"Geist", "Inter", sans-serif' }}
          >
            From raw observations to institutional decisions.
          </h2>
          <p className="text-base sm:text-lg text-[#66665f] mt-4 leading-relaxed">
            A continuous closed loop that learns how the real world behaves and
            simulates counterfactual outcomes before recommending action.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#ffffff] border border-[#e2e2dc] flex flex-col justify-between gap-6 hover:border-[#111110] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold px-2 py-1 bg-[#111110] text-[#ffffff]">
                    STAGE {step.num}
                  </span>
                  <PixelGlyph pattern={step.glyph} color="#ff4f00" pixel={3} />
                </div>
                <h3 className="text-xl font-bold text-[#111111]">
                  {step.title}
                </h3>
                <div className="text-xs font-mono text-[#ff4f00] mt-1 mb-3">
                  {step.subtitle}
                </div>
                <p className="text-sm text-[#66665f] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Code preview block */}
              <div className="p-3 bg-[#111110] border border-[#2c2c29] text-[#cfcfc7] font-mono text-xs overflow-x-auto select-all">
                <pre className="m-0 leading-normal">{step.snippet}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSteps;

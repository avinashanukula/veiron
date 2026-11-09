import React from 'react';
import { Page } from '../types';
import { HorizonBanner } from '../components/HorizonBanner';
import { ArrowRight } from 'lucide-react';

interface ApproachPageProps {
  onNavigate: (page: Page) => void;
}

export const ApproachPage: React.FC<ApproachPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F4F4F1] text-[#111111]">
      
      {/* SECTION 01: Hero Section matching Overview 02 Hero Text structure */}
      <section className="w-full border-b border-[#E2E2DC]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Index Column */}
          <div className="hidden md:flex w-24 border-r border-[#E2E2DC] p-8 shrink-0 flex-col justify-start">
            <span className="font-mono text-xs text-[#8F8F87]">01</span>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 sm:p-10 md:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4F00] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4F00]" />
              <span>VEIRON RESEARCH METHODOLOGY</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-medium text-[#111111] tracking-[-0.04em] leading-[1.0]">
              The World-Model Approach
            </h1>

            <p className="text-base sm:text-xl font-sans text-[#474540] leading-relaxed max-w-3xl">
              Why isolated prompts, static dashboards, and chat agents collapse when confronted with the non-linear, reflexive physics of complex institutional systems.
            </p>

            <div className="p-4 bg-white border border-[#E2E2DC] font-mono text-xs text-[#111111] max-w-2xl">
              <span className="text-[#FF4F00] font-bold">THE PARADIGM: </span>
              INFORMATION → UNDERSTANDING → REASONING → SIMULATION → DECISION
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: 5-Stage Cognitive Pipeline */}
      <section className="w-full border-b border-[#E2E2DC]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Index Column */}
          <div className="hidden md:flex w-24 border-r border-[#E2E2DC] p-8 shrink-0 flex-col justify-start">
            <span className="font-mono text-xs text-[#8F8F87]">02</span>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 sm:p-10 md:p-16 space-y-8">
            <div className="space-y-3 max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-widest text-[#FF4F00] font-medium">
                CONTINUOUS PIPELINE
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-medium text-[#111111] tracking-[-0.03em] leading-[1.08]">
                From Raw Signals to Institutional Decisions
              </h2>
            </div>

            <div className="divide-y divide-[#E2E2DC] border border-[#E2E2DC] bg-white">
              {[
                {
                  step: 'STAGE 01',
                  title: 'INFORMATION',
                  subtitle: 'Multi-Modal Ingestion & Alignment',
                  desc: 'Raw observations from disparate channels—level-3 order books, news wires, OTC swap flows, yield curves, and regulatory filings—are ingested into continuous high-dimensional observation manifolds.',
                  detail: 'Eliminates semantic drift between natural language narratives and quantitative price microstructure.'
                },
                {
                  step: 'STAGE 02',
                  title: 'UNDERSTANDING',
                  subtitle: 'Probabilistic Belief States & Causal Graphing',
                  desc: 'The system constructs a causal representation of reality. It maps which variables drive others, establishing structural priors and distinguishing temporary noise from genuine regime shifts.',
                  detail: 'Maintains Bayesian distributions over latent states rather than brittle single-point forecasts.'
                },
                {
                  step: 'STAGE 03',
                  title: 'REASONING',
                  subtitle: 'Specialized Intelligence & Adversarial Red Teaming',
                  desc: 'Dispatches domain-constrained reasoning models to analyze specific angles. Competing hypotheses are systematically generated and pitted against each other in structured dialectical combat.',
                  detail: 'If an analytical thesis fails to explain cross-asset anomalies, it is invalidated immediately.'
                },
                {
                  step: 'STAGE 04',
                  title: 'SIMULATION',
                  subtitle: 'Counterfactual Rollouts & Scenario Branching',
                  desc: 'Before any institutional decision is recommended, the world model runs forward simulations: "What if interest rates rise 50bps while energy spreads widen?" It tracks cascading feedback loops.',
                  detail: 'Tests policy resilience across thousands of synthetic stress paths.'
                },
                {
                  step: 'STAGE 05',
                  title: 'DECISION',
                  subtitle: 'Verified Execution & Closed-Loop Feedback',
                  desc: 'Produces actionable institutional guidance: the optimal decision, the exact evidence supporting it, the quantified residual uncertainty, the downside risk envelope, and the explicit signals that would invalidate it.',
                  detail: 'The outcome of the decision feeds directly back into Stage 01, updating the world model continuously.'
                }
              ].map((stage, idx) => (
                <div key={idx} className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center transition-all duration-200 hover:bg-[#FAF9F5]">
                  <div className="lg:col-span-4 space-y-1">
                    <div className="font-mono text-xs text-[#FF4F00] font-semibold">
                      {stage.step}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#111111] tracking-[-0.02em]">
                      {stage.title}
                    </h3>
                    <div className="font-mono text-[11px] text-[#8F8F87]">
                      {stage.subtitle}
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-2">
                    <p className="text-sm text-[#474540] leading-relaxed font-sans">
                      {stage.desc}
                    </p>
                    <p className="text-xs font-mono text-[#66665F]">
                      ↳ <span className="text-[#111111]">{stage.detail}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: 6 Continuously Maintained States (Bento Grid) */}
      <section className="w-full border-b border-[#E2E2DC]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Index Column */}
          <div className="hidden md:flex w-24 border-r border-[#E2E2DC] p-8 shrink-0 flex-col justify-start">
            <span className="font-mono text-xs text-[#8F8F87]">03</span>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 sm:p-10 md:p-16 space-y-8">
            <div className="space-y-3 max-w-2xl">
              <div className="font-mono text-xs uppercase tracking-widest text-[#FF4F00] font-medium">
                EPISTEMIC STATE MATRIX
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-medium text-[#111111] tracking-[-0.03em] leading-[1.08]">
                What the World Model Maintains at All Times
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#E2E2DC] bg-white">
              {[
                { title: '1. What We Believe Is Happening', desc: 'A synchronized, probabilistic assessment of the current environment. Not a static point prediction, but a state distribution weighted by recent empirical evidence.' },
                { title: '2. Why We Believe It', desc: 'Complete causal transparency. Every assertion points to underlying order flow anomalies, balance sheet revisions, or policy announcements.' },
                { title: '3. Alternative Explanations', desc: 'The model actively tracks minority hypotheses. If the market is rallying, it models whether it is genuine fundamental expansion or a forced short squeeze.' },
                { title: '4. Explicit Uncertainty', desc: 'The system distinguishes between known risks (aleatoric randomness) and gaps in its own knowledge (epistemic uncertainty), preventing false confidence.' },
                { title: '5. Invalidation Thresholds', desc: 'Pre-computed failure criteria. The model defines beforehand: "If 10-year Treasury yields cross 4.85%, this entire thesis is immediately discarded."' },
                { title: '6. What to Investigate Next', desc: 'Active epistemic exploration. The model determines what missing observation would reduce uncertainty the fastest, and directs intelligence toward it.' }
              ].map((item, idx) => (
                <div key={idx} className="p-6 sm:p-8 border-r border-b border-[#E2E2DC] space-y-3 hover:bg-[#FAF9F5] transition-colors duration-150">
                  <div className="font-mono text-xs text-[#FF4F00] font-semibold">
                    ELEMENT 0{idx + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-heading font-medium text-[#111111] tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#66665F] leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: Signature Dark CTA Section matching inspo Final CTA */}
      <HorizonBanner 
        indexNumber="04"
        tag="INTERACTIVE VERIFICATION"
        headline="Experience Aakashavani in Real Time"
        subtext="Observe how Veiron's financial world model ingests market shocks, tests competing hypotheses, and resolves epistemic uncertainty."
        ctaText="Explore Aakashavani"
        ctaPage="aakashavani"
        onNavigate={onNavigate}
      />
    </div>
  );
};
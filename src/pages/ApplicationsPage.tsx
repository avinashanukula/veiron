import React from 'react';
import { Page } from '../types';
import { HorizonBanner } from '../components/HorizonBanner';
import { TrendingUp, Landmark, Building2, Scale } from 'lucide-react';

interface ApplicationsPageProps {
  onNavigate: (page: Page) => void;
}

export const ApplicationsPage: React.FC<ApplicationsPageProps> = ({ onNavigate }) => {
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
          <div className="flex-1 p-6 sm:p-10 md:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4F00] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4F00]" />
              <span>INSTITUTIONAL VERTICALS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-medium text-[#111111] tracking-[-0.04em] leading-[1.0]">
              Institutional Applications
            </h1>

            <p className="text-base sm:text-xl font-sans text-[#474540] leading-relaxed max-w-3xl">
              Veiron builds world models for environments where decisions carry systemic consequence, capital risk is asymmetric, and stationary assumptions fail.
            </p>

            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#8F8F87] pt-2">
              <span className="text-[#111111]">HEDGE FUNDS</span>
              <span>·</span>
              <span className="text-[#111111]">CENTRAL BANKS</span>
              <span>·</span>
              <span className="text-[#111111]">SOVEREIGN WEALTH</span>
              <span>·</span>
              <span className="text-[#111111]">GLOBAL ENTERPRISES</span>
              <span>·</span>
              <span className="text-[#111111]">GOVERNMENTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: Domain Grid (Bento Architecture) */}
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
                PRIMARY VERTICALS
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-medium text-[#111111] tracking-[-0.03em] leading-[1.08]">
                Mission-Critical Capital Environments
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#E2E2DC] bg-white">
              {/* Domain 1 */}
              <div className="p-6 sm:p-8 md:p-10 border-r border-b border-[#E2E2DC] space-y-4 hover:bg-[#FAF9F5] transition-colors duration-150">
                <div className="flex items-center gap-2 font-mono text-xs text-[#FF4F00]">
                  <TrendingUp size={16} />
                  <span>DOMAIN 01 · CAPITAL ALLOCATION</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#111111] tracking-[-0.02em]">
                  Hedge Funds & Quantitative Asset Managers
                </h3>
                <p className="text-sm text-[#474540] leading-relaxed font-sans">
                  Quantitative strategies suffer from alpha decay because statistical relationships discovered in historical backtests fail when market regimes mutate.
                </p>
                <ul className="space-y-2 text-xs font-mono text-[#66665F]">
                  <li>• Continuous regime classification before trailing covariances adapt</li>
                  <li>• Counterfactual portfolio rollouts across 10,000 synthetic paths</li>
                  <li>• Adversarial dialectic red-teaming against dealer gamma traps</li>
                </ul>
              </div>

              {/* Domain 2 */}
              <div className="p-6 sm:p-8 md:p-10 border-r border-b border-[#E2E2DC] space-y-4 hover:bg-[#FAF9F5] transition-colors duration-150">
                <div className="flex items-center gap-2 font-mono text-xs text-[#FF4F00]">
                  <Landmark size={16} />
                  <span>DOMAIN 02 · SYSTEMIC PRUDENTIAL</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#111111] tracking-[-0.02em]">
                  Central Banks & Sovereign Wealth Funds
                </h3>
                <p className="text-sm text-[#474540] leading-relaxed font-sans">
                  Sovereign entities manage systemic stability where policy moves trigger reflexive responses across banking systems and currency markets.
                </p>
                <ul className="space-y-2 text-xs font-mono text-[#66665F]">
                  <li>• Interbank contagion and non-bank liquidity squeeze mapping</li>
                  <li>• Continuous macroprudential stress simulations replacing quarterly static runs</li>
                  <li>• Sovereign bond spread de-anchoring propagation models</li>
                </ul>
              </div>

              {/* Domain 3 */}
              <div className="p-6 sm:p-8 md:p-10 border-r border-b border-[#E2E2DC] space-y-4 hover:bg-[#FAF9F5] transition-colors duration-150">
                <div className="flex items-center gap-2 font-mono text-xs text-[#FF4F00]">
                  <Building2 size={16} />
                  <span>DOMAIN 03 · ENTERPRISE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#111111] tracking-[-0.02em]">
                  Global Corporations & Supply Chains
                </h3>
                <p className="text-sm text-[#474540] leading-relaxed font-sans">
                  Multinational corporates navigate maritime disruptions, currency volatility, and commodity shocks with forward counterfactual rollouts.
                </p>
                <ul className="space-y-2 text-xs font-mono text-[#66665F]">
                  <li>• Dynamic maritime and raw material bottleneck forecasting</li>
                  <li>• Cash-flow FX volatility collar optimization</li>
                  <li>• Strategic capex allocation under uncertain cost of capital</li>
                </ul>
              </div>

              {/* Domain 4 */}
              <div className="p-6 sm:p-8 md:p-10 border-r border-b border-[#E2E2DC] space-y-4 hover:bg-[#FAF9F5] transition-colors duration-150">
                <div className="flex items-center gap-2 font-mono text-xs text-[#FF4F00]">
                  <Scale size={16} />
                  <span>DOMAIN 04 · GEOPOLITICS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#111111] tracking-[-0.02em]">
                  Governments & Sovereign Policy
                </h3>
                <p className="text-sm text-[#474540] leading-relaxed font-sans">
                  Sovereign policymakers anticipate second- and third-order consequences of sanctions, tariffs, trade corridor closures, and subsidies.
                </p>
                <ul className="space-y-2 text-xs font-mono text-[#66665F]">
                  <li>• Sanction blowback simulation across international financial rails</li>
                  <li>• Strategic petroleum and critical mineral supply security</li>
                  <li>• Multi-year counterfactual policy evaluations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: Capability Matrix Table */}
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
                CAPABILITY MATRIX
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-medium text-[#111111] tracking-[-0.03em] leading-[1.08]">
                Institutional Stack Evolution
              </h2>
            </div>

            <div className="overflow-x-auto border border-[#E2E2DC] bg-white">
              <table className="w-full text-left font-sans text-xs">
                <thead className="bg-[#F4F4F1] border-b border-[#E2E2DC] font-mono text-[#66665F]">
                  <tr>
                    <th className="p-4 sm:p-5">CAPABILITY</th>
                    <th className="p-4 sm:p-5 text-[#88887F]">LEGACY DASHBOARDS</th>
                    <th className="p-4 sm:p-5 text-[#88887F]">MULTI-AGENT LLMs</th>
                    <th className="p-4 sm:p-5 text-[#111111] bg-[#FAF9F5] font-semibold border-l border-[#E2E2DC]">
                      VEIRON WORLD MODELS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DC] text-[#474540]">
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-[#111111]">State Representation</td>
                    <td className="p-4 sm:p-5 text-[#88887F]">Static charts & tables</td>
                    <td className="p-4 sm:p-5 text-[#88887F]">Unstructured conversational tokens</td>
                    <td className="p-4 sm:p-5 font-medium text-[#111111] bg-[#FAF9F5] border-l border-[#E2E2DC]">
                      Continuous 12,400-dim manifold tensor
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-[#111111]">Uncertainty Handling</td>
                    <td className="p-4 sm:p-5 text-[#88887F]">None (deterministic displays)</td>
                    <td className="p-4 sm:p-5 text-[#88887F]">Uncalibrated output confidence</td>
                    <td className="p-4 sm:p-5 font-medium text-[#111111] bg-[#FAF9F5] border-l border-[#E2E2DC]">
                      Rigorous epistemic Bayesian bounds
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-[#111111]">Regime Adaptation</td>
                    <td className="p-4 sm:p-5 text-[#88887F]">Catastrophic delay</td>
                    <td className="p-4 sm:p-5 text-[#88887F]">Hallucinates prior patterns</td>
                    <td className="p-4 sm:p-5 font-medium text-[#111111] bg-[#FAF9F5] border-l border-[#E2E2DC]">
                      Sub-20ms assumption purge & re-anchor
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-semibold text-[#111111]">Counterfactual Simulation</td>
                    <td className="p-4 sm:p-5 text-[#88887F]">None (trailing historical only)</td>
                    <td className="p-4 sm:p-5 text-[#88887F]">Unverified natural language stories</td>
                    <td className="p-4 sm:p-5 font-medium text-[#111111] bg-[#FAF9F5] border-l border-[#E2E2DC]">
                      Continuous causal Monte Carlo rollouts
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: Signature Dark CTA Section matching inspo Final CTA */}
      <HorizonBanner 
        indexNumber="04"
        tag="INSTITUTIONAL ENGAGEMENT"
        headline="Deploy Customized Models in Your Institution"
        subtext="Schedule an executive briefing to evaluate deployment topologies, counterfactual testing suites, and private cluster security."
        ctaText="Request Institutional Briefing"
        ctaPage="contact"
        onNavigate={onNavigate}
      />
    </div>
  );
};
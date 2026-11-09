import React from 'react';
import { Page } from '../types';
import { HorizonBanner } from '../components/HorizonBanner';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
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
              <span>VEIRON MISSION & PHILOSOPHY</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-medium text-[#111111] tracking-[-0.04em] leading-[1.0]">
              Build the model of the world.
            </h1>

            <p className="text-base sm:text-xl font-sans text-[#474540] leading-relaxed max-w-3xl">
              Veiron was founded on a simple conviction: modern artificial intelligence is trapped in conversational novelties and static prediction wrappers. We build continuous, AI-native world models for institutions navigating high-stakes complexity.
            </p>

            <div className="p-4 bg-white border border-[#E2E2DC] text-sm text-[#474540] font-sans leading-relaxed max-w-2xl">
              VEIRON is not another chatbot, dashboard, or collection of agents. It is focused on continuously evolving intelligence systems for complex real-world environments.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: 4 Foundational Axioms (Bento Grid) */}
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
                FIRST PRINCIPLES
              </div>
              <h2 className="text-3xl sm:text-5xl font-heading font-medium text-[#111111] tracking-[-0.03em] leading-[1.08]">
                Foundational Epistemics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#E2E2DC] bg-white">
              <div className="p-6 sm:p-8 md:p-10 border-r border-b border-[#E2E2DC] space-y-3 hover:bg-[#FAF9F5] transition-colors duration-150">
                <div className="font-mono text-xs text-[#FF4F00] font-semibold">AXIOM 01</div>
                <h3 className="text-xl font-heading font-medium text-[#111111] tracking-[-0.02em]">Epistemic Humility</h3>
                <p className="text-sm text-[#474540] leading-relaxed font-sans">
                  Standard AI generates confident answers even when hallucinating. In high-stakes institutional settings, false certainty is fatal. Veiron world models explicitly measure and report what is unknown, maintaining bounded probability distributions rather than false claims.
                </p>
              </div>

              <div className="p-6 sm:p-8 md:p-10 border-r border-b border-[#E2E2DC] space-y-3 hover:bg-[#FAF9F5] transition-colors duration-150">
                <div className="font-mono text-xs text-[#FF4F00] font-semibold">AXIOM 02</div>
                <h3 className="text-xl font-heading font-medium text-[#111111] tracking-[-0.02em]">Continuous Evolution</h3>
                <p className="text-sm text-[#474540] leading-relaxed font-sans">
                  The world does not pause between user prompts. Markets fluctuate, supply chains fracture, geopolitical alliances realign. Veiron systems exist in continuous online synchronization with empirical reality. When the world changes, the model changes with it.
                </p>
              </div>

              <div className="p-6 sm:p-8 md:p-10 border-r border-b border-[#E2E2DC] space-y-3 hover:bg-[#FAF9F5] transition-colors duration-150">
                <div className="font-mono text-xs text-[#FF4F00] font-semibold">AXIOM 03</div>
                <h3 className="text-xl font-heading font-medium text-[#111111] tracking-[-0.02em]">Adversarial Rigor</h3>
                <p className="text-sm text-[#474540] leading-relaxed font-sans">
                  No single model or hypothesis is allowed to dictate institutional decisions unchallenged. Every proposed thesis must survive dedicated adversarial red-teaming, dialectical counter-evidence search, and formal verification gates before acceptance into the world state.
                </p>
              </div>

              <div className="p-6 sm:p-8 md:p-10 border-r border-b border-[#E2E2DC] space-y-3 hover:bg-[#FAF9F5] transition-colors duration-150">
                <div className="font-mono text-xs text-[#FF4F00] font-semibold">AXIOM 04</div>
                <h3 className="text-xl font-heading font-medium text-[#111111] tracking-[-0.02em]">Institutional Consequence</h3>
                <p className="text-sm text-[#474540] leading-relaxed font-sans">
                  Consumer software optimizes for casual engagement; Veiron optimizes for asymmetric institutional consequence. Our systems are engineered to withstand stress in environments where wrong decisions cost billions of dollars or destabilize sovereign economies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: Signature Dark CTA Section matching inspo Final CTA */}
      <HorizonBanner 
        indexNumber="03"
        tag="ENGAGE VEIRON"
        headline="Collaborate with Veiron"
        subtext="Reach out directly for institutional briefing requests, research collaborations, or private model deployment inquiries."
        ctaText="Contact the Team"
        ctaPage="contact"
        onNavigate={onNavigate}
      />
    </div>
  );
};
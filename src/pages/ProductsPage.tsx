import React from 'react';
import { Page } from '../types';
import { Activity, Sparkles, ArrowRight, Clock, ArrowUpRight } from 'lucide-react';
import { HorizonBanner } from '../components/HorizonBanner';

interface ProductsPageProps {
  onNavigate: (page: Page) => void;
}

const products = [
  {
    number: '01',
    id: 'swarmic' as Page,
    name: 'Swarmic',
    status: 'Coming Soon',
    statusColor: 'text-amber-800 bg-amber-500/10 border-amber-500/20',
    pipColor: 'bg-amber-500',
    icon: Sparkles,
    tagline: 'Something new is taking shape.',
    description: 'Swarmic is in active development. More details will be shared when the time is right.',
    cta: 'Learn More',
    available: false,
  },
  {
    number: '02',
    id: 'aakashavani' as Page,
    name: 'Aakashavani',
    status: 'Live · Beta',
    statusColor: 'text-emerald-800 bg-emerald-500/10 border-emerald-500/20',
    pipColor: 'bg-[#1F9D55]',
    icon: Activity,
    tagline: 'Financial World Model for Institutions.',
    description:
      'Aakashavani is a real-time financial world model built for institutional research and trading desks. Explore probabilistic market dynamics, recursive belief states, and adversarial scenario simulations.',
    cta: 'Open Aakashavani',
    available: true,
  },
];

export const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F4F4F1] text-[#111111]">
      
      {/* SECTION 01: Hero Header matching Overview 02 Hero Text structure */}
      <section className="w-full border-b border-[#E2E2DC]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Index Column */}
          <div className="hidden md:flex w-24 border-r border-[#E2E2DC] p-8 shrink-0 flex-col justify-start">
            <span className="font-mono text-xs text-[#8F8F87]">01</span>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-6 sm:p-10 md:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4F00] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4F00]" />
              <span>VEIRON PRODUCTS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-medium text-[#111111] tracking-[-0.04em] leading-[1.0]">
              What we're<br className="hidden sm:block" /> building.
            </h1>

            <p className="text-base sm:text-lg text-[#66665F] leading-relaxed font-sans max-w-2xl">
              Veiron is developing a suite of world models for institutions. Each product is engineered from first principles for precision, interpretability, and institutional-grade reliability.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 02: Bento Product Showcase */}
      <section className="w-full border-b border-[#E2E2DC]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Index Column */}
          <div className="hidden md:flex w-24 border-r border-[#E2E2DC] p-8 shrink-0 flex-col justify-start">
            <span className="font-mono text-xs text-[#8F8F87]">02</span>
          </div>

          {/* Products Grid */}
          <div className="flex-1 divide-y divide-[#E2E2DC]">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.id}
                  className={`group relative bg-white transition-all duration-200 ${
                    product.available
                      ? 'hover:bg-[#FAF9F5] cursor-pointer'
                      : 'opacity-95 cursor-default'
                  }`}
                  onClick={() => product.available && onNavigate(product.id)}
                >
                  <div className="p-6 sm:p-10 md:p-12 space-y-5">
                    
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="font-mono text-xs text-[#8F8F87] font-medium shrink-0">
                          {product.number}
                        </div>

                        <div className={`w-10 h-10 flex items-center justify-center border rounded ${
                          product.available ? 'bg-[#111110] border-[#111110]' : 'bg-[#F4F4F1] border-[#E2E2DC]'
                        }`}>
                          <Icon
                            size={18}
                            className={product.available ? 'text-[#FF4F00]' : 'text-[#8F8F87]'}
                          />
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-heading font-medium text-[#111111] tracking-[-0.02em]">
                          {product.name}
                        </h2>
                      </div>

                      {/* Status badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 border text-[11px] font-mono font-medium rounded-full shrink-0 ${product.statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.pipColor} ${product.available ? 'animate-pulse' : ''}`} />
                        <span>{product.status}</span>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-base sm:text-lg font-heading font-normal text-[#292825] pl-13">
                      {product.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-[#66665F] leading-relaxed pl-13 font-sans max-w-3xl">
                      {product.description}
                    </p>

                    {/* CTA */}
                    <div className="pl-13 pt-2">
                      {product.available ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); onNavigate(product.id); }}
                          className="px-5 py-2.5 bg-[#111110] hover:bg-[#2C2C29] text-white text-xs font-sans font-medium rounded-full inline-flex items-center gap-2 cursor-pointer transition-all shadow-sm active:scale-95"
                        >
                          <span>{product.cta}</span>
                          <ArrowRight size={13} />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); onNavigate('swarmic'); }}
                          className="px-4 py-2 border border-[#E2E2DC] hover:border-[#111111] bg-white text-[#66665F] hover:text-[#111111] text-xs font-sans font-medium rounded-full inline-flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Clock size={12} />
                          <span>{product.cta}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 03: Future Pipeline / R&D Notice */}
      <section className="w-full border-b border-[#E2E2DC]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Index Column */}
          <div className="hidden md:flex w-24 border-r border-[#E2E2DC] p-8 shrink-0 flex-col justify-start">
            <span className="font-mono text-xs text-[#8F8F87]">03</span>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 sm:p-10 md:p-12 bg-white">
            <div className="border border-dashed border-[#CFCFC7] p-6 sm:p-8 bg-[#F4F4F1]/50 flex items-start sm:items-center gap-4">
              <div className="w-9 h-9 flex items-center justify-center border border-dashed border-[#CFCFC7] bg-white shrink-0">
                <span className="text-[#8F8F87] text-base font-mono">+</span>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-xs uppercase tracking-widest text-[#8F8F87] font-semibold">
                  More products coming soon
                </div>
                <p className="text-xs sm:text-sm text-[#66665F] font-sans">
                  New world models are in research and development. Stay tuned.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04: Signature Dark CTA Section matching inspo Final CTA */}
      <HorizonBanner 
        indexNumber="04"
        tag="VEIRON COGNITIVE ARCHITECTURE"
        headline="Ship world models that don't break."
        subtext="Deploy continuous, probabilistic world models into your institution with guaranteed determinism and real-time auditability."
        ctaText="Talk to an engineer"
        ctaPage="contact"
        onNavigate={onNavigate}
      />
    </div>
  );
};
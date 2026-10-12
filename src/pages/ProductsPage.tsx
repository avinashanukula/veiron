import React from 'react';
import { Page } from '../types';
import { Activity, Sparkles, ArrowRight, Clock } from 'lucide-react';

interface ProductsPageProps {
  onNavigate: (page: Page) => void;
}

const products = [
  {
    number: '01',
    id: 'swarmic' as Page,
    name: 'Swarmic',
    status: 'Coming Soon',
    statusColor: 'text-amber-700 bg-amber-50 border-amber-200',
    pipColor: 'bg-amber-400',
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
    statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    pipColor: 'bg-emerald-500',
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#141413] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-14">

        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-[#E5182B] font-semibold">
            VEIRON PRODUCTS
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#141413] tracking-tight leading-tight">
            What we're<br className="hidden sm:block" /> building.
          </h1>
          <p className="text-sm text-[#66645E] leading-relaxed">
            Veiron is developing a suite of world models for institutions. Each product is engineered from first principles for precision, interpretability, and institutional-grade reliability.
          </p>
        </div>

        {/* Hairline divider */}
        <div className="border-t border-[#E3E0D8]" />

        {/* Product Cards */}
        <div className="space-y-6">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className={`group relative border-2 bg-white transition-all duration-200 ${
                  product.available
                    ? 'border-[#141413] hover:shadow-[4px_4px_0px_0px_#141413] cursor-pointer'
                    : 'border-[#E3E0D8] cursor-default'
                }`}
                onClick={() => product.available && onNavigate(product.id)}
              >
                <div className="p-6 sm:p-8 space-y-4">

                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* Number */}
                      <div className="font-mono text-xs text-[#87857F] font-semibold shrink-0">
                        {product.number}
                      </div>

                      {/* Icon */}
                      <div className={`w-9 h-9 flex items-center justify-center border ${
                        product.available ? 'bg-[#141413] border-[#141413]' : 'bg-[#F0EEE6] border-[#E3E0D8]'
                      }`}>
                        <Icon
                          size={16}
                          className={product.available ? 'text-[#E5182B]' : 'text-[#87857F]'}
                        />
                      </div>

                      {/* Name */}
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#141413]">
                        {product.name}
                      </h2>
                    </div>

                    {/* Status badge */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 border text-[11px] font-mono font-semibold shrink-0 ${product.statusColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${product.pipColor} ${product.available ? 'animate-pulse' : ''}`} />
                      {product.status}
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm sm:text-base font-serif italic text-[#474540] pl-12">
                    {product.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#66645E] leading-relaxed pl-12">
                    {product.description}
                  </p>

                  {/* CTA */}
                  <div className="pl-12 pt-1">
                    {product.available ? (
                      <button
                        onClick={(e) => { e.stopPropagation(); onNavigate(product.id); }}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[#141413] group-hover:text-[#E5182B] transition-colors cursor-pointer"
                      >
                        <span>{product.cta}</span>
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); onNavigate('swarmic'); }}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[#87857F] hover:text-[#141413] transition-colors cursor-pointer"
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

        {/* Future Products Notice */}
        <div className="border border-dashed border-[#D5D0C5] p-6 bg-[#FAF8F5]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center border border-dashed border-[#C5C2BA]">
              <span className="text-[#87857F] text-sm font-mono">+</span>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#87857F] font-semibold">
                More products coming soon
              </div>
              <p className="text-xs text-[#A19F97] mt-0.5">
                New world models are in research and development. Stay tuned.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

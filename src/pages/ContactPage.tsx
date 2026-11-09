import React, { useState } from 'react';
import { Page } from '../types';
import { Mail, Copy, Check, Clock, Lock, ShieldCheck, ArrowRight, Send } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    institution: '',
    type: 'Hedge Fund / Quantitative Asset Manager',
    email: '',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('avianukula@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <div className="flex-1 p-6 sm:p-10 md:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#FF4F00] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4F00]" />
              <span>INSTITUTIONAL RELATIONS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-medium text-[#111111] tracking-[-0.04em] leading-[1.0]">
              Contact Veiron
            </h1>

            <p className="text-base sm:text-lg text-[#66665F] max-w-xl leading-relaxed font-sans">
              For institutional briefings, prototype evaluation access (AKHVNI-0.1.2), or custom world-model deployment inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 02: Direct Email Channel */}
      <section className="w-full border-b border-[#E2E2DC]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Index Column */}
          <div className="hidden md:flex w-24 border-r border-[#E2E2DC] p-8 shrink-0 flex-col justify-start">
            <span className="font-mono text-xs text-[#8F8F87]">02</span>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 sm:p-10 md:p-16 bg-white space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E2DC]">
              <div>
                <div className="font-mono text-xs text-[#88887F] uppercase tracking-wider">
                  Primary Direct Channel
                </div>
                <div className="text-sm text-[#474540] mt-0.5 font-sans">
                  Direct correspondence with the engineering and research team:
                </div>
              </div>
              <div className="font-mono text-xs text-[#88887F]">
                <span>ENCRYPTED INBOX</span>
              </div>
            </div>

            {/* Email Address Display */}
            <div className="p-6 bg-[#F4F4F1] border border-[#E2E2DC] flex flex-col md:flex-row items-center justify-between gap-6">
              <a
                href="mailto:avianukula@gmail.com"
                className="flex items-center gap-4 text-xl sm:text-2xl font-mono text-[#111111] hover:text-[#FF4F00] transition-colors break-all group"
              >
                <div className="p-3 bg-white border border-[#E2E2DC] text-[#FF4F00] group-hover:scale-105 transition-transform">
                  <Mail size={22} />
                </div>
                <span className="underline underline-offset-4 decoration-[#E2E2DC] group-hover:decoration-[#FF4F00]">
                  avianukula@gmail.com
                </span>
              </a>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleCopyEmail}
                  className="px-4 py-2.5 bg-white hover:bg-[#F4F4F1] text-[#111111] border border-[#E2E2DC] hover:border-[#111111] font-mono text-xs rounded-full transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-[#1F9D55]" />
                      <span className="text-[#1F9D55] font-bold">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>COPY EMAIL</span>
                    </>
                  )}
                </button>

                <a
                  href="mailto:avianukula@gmail.com?subject=Veiron%20Institutional%20Inquiry"
                  className="px-5 py-2.5 bg-[#FF4F00] hover:bg-[#E54500] text-white font-mono text-xs font-medium tracking-wider rounded-full shadow-md shadow-[#FF4F00]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>WRITE EMAIL</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

            {/* SLA Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-[#88887F] pt-2">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#111111]" />
                <span>24-Hour Institutional SLA</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-[#111111]" />
                <span>Mutual NDA Protocols Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#111111]" />
                <span>Air-Gapped Sovereign Cluster</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: Institutional Briefing Request Form */}
      <section className="w-full border-b border-[#E2E2DC]">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row">
          
          {/* Left Index Column */}
          <div className="hidden md:flex w-24 border-r border-[#E2E2DC] p-8 shrink-0 flex-col justify-start">
            <span className="font-mono text-xs text-[#8F8F87]">03</span>
          </div>

          {/* Right Content */}
          <div className="flex-1 p-6 sm:p-10 md:p-16 bg-white space-y-6">
            <div className="border-b border-[#E2E2DC] pb-4">
              <h2 className="text-xl sm:text-2xl font-heading font-medium text-[#111111] tracking-[-0.02em]">
                Request an Institutional Briefing
              </h2>
              <p className="text-xs sm:text-sm text-[#66665F] mt-1 font-sans">
                Share your organization's mandate and primary bottleneck to receive technical evaluation materials tailored to your deployment environment.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#F4F4F1] border border-[#1F9D55]/30 text-center space-y-3 font-mono">
                <div className="inline-flex p-2 bg-[#1F9D55]/10 text-[#1F9D55] rounded-full">
                  <Check size={20} />
                </div>
                <div className="text-[#111111] font-bold text-sm">
                  BRIEFING REQUEST TRANSMITTED
                </div>
                <p className="text-xs text-[#66665F] max-w-md mx-auto font-sans">
                  Thank you. Our institutional team has received your inquiry. We will contact you at <span className="font-semibold text-[#111111]">{formState.email || 'your email'}</span> within 24 hours.
                </p>
                <div className="pt-2">
                  <a href="mailto:avianukula@gmail.com" className="text-xs text-[#FF4F00] underline">
                    Send supplementary material to avianukula@gmail.com
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#474540] font-mono uppercase tracking-wider text-[10px] mb-1.5">
                      Institution / Firm Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bridgewater / Citadel / Bank of England"
                      value={formState.institution}
                      onChange={(e) => setFormState({ ...formState, institution: e.target.value })}
                      className="w-full bg-[#F4F4F1] border border-[#E2E2DC] rounded-lg text-[#111111] px-3.5 py-2.5 focus:border-[#111111] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#474540] font-mono uppercase tracking-wider text-[10px] mb-1.5">
                      Entity Classification
                    </label>
                    <select
                      value={formState.type}
                      onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                      className="w-full bg-[#F4F4F1] border border-[#E2E2DC] rounded-lg text-[#111111] px-3.5 py-2.5 focus:border-[#111111] focus:outline-none transition-colors"
                    >
                      <option value="Hedge Fund / Asset Manager">Hedge Fund / Quantitative Asset Manager</option>
                      <option value="Central Bank / Sovereign Wealth">Central Bank / Sovereign Wealth Fund</option>
                      <option value="Commercial Bank / Prime Broker">Commercial Bank / Prime Broker</option>
                      <option value="Corporate / Supply Chain">Global Enterprise / Supply Chain</option>
                      <option value="Government / Strategic Policy">Government / Strategic Policy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#474540] font-mono uppercase tracking-wider text-[10px] mb-1.5">
                    Institutional Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@institution.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#F4F4F1] border border-[#E2E2DC] rounded-lg text-[#111111] px-3.5 py-2.5 focus:border-[#111111] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#474540] font-mono uppercase tracking-wider text-[10px] mb-1.5">
                    Scope of Inquiry
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your current challenge (e.g. non-stationary regime transition detection, liquidity crisis simulation, or alpha decay)..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#F4F4F1] border border-[#E2E2DC] rounded-lg text-[#111111] px-3.5 py-2.5 focus:border-[#111111] focus:outline-none transition-colors font-sans"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-[11px] text-[#88887F]">
                    Direct institutional disclosure under confidentiality guarantee.
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#111110] hover:bg-[#2C2C29] text-white font-sans text-xs font-medium rounded-full shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Transmit Briefing Request</span>
                    <Send size={12} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
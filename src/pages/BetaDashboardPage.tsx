import React, { useState, useEffect } from 'react';
import { Page, BetaReview } from '../types';
import { useAuth } from '../context/AuthContext';
import { getBetaRoleInfo } from '../data/betaRoles';
import { supabaseService } from '../services/supabaseService';
import { AakashavaniLogo } from '../components/logos/AakashavaniLogo';
import { 
  Activity, 
  ArrowUpRight, 
  ShieldCheck, 
  Lock, 
  RefreshCw, 
  Star, 
  MessageSquare, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Send,
  Building2,
  Key,
  Layers,
  Clock,
  Terminal
} from 'lucide-react';

interface BetaDashboardPageProps {
  onNavigate: (page: Page) => void;
}

export const BetaDashboardPage: React.FC<BetaDashboardPageProps> = ({ onNavigate }) => {
  const { currentUser, launchLiveBeta, refreshUserStatus, sessionToken } = useAuth();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reviews, setReviews] = useState<BetaReview[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  // Review Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<string>('world-model');
  const [reviewTitle, setReviewTitle] = useState('');
  const [testedScenario, setTestedScenario] = useState('');
  const [commentary, setCommentary] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState<string | null>(null);
  const [reviewErrorMsg, setReviewErrorMsg] = useState<string | null>(null);

  // Load reviews on mount
  useEffect(() => {
    if (currentUser?.email) {
      loadReviews(currentUser.email);
    }
  }, [currentUser?.email]);

  const loadReviews = async (email: string) => {
    setIsLoadingReviews(true);
    try {
      const data = await supabaseService.fetchBetaReviews(email);
      setReviews(data);
    } catch (e) {
      console.warn('Failed to load reviews:', e);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshUserStatus();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSuccessMsg(null);
    setReviewErrorMsg(null);

    if (!sessionToken) {
      setReviewErrorMsg('You must be authenticated to submit evaluations.');
      return;
    }

    if (!commentary.trim() || commentary.trim().length < 5) {
      setReviewErrorMsg('Please provide detailed commentary of at least 5 characters.');
      return;
    }

    setIsSubmittingReview(true);
    try {
      const res = await supabaseService.submitBetaReview(sessionToken, {
        rating,
        category,
        title: reviewTitle.trim() || 'Beta Model Evaluation',
        commentary: commentary.trim(),
        testedScenario: testedScenario.trim() || undefined
      });

      setReviewSuccessMsg('Your evaluation has been successfully recorded in the Supabase research database!');
      setReviewTitle('');
      setTestedScenario('');
      setCommentary('');
      setRating(5);

      if (currentUser?.email) {
        await loadReviews(currentUser.email);
      }
    } catch (err: any) {
      setReviewErrorMsg(err?.message || 'Failed to submit review.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const roleInfo = currentUser ? getBetaRoleInfo(currentUser.role) : null;
  const isApproved = currentUser?.approvalStatus === 'approved';

  return (
    <div className="min-h-screen bg-[#F4F4F1] text-[#111111] py-10 sm:py-16 px-4 sm:px-6 border-b border-[#E2E2DC]">
      <div className="max-w-[1120px] mx-auto space-y-10">

        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E2DC]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#E5182B] font-medium tracking-wider uppercase">
              <span className="h-2 w-2 rounded-full bg-[#E5182B] animate-pulse" />
              <span>VEIRON INSTITUTIONAL BETA DASHBOARD</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-medium text-[#111111] tracking-[-0.04em]">
              Beta Testing Workspace
            </h1>
            <p className="text-xs sm:text-sm text-[#66665F] font-sans">
              Execute simulated stress environments, audit cognitive telemetry, and submit continuous evaluations to the Access Committee.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-white hover:bg-[#F4F4F1] border border-[#E2E2DC] hover:border-[#111111] text-xs font-mono font-medium rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-none disabled:opacity-50"
              title="Sync latest approval and session status from Supabase"
            >
              <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-[#E5182B]' : 'text-[#88887F]'} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync Supabase Clearance'}</span>
            </button>
          </div>
        </div>

        {/* Tester Institutional Profile & Clearance Bar */}
        {currentUser && (
          <div className="p-6 bg-white border border-[#E2E2DC] space-y-4 transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E2E2DC]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#111110] text-white flex items-center justify-center font-mono font-bold text-base">
                  {currentUser.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-heading font-medium text-[#111111] tracking-[-0.02em]">
                      {currentUser.fullName}
                    </h3>
                    {isApproved ? (
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-800 text-[10px] font-mono font-semibold border border-emerald-500/30">
                        CLEARANCE APPROVED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-500/10 text-amber-800 text-[10px] font-mono font-semibold border border-amber-500/30">
                        PENDING SUPABASE MANUAL APPROVAL
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#66665F] mt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Building2 size={12} className="text-[#88887F]" />
                      {currentUser.institution || 'Institutional Desk'}
                    </span>
                    <span>·</span>
                    <span className="text-[#111111] font-medium">
                      {roleInfo?.title} [{roleInfo?.badge}]
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-[#E5182B]">
                      <Key size={12} />
                      {currentUser.clearanceCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Callout Pill */}
              <div className="flex items-center gap-2">
                {isApproved ? (
                  <button
                    onClick={() => launchLiveBeta(onNavigate)}
                    className="px-5 py-2.5 bg-[#E5182B] hover:bg-[#FF2A3D] text-white text-xs font-semibold rounded-full transition-all shadow-[0_4px_16px_rgba(229,24,43,0.35)] flex items-center gap-2 cursor-pointer"
                  >
                    <Activity size={14} />
                    <span>Launch Live Simulation Desk</span>
                    <ArrowUpRight size={13} />
                  </button>
                ) : (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs flex items-center gap-2 max-w-md font-sans">
                    <Lock size={15} className="text-amber-700 shrink-0" />
                    <span>
                      Live desk locked. Your clearance is pending manual review by the administrator in the Supabase Table Editor.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Permissions Matrix Strip */}
            {roleInfo && (
              <div className="pt-1">
                <div className="text-[10px] font-mono text-[#88887F] uppercase tracking-wider mb-2">
                  AUTHORIZED CLEARANCE PERMISSIONS:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {roleInfo.permissions.map((p, idx) => (
                    <div key={idx} className="p-2 bg-[#F4F4F1] border border-[#E2E2DC] text-[11px] font-mono text-[#474540] flex items-center gap-1.5">
                      <span className="text-[#E5182B]">✓</span>
                      <span className="truncate">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Section: Application Available for Beta Testing */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E2DC]">
            <div className="space-y-0.5">
              <span className="text-xs font-mono text-[#E5182B] uppercase tracking-widest font-medium">
                ACTIVE APPLICATION UNDER TEST
              </span>
              <h2 className="text-xl sm:text-2xl font-heading font-medium text-[#111111] tracking-[-0.02em]">
                Available Financial World Model Applications
              </h2>
            </div>
            <span className="px-2.5 py-1 bg-[#111110] text-white text-[10px] font-mono font-medium">
              1 APPLICATION DEPLOYED
            </span>
          </div>

          {/* Aakashavani Primary Card */}
          <div className="bg-white border border-[#E2E2DC] p-6 sm:p-8 space-y-6 hover:border-[#111111] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F4F4F1] border border-[#E2E2DC] shrink-0">
                  <AakashavaniLogo size={44} showWordmark={false} color="#111111" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-heading font-medium text-[#111111] tracking-[-0.02em]">
                      Aakashavani
                    </h3>
                    <span className="px-2 py-0.5 bg-[#F4F4F1] border border-[#E2E2DC] font-mono text-[10px] text-[#66665F]">
                      INSTANCE 01 · AKHVNI-0.1.2
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-800 text-[10px] font-mono font-semibold border border-emerald-500/30">
                      LIVE STREAM
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#E5182B] uppercase tracking-wider font-semibold">
                    A World Model for Financial Intelligence
                  </p>
                  <p className="text-sm text-[#474540] max-w-2xl pt-1 leading-relaxed font-sans">
                    Veiron's continuous world model for institutional capital environments. Aakashavani investigates competing hypotheses, injects liquidity shocks, and executes sub-15ms assumption resets.
                  </p>
                </div>
              </div>

              {/* Action Area */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                <button
                  onClick={() => launchLiveBeta(onNavigate)}
                  className="px-6 py-3.5 bg-[#E5182B] hover:bg-[#FF2A3D] text-white text-xs font-semibold rounded-full transition-all shadow-[0_4px_16px_rgba(229,24,43,0.35)] hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer group"
                >
                  <Activity size={15} className="text-white group-hover:scale-110 transition-transform" />
                  <span>Test this Beta Version</span>
                  <ArrowUpRight size={14} className="text-white/80 group-hover:text-white transition-colors" />
                </button>

                <button
                  onClick={() => onNavigate('aakashavani')}
                  className="px-4 py-2 text-xs font-medium text-[#474540] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  View In-Action Architecture →
                </button>
              </div>
            </div>

            {/* Spec Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E2E2DC] font-mono text-xs">
              <div className="p-3 bg-[#F4F4F1] border border-[#E2E2DC]">
                <div className="text-[10px] text-[#88887F] uppercase">ENVIRONMENT</div>
                <div className="font-bold text-[#111111] mt-0.5">GLOBAL_MACRO_FX</div>
              </div>
              <div className="p-3 bg-[#F4F4F1] border border-[#E2E2DC]">
                <div className="text-[10px] text-[#88887F] uppercase">STATE SPACE</div>
                <div className="font-bold text-[#111111] mt-0.5">12,400-DIM TENSOR</div>
              </div>
              <div className="p-3 bg-[#F4F4F1] border border-[#E2E2DC]">
                <div className="text-[10px] text-[#88887F] uppercase">UNCERTAINTY</div>
                <div className="font-bold text-[#111111] mt-0.5">0.142 (BOUNDED)</div>
              </div>
              <div className="p-3 bg-[#F4F4F1] border border-[#E2E2DC]">
                <div className="text-[10px] text-[#88887F] uppercase">RECURSIVE CYCLE</div>
                <div className="font-bold text-[#111111] mt-0.5">14.8ms CONTINUOUS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Continuous Tester Feedback & Review System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Review Submission Form */}
          <div className="lg:col-span-7 bg-white border border-[#E2E2DC] p-6 sm:p-8 space-y-6">
            <div className="space-y-1 pb-4 border-b border-[#E2E2DC]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#E5182B] font-semibold">
                <MessageSquare size={14} />
                <span>CONTINUOUS TESTER EVALUATION</span>
              </div>
              <h3 className="text-xl font-heading font-medium text-[#111111] tracking-[-0.02em]">
                Submit Evaluation & Review
              </h3>
              <p className="text-xs text-[#66665F] font-sans">
                Your technical feedback directly trains our adversarial dialectics and improves regime adaptation accuracy.
              </p>
            </div>

            {reviewSuccessMsg && (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#1F9D55] shrink-0" />
                <span>{reviewSuccessMsg}</span>
              </div>
            )}

            {reviewErrorMsg && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-900 text-xs font-mono flex items-center gap-2">
                <AlertCircle size={15} className="text-[#E5182B] shrink-0" />
                <span>{reviewErrorMsg}</span>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-5">
              {/* Rating Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#111111]">
                  Performance & Accuracy Rating <span className="text-[#E5182B]">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        size={22}
                        className={
                          (hoverRating || rating) >= star
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-[#E2E2DC]'
                        }
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono font-medium text-[#111111] ml-2">
                    {rating === 5 && '5/5 · Exceptional Accuracy & Epistemic Calibration'}
                    {rating === 4 && '4/5 · High Fidelity Reasoning with Minor Latency'}
                    {rating === 3 && '3/5 · Acceptable Baseline Performance'}
                    {rating === 2 && '2/5 · Observed Epistemic Degradation / Lag'}
                    {rating === 1 && '1/5 · Critical Anomaly / Invalidation Failure'}
                  </span>
                </div>
              </div>

              {/* Category Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#111111]">
                  Evaluation Category <span className="text-[#E5182B]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  {[
                    { id: 'world-model', label: 'World Model Reasoning' },
                    { id: 'adaptation', label: 'Regime Adaptation' },
                    { id: 'latency', label: 'Simulation Latency' },
                    { id: 'ui', label: 'Console / UI Ergonomics' },
                    { id: 'bug', label: 'Defect / Bug Report' },
                    { id: 'general', label: 'General Macro Feedback' }
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setCategory(cat.id)}
                      className={`p-2 border text-left cursor-pointer transition-colors ${
                        category === cat.id
                          ? 'border-[#111110] bg-[#111110] text-white'
                          : 'border-[#E2E2DC] bg-[#F4F4F1] text-[#474540] hover:border-[#111110]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Scenario */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#111111]">
                    Evaluation Title
                  </label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. JPY Liquidity Contagion Response"
                    className="w-full px-3 py-2 bg-[#F4F4F1] border border-[#E2E2DC] text-xs text-[#111111] focus:outline-none focus:border-[#111110]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#111111]">
                    Scenario / Shock Tested
                  </label>
                  <input
                    type="text"
                    value={testedScenario}
                    onChange={(e) => setTestedScenario(e.target.value)}
                    placeholder="e.g. BoJ Yield Curve Anchor Invalidation"
                    className="w-full px-3 py-2 bg-[#F4F4F1] border border-[#E2E2DC] text-xs text-[#111111] focus:outline-none focus:border-[#111110]"
                  />
                </div>
              </div>

              {/* Detailed Commentary */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#111111]">
                  Detailed Commentary & Model Observations <span className="text-[#E5182B]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={commentary}
                  onChange={(e) => setCommentary(e.target.value)}
                  placeholder="Detail how Aakashavani behaved during your shock injection or backtest analysis. Did the adversarial dialectic accurately refute trailing assumptions?"
                  className="w-full p-3 bg-[#F4F4F1] border border-[#E2E2DC] text-xs text-[#111111] focus:outline-none focus:border-[#111110] resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full py-3.5 px-6 bg-[#E5182B] hover:bg-[#FF2A3D] disabled:opacity-50 text-white font-semibold text-xs rounded-full shadow-[0_4px_16px_rgba(229,24,43,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmittingReview ? (
                  <span>RECORDING EVALUATION...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Submit Evaluation to Supabase Database</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Past Evaluations Feed */}
          <div className="lg:col-span-5 bg-white border border-[#E2E2DC] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DC]">
              <div className="space-y-0.5">
                <div className="text-[10px] font-mono text-[#88887F] uppercase tracking-wider">
                  RECORDED EVALUATIONS
                </div>
                <h4 className="text-base font-heading font-medium text-[#111111] tracking-[-0.02em]">
                  My Past Evaluations
                </h4>
              </div>
              <span className="font-mono text-xs text-[#88887F]">
                {reviews.length} LOGGED
              </span>
            </div>

            {isLoadingReviews ? (
              <div className="py-8 text-center font-mono text-xs text-[#88887F]">
                Loading telemetry records...
              </div>
            ) : reviews.length === 0 ? (
              <div className="py-10 text-center space-y-2">
                <div className="p-3 bg-[#F4F4F1] w-10 h-10 mx-auto rounded-full flex items-center justify-center text-[#88887F]">
                  <MessageSquare size={16} />
                </div>
                <p className="text-xs text-[#66665F] font-sans">
                  No reviews submitted yet. Test Aakashavani and log your first evaluation above!
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 divide-y divide-[#E2E2DC]">
                {reviews.map((rev) => (
                  <div key={rev.id} className="pt-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={12} className="fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="font-mono text-[10px] text-[#88887F]">
                        {new Date(rev.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="font-heading font-medium text-xs text-[#111111]">
                      {rev.title}
                    </div>

                    <div className="inline-block px-1.5 py-0.2 bg-[#F4F4F1] border border-[#E2E2DC] text-[9px] font-mono text-[#66665F] uppercase">
                      {rev.category}
                    </div>

                    <p className="text-xs text-[#474540] leading-relaxed line-clamp-3 font-sans">
                      {rev.commentary}
                    </p>

                    {rev.tested_scenario && (
                      <div className="text-[10px] font-mono text-[#88887F]">
                        Scenario: {rev.tested_scenario}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { useAuth } from '../context/AuthContext';
import { VeironLogo } from '../components/logos/VeironLogo';
import {
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface AuthPageProps {
  onNavigate: (page: Page) => void;
  initialMode?: 'signin' | 'signup';
}

// Google icon SVG inline
const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export const AuthPage: React.FC<AuthPageProps> = ({
  onNavigate,
  initialMode = 'signin',
}) => {
  const {
    currentUser,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    sendPasswordReset,
    signInDemoUser,
  } = useAuth();

  type AuthMode = 'signin' | 'signup' | 'forgot';
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const reset = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirm(false);
  };

  const switchMode = (m: AuthMode) => {
    reset();
    setMode(m);
  };

  // ── Handle OAuth callback redirect & errors ──────────────────
  useEffect(() => {
    // If already authenticated, redirect immediately to the beta workspace dashboard
    if (currentUser) {
      onNavigate('beta-dashboard');
      return;
    }

    // Inspect URL search and hash for OAuth errors
    const params = new URLSearchParams(window.location.search);
    const hashClean = window.location.hash.replace(/^#/, '');
    const hashParams = new URLSearchParams(hashClean);

    const error = params.get('error') || hashParams.get('error');
    const errorDesc = params.get('error_description') || hashParams.get('error_description');

    if (error || errorDesc) {
      const rawDesc = errorDesc ? decodeURIComponent(errorDesc.replace(/\+/g, ' ')) : error || 'Sign-in failed.';
      if (rawDesc.includes('Unable to exchange external code')) {
        setErrorMsg(
          'Google Sign-In configuration error: Supabase was unable to verify the authorization code with Google. This occurs when the Google Client Secret in Supabase Dashboard (Authentication → Providers → Google) does not match Google Cloud Console, or if the OAuth Consent Screen test user list is missing your account.'
        );
      } else {
        setErrorMsg(`Google sign-in error: ${rawDesc}`);
      }
      // Clean up URL so page refresh does not keep showing the error parameter
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [currentUser, onNavigate]);

  // ── Google OAuth ──────────────────────────────────────────────
  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      // Supabase will redirect; nothing more needed here
    } catch (err: any) {
      setErrorMsg(err?.message || 'Google sign-in failed. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  // ── Email Sign Up ─────────────────────────────────────────────
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signUpWithEmail(email.trim(), password, fullName.trim());
      setSuccessMsg(
        'Account created! Check your email to confirm your address, then sign in.'
      );
    } catch (err: any) {
      setErrorMsg(err?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Email Sign In ─────────────────────────────────────────────
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmail(email.trim(), password);
      onNavigate('beta-dashboard');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Forgot Password ───────────────────────────────────────────
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendPasswordReset(email.trim());
      setSuccessMsg(
        'Password reset link sent! Check your inbox (and spam folder) and follow the link to reset your password.'
      );
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const titles: Record<AuthMode, string> = {
    signin: 'Sign In',
    signup: 'Create Account',
    forgot: 'Reset Password',
  };

  const subtitles: Record<AuthMode, string> = {
    signin: 'Sign in to your Veiron account.',
    signup: 'Create your Veiron account to get started.',
    forgot: 'Enter your email and we\'ll send you a secure reset link.',
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141413] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E3E0D8]">
      <div className="max-w-md mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <VeironLogo size={36} showText={true} textColor="text-[#141413]" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl font-serif text-[#141413] tracking-tight">
              {titles[mode]}
            </h1>
            <p className="text-sm text-[#66645E]">{subtitles[mode]}</p>
          </div>
        </div>

        {/* Mode Tabs (not shown for forgot mode) */}
        {mode !== 'forgot' && (
          <div className="flex justify-center">
            <div className="bg-[#EAE6DD] p-1 rounded-full border border-[#D5D0C5] flex items-center gap-0.5">
              <button
                onClick={() => switchMode('signin')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${mode === 'signin'
                    ? 'bg-[#141413] text-white shadow-md'
                    : 'text-[#66645E] hover:text-[#141413]'
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => switchMode('signup')}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${mode === 'signup'
                    ? 'bg-[#141413] text-white shadow-md'
                    : 'text-[#66645E] hover:text-[#141413]'
                  }`}
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* Error / Success notices */}
        {errorMsg && (
          <div className="p-4 bg-red-50 border-2 border-red-300 text-red-800 text-xs space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
              <div className="space-y-1">
                <span className="font-semibold block text-red-900">Authentication Alert</span>
                <span className="leading-relaxed block">{errorMsg}</span>
              </div>
            </div>

            {errorMsg.includes('Google') && (
              <div className="pt-2 border-t border-red-200/80 space-y-2">
                <div className="text-[11px] font-mono text-red-900 font-semibold">
                  INSTANT INSTITUTIONAL ACCESS:
                </div>
                <div className="text-[11px] text-red-700 leading-normal">
                  You can immediately access the live platform using 1-Click Institutional Demo clearance below while verifying Google OAuth credentials in your Supabase Dashboard.
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      signInDemoUser('quant-researcher');
                      onNavigate('beta-dashboard');
                    }}
                    className="px-3 py-1.5 bg-[#141413] hover:bg-[#2B2A28] text-white text-[11px] font-semibold cursor-pointer transition-colors shadow-sm"
                  >
                    Enter as Quant Auditor
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      signInDemoUser('fx-rates-trader');
                      onNavigate('beta-dashboard');
                    }}
                    className="px-3 py-1.5 bg-[#141413] hover:bg-[#2B2A28] text-white text-[11px] font-semibold cursor-pointer transition-colors shadow-sm"
                  >
                    Enter as FX Trader
                  </button>
                  <button
                    type="button"
                    onClick={() => setErrorMsg(null)}
                    className="px-3 py-1.5 bg-white border border-red-300 hover:bg-red-100 text-red-800 text-[11px] font-semibold cursor-pointer transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {successMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-2.5">
            <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Card */}
        <div className="bg-white border-2 border-[#141413] shadow-xl p-6 sm:p-8 space-y-6">

          {mode === 'forgot' ? (
            /* ── FORGOT PASSWORD ── */
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#141413]">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#87857F]">
                    <Mail size={14} />
                  </div>
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#E3E0D8] text-xs text-[#141413] focus:outline-none focus:border-[#141413] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-[#E5182B] hover:bg-[#FF2A3D] disabled:opacity-50 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <><RefreshCw size={15} className="animate-spin" /><span>Sending...</span></>
                ) : (
                  <><span>Send Reset Link</span><ArrowRight size={15} /></>
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="text-xs text-[#87857F] hover:text-[#141413] font-mono cursor-pointer transition-colors"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>

          ) : mode === 'signup' ? (
            /* ── SIGN UP ── */
            <div className="space-y-5">
              {/* Google Sign Up */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full py-3 px-4 bg-white hover:bg-[#F7F5F0] border-2 border-[#E3E0D8] hover:border-[#141413] text-[#141413] font-semibold text-sm transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
              >
                {isGoogleLoading ? (
                  <><RefreshCw size={15} className="animate-spin" /><span>Redirecting...</span></>
                ) : (
                  <><GoogleIcon /><span>Continue with Google</span></>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[1px] bg-[#E3E0D8]" />
                <span className="text-[11px] font-mono text-[#87857F]">OR</span>
                <div className="flex-1 h-[1px] bg-[#E3E0D8]" />
              </div>

              {/* Email Sign Up Form */}
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#141413]">
                    Full Name <span className="text-[#E5182B]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-3 py-2.5 bg-[#FAF8F5] border border-[#E3E0D8] text-xs text-[#141413] focus:outline-none focus:border-[#141413] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#141413]">
                    Email Address <span className="text-[#E5182B]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#87857F]">
                      <Mail size={14} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#E3E0D8] text-xs text-[#141413] focus:outline-none focus:border-[#141413] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#141413]">
                    Password <span className="text-[#E5182B]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#87857F]">
                      <Lock size={14} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full pl-9 pr-9 py-2.5 bg-[#FAF8F5] border border-[#E3E0D8] text-xs text-[#141413] focus:outline-none focus:border-[#141413] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#87857F] hover:text-[#141413] cursor-pointer transition-colors"
                    >
                      {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#141413]">
                    Confirm Password <span className="text-[#E5182B]">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#87857F]">
                      <Lock size={14} />
                    </div>
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat your password"
                      className="w-full pl-9 pr-9 py-2.5 bg-[#FAF8F5] border border-[#E3E0D8] text-xs text-[#141413] focus:outline-none focus:border-[#141413] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#87857F] hover:text-[#141413] cursor-pointer transition-colors"
                    >
                      {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#E5182B] hover:bg-[#FF2A3D] disabled:opacity-50 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <><RefreshCw size={15} className="animate-spin" /><span>Creating account...</span></>
                  ) : (
                    <><span>Create Account</span><ArrowRight size={15} /></>
                  )}
                </button>
              </form>
            </div>

          ) : (
            /* ── SIGN IN ── */
            <div className="space-y-5">
              {/* Google Sign In */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full py-3 px-4 bg-white hover:bg-[#F7F5F0] border-2 border-[#E3E0D8] hover:border-[#141413] text-[#141413] font-semibold text-sm transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
              >
                {isGoogleLoading ? (
                  <><RefreshCw size={15} className="animate-spin" /><span>Redirecting...</span></>
                ) : (
                  <><GoogleIcon /><span>Continue with Google</span></>
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[1px] bg-[#E3E0D8]" />
                <span className="text-[11px] font-mono text-[#87857F]">OR</span>
                <div className="flex-1 h-[1px] bg-[#E3E0D8]" />
              </div>

              {/* Email Sign In Form */}
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#141413]">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#87857F]">
                      <Mail size={14} />
                    </div>
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#FAF8F5] border border-[#E3E0D8] text-xs text-[#141413] focus:outline-none focus:border-[#141413] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-semibold text-[#141413]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-[11px] text-[#E5182B] hover:underline cursor-pointer font-mono font-semibold"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#87857F]">
                      <Lock size={14} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      className="w-full pl-9 pr-9 py-2.5 bg-[#FAF8F5] border border-[#E3E0D8] text-xs text-[#141413] focus:outline-none focus:border-[#141413] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#87857F] hover:text-[#141413] cursor-pointer transition-colors"
                    >
                      {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#141413] hover:bg-[#2B2A28] disabled:opacity-50 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <><RefreshCw size={15} className="animate-spin" /><span>Signing in...</span></>
                  ) : (
                    <><span>Sign In</span><ArrowRight size={15} /></>
                  )}
                </button>
              </form>

              {/* Instant 1-Click Institutional Access */}
              <div className="pt-4 border-t border-[#E3E0D8] space-y-2.5">
                <div className="text-[11px] font-mono text-[#87857F] uppercase tracking-wider text-center">
                  Instant Institutional Access
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      signInDemoUser('quant-researcher');
                      onNavigate('beta-dashboard');
                    }}
                    className="p-2.5 bg-[#FAF8F5] hover:bg-[#F0EEE6] border border-[#E3E0D8] hover:border-[#141413] text-left transition-colors cursor-pointer group"
                  >
                    <div className="font-semibold text-[#141413] group-hover:text-[#E5182B] transition-colors">
                      Quant Auditor Desk
                    </div>
                    <div className="text-[10px] font-mono text-[#87857F]">
                      QUANT-AUDITOR-LV1
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      signInDemoUser('fx-rates-trader');
                      onNavigate('beta-dashboard');
                    }}
                    className="p-2.5 bg-[#FAF8F5] hover:bg-[#F0EEE6] border border-[#E3E0D8] hover:border-[#141413] text-left transition-colors cursor-pointer group"
                  >
                    <div className="font-semibold text-[#141413] group-hover:text-[#E5182B] transition-colors">
                      FX Trader Clearance
                    </div>
                    <div className="text-[10px] font-mono text-[#87857F]">
                      FX-RATES-EXEC-LV1
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center font-mono text-xs text-[#B5B2A8]">
          VEIRON · Secured by Supabase Auth
        </div>
      </div>
    </div>
  );
};

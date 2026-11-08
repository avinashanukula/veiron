import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, ShieldCheck, X, CheckCircle2 } from 'lucide-react';

export const NotificationModal: React.FC = () => {
  const {
    notificationsEnabled,
    notificationPromptOpen,
    turnOnNotifications,
    dismissNotificationPrompt,
    reopenNotificationPrompt
  } = useAuth();

  return (
    <>
      {/* 1. Primary Modal (Immediately displayed on load if not enabled) */}
      {notificationPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111110]/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="notification-modal-title"
            className="w-full max-w-lg bg-[#F4F4F1] border border-[#E2E2DC] shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-6 sm:p-8 space-y-6 relative rounded-2xl"
          >
            {/* Close / Dismiss */}
            <button
              onClick={dismissNotificationPrompt}
              className="absolute top-4 right-4 p-2 text-[#8F8F87] hover:text-[#111111] hover:bg-[#E2E2DC]/50 rounded-lg transition-colors cursor-pointer"
              title="Dismiss for now"
            >
              <X size={18} />
            </button>

            {/* Badge & Icon Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#E5182B]/10 text-[#E5182B] border border-[#E5182B]/20 text-[11px] font-mono font-medium rounded-full tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5182B] animate-pulse" />
                  MANDATORY SYSTEM DIRECTIVE
                </span>
                <span className="text-[11px] font-mono text-[#8F8F87]">AKHVNI-NOTIF-REQ</span>
              </div>

              <div className="flex items-start gap-4 pt-1">
                <div className="p-3 bg-[#111110] text-white shrink-0 rounded-xl">
                  <Bell size={22} className="text-[#F4F4F1]" />
                </div>
                <div>
                  <h3 id="notification-modal-title" className="text-xl sm:text-2xl font-heading font-semibold text-[#111111] tracking-tight leading-snug">
                    Turn On Institutional Notifications
                  </h3>
                  <p className="text-xs font-mono text-[#66665F] mt-1">
                    REQUIRED FOR BETA APPROVALS & MARKET SHOCKS
                  </p>
                </div>
              </div>
            </div>

            {/* Explanatory Body */}
            <div className="space-y-3 text-sm text-[#474540] font-sans leading-relaxed border-y border-[#E2E2DC] py-4">
              <p>
                Aakashavani operates as a continuous financial world model. Real-time events, such as <span className="font-semibold text-[#111111]">Beta Tester Role Approvals</span>, <span className="font-semibold text-[#111111]">Epistemic Invalidation Shocks</span>, and <span className="font-semibold text-[#111111]">Access Key Dispatches</span>, require notification dispatch.
              </p>
              <div className="bg-white border border-[#E2E2DC] p-3.5 rounded-xl text-xs space-y-1.5 font-mono text-[#4F4D47] shadow-sm">
                <div className="flex items-center gap-2 text-[#111111] font-semibold">
                  <ShieldCheck size={14} className="text-[#E5182B]" />
                  <span>WHAT YOU WILL RECEIVE:</span>
                </div>
                <div className="pl-5 text-[#66665F] space-y-1">
                  <div>• Instant Beta Role Approval letters and Clearance credentials</div>
                  <div>• Real-time Dialectic refutation and market regime transitions</div>
                  <div>• Private testing instance access keys & model updates</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => turnOnNotifications()}
                className="w-full py-3.5 px-6 bg-[#E5182B] hover:bg-[#FF2A3D] text-white font-medium text-sm rounded-full transition-all duration-200 shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 size={16} />
                <span>Turn On All Notifications Now</span>
              </button>

              <button
                onClick={dismissNotificationPrompt}
                className="w-full py-2.5 px-4 text-xs font-mono text-[#8F8F87] hover:text-[#111111] transition-colors cursor-pointer text-center"
              >
                Dismiss For Now (System will remind again)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Persistent Floating Prompt if Notifications are NOT enabled */}
      {!notificationsEnabled && !notificationPromptOpen && (
        <aside 
          aria-label="Notification alert notice"
          className="fixed bottom-20 right-4 sm:right-6 z-40 max-w-sm bg-[#111110] text-white border border-[#2C2C29] shadow-2xl p-3 sm:p-3.5 rounded-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300"
        >
          <div className="relative shrink-0">
            <Bell size={18} className="text-[#E5182B]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E5182B] rounded-full animate-ping" />
          </div>
          <div className="flex-1 text-xs">
            <div className="font-medium text-[#F4F4F1] leading-tight">Notifications Off</div>
            <div className="text-[11px] text-[#8F8F87] leading-tight mt-0.5">Turn on to receive Beta approvals</div>
          </div>
          <button
            onClick={reopenNotificationPrompt}
            className="px-3.5 py-1.5 bg-[#E5182B] hover:bg-[#FF2A3D] text-white text-xs font-medium rounded-full transition-transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Turn On
          </button>
        </aside>
      )}
    </>
  );
};
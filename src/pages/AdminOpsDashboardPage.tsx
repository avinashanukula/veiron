import React, { useState, useEffect } from 'react';
import { Page, AdminUserRecord, InboxMessage, BetaReview } from '../types';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Users, 
  Mail, 
  MessageSquare, 
  Star, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Send, 
  Search, 
  Filter, 
  AlertCircle,
  Key,
  Building2,
  Clock,
  ArrowRight,
  LogOut
} from 'lucide-react';

interface AdminOpsDashboardPageProps {
  onNavigate: (page: Page) => void;
}

const DEFAULT_ADMIN_PASSKEY = 'VEIRON-ALPHA-ROOT-2026';
const ADMIN_STORAGE_KEY = 'veiron_admin_passkey_session';

export const AdminOpsDashboardPage: React.FC<AdminOpsDashboardPageProps> = ({ onNavigate }) => {
  const { addToast } = useAuth();

  // Authentication State for Admin Console
  const [adminKey, setAdminKey] = useState<string>(() => {
    return sessionStorage.getItem(ADMIN_STORAGE_KEY) || '';
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Tab: 'users' | 'mailbox' | 'reviews'
  const [activeTab, setActiveTab] = useState<'users' | 'mailbox' | 'reviews'>('users');

  // Data States
  const [users, setUsers] = useState<AdminUserRecord[]>([]);
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [reviews, setReviews] = useState<BetaReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // User Filter State
  const [userStatusFilter, setUserStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // Reply Modal / State
  const [replyTargetEmail, setReplyTargetEmail] = useState<string | null>(null);
  const [replyParentId, setReplyParentId] = useState<string | undefined>(undefined);
  const [replySubject, setReplySubject] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);

  // Verify stored passkey on initial load
  useEffect(() => {
    if (adminKey) {
      verifyAndLoadData(adminKey);
    }
  }, [adminKey]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const keyToTest = passkeyInput.trim();

    if (!keyToTest) {
      setAuthError('Master clearance passkey is required.');
      return;
    }

    await verifyAndLoadData(keyToTest);
  };

  const verifyAndLoadData = async (key: string) => {
    setIsLoading(true);
    try {
      // Test the passkey by attempting to fetch users from the edge function
      const fetchedUsers = await supabaseService.adminFetchUsers(key);
      setUsers(fetchedUsers);
      setAdminKey(key);
      sessionStorage.setItem(ADMIN_STORAGE_KEY, key);
      setIsUnlocked(true);

      // Fetch other data
      const [fetchedMessages, fetchedReviews] = await Promise.all([
        supabaseService.adminFetchMessages(key).catch(() => []),
        supabaseService.fetchBetaReviews().catch(() => [])
      ]);
      setMessages(fetchedMessages);
      setReviews(fetchedReviews);
      addToast('Admin Clearance Verified', 'Secure operations console unlocked.', 'success');
    } catch (err: any) {
      setIsUnlocked(false);
      setAdminKey('');
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
      setAuthError(err?.message || 'Invalid administrative passkey.');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAllData = async () => {
    if (!adminKey) return;
    setIsLoading(true);
    try {
      const [u, m, r] = await Promise.all([
        supabaseService.adminFetchUsers(adminKey),
        supabaseService.adminFetchMessages(adminKey).catch(() => []),
        supabaseService.fetchBetaReviews().catch(() => [])
      ]);
      setUsers(u);
      setMessages(m);
      setReviews(r);
      addToast('Data Synchronized', 'Latest records pulled from Supabase.', 'system');
    } catch (err: any) {
      addToast('Sync Failed', err?.message || 'Could not fetch records.', 'alert');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (userId: string, newStatus: 'approved' | 'rejected' | 'pending') => {
    try {
      await supabaseService.adminUpdateUserStatus(adminKey, userId, newStatus);
      addToast(
        'Clearance Updated', 
        `User status transitioned to [${newStatus.toUpperCase()}].`, 
        'success'
      );
      await refreshAllData();
    } catch (err: any) {
      addToast('Update Failed', err?.message || 'Could not update status.', 'alert');
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyTargetEmail || !replyBody.trim()) return;

    setIsSendingReply(true);
    try {
      const res = await supabaseService.adminReplyMessage(adminKey, {
        userEmail: replyTargetEmail,
        parentMessageId: replyParentId,
        replyBody: replyBody.trim(),
        subject: replySubject.trim() || undefined
      });
      addToast('Reply Dispatched', res.message || `Reply dispatched to ${replyTargetEmail}.`, 'success');
      setReplyTargetEmail(null);
      setReplyBody('');
      setReplySubject('');
      await refreshAllData();
    } catch (err: any) {
      addToast('Dispatch Error', err?.message || 'Failed to send reply.', 'alert');
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setAdminKey('');
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    addToast('Admin Session Locked', 'Administrative credentials cleared.', 'alert');
  };

  // Filtered Users
  const filteredUsers = users.filter(u => {
    const matchesStatus = userStatusFilter === 'all' || u.approval_status === userStatusFilter;
    const matchesSearch = !userSearchTerm.trim() || 
      u.full_name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      u.clearance_code.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      (u.institution && u.institution.toLowerCase().includes(userSearchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const pendingCount = users.filter(u => u.approval_status === 'pending').length;

  // =========================================================================
  // VIEW 1: LOCKED PASSKEY GATE
  // =========================================================================
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#F4F4F1] text-[#111111] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-[#E2E2DC] p-8 space-y-6">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 bg-[#111110] text-white mx-auto flex items-center justify-center rounded-full">
              <Lock size={22} className="text-[#FF4F00]" />
            </div>
            <div className="font-mono text-xs text-[#E5182B] uppercase tracking-wider font-semibold">
              HASHED RESTRICTED ENDPOINT · VEIRON OPS
            </div>
            <h2 className="text-2xl font-heading font-medium text-[#111111] tracking-[-0.02em]">
              Administrative Control Room
            </h2>
            <p className="text-xs text-[#66665F] font-sans">
              Enter the master administrative passkey to review applicants, manually grant Supabase clearance, and dispatch letters.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-900 text-xs font-mono flex items-center gap-2">
              <AlertCircle size={14} className="shrink-0 text-[#E5182B]" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#111111]">
                ADMIN CLEARANCE PASSKEY
              </label>
              <input
                type="password"
                required
                autoFocus
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter passkey (e.g. VEIRON-ALPHA-ROOT-2026)"
                className="w-full px-3 py-2.5 bg-[#F4F4F1] border border-[#E2E2DC] text-xs font-mono text-[#111111] focus:outline-none focus:border-[#111110]"
              />
              <div className="text-[10px] font-mono text-[#88887F]">
                Default demo passkey: <code className="text-[#111111] font-bold">VEIRON-ALPHA-ROOT-2026</code>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#111110] hover:bg-[#2C2C29] disabled:opacity-50 text-white font-semibold text-xs rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              {isLoading ? (
                <span>AUTHENTICATING SECURE CHANNEL...</span>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  <span>Authenticate Admin Gateway</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-[#88887F] hover:text-[#111111] font-mono cursor-pointer"
            >
              ← Return to Public Terminal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: UNLOCKED ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F4F4F1] text-[#111111] py-8 sm:py-12 px-4 sm:px-6 border-b border-[#E2E2DC]">
      <div className="max-w-[1120px] mx-auto space-y-8">

        {/* Top Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E2E2DC]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-[#E5182B] font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#1F9D55] animate-pulse" />
              <span>VEIRON SECURE ADMIN OPS · HASHED ROUTE GATEWAY</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-heading font-medium text-[#111111] tracking-[-0.03em]">
              Administrative Control Center
            </h1>
            <p className="text-xs text-[#66665F] font-sans">
              Manually review & approve beta applicants in Supabase, reply to institutional inquiries, and audit evaluation telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={refreshAllData}
              disabled={isLoading}
              className="px-4 py-2 bg-white hover:bg-[#F4F4F1] border border-[#E2E2DC] hover:border-[#111110] text-xs font-mono font-medium rounded-full transition-colors flex items-center gap-2 cursor-pointer shadow-none disabled:opacity-50"
            >
              <RefreshCw size={13} className={isLoading ? 'animate-spin text-[#E5182B]' : 'text-[#88887F]'} />
              <span>Refresh Records</span>
            </button>

            <button
              onClick={handleLock}
              className="px-4 py-2 bg-[#111110] hover:bg-[#2C2C29] text-white text-xs font-mono font-medium rounded-full transition-colors flex items-center gap-1.5 cursor-pointer shadow-none"
            >
              <LogOut size={13} />
              <span>Lock Console</span>
            </button>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-[#E2E2DC] space-y-1">
            <div className="text-[10px] font-mono text-[#88887F] uppercase">TOTAL REGISTERED TESTERS</div>
            <div className="text-2xl font-heading font-medium text-[#111111]">{users.length}</div>
          </div>
          <div className="p-4 bg-white border border-amber-500/40 bg-amber-500/5 space-y-1">
            <div className="text-[10px] font-mono text-amber-800 uppercase font-semibold">PENDING SUPABASE APPROVAL</div>
            <div className="text-2xl font-heading font-medium text-amber-900">{pendingCount}</div>
          </div>
          <div className="p-4 bg-white border border-[#E2E2DC] space-y-1">
            <div className="text-[10px] font-mono text-[#88887F] uppercase">TESTER INQUIRIES & MAILS</div>
            <div className="text-2xl font-heading font-medium text-[#111111]">{messages.length}</div>
          </div>
          <div className="p-4 bg-white border border-[#E2E2DC] space-y-1">
            <div className="text-[10px] font-mono text-[#88887F] uppercase">BETA EVALUATIONS & REVIEWS</div>
            <div className="text-2xl font-heading font-medium text-[#111111]">{reviews.length}</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#E2E2DC] space-x-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 px-4 text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer border-b-2 ${
              activeTab === 'users'
                ? 'border-[#E5182B] text-[#111111]'
                : 'border-transparent text-[#88887F] hover:text-[#111111]'
            }`}
          >
            <Users size={14} />
            <span>Applicant Clearance ({users.length})</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-500 text-white text-[9px] rounded-full">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('mailbox')}
            className={`pb-3 px-4 text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer border-b-2 ${
              activeTab === 'mailbox'
                ? 'border-[#E5182B] text-[#111111]'
                : 'border-transparent text-[#88887F] hover:text-[#111111]'
            }`}
          >
            <Mail size={14} />
            <span>Tester Mailbox & Replies ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-4 text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer border-b-2 ${
              activeTab === 'reviews'
                ? 'border-[#E5182B] text-[#111111]'
                : 'border-transparent text-[#88887F] hover:text-[#111111]'
            }`}
          >
            <Star size={14} />
            <span>Beta Reviews & Feedback ({reviews.length})</span>
          </button>
        </div>

        {/* TAB 1: USERS & CLEARANCE APPROVALS */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Filter Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white border border-[#E2E2DC]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#88887F]">Filter Status:</span>
                {(['all', 'pending', 'approved', 'rejected'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setUserStatusFilter(s)}
                    className={`px-3 py-1 text-xs font-mono rounded-full transition-colors cursor-pointer ${
                      userStatusFilter === s
                        ? 'bg-[#111110] text-white'
                        : 'bg-[#F4F4F1] text-[#474540] hover:bg-[#E2E2DC]'
                    }`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  placeholder="Search name, email, clearance..."
                  className="pl-8 pr-3 py-1.5 bg-[#F4F4F1] border border-[#E2E2DC] text-xs font-mono text-[#111111] focus:outline-none focus:border-[#111110] w-64"
                />
                <Search size={13} className="absolute left-2.5 top-2 text-[#88887F]" />
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white border border-[#E2E2DC] overflow-x-auto shadow-none">
              <table className="w-full text-left font-sans text-xs">
                <thead className="bg-[#F4F4F1] border-b border-[#E2E2DC] font-mono text-[#66665F]">
                  <tr>
                    <th className="p-3.5">APPLICANT</th>
                    <th className="p-3.5">INSTITUTION</th>
                    <th className="p-3.5">ROLE & CLEARANCE</th>
                    <th className="p-3.5">REGISTERED</th>
                    <th className="p-3.5">STATUS</th>
                    <th className="p-3.5 text-right">MANUAL APPROVAL ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E2DC]">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[#88887F] font-mono">
                        No applicants found matching filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-[#F4F4F1]/60 transition-colors">
                        <td className="p-3.5">
                          <div className="font-semibold text-[#111111]">{u.full_name}</div>
                          <div className="font-mono text-[11px] text-[#66665F]">{u.email}</div>
                          <div className="font-mono text-[10px] text-[#88887F]">{u.phone}</div>
                        </td>
                        <td className="p-3.5 font-mono text-[#474540]">
                          {u.institution || 'Institutional Desk'}
                        </td>
                        <td className="p-3.5 font-mono">
                          <div className="font-bold text-[#111111]">{u.role}</div>
                          <div className="text-[11px] text-[#E5182B]">{u.clearance_code}</div>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-[#88887F]">
                          {new Date(u.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 font-mono">
                          {u.approval_status === 'approved' && (
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-800 text-[10px] font-semibold border border-emerald-500/30">
                              APPROVED
                            </span>
                          )}
                          {u.approval_status === 'pending' && (
                            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-800 text-[10px] font-semibold border border-amber-500/30">
                              PENDING APPROVAL
                            </span>
                          )}
                          {u.approval_status === 'rejected' && (
                            <span className="px-2 py-0.5 bg-red-500/10 text-red-800 text-[10px] font-semibold border border-red-500/30">
                              REJECTED
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2 font-mono text-[11px]">
                            {u.approval_status !== 'approved' && (
                              <button
                                onClick={() => handleUpdateStatus(u.id, 'approved')}
                                className="px-3 py-1.5 bg-[#1F9D55] hover:bg-emerald-700 text-white rounded-full transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                                title="Approve clearance and unlock live preview desk"
                              >
                                <CheckCircle2 size={12} />
                                <span>Approve Clearance</span>
                              </button>
                            )}

                            {u.approval_status === 'approved' && (
                              <button
                                onClick={() => handleUpdateStatus(u.id, 'pending')}
                                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors cursor-pointer flex items-center gap-1"
                                title="Put user back into pending status"
                              >
                                <Lock size={12} />
                                <span>Revoke / Hold</span>
                              </button>
                            )}

                            {u.approval_status !== 'rejected' && (
                              <button
                                onClick={() => handleUpdateStatus(u.id, 'rejected')}
                                className="px-2.5 py-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-full transition-colors cursor-pointer"
                                title="Reject application"
                              >
                                Reject
                              </button>
                            )}

                            <button
                              onClick={() => {
                                setReplyTargetEmail(u.email);
                                setReplySubject(`Institutional Clearance Inquiry — ${u.clearance_code}`);
                                setActiveTab('mailbox');
                              }}
                              className="px-2.5 py-1.5 bg-white hover:bg-[#F4F4F1] text-[#474540] border border-[#E2E2DC] rounded-full transition-colors cursor-pointer"
                              title="Send letter or inquiry to user"
                            >
                              Message
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TESTER MAILBOX & REPLIES */}
        {activeTab === 'mailbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Messages Feed */}
            <div className="lg:col-span-7 bg-white border border-[#E2E2DC] p-6 space-y-4 shadow-none">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DC]">
                <h3 className="font-heading font-medium text-lg text-[#111111] tracking-[-0.02em]">
                  Incoming Institutional Mails & Inquiries
                </h3>
                <span className="font-mono text-xs text-[#88887F]">
                  {messages.length} DISPATCHES
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="py-12 text-center text-[#88887F] font-mono text-xs">
                  No mailbox messages recorded yet.
                </div>
              ) : (
                <div className="divide-y divide-[#E2E2DC] max-h-[600px] overflow-y-auto pr-1 space-y-3">
                  {messages.map((m) => (
                    <div key={m.id} className="pt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#111111]">
                            {m.sender}
                          </span>
                          <span className="px-1.5 py-0.2 bg-[#F4F4F1] border border-[#E2E2DC] text-[9px] font-mono text-[#88887F] uppercase">
                            {m.category}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-[#88887F]">
                          {m.timestamp}
                        </span>
                      </div>

                      <div className="font-heading font-medium text-sm text-[#111111]">
                        {m.title}
                      </div>

                      <p className="text-xs text-[#474540] whitespace-pre-wrap leading-relaxed font-sans">
                        {m.body}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-xs font-mono">
                        <span className="text-[#88887F]">
                          {m.clearanceCode ? `Clearance: ${m.clearanceCode}` : ''}
                        </span>
                        <button
                          onClick={() => {
                            setReplyTargetEmail(m.sender.includes('@') ? m.sender : (m as any).user_email || 'tester@firm.com');
                            setReplyParentId(m.id);
                            setReplySubject(`Re: ${m.title}`);
                          }}
                          className="px-3 py-1 bg-[#111110] hover:bg-[#2C2C29] text-white text-[11px] rounded-full transition-colors cursor-pointer"
                        >
                          Reply to this Letter →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Reply Form */}
            <div className="lg:col-span-5 bg-white border border-[#E2E2DC] p-6 space-y-5">
              <div className="space-y-1 pb-3 border-b border-[#E2E2DC]">
                <div className="text-[10px] font-mono text-[#E5182B] uppercase tracking-wider font-semibold">
                  OFFICIAL CORRESPONDENCE DISPATCH
                </div>
                <h4 className="font-heading font-medium text-base text-[#111111] tracking-[-0.02em]">
                  Dispatch Administrative Letter
                </h4>
                <p className="text-xs text-[#66665F] font-sans">
                  This letter will be delivered directly into the tester's portal mailbox in Supabase.
                </p>
              </div>

              <form onSubmit={handleSendReply} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#111111]">
                    Recipient Institutional Email <span className="text-[#E5182B]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={replyTargetEmail || ''}
                    onChange={(e) => setReplyTargetEmail(e.target.value)}
                    placeholder="tester@fund.com"
                    className="w-full px-3 py-2 bg-[#F4F4F1] border border-[#E2E2DC] text-xs font-mono text-[#111111] focus:outline-none focus:border-[#111110]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#111111]">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={replySubject}
                    onChange={(e) => setReplySubject(e.target.value)}
                    placeholder="e.g. Response from Access Committee regarding clearance"
                    className="w-full px-3 py-2 bg-[#F4F4F1] border border-[#E2E2DC] text-xs text-[#111111] focus:outline-none focus:border-[#111110]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-[#111111]">
                    Official Letter Content <span className="text-[#E5182B]">*</span>
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    placeholder="Type official communication, clearance terms, or answers to their inquiry..."
                    className="w-full p-3 bg-[#F4F4F1] border border-[#E2E2DC] text-xs text-[#111111] focus:outline-none focus:border-[#111110] resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSendingReply || !replyTargetEmail || !replyBody.trim()}
                  className="w-full py-3 bg-[#111110] hover:bg-[#2C2C29] disabled:opacity-50 text-white font-semibold text-xs rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSendingReply ? (
                    <span>DISPATCHING LETTER...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Dispatch Official Letter to Mailbox</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: BETA REVIEWS & EVALUATIONS */}
        {activeTab === 'reviews' && (
          <div className="bg-white border border-[#E2E2DC] p-6 space-y-6 shadow-none">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DC]">
              <div>
                <h3 className="font-heading font-medium text-lg text-[#111111] tracking-[-0.02em]">
                  All Recorded Beta Evaluations & Feedback
                </h3>
                <p className="text-xs text-[#66665F] font-sans">
                  Submitted in real time by authorized beta testers from their workspaces.
                </p>
              </div>
              <span className="font-mono text-xs text-[#88887F]">
                {reviews.length} EVALUATIONS
              </span>
            </div>

            {reviews.length === 0 ? (
              <div className="py-12 text-center text-[#88887F] font-mono text-xs">
                No reviews or evaluations recorded yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-[#F4F4F1] border border-[#E2E2DC] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={13} className="fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="font-mono text-[10px] text-[#88887F]">
                        {new Date(rev.created_at).toLocaleString()}
                      </span>
                    </div>

                    <div className="font-heading font-medium text-sm text-[#111111]">
                      {rev.title}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                      <span className="px-1.5 py-0.2 bg-white border border-[#E2E2DC] text-[#111111] font-semibold uppercase">
                        {rev.category}
                      </span>
                      <span className="text-[#88887F]">
                        By: <strong className="text-[#111111]">{rev.tester_name}</strong> ({rev.tester_email})
                      </span>
                      {rev.tester_institution && (
                        <span>· {rev.tester_institution}</span>
                      )}
                    </div>

                    <p className="text-xs text-[#474540] leading-relaxed pt-1 font-sans">
                      {rev.commentary}
                    </p>

                    {rev.tested_scenario && (
                      <div className="p-2 bg-white border border-[#E2E2DC] font-mono text-[10px] text-[#66665F]">
                        Tested Scenario: <strong className="text-[#111111]">{rev.tested_scenario}</strong>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

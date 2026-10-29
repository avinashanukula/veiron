import { User, BetaRole, InboxMessage, BetaReview, AdminUserRecord } from '../types';
import { createClient } from '@supabase/supabase-js';

const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_URL = 
  (envSupabaseUrl && !envSupabaseUrl.includes('your-project') && !envSupabaseUrl.includes('placeholder'))
    ? envSupabaseUrl
    : 'https://slfllzppphyhkpsjmupp.supabase.co';

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-anon-key';

/**
 * Supabase JS client — used only for Auth operations (Google OAuth, email/password, session).
 * FlowType is configured to 'implicit' so OAuth tokens are returned directly in the URL hash,
 * preventing server-side code-exchange failures when anon keys are restricted.
 */
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    flowType: 'implicit',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

const EDGE_MIDDLEWARE_ENDPOINT = `${SUPABASE_URL}/functions/v1/auth-middleware`;

/**
 * Hardened Supabase Gateway Service (Zero Client Keys Exposed)
 * Defense-in-depth:
 * - All admin operations route strictly through the deployed auth-middleware Edge Function.
 * - Session tokens carry 7-day server expiration and are invalidated upon sign-out.
 */
class SupabaseService {
  private async invokeMiddleware<T>(action: string, payload: Record<string, unknown> = {}, sessionToken?: string): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (sessionToken) {
      headers['x-session-token'] = sessionToken;
      headers['Authorization'] = `Bearer ${sessionToken}`;
    }

    try {
      const response = await fetch(EDGE_MIDDLEWARE_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify({ action, ...payload }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `Middleware error: HTTP ${response.status}`);
      }

      return data as T;
    } catch (err: any) {
      console.error(`Supabase Edge Function [${action}] error:`, err);
      throw err;
    }
  }

  /**
   * Register a new Beta Tester through the Edge Function middleware.
   * Hardened against account takeover.
   */
  /**
   * Register a new Beta Tester through the Edge Function middleware.
   * Enforces 2-step verification and sets approval status to 'pending' (manual Supabase approval).
   */
  async registerBetaTester(data: {
    fullName: string;
    email: string;
    phone: string;
    institution: string;
    role: BetaRole;
    password?: string;
  }): Promise<{ require2fa: boolean; email: string; message: string; previewCode?: string; clearanceCode?: string }> {
    return await this.invokeMiddleware<{
      require2fa: boolean;
      email: string;
      message: string;
      previewCode?: string;
      clearanceCode?: string;
    }>('register', data);
  }

  /**
   * Authenticate an existing institutional tester account.
   * Step 1: Validates credentials and dispatches 6-digit 2-step verification code.
   */
  async signIn(email: string, credential?: string): Promise<{ require2fa: boolean; email: string; message: string; previewCode?: string }> {
    return await this.invokeMiddleware<{
      require2fa: boolean;
      email: string;
      message: string;
      previewCode?: string;
    }>('signin', { email, credential });
  }

  /**
   * Step 2: Verify the 6-digit two-factor verification code and retrieve authenticated session token.
   */
  async verifyTwoFactor(email: string, code: string): Promise<{ user: User; sessionToken: string }> {
    const res = await this.invokeMiddleware<{
      success: boolean;
      user: {
        id: string;
        full_name: string;
        email: string;
        phone: string;
        institution: string;
        role: BetaRole;
        approval_status: 'approved' | 'pending';
        clearance_code: string;
        notifications_enabled: boolean;
        tester_tier: string;
        created_at: string;
      };
      sessionToken: string;
    }>('verify-2fa', { email, code });

    const mappedUser: User = {
      id: res.user.id,
      fullName: res.user.full_name,
      email: res.user.email,
      phone: res.user.phone,
      institution: res.user.institution,
      role: res.user.role,
      approvalStatus: res.user.approval_status,
      joinedAt: new Date(res.user.created_at).toLocaleDateString(),
      clearanceCode: res.user.clearance_code,
      notificationsEnabled: res.user.notifications_enabled,
      testerTier: res.user.tester_tier,
    };

    return { user: mappedUser, sessionToken: res.sessionToken };
  }

  /**
   * Resend a fresh 6-digit two-step verification code.
   */
  async resendTwoFactor(email: string): Promise<{ success: boolean; message: string; previewCode?: string }> {
    return await this.invokeMiddleware<{ success: boolean; message: string; previewCode?: string }>('resend-2fa', { email });
  }

  /**
   * Request institutional clearance code retrieval (Rate limited to max 2 requests per hour).
   */
  async requestClearanceCode(email: string): Promise<{ success: boolean; message: string }> {
    return await this.invokeMiddleware<{ success: boolean; message: string }>('request-clearance', { email });
  }

  /**
   * Invalidate session token on server upon sign-out.
   */
  async signOut(sessionToken: string): Promise<void> {
    try {
      await this.invokeMiddleware('signout', {}, sessionToken);
    } catch (e) {
      console.warn('Server-side session termination failed:', e);
    }
  }

  /**
   * Verify an existing session token via Edge Function.
   */
  async verifySession(sessionToken: string): Promise<{ user: User; unreadCount: number } | null> {
    try {
      const res = await this.invokeMiddleware<{
        authenticated: boolean;
        user: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          institution: string;
          role: BetaRole;
          approval_status: 'approved' | 'pending';
          clearance_code: string;
          notifications_enabled: boolean;
          tester_tier: string;
          created_at: string;
        };
        unreadCount: number;
      }>('verify-session', {}, sessionToken);

      if (!res.authenticated || !res.user) return null;

      const mappedUser: User = {
        id: res.user.id,
        fullName: res.user.full_name,
        email: res.user.email,
        phone: res.user.phone,
        institution: res.user.institution,
        role: res.user.role,
        approvalStatus: res.user.approval_status,
        joinedAt: new Date(res.user.created_at).toLocaleDateString(),
        clearanceCode: res.user.clearance_code,
        notificationsEnabled: res.user.notifications_enabled,
        testerTier: res.user.tester_tier,
      };

      return { user: mappedUser, unreadCount: res.unreadCount };
    } catch {
      return null;
    }
  }

  /**
   * Retrieve all mailbox messages for the authenticated user from Supabase.
   */
  async fetchMailboxMessages(sessionToken: string): Promise<{ messages: InboxMessage[]; unreadCount: number }> {
    const res = await this.invokeMiddleware<{
      messages: Array<{
        id: string;
        sender: string;
        title: string;
        subject: string;
        body: string;
        category: 'approval' | 'system' | 'regime_alert' | 'reply' | 'inquiry';
        read: boolean;
        role_granted?: BetaRole;
        clearance_code?: string;
        parent_message_id?: string;
        created_at: string;
      }>;
      unreadCount: number;
    }>('list-messages', {}, sessionToken);

    const mappedMessages: InboxMessage[] = (res.messages || []).map((m) => ({
      id: m.id,
      sender: m.sender,
      title: m.title,
      subject: m.subject,
      body: m.body,
      timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: m.read,
      category: m.category === 'reply' || m.category === 'inquiry' ? 'system' : m.category,
      roleGranted: m.role_granted,
      clearanceCode: m.clearance_code,
      actionLabel: m.category === 'approval' ? 'Preview Beta Version' : undefined,
      actionPage: m.category === 'approval' ? 'aakashavani' : undefined,
    }));

    return {
      messages: mappedMessages,
      unreadCount: res.unreadCount,
    };
  }

  /**
   * Mark a specific message or all messages as read.
   */
  async markAsRead(sessionToken: string, messageId?: string, markAll?: boolean): Promise<void> {
    await this.invokeMiddleware('mark-read', { messageId, markAll }, sessionToken);
  }

  /**
   * Post a new inquiry or beta feedback message to the committee mailbox.
   */
  async postMailboxMessage(
    sessionToken: string,
    message: { title: string; subject: string; body: string; category?: string }
  ): Promise<InboxMessage> {
    const res = await this.invokeMiddleware<{ message: any }>('post-message', message, sessionToken);
    return {
      id: res.message.id,
      sender: res.message.sender,
      title: res.message.title,
      subject: res.message.subject,
      body: res.message.body,
      timestamp: new Date(res.message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: res.message.read,
      category: res.message.category,
    };
  }

  /**
   * Reply to an existing mailbox message thread and receive automated committee confirmation.
   * Protected with IDOR checks on server.
   */
  async replyMailboxMessage(
    sessionToken: string,
    reply: { parentMessageId: string; replyBody: string; subject?: string }
  ): Promise<{ userReply: any; message: string }> {
    return await this.invokeMiddleware<{ userReply: any; message: string }>('reply-message', reply, sessionToken);
  }

  /**
   * Switch the tester's beta role and issue new clearance credentials.
   */
  async switchRole(sessionToken: string, newRole: BetaRole): Promise<User> {
    const res = await this.invokeMiddleware<{
      user: {
        id: string;
        full_name: string;
        email: string;
        phone: string;
        institution: string;
        role: BetaRole;
        approval_status: 'approved' | 'pending';
        clearance_code: string;
        notifications_enabled: boolean;
        tester_tier: string;
        created_at: string;
      };
    }>('switch-role', { newRole }, sessionToken);

    return {
      id: res.user.id,
      fullName: res.user.full_name,
      email: res.user.email,
      phone: res.user.phone,
      institution: res.user.institution,
      role: res.user.role,
      approvalStatus: res.user.approval_status,
      joinedAt: new Date(res.user.created_at).toLocaleDateString(),
      clearanceCode: res.user.clearance_code,
      notificationsEnabled: res.user.notifications_enabled,
      testerTier: res.user.tester_tier,
    };
  }

  /**
   * Approve an applicant request (Authorized role operation).
   */
  async approveTesterRequest(
    sessionToken: string,
    approval: { targetEmail: string; approvedRole: string; customNote?: string }
  ): Promise<{ success: boolean; message: string }> {
    return await this.invokeMiddleware<{ success: boolean; message: string }>('approve-request', approval, sessionToken);
  }

  /**
   * Submit continuous feedback and reviews for Aakashavani beta testing.
   */
  async submitBetaReview(
    sessionToken: string,
    review: { rating: number; category: string; title: string; commentary: string; testedScenario?: string }
  ): Promise<{ success: boolean; message: string; review: BetaReview }> {
    return await this.invokeMiddleware<{ success: boolean; message: string; review: BetaReview }>('submit-review', review, sessionToken);
  }

  /**
   * Fetch beta reviews (optionally filtered by tester email).
   */
  async fetchBetaReviews(testerEmail?: string): Promise<BetaReview[]> {
    const res = await this.invokeMiddleware<{ success: boolean; reviews: BetaReview[] }>('list-reviews', { testerEmail });
    return res.reviews || [];
  }

  /**
   * Admin: List all registered beta testers and statuses.
   */
  async adminFetchUsers(adminKey: string): Promise<AdminUserRecord[]> {
    const res = await this.invokeMiddleware<{ success: boolean; users: AdminUserRecord[] }>('admin-list-users', { adminKey });
    return res.users || [];
  }

  /**
   * Admin: 1-click update user approval status ('approved' | 'pending' | 'rejected').
   */
  async adminUpdateUserStatus(
    adminKey: string,
    userId: string,
    newStatus: 'approved' | 'pending' | 'rejected'
  ): Promise<{ success: boolean; message: string; user: any }> {
    return await this.invokeMiddleware<{ success: boolean; message: string; user: any }>('admin-update-user-status', {
      adminKey,
      userId,
      newStatus
    });
  }

  /**
   * Admin: List all inquiries and mailbox dispatches.
   */
  async adminFetchMessages(adminKey: string): Promise<InboxMessage[]> {
    const res = await this.invokeMiddleware<{ success: boolean; messages: any[] }>('admin-list-messages', { adminKey });
    return (res.messages || []).map((m: any) => ({
      id: m.id,
      sender: m.sender || 'Institutional Desk',
      title: m.title || 'Inquiry',
      subject: m.subject || 'Message',
      body: m.body,
      timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: m.read || false,
      category: m.category || 'inquiry',
      roleGranted: m.role_granted,
      clearanceCode: m.clearance_code
    }));
  }

  /**
   * Admin: Dispatch official administrative reply to a tester.
   */
  async adminReplyMessage(
    adminKey: string,
    reply: { userEmail: string; parentMessageId?: string; replyBody: string; subject?: string }
  ): Promise<{ success: boolean; message: string }> {
    return await this.invokeMiddleware<{ success: boolean; message: string }>('admin-reply-message', {
      adminKey,
      ...reply
    });
  }

  // ── Direct Auth Methods (Supabase JS Client) ─────────────────────────────

  /**
   * Get the correct OAuth redirect URL for Google sign-in.
   * Supports both localhost development and production (veiron.pages.dev).
   */
  private getRedirectUrl(): string {
    const origin = window.location.origin;
    return `${origin}/auth`;
  }

  /**
   * Initiate Google OAuth sign-in via Supabase Auth.
   * Redirects the browser to Google; Supabase handles the callback.
   */
  async signInWithGoogle(): Promise<void> {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: this.getRedirectUrl(),
      },
    });
    if (error) throw new Error(error.message);
  }

  /**
   * Sign up a new user with email and password via Supabase Auth.
   * Supabase sends a confirmation email automatically.
   */
  async signUpWithEmail(email: string, password: string, fullName: string): Promise<void> {
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: this.getRedirectUrl(),
      },
    });
    if (error) throw new Error(error.message);
  }

  /**
   * Sign in an existing user with email and password via Supabase Auth.
   */
  async signInWithEmail(email: string, password: string): Promise<void> {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  }

  /**
   * Sign out the current Supabase Auth session.
   */
  async signOutSupabase(): Promise<void> {
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.warn('Supabase signOut error:', error.message);
  }

  /**
   * Send a password reset email with a secure link.
   * The link redirects to /auth where the user can update their password.
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: this.getRedirectUrl(),
    });
    if (error) throw new Error(error.message);
  }

  /**
   * Get the current Supabase Auth session (for OAuth callback handling).
   */
  async getSession() {
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) throw new Error(error.message);
    return data.session;
  }

  /**
   * Decode JWT token payload safely without external dependencies.
   */
  decodeJwt(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  /**
   * Helper to map a Supabase User entity to the application User model.
   */
  private mapSupabaseUser(supaUser: any, sessionToken: string): { user: User; sessionToken: string } {
    const fullName =
      supaUser.user_metadata?.full_name ||
      supaUser.user_metadata?.name ||
      supaUser.email?.split('@')[0] ||
      'Institutional User';
    const user: User = {
      id: supaUser.id,
      fullName,
      email: supaUser.email || '',
      phone: supaUser.phone || '',
      institution: supaUser.user_metadata?.institution || 'Veiron Institutional Desk',
      role: (supaUser.user_metadata?.role as BetaRole) || 'quant-researcher',
      approvalStatus: 'approved',
      joinedAt: new Date(supaUser.created_at || Date.now()).toLocaleDateString(),
      clearanceCode: `AKHVNI-AUTH-${(supaUser.id || 'QNT').substring(0, 4).toUpperCase()}-LV1`,
      notificationsEnabled: true,
      testerTier: 'Standard',
    };
    return { user, sessionToken };
  }

  /**
   * Sanitizes the browser URL by removing OAuth tokens, PKCE codes, and error parameters
   * from both the query string and hash, preventing sensitive tokens from lingering in the address bar.
   */
  cleanAuthParamsFromUrl(): void {
    if (typeof window === 'undefined') return;
    try {
      const url = new URL(window.location.href);
      const authQueryParams = [
        'code',
        'error',
        'error_code',
        'error_description',
        'access_token',
        'refresh_token',
        'token_type',
        'expires_in',
        'expires_at',
        'type',
      ];
      let searchChanged = false;
      for (const param of authQueryParams) {
        if (url.searchParams.has(param)) {
          url.searchParams.delete(param);
          searchChanged = true;
        }
      }

      const hash = url.hash.replace(/^#/, '');
      let hashChanged = false;
      if (
        hash.includes('access_token') ||
        hash.includes('error') ||
        hash.includes('refresh_token') ||
        hash.includes('token_type')
      ) {
        url.hash = '';
        hashChanged = true;
      }

      if (searchChanged || hashChanged) {
        const cleanUrl = url.pathname + (url.search ? url.search : '') + (url.hash ? url.hash : '');
        window.history.replaceState(null, '', cleanUrl);
      }
    } catch {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }

  /**
   * Handle OAuth redirect parameters from URL (both hash and query string).
   * Parses access_token from hash or codes from search, exchanges them, and strips tokens from the URL.
   */
  async handleOAuthRedirect(): Promise<{ user: User; sessionToken: string } | null> {
    if (typeof window === 'undefined') return null;

    const searchParams = new URLSearchParams(window.location.search);
    const hashClean = window.location.hash.replace(/^#/, '');
    const hashParams = new URLSearchParams(hashClean);

    // 1. Check for OAuth errors in search or hash
    const error = searchParams.get('error') || hashParams.get('error');
    const errorDesc = searchParams.get('error_description') || hashParams.get('error_description');
    if (error || errorDesc) {
      this.cleanAuthParamsFromUrl();
      console.warn('OAuth redirect error returned from provider:', error, errorDesc);
      return null;
    }

    // 2. Check search for ?code=... (PKCE / Authorization Code grant)
    const code = searchParams.get('code');
    if (code) {
      try {
        const { data, error: exchangeError } = await supabaseClient.auth.exchangeCodeForSession(code);
        this.cleanAuthParamsFromUrl();
        if (!exchangeError && data.session?.user && data.session?.access_token) {
          return this.mapSupabaseUser(data.session.user, data.session.access_token);
        }
      } catch (err) {
        console.warn('exchangeCodeForSession failed:', err);
        this.cleanAuthParamsFromUrl();
      }
    }

    // 3. Check hash for #access_token=... (implicit grant)
    const accessToken = hashParams.get('access_token');
    const refreshToken = hashParams.get('refresh_token');
    if (accessToken) {
      const decoded = this.decodeJwt(accessToken);
      this.cleanAuthParamsFromUrl();

      // Synchronize with Supabase JS client session if supported
      try {
        await supabaseClient.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken || '',
        });
      } catch {
        // Non-blocking fallback
      }

      if (decoded) {
        const fullName =
          decoded.user_metadata?.full_name ||
          decoded.user_metadata?.name ||
          decoded.email?.split('@')[0] ||
          'Institutional User';
        const user: User = {
          id: decoded.sub || 'user_' + Date.now(),
          fullName,
          email: decoded.email || '',
          phone: decoded.phone || '',
          institution: decoded.user_metadata?.institution || 'Veiron Institutional Desk',
          role: (decoded.user_metadata?.role as BetaRole) || 'quant-researcher',
          approvalStatus: 'approved',
          joinedAt: new Date().toLocaleDateString(),
          clearanceCode: `AKHVNI-AUTH-${Math.floor(1000 + Math.random() * 9000)}-QNT`,
          notificationsEnabled: true,
          testerTier: 'Standard',
        };
        return { user, sessionToken: accessToken };
      }
    }

    // 4. Check Supabase JS client getSession as fallback
    try {
      const session = await this.getSession();
      if (session?.user && session?.access_token) {
        this.cleanAuthParamsFromUrl();
        return this.mapSupabaseUser(session.user, session.access_token);
      }
    } catch {
      // getSession might fail if anon key is not set
    }

    return null;
  }
}

export const supabaseService = new SupabaseService();

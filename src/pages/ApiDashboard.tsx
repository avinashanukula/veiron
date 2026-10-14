import { useCallback, useEffect, useMemo, useState } from 'react';
import { BarChart3, Check, Copy, Download, Key, Terminal, Trash2 } from 'lucide-react';
import { supabaseClient as supabase } from '../services/supabaseService'; // TODO: adjust to your existing Supabase client path

/* ---- config: change these to match your project ---- */
const KEYS_TABLE = 'api_keys';
const USAGE_TABLE = 'api_audit_logs'; // columns used: key_id, tool_name, status, created_at
const SUPABASE_URL: string = (import.meta as any).env?.VITE_SUPABASE_URL ?? 'https://YOUR-PROJECT.supabase.co';
const GATEWAY_URL = `${SUPABASE_URL}/functions/v1/mcp_gateway`;
const DOWNLOADS = [
  { os: 'macOS', note: 'Apple Silicon & Intel · .dmg', href: '#' },
  { os: 'Windows', note: 'Windows 10 or later · .exe', href: '#' },
  { os: 'Linux', note: 'x64 / arm64 · .AppImage', href: '#' },
];

interface ApiKey { id: string; name: string; prefix?: string; key_prefix?: string; created_at: string; revoked_at?: string | null; expires_at?: string | null; scopes?: string[] }
const keyStatus = (k: ApiKey) => k.revoked_at ? 'Revoked' : k.expires_at && new Date(k.expires_at) < new Date() ? 'Expired' : 'Active';
interface NewKey { id: string; key: string }

const card = 'rounded-xl border border-black/10 bg-white p-5';
const btn = 'inline-flex items-center gap-2 rounded-lg bg-[#E5182B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c41424] disabled:opacity-50';
const btnGhost = 'inline-flex items-center gap-2 rounded-lg border border-black/15 px-3 py-2 text-sm hover:bg-black/5';

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button className={btnGhost} onClick={async () => {
      try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500); } catch { /* ignore */ }
    }}>
      {done ? <Check size={14} /> : <Copy size={14} />}{done ? 'Copied' : label}
    </button>
  );
}

function DownloadTab() {
  const me = /Mac/.test(navigator.userAgent) ? 'macOS' : /Win/.test(navigator.userAgent) ? 'Windows' : 'Linux';
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {DOWNLOADS.map(d => (
          <div key={d.os} className={`${card} ${d.os === me ? 'border-[#E5182B]' : ''}`}>
            <div className="font-semibold">{d.os}{d.os === me && <span className="ml-2 text-xs text-[#E5182B]">detected</span>}</div>
            <div className="mb-4 mt-1 text-sm text-black/60">{d.note}</div>
            <a className={btn} href={d.href}><Download size={14} />Download</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function SetupTab({ keys, newKey }: { keys: ApiKey[]; newKey: NewKey | null }) {
  const [sel, setSel] = useState('');
  const key = newKey && newKey.id === sel ? newKey.key : 'YOUR_API_KEY';
  const prompt = `Set up access to the Veiron API on my machine.

Endpoint: ${GATEWAY_URL}
Method: POST with a JSON body {"tool": "<tool name>"}
Auth header: x-api-key

1. Save my key as an environment variable:
   export VEIRON_API_KEY="${key}"
2. Test it:
   curl -X POST ${GATEWAY_URL} \\
     -H "x-api-key: $VEIRON_API_KEY" \\
     -H "Content-Type: application/json" \\
     -d '{"tool":"<tool name>"}'
3. 200 = access granted. 401 = key invalid, revoked or expired. 403 = key can't use that tool. 429 = daily limit reached.
4. Never print my API key in logs.`;
  return (
    <div className={card}>
      <h2 className="mb-1 text-lg font-semibold">Setup prompt</h2>
      <p className="mb-3 text-sm text-black/60">Paste this into your AI tool or terminal. The full key is only available right after you generate it.</p>
      <select className="mb-3 w-full rounded-lg border border-black/15 bg-white p-2 text-sm" value={sel} onChange={e => setSel(e.target.value)}>
        <option value="">No key (placeholder)</option>
        {keys.filter(k => keyStatus(k) === 'Active').map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
      </select>
      <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg bg-[#141413] text-white p-4 text-xs"><Terminal size={12} className="mb-2 inline" /> {'\n'}{prompt}</pre>
      <div className="mt-3"><CopyButton text={prompt} label="Copy prompt" /></div>
    </div>
  );
}

function KeysTab({ keys, newKey, onChange, setNewKey }: { keys: ApiKey[]; newKey: NewKey | null; onChange: () => void; setNewKey: (k: NewKey | null) => void }) {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState(0); // days, 0 = never
  const [scopes, setScopes] = useState('*'); // allowed tool names, comma separated; * = all
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  async function create() {
    if (!name.trim()) return;
    setBusy(true); setErr('');
    const { data, error } = await supabase.functions.invoke('create_key', { body: { name: name.trim(), scopes: scopes.split(',').map(x => x.trim()).filter(Boolean), ...(expiry ? { expires_in_days: expiry } : {}) } });
    setBusy(false);
    const key = data?.key ?? data?.api_key;
    if (error || !key) { setErr(error?.message ?? 'Could not create key'); return; }
    setNewKey({ id: data.id ?? data.key_id, key });
    setName(''); onChange();
  }
  async function revoke(id: string) {
    if (!confirm('Revoke this key? Apps using it will stop working.')) return;
    const { error } = await supabase.functions.invoke('revoke_key', { body: { id } });
    if (error) { setErr('Could not revoke key (it may already be revoked).'); onChange(); return; }
    if (newKey?.id === id) setNewKey(null);
    onChange();
  }

  return (
    <div className="space-y-4">
      <div className={card}>
        <h2 className="mb-3 text-lg font-semibold">Generate API key</h2>
        <div className="flex flex-wrap gap-2">
          <input className="min-w-[200px] flex-1 rounded-lg border border-black/15 bg-white p-2 text-sm" maxLength={40}
            placeholder="Key name, e.g. Production" value={name} onChange={e => setName(e.target.value)} />
          <input className="w-44 rounded-lg border border-black/15 bg-white p-2 text-sm" placeholder="Tools (* = all)" value={scopes} onChange={e => setScopes(e.target.value)} />
          <select className="rounded-lg border border-black/15 bg-white p-2 text-sm" value={expiry} onChange={e => setExpiry(+e.target.value)}>
            <option value={0}>Never expires</option><option value={30}>30 days</option><option value={90}>90 days</option><option value={365}>1 year</option>
          </select>
          <button className={btn} disabled={busy || !name.trim()} onClick={create}><Key size={14} />{busy ? 'Generating…' : 'Generate'}</button>
        </div>
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
        {newKey && (
          <div className="mt-4 rounded-lg border border-emerald-500/50 p-3">
            <p className="text-sm"><b>Copy your key now.</b> <span className="text-black/60">It won't be shown again.</span></p>
            <code className="my-2 block break-all rounded bg-[#141413] text-white p-2 text-xs">{newKey.key}</code>
            <CopyButton text={newKey.key} label="Copy key" />
          </div>
        )}
      </div>
      <div className={`${card} overflow-x-auto`}>
        <h2 className="mb-3 text-lg font-semibold">Your keys</h2>
        {keys.length === 0 ? <p className="text-sm text-black/60">No keys yet.</p> : (
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="text-black/50"><tr><th className="py-2">Name</th><th>Key</th><th>Tools</th><th>Created</th><th>Expires</th><th>Status</th><th /></tr></thead>
            <tbody>
              {keys.map(k => (
                <tr key={k.id} className="border-t border-black/10">
                  <td className="py-2">{k.name}</td>
                  <td><code>{k.prefix ?? k.key_prefix ?? 'key'}…</code></td>
                  <td className="max-w-[140px] truncate">{(k.scopes ?? []).join(', ') || 'none'}</td>
                  <td>{k.created_at?.slice(0, 10)}</td>
                  <td>{k.expires_at ? k.expires_at.slice(0, 10) : 'Never'}</td>
                  <td><span className={keyStatus(k) === 'Active' ? 'text-emerald-600' : 'text-red-600'}>{keyStatus(k)}</span></td>
                  <td className="text-right">{keyStatus(k) === 'Active' && <button className={btnGhost} onClick={() => revoke(k.id)}><Trash2 size={14} />Revoke</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function AnalyticsTab({ keys }: { keys: ApiKey[] }) {
  const [days, setDays] = useState(30);
  const [keyId, setKeyId] = useState('all');
  const [rows, setRows] = useState<{ created_at: string; tool_name: string; status: number }[]>([]);

  useEffect(() => {
    const since = new Date(Date.now() - days * 864e5).toISOString();
    let q = supabase.from(USAGE_TABLE).select('created_at,tool_name,status').gte('created_at', since).limit(10000);
    if (keyId !== 'all') q = q.eq('key_id', keyId);
    q.then(({ data }) => setRows(data ?? []));
  }, [days, keyId]);

  const series = useMemo(() => {
    const m = new Map<string, number>();
    for (let i = days - 1; i >= 0; i--) m.set(new Date(Date.now() - i * 864e5).toISOString().slice(0, 10), 0);
    rows.forEach(r => { const d = r.created_at.slice(0, 10); if (m.has(d)) m.set(d, (m.get(d) ?? 0) + 1); });
    return [...m];
  }, [rows, days]);

  const total = rows.length;
  const max = Math.max(1, ...series.map(s => s[1]));
  const topTools = useMemo(() => {
    const m = new Map<string, number>();
    rows.forEach(r => m.set(r.tool_name, (m.get(r.tool_name) ?? 0) + 1));
    return [...m].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [rows]);
  const stats: [string, string | number][] = [
    ['Total requests', total.toLocaleString()],
    ['Avg / day', Math.round(total / days).toFixed(1)],
    ['Success rate', total ? `${Math.round((rows.filter(r => r.status === 200).length / total) * 100)}%` : '–'],
    ['Active keys', keys.filter(k => keyStatus(k) === 'Active').length],
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <select className="rounded-lg border border-black/15 bg-white p-2 text-sm" value={keyId} onChange={e => setKeyId(e.target.value)}>
          <option value="all">All keys</option>
          {keys.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
        </select>
        <select className="rounded-lg border border-black/15 bg-white p-2 text-sm" value={days} onChange={e => setDays(+e.target.value)}>
          <option value={7}>Last 7 days</option><option value={30}>Last 30 days</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map(([l, v]) => <div key={l} className={card}><div className="text-2xl font-bold">{v}</div><div className="text-xs text-black/60">{l}</div></div>)}
      </div>
      <div className={card}>
        <h2 className="mb-3 text-lg font-semibold">Requests per day</h2>
        <div className="flex h-40 items-end gap-[3px]">
          {series.map(([d, n]) => <div key={d} title={`${d}: ${n}`} className="flex-1 rounded-t bg-[#E5182B]/80 hover:bg-[#E5182B]" style={{ height: `${Math.max(2, (n / max) * 100)}%` }} />)}
        </div>
        <div className="mt-2 flex justify-between text-xs text-black/50"><span>{series[0]?.[0]}</span><span>{series[series.length - 1]?.[0]}</span></div>
      </div>
      <div className={card}>
        <h2 className="mb-3 text-lg font-semibold">Top tools</h2>
        {topTools.length === 0 ? <p className="text-sm text-black/60">No calls yet.</p> : topTools.map(([t, n]) => (
          <div key={t} className="flex justify-between border-t border-black/10 py-2 text-sm first:border-0"><code>{t}</code><span>{n.toLocaleString()}</span></div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  { id: 'download', label: 'Download', icon: Download },
  { id: 'setup', label: 'Setup', icon: Terminal },
  { id: 'keys', label: 'API keys', icon: Key },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
] as const;

export default function ApiDashboard() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('download');
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newKey, setNewKey] = useState<NewKey | null>(null);

  const loadKeys = useCallback(async () => {
    const { data } = await supabase.from(KEYS_TABLE).select('*').order('created_at', { ascending: false });
    setKeys((data as ApiKey[]) ?? []);
  }, []);
  useEffect(() => { loadKeys(); }, [loadKeys]);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-12 pt-24 text-[#141413]">
      <h1 className="text-2xl font-bold">Veiron</h1>
      <p className="mb-6 text-black/60">Download, set up and manage API access.</p>
      <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-black/10">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2 text-sm ${tab === t.id ? 'border-[#E5182B] font-semibold' : 'border-transparent text-black/60'}`}>
            <t.icon size={14} />{t.label}
          </button>
        ))}
      </nav>
      {tab === 'download' && <DownloadTab />}
      {tab === 'setup' && <SetupTab keys={keys} newKey={newKey} />}
      {tab === 'keys' && <KeysTab keys={keys} newKey={newKey} onChange={loadKeys} setNewKey={setNewKey} />}
      {tab === 'analytics' && <AnalyticsTab keys={keys} />}
    </div>
  );
}

import { useState } from 'react';
import { useStore } from '../store/useStore';

export default function Account() {
  const { user, signIn, signOut } = useStore();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signIn(email);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-ivory mb-2">Account</h1>
      <p className="text-ivory/50 text-sm mb-8">
        Connect your account to sync focus sessions with the FourFlow Agent.
      </p>

      {user ? (
        <div className="rounded-2xl border border-glass-border bg-glass-light p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-space flex-shrink-0" />
            <div>
              <p className="text-ivory text-sm font-medium">Connected</p>
              <p className="text-ivory/50 text-xs">{user.email}</p>
            </div>
          </div>
          <p className="text-ivory/40 text-xs">
            Focus sessions are syncing to the FourFlow Agent automatically.
          </p>
          <button
            onClick={signOut}
            className="text-xs text-ivory/40 hover:text-ivory/70 transition-colors"
          >
            Sign out
          </button>
        </div>
      ) : sent ? (
        <div className="rounded-2xl border border-glass-border bg-glass-light p-6 space-y-2">
          <p className="text-ivory font-medium">Check your email</p>
          <p className="text-ivory/50 text-sm">
            We sent a magic link to <span className="text-ivory">{email}</span>.
            Click it to connect your account.
          </p>
          <button
            onClick={() => { setSent(false); setEmail(''); }}
            className="text-xs text-ivory/40 hover:text-ivory/70 transition-colors pt-2 block"
          >
            Use a different email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs text-ivory/50 mb-2 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-glass-light border border-glass-border rounded-xl px-4 py-3 text-ivory placeholder-ivory/30 focus:outline-none focus:border-space/60 transition-colors"
            />
          </div>
          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !email}
            className="w-full py-3 rounded-xl bg-space/80 hover:bg-space text-white font-medium text-sm transition-all disabled:opacity-40"
          >
            {loading ? 'Sending…' : 'Send magic link'}
          </button>
          <p className="text-ivory/30 text-xs text-center">
            No password. One-click sign in from your inbox.
          </p>
        </form>
      )}

      {!user && (
        <div className="mt-12 pt-6 border-t border-glass-border">
          <p className="text-ivory/30 text-xs">
            FlowZone works without an account. Connecting lets the FourFlow Agent
            observe your focus patterns and update your Flow Profile automatically.
          </p>
        </div>
      )}
    </div>
  );
}

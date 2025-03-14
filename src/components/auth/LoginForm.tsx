'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import styles from './auth.module.css';
import { useRouter } from 'next/navigation';
import { AuthError } from '@supabase/supabase-js';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.refresh(); // Refresh the current page to update server components
      router.push('/app');
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className={styles.input}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className={styles.button}
      >
        {loading ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
} 
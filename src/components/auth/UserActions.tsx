'use client';

import { createBrowserClient } from '@supabase/ssr';
import styles from '@/app/[app]/page.module.css';
import { useRouter } from 'next/navigation';

export function UserActions({ userEmail }: { userEmail: string }) {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Refresh the current page to update server components
    router.push('/login');
  };

  return (
    <div className={styles.userActions}>
      <span className={styles.userInfo}>
        {userEmail}
      </span>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
} 
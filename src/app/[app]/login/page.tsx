import { LoginForm } from '@/components/auth/LoginForm';
import styles from './login.module.css';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie?.value;
        }
      }
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // If user is already logged in, redirect to app
  if (session) {
    redirect('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Login</h1>
        <p>Enter your credentials to access your account</p>
        <LoginForm />
      </div>
    </div>
  );
}

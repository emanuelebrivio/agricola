import Image from "next/image";
import styles from "./page.module.css";
import { AuthCheck } from "@/components/auth/AuthCheck";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { UserActions } from "@/components/auth/UserActions";

export default async function Home() {
  // Add authentication check
  await AuthCheck();

  // Get the user data
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null; // This shouldn't happen due to AuthCheck, but TypeScript needs it
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/logos/agricolabrivio-logo-mark-white.svg"
          alt="Azienda Agricola Brivio"
          width={32}
          height={32}
          priority
        />
        <UserActions userEmail={user.email || ''} />
      </header>
      <main className={styles.main}>
        <h2>Welcome to your dashboard</h2>
        <p>You are now logged in to access the farm management tools.</p>
      </main>
    </div>
  );
}

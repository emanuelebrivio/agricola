import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getValidSubdomain } from '@/utils/subdomain';
import { createServerClient, type CookieOptions } from '@supabase/ssr'

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);
  if (subdomain === 'app') {
    // Subdomain available, rewriting
    url.pathname = `/${subdomain}${url.pathname}`;
  }

  return NextResponse.rewrite(url);
}
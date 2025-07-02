import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that don't require authentication
const publicPaths = ['/layar_antrian', '/signin'];

// Auth-related paths
const authPaths = ['/signin', '/signup', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth-token')?.value;
  const isLoggedIn = !!authToken;

  if (isLoggedIn && authPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - API routes (api/)
     * - Static files (_next/static, _next/image)
     * - Public assets (images/, fonts/, favicon.ico)
     * - Auth pages (handled separately)
     * - Other special files (manifest.json, robots.txt)
     */
    '/((?!api|_next/static|_next/image|images|fonts|favicon.ico|manifest.json|robots.txt).*)'
  ],
};
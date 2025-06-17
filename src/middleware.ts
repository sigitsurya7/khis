import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { useAuthStore } from './store/authStore';

// List of paths that don't require authentication
const publicPaths = ['/signin', '/signup', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth-token')?.value;

  // Jika path public, lanjutkan
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Jika tidak ada auth token dan mencoba mengakses route protected
  if (!authToken) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|images|fonts|favicon.ico|signin|signup|manifest.json|robots.txt).*)'
  ],
};
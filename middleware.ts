import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { AuthToken } from './app/api/auth/[...nextauth]/route';

const PUBLIC_PATHS = ['/auth', '/about', '/contact', '/departments', '/services'];

export async function middleware(request: NextRequest) {
  const token = (await getToken({ req: request })) as AuthToken | null;
  const { pathname } = request.nextUrl;

  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path) || pathname === '/');
  const isPatientRoute = pathname.startsWith('/patient');

  // Handle protected routes (API and patient routes)
  if (isPatientRoute) {
    if (!token || !token.id) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  // Redirect authenticated users trying to access public paths
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/patient/dashboard', request.url));
  }

  // For all other routes, continue the request
  return NextResponse.next();
}

// Improve performance by only running the middleware on specific paths
export const config = {
  matcher: ['/', '/auth/:path*', '/patient/:path*', '/about/:path*', '/contact/:path*', '/departments/:path*', '/services/:path*', '/api/:path*'],
};
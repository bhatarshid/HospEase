import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { AuthToken } from './app/api/auth/[...nextauth]/route';

const PUBLIC_PATHS = ['/auth', '/about', '/contact', '/departments', '/services'];
const PROTECTED_API_ROUTES = [
  { path: '/api/user', action: ['register'] },
  { path: '/api/doctor', action: ['all', 'single'] }
];

export async function middleware(request: NextRequest) {
  const token = (await getToken({ req: request })) as AuthToken | null;
  const { pathname } = request.nextUrl;
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action') || '';

  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path) || pathname === '/');
  const isProtectedApiRoute = PROTECTED_API_ROUTES.some(route => pathname.startsWith(route.path) && route.action.includes(action));
  const isPatientRoute = pathname.startsWith('/patient');
  const isApiRoute = pathname.startsWith('/api');

  // Handle protected routes (API and patient routes)
  if (isProtectedApiRoute || isPatientRoute) {
    if (!token || !token.id) {
      if (isApiRoute) {
        return new NextResponse(
          JSON.stringify({ success: false, message: 'Authentication required' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        // Redirect to login for non-API routes
        return NextResponse.redirect(new URL('/auth/signin', request.url));
      }
    }

    if(isApiRoute) {
      // Add user id to the request headers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('user_id', JSON.stringify(token.id));

      // Allow the request to proceed with the added user id
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
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
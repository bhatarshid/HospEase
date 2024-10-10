import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
 
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (!token && (url.pathname.startsWith('/patient'))) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  if(token && (
    url.pathname === '/' || 
    url.pathname === '/auth/signin' || 
    url.pathname.startsWith('/auth') ||
    url.pathname.startsWith('/about') ||
    url.pathname.startsWith('/contact') ||
    url.pathname.startsWith('/departments') ||
    url.pathname.startsWith('/services')
  )) {
    return NextResponse.redirect(new URL('/patient/dashboard', request.url));
  }
}

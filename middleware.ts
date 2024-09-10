import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const isLogin = cookieStore.get('login');

  if (isLogin) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: '/dashboard/:path*',
  }

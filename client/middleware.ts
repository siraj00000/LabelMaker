import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/product/DS2')) {
    let cookie = request.cookies.get('authTokenC')
    if (!cookie) {
      return NextResponse.rewrite(new URL('/auth/login', request.url))
    }
  }
}
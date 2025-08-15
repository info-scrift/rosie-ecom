import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // if (pathname.startsWith('/api')) {
  //   return NextResponse.next()
  // }

  // if (pathname === '/' || pathname.startsWith('/admin')) {
  //   return NextResponse.next()
  // }

  // return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: ['/((?!_next|images|favicon.ico).*)'],
}

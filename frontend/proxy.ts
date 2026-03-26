import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './utils/token'

export async function proxy(request: NextRequest) {
  const protectedRoutes = ['/user/update']
  const urlPath = request.nextUrl.pathname
  const token = (await cookies()).get('token')?.value

  if (protectedRoutes.includes(urlPath)) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    const res = verifyToken(token)

    if (!res) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/user/:path*'],
}

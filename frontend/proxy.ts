import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './utils/token'

export async function proxy(request: NextRequest) {
  const protectedRoutes = [
    '/user/update',
    '/',
    '/home/user',
    '/home/owner',
    '/home/delivery-boy',
  ]
  const urlPath = request.nextUrl.pathname
  const token = (await cookies()).get('token')?.value

  if (protectedRoutes.includes(urlPath)) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if (decoded?.role === 'user' && urlPath !== '/home/user') {
      return NextResponse.redirect(new URL('/home/user', request.nextUrl))
    } else if (decoded?.role === 'owner' && urlPath !== '/home/owner') {
      return NextResponse.redirect(new URL('/home/owner', request.nextUrl))
    } else if (
      decoded?.role === 'deliveryBoy' &&
      urlPath !== '/home/delivery-boy'
    ) {
      return NextResponse.redirect(
        new URL('/home/delivery-boy', request.nextUrl)
      )
    }
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/', '/home/:path*', '/user/:path*'],
}

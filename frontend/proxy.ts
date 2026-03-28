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
  let decoded
  if (token) {
    decoded = verifyToken(token)
  }
  if ((urlPath === '/login' || urlPath === '/register') && decoded) {
    return NextResponse.redirect(
      new URL(`/home/${decoded?.role}`, request.nextUrl)
    )
  }

  if (protectedRoutes.includes(urlPath)) {
    if (!token || !decoded) {
      return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    //checking for user roles and redirecting to the correct page
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
  matcher: ['/', '/home/:path*', '/user/:path*', '/login', '/register'],
}

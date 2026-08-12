import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  // Only apply to /admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization')

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1]
      const [user, pwd] = atob(authValue).split(':')

      const validUser = process.env.ADMIN_USER || 'admin'
      const validPass = process.env.ADMIN_PASS || 'admin123'

      if (user === validUser && pwd === validPass) {
        return NextResponse.next()
      }
    }

    return new NextResponse('Authentication Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="NBRF Admin Panel"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

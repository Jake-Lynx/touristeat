import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// Cache
const tokenCache = new Map<string, {token: any, timestamp: number}>();
const CACHE_DURATION = 60 * 1000 * 10; // 10 minutes

export async function middleware(req: NextRequest) {

  // Check session token and token
  const sessionToken = req.cookies.get('next-auth.session-token')?.value;
  
  if (!sessionToken) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (token) {
      tokenCache.set('temp-token', {
        token,
        timestamp: Date.now()
      })
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/admin', req.url));
  }
  
  // If we've a session token, check cache
  const cachedResult = tokenCache.get(sessionToken);
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
    return cachedResult.token
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/admin', req.url)) 
  }
  
  // If we don't have a session token or it's expired, check token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Update cache
  tokenCache.set(
    sessionToken,
    {
      token,
      timestamp: Date.now()
    }
  )

  return token
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/admin', req.url))
}

// Routes sur lesquelles le middleware s'applique
export const config = {
  matcher: ['/admin/meals/:path*'],
};

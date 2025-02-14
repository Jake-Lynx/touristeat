import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// Cache
const tokenCache = new Map<string, {token: any, timestamp: number}>();
const CACHE_DURATION = 60 * 1000 * 10; // 10 minutes

export async function middleware(req: NextRequest) {

  const sessionToken = req.cookies.get('next-auth.session-token')?.value;
  
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // Check cache
  const cachedResult = tokenCache.get(sessionToken);
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_DURATION) {
    return cachedResult.token
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/admin', req.url)) 
  }

  // If no cache, check token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Cache the result
  tokenCache.set(
    sessionToken,
    {
      token,
      timestamp: Date.now()
    }
  )

  // Maintain the user on the admin page if they are not connected
  if (!token) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

// Routes sur lesquelles le middleware s'applique
export const config = {
  matcher: ['/admin/meals/:path*'],
};

import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Si l'utilisateur est connecté
  if (token) {
    
    // Le maintenir à la page d'accueil admin s'il
    // n'est pas admin
    if (req.url.includes('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url)); // Redirige vers une page 403 ou autre
    }
  } else {
    // Si l'utilisateur n'est pas connecté,
    // le maintenir à la page d'accueil admin
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

// Routes sur lesquelles le middleware s'applique
export const config = {
  matcher: ['/admin/meals/:path*'],
};

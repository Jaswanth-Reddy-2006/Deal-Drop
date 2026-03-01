import { NextResponse, type NextRequest } from 'next/server';

// NOTE: This is a simulation based on cookies or sessions.
// For the final marketplace, we'll check for user.role.
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Simulate existing role check (In prod, this would look at JWT or session)
    // For now, we'll allow all routes, but this is where we'd put redirects.

    // if (pathname.startsWith('/seller-dashboard') && userRole !== 'seller') {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/seller-dashboard/:path*', '/store/:path*'],
};

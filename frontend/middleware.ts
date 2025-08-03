import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {

    const token = request.cookies.get('authToken')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/', request.url));
    }


    try {
        const secret = new TextEncoder().encode("MY_SECRET");
        const {payload} = await jwtVerify(token, secret);


        const userType = payload.userType;
        if (request.nextUrl.pathname.startsWith('/admin') && userType !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        if (request.nextUrl.pathname.startsWith('/cashier') && userType !== 'cashier') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.log(error)

        return NextResponse.redirect(new URL('/', request.url));
    }

}

export const config = {
    matcher: ['/admin/:path*', '/cashier/:path*'],
};
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from 'jose';

import { decodeToken } from "@/utils/auth";
import jwt from "jsonwebtoken";
export async function middleware(request: NextRequest) {
    console.log('🔥 Middleware running for:', request.nextUrl.pathname);

    const token = request.cookies.get('authToken')?.value;
    // console.log('🍪 Token from cookie:', token ? 'Token exists' : 'No token found');
    // console.log('🍪 Token from cookie:', token);
    if (!token) {
        console.log('❌ No token, redirecting to /');
        return NextResponse.redirect(new URL('/', request.url));
    }


    try {
        const secret = new TextEncoder().encode("MY_SECRET");
        const {payload} = await jwtVerify(token, secret);

        // const decoded = jwt.verify(token, "MY_SECRET") as any;
        console.log("UserType:", payload.userType)

        console.log("UserType: above")
        const userType = payload.userType;
        console.log("UserType:", userType)
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
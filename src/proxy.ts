import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const allowedPath = ["/", "/signin", "/register", "/verify"];
  if (allowedPath.includes(pathname) || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_AUTH_SECRET,
  });
  if (!token || !token.id) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", token.id.toString());
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// routes where proxy is not applied
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};

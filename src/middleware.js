import { NextResponse } from "next/server";

export function middleware(request) {
  const currentUser = request.cookies.get("currentUser")?.value;
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/images") ||
    pathname.includes("Icons") ||
    pathname.includes("Logo")
  ) {
    return NextResponse.next();
  }

  if (currentUser && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};

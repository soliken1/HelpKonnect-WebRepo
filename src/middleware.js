import { NextResponse } from "next/server";

export function middleware(request) {
  const currentUser = request.cookies.get("currentUser")?.value;

  const { pathname } = request.nextUrl;

  // If user is authenticated and trying to access the login page, redirect to dashboard
  if (currentUser && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is NOT authenticated and trying to access any other page except login, redirect to login
  if (!currentUser && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to login page
  }

  // Allow access to requested page
  return NextResponse.next();
}

export const config = {
  // Match all routes except the login page ("/")
  matcher: [
    "/((?!api|_next|static|favicon.ico).*)", // Matches all routes except static, API, and other Next.js internal routes
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip Next.js internals, API, and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") || 
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // 2. Allow public access to subscribe, login, and sanity studio
  if (
    pathname === "/subscribe" ||
    pathname === "/login" ||
    pathname.startsWith("/studio")
  ) {
    return NextResponse.next();
  }

  // 3. Check for subscriber session
  const subscriberEmail = request.cookies.get("subscriber_email")?.value;

  if (!subscriberEmail) {
    // Redirect to subscribe landing page
    const url = request.nextUrl.clone();
    url.pathname = "/subscribe";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except public folders
  matcher: ["/((?!public|static|fonts).*)"],
};

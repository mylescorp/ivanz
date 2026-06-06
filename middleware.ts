import { NextResponse, type NextRequest } from "next/server";
import {
  adminContentSecurityPolicy,
  contentSecurityPolicy,
  securityHeaders,
} from "@/lib/security/headers";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isDev = process.env.NODE_ENV === "development";
  const isAdmin = request.nextUrl.pathname.startsWith("/admin");

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  response.headers.set(
    "Content-Security-Policy",
    isAdmin ? adminContentSecurityPolicy() : contentSecurityPolicy(isDev),
  );

  if (!isDev) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=63072000; includeSubDomains; preload",
    );
  }

  response.headers.set("X-Permitted-Cross-Domain-Policies", "none");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

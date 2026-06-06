import { NextResponse } from "next/server";
import {
  IVANZ_COOKIES,
  csrfCookieOptions,
} from "@/lib/security/cookies";
import { generateCsrfToken } from "@/lib/security/csrf";

export async function GET() {
  const token = generateCsrfToken();
  const response = NextResponse.json({ token });

  response.cookies.set(IVANZ_COOKIES.csrf, token, csrfCookieOptions());

  return response;
}

import { NextResponse, type NextRequest } from "next/server";
import {
  IVANZ_COOKIES,
  clearCookieOptions,
  consentCookieOptions,
  parseConsentValue,
  type ConsentPreference,
} from "@/lib/security/cookies";
import { CSRF_HEADER } from "@/lib/security/constants";
import {
  generateCsrfToken,
  validateCsrfRequest,
} from "@/lib/security/csrf";
import { csrfCookieOptions } from "@/lib/security/cookies";

const ALLOWED_PREFERENCES: ConsentPreference[] = [
  "accepted",
  "declined",
  "essential",
];

export async function GET(request: NextRequest) {
  const consent = parseConsentValue(
    request.cookies.get(IVANZ_COOKIES.consent)?.value,
  );

  return NextResponse.json({ consent });
}

export async function POST(request: NextRequest) {
  const cookieToken = request.cookies.get(IVANZ_COOKIES.csrf)?.value;
  const headerToken = request.headers.get(CSRF_HEADER);

  if (!validateCsrfRequest(cookieToken, headerToken)) {
    const response = NextResponse.json(
      { error: "Invalid or missing CSRF token" },
      { status: 403 },
    );
    response.cookies.set(IVANZ_COOKIES.csrf, "", clearCookieOptions());
    return response;
  }

  let body: { preference?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const preference = parseConsentValue(body.preference);
  if (!preference || !ALLOWED_PREFERENCES.includes(preference)) {
    return NextResponse.json({ error: "Invalid consent preference" }, { status: 400 });
  }

  const response = NextResponse.json({ consent: preference });
  response.cookies.set(IVANZ_COOKIES.consent, preference, consentCookieOptions());

  const newToken = generateCsrfToken();
  response.cookies.set(IVANZ_COOKIES.csrf, newToken, csrfCookieOptions());

  return response;
}

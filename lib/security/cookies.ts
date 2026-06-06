import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const IVANZ_COOKIE_PREFIX = "__ivanz_";

export const IVANZ_COOKIES = {
  consent: `${IVANZ_COOKIE_PREFIX}consent`,
  csrf: `${IVANZ_COOKIE_PREFIX}csrf`,
} as const;

export type ConsentPreference = "accepted" | "declined" | "essential";

const CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const CSRF_MAX_AGE = 60 * 15; // 15 minutes

function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

function cookieDomain(): string | undefined {
  const domain = process.env.COOKIE_DOMAIN?.trim();
  return domain || undefined;
}

export function buildCookieOptions(
  maxAge: number,
  options?: { httpOnly?: boolean; sameSite?: "lax" | "strict" },
): Partial<ResponseCookie> {
  return {
    httpOnly: options?.httpOnly ?? true,
    secure: isProduction(),
    sameSite: options?.sameSite ?? "lax",
    path: "/",
    maxAge,
    domain: cookieDomain(),
  };
}

export function consentCookieOptions(): Partial<ResponseCookie> {
  return buildCookieOptions(CONSENT_MAX_AGE, { httpOnly: true });
}

export function csrfCookieOptions(): Partial<ResponseCookie> {
  return buildCookieOptions(CSRF_MAX_AGE, { httpOnly: true, sameSite: "strict" });
}

export function clearCookieOptions(): Partial<ResponseCookie> {
  return {
    httpOnly: true,
    secure: isProduction(),
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
    domain: cookieDomain(),
  };
}

export function parseConsentValue(value: string | undefined): ConsentPreference | null {
  if (value === "accepted" || value === "declined" || value === "essential") {
    return value;
  }
  return null;
}

import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { CSRF_HEADER } from "@/lib/security/constants";

function getCsrfSecret(): string {
  const secret = process.env.CSRF_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("CSRF_SECRET environment variable is required in production");
  }
  return secret ?? "ivanz-dev-csrf-secret-change-in-production";
}

export function generateCsrfToken(): string {
  const nonce = randomBytes(32).toString("hex");
  const signature = createHmac("sha256", getCsrfSecret())
    .update(nonce)
    .digest("hex");
  return `${nonce}.${signature}`;
}

export function isValidCsrfToken(token: string | null | undefined): boolean {
  if (!token || !token.includes(".")) return false;

  const [nonce, signature] = token.split(".");
  if (!nonce || !signature) return false;

  const expected = createHmac("sha256", getCsrfSecret())
    .update(nonce)
    .digest("hex");

  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function validateCsrfRequest(
  cookieToken: string | undefined,
  headerToken: string | null,
): boolean {
  if (!cookieToken || !headerToken) return false;
  if (!isValidCsrfToken(cookieToken) || !isValidCsrfToken(headerToken)) {
    return false;
  }

  try {
    return timingSafeEqual(Buffer.from(cookieToken), Buffer.from(headerToken));
  } catch {
    return false;
  }
}

export { CSRF_HEADER };

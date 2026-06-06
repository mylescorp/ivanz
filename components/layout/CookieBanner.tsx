"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CSRF_HEADER } from "@/lib/security/constants";

type BannerState = "loading" | "visible" | "hidden";

export function CookieBanner() {
  const [state, setState] = useState<BannerState>("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadConsent() {
      try {
        const response = await fetch("/api/consent", { credentials: "same-origin" });
        const data = (await response.json()) as { consent: string | null };
        if (!cancelled) {
          setState(data.consent ? "hidden" : "visible");
        }
      } catch {
        if (!cancelled) setState("visible");
      }
    }

    loadConsent();
    return () => {
      cancelled = true;
    };
  }, []);

  async function savePreference(preference: "accepted" | "declined" | "essential") {
    try {
      const csrfResponse = await fetch("/api/csrf", { credentials: "same-origin" });
      const { token } = (await csrfResponse.json()) as { token: string };

      await fetch("/api/consent", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          [CSRF_HEADER]: token,
        },
        body: JSON.stringify({ preference }),
      });
    } catch {
      // Hide banner even if save fails to avoid trapping the user
    }

    setState("hidden");
  }

  if (state !== "visible") return null;

  return (
    <div
      className="fixed bottom-24 left-4 right-4 z-[60] rounded-2xl border border-gold/30 bg-navy p-5 shadow-2xl sm:bottom-6 sm:left-auto sm:right-24 sm:max-w-md"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <p className="text-sm leading-relaxed text-white/80">
        We use essential cookies to remember your preferences and keep the site
        secure. See our{" "}
        <Link href="/cookies" className="font-semibold text-gold hover:underline">
          Cookie Policy
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="font-semibold text-gold hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => savePreference("accepted")}
          className="flex-1 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold/90"
        >
          Accept All
        </button>
        <button
          type="button"
          onClick={() => savePreference("essential")}
          className="flex-1 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Essential Only
        </button>
        <button
          type="button"
          onClick={() => savePreference("declined")}
          className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

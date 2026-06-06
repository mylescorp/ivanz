import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { IVANZ_COOKIES, IVANZ_COOKIE_PREFIX } from "@/lib/security/cookies";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie policy for ${siteConfig.name} — how we use cookies and your choices.`,
};

const cookieTable = [
  {
    name: IVANZ_COOKIES.consent,
    purpose: "Stores your cookie consent preference",
    duration: "1 year",
    type: "Essential",
  },
  {
    name: IVANZ_COOKIES.csrf,
    purpose: "Protects form and API requests against cross-site request forgery",
    duration: "15 minutes",
    type: "Essential",
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHero
        title="Cookie Policy"
        description="How IvanZ Construction uses cookies on this website."
      />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <p className="text-muted">Last updated: June 2026</p>

          <p className="mt-6 text-body leading-relaxed">
            This website uses a small number of essential cookies prefixed with{" "}
            <code className="rounded bg-grey-light px-1.5 py-0.5 text-sm">
              {IVANZ_COOKIE_PREFIX}
            </code>{" "}
            in line with {siteConfig.name} security standards. We do not use
            advertising or third-party tracking cookies.
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-grey-light">
            <table className="w-full text-left text-sm">
              <thead className="bg-grey-light/50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-navy">Cookie</th>
                  <th className="px-4 py-3 font-semibold text-navy">Purpose</th>
                  <th className="px-4 py-3 font-semibold text-navy">Duration</th>
                  <th className="px-4 py-3 font-semibold text-navy">Type</th>
                </tr>
              </thead>
              <tbody>
                {cookieTable.map((row) => (
                  <tr key={row.name} className="border-t border-grey-light">
                    <td className="px-4 py-3 font-mono text-xs">{row.name}</td>
                    <td className="px-4 py-3 text-body">{row.purpose}</td>
                    <td className="px-4 py-3 text-muted">{row.duration}</td>
                    <td className="px-4 py-3 text-muted">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-10 font-heading text-xl font-semibold text-navy">
            Your choices
          </h2>
          <p className="mt-3 text-body leading-relaxed">
            You can accept all cookies, accept essential cookies only, or decline
            optional cookies using the banner shown on your first visit. Essential
            security cookies are required for safe operation of consent and CSRF
            protection endpoints.
          </p>

          <p className="mt-6 text-body leading-relaxed">
            Read our{" "}
            <Link href="/privacy" className="text-gold hover:underline">
              Privacy Policy
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-gold hover:underline">
              contact us
            </Link>{" "}
            with questions.
          </p>
        </div>
      </section>
    </>
  );
}

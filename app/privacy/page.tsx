import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name} website visitors.`,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="How IvanZ Construction handles your information when you use this website."
      />

      <section className="py-16">
        <div className="prose prose-navy mx-auto max-w-3xl px-4 md:px-6">
          <p className="text-muted">Last updated: June 2026</p>

          <h2 className="font-heading text-xl font-semibold text-navy">Overview</h2>
          <p className="text-body leading-relaxed">
            {siteConfig.name} operates this website to provide information about
            our civil engineering services in {siteConfig.serviceArea}. We respect
            your privacy and only collect information you choose to share with us.
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-navy">
            Information you provide
          </h2>
          <p className="text-body leading-relaxed">
            When you use our WhatsApp inquiry form, you voluntarily provide your
            name, phone number, location, service requirements, and any optional
            project details. This information is sent directly to our WhatsApp
            business number via your device. We do not store form submissions on
            this website&apos;s servers.
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-navy">
            Cookies
          </h2>
          <p className="text-body leading-relaxed">
            We use essential cookies to remember your cookie consent choice and
            protect against cross-site request forgery. See our{" "}
            <Link href="/cookies" className="text-gold hover:underline">
              Cookie Policy
            </Link>{" "}
            for details.
          </p>

          <h2 className="mt-8 font-heading text-xl font-semibold text-navy">
            Contact
          </h2>
          <p className="text-body leading-relaxed">
            For privacy questions, contact us via WhatsApp at{" "}
            {siteConfig.whatsappDisplayPrimary} or visit our{" "}
            <Link href="/contact" className="text-gold hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}

import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { WhatsAppCta } from "@/components/home/WhatsAppCta";
import Link from "next/link";
import { ArrowRight, FileDown, Calculator } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/estimator"
              className="group rounded-2xl border border-grey-light bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <Calculator className="h-8 w-8 text-gold" />
              <h3 className="mt-4 font-heading text-xl font-semibold text-navy">
                Cost Estimator
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Get an indicative UGX cost range for your project in under 2
                minutes, then request a formal quote.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                Estimate now <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/downloads"
              className="group rounded-2xl border border-grey-light bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <FileDown className="h-8 w-8 text-gold" />
              <h3 className="mt-4 font-heading text-xl font-semibold text-navy">
                Company Profile
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Download our company profile for tenders, procurement, and
                project submissions.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                Download <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppCta />
    </>
  );
}

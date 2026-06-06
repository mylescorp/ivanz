import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageHeroImages } from "@/lib/data/images";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Civil engineering services including road construction, building design, land survey, drainage, soil testing, structural engineering, and project management across Africa.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description={`Comprehensive civil engineering solutions for infrastructure projects across ${siteConfig.serviceArea}.`}
        image={pageHeroImages.services}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            title="What We Deliver"
            subtitle="From initial survey to project completion, IvanZ Construction handles every stage of your civil engineering project."
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-grey-light py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            title="Full Service Details"
            subtitle="In-depth information on scope, process, deliverables, and FAQs for each service."
          />

          <div className="space-y-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} variant="full" />
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-navy p-8 text-center text-white md:p-12">
            <h2 className="font-heading text-2xl font-bold md:text-3xl">
              Not sure which service you need?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/80">
              Use our cost estimator for an indicative budget range, or send us
              your project details and we will recommend the right approach.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/estimator"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold/90"
              >
                Try the cost estimator
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

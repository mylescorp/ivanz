import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  ClipboardList,
  Compass,
  Droplets,
  FlaskConical,
  Layers,
  Route,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { services } from "@/lib/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Civil engineering services including road construction, building design, land survey, drainage, soil testing, and project management in Eastern Uganda.",
};

const iconMap = {
  road: Route,
  building: Building2,
  compass: Compass,
  droplets: Droplets,
  flask: FlaskConical,
  layers: Layers,
  clipboard: ClipboardList,
} as const;

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Comprehensive civil engineering solutions for infrastructure
            projects across Eastern Uganda.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            title="What We Deliver"
            subtitle="From initial survey to project completion, IvanZ Construction handles every stage of your civil engineering project."
          />

          <div className="space-y-8">
            {services.map((service) => {
              const Icon =
                iconMap[service.icon as keyof typeof iconMap] ?? Route;
              return (
                <div
                  key={service.id}
                  className="rounded-2xl border border-grey-light bg-white p-6 shadow-sm md:p-8"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-gold">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-heading text-2xl font-semibold text-navy">
                        {service.title}
                      </h2>
                      <p className="mt-2 leading-relaxed text-muted">
                        {service.description}
                      </p>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-sm text-body"
                          >
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/contact?service=${service.id}`}
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold/90"
                      >
                        Request this service
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

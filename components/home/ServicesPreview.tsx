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
} from "lucide-react";
import { services } from "@/lib/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap = {
  road: Route,
  building: Building2,
  compass: Compass,
  droplets: Droplets,
  flask: FlaskConical,
  layers: Layers,
  clipboard: ClipboardList,
} as const;

export function ServicesPreview() {
  const preview = services.slice(0, 6);

  return (
    <section className="bg-grey-light py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive civil engineering solutions for roads, buildings, drainage, and infrastructure across Eastern Uganda."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {preview.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Route;
            return (
              <div
                key={service.id}
                className="group rounded-2xl border border-grey-light bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-navy group-hover:text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-navy">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <Link
                  href={`/contact?service=${service.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold transition-colors hover:text-gold/80"
                >
                  Request this service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

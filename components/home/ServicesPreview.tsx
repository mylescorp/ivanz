import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/lib/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesPreview() {
  const preview = services.slice(0, 6);

  return (
    <section className="bg-grey-light py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive civil engineering solutions for roads, buildings, drainage, and infrastructure across Africa."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {preview.map((service) => (
            <ServiceCard key={service.id} service={service} variant="compact" />
          ))}
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

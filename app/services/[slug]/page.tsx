import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ListChecks,
  Settings2,
  Users,
} from "lucide-react";
import { RelatedProjects } from "@/components/services/RelatedProjects";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServiceCta } from "@/components/services/ServiceCta";
import {
  ServicePageInquiryButton,
  ServicePageInquiryLink,
} from "@/components/services/ServicePageInquiry";
import { ServiceJsonLd } from "@/components/seo/ServiceJsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getServiceImage } from "@/lib/data/images";
import {
  getOtherServices,
  getServiceById,
  services,
  type ServiceCategory,
} from "@/lib/data/services";
import { siteConfig } from "@/lib/config";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceById(slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.metaDescription,
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.metaDescription,
      url: `${siteConfig.url}/services/${service.id}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceById(slug);
  if (!service) notFound();

  const otherServices = getOtherServices(service.id as ServiceCategory);
  const serviceImage = getServiceImage(service.id);

  return (
    <>
      <ServiceJsonLd service={service} />

      <PageHero
        title={service.title}
        description={service.description}
        image={serviceImage}
      >
        <Link
          href="/services"
          className="mb-4 inline-block text-sm text-white/70 transition-colors hover:text-white"
        >
          ← All services
        </Link>
      </PageHero>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SectionHeading
                title="Service Overview"
                align="left"
              />
              <div className="space-y-4 text-body leading-relaxed">
                {service.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-grey-light bg-grey-light/50 p-6">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-navy">
                <ListChecks className="h-5 w-5 text-gold" />
                What&apos;s included
              </h3>
              <ul className="mt-4 space-y-3">
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
              <ServicePageInquiryButton
                serviceId={service.id}
                className="mt-6 w-full px-5 py-3"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-grey-light py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            title="How We Work"
            subtitle="Our structured process keeps your project on track from start to finish."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {service.process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-navy md:text-3xl">
                <Settings2 className="h-7 w-7 text-gold" />
                Deliverables
              </h2>
              <p className="mt-3 text-muted">
                What you receive when you engage IvanZ Construction for{" "}
                {service.title.toLowerCase()}.
              </p>
              <ul className="mt-6 space-y-3">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-grey-light bg-white p-4 text-sm text-body"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-navy md:text-3xl">
                <Users className="h-7 w-7 text-gold" />
                Ideal For
              </h2>
              <p className="mt-3 text-muted">
                Common project types we support under this service.
              </p>
              <ul className="mt-6 space-y-3">
                {service.idealFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-body"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <RelatedProjects category={service.id} />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle={`Common questions about our ${service.title.toLowerCase()} service.`}
          />
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-grey-light bg-white p-6 shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-heading font-semibold text-navy">
                  <span className="flex items-start gap-2">
                    <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    {faq.question}
                  </span>
                  <span className="text-gold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 pl-7 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted">
            More questions? Visit our{" "}
            <Link href="/faq" className="font-semibold text-gold hover:underline">
              FAQ page
            </Link>{" "}
            or{" "}
            <ServicePageInquiryLink serviceId={service.id} />
            .
          </p>
        </div>
      </section>

      <ServiceCta serviceId={service.id} serviceTitle={service.title} />

      <section className="border-t border-grey-light bg-grey-light/50 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            title="Other Services"
            subtitle="Explore the full range of civil engineering services we offer."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherServices.slice(0, 3).map((item) => (
              <ServiceCard key={item.id} service={item} variant="compact" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

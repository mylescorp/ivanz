import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Service } from "@/lib/data/services";
import { getServiceImage } from "@/lib/data/images";
import { InquiryTrigger } from "@/components/whatsapp/InquiryTrigger";
import { getServiceIcon } from "@/lib/service-icons";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  variant?: "compact" | "full";
  className?: string;
}

export function ServiceCard({ service, variant = "compact", className }: ServiceCardProps) {
  const Icon = getServiceIcon(service.icon);
  const image = getServiceImage(service.id);

  if (variant === "compact") {
    return (
      <div className={cn("group overflow-hidden rounded-2xl border border-grey-light bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md", className)}>
        <Link href={`/services/${service.id}`} className="relative block aspect-[16/10] overflow-hidden">
          <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform group-hover:scale-105" sizes="33vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
          <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-navy">
            <Icon className="h-5 w-5" />
          </div>
        </Link>
        <div className="p-6">
          <h3 className="font-heading text-xl font-semibold text-navy">
            <Link href={`/services/${service.id}`} className="hover:text-gold">{service.title}</Link>
          </h3>
          <p className="mt-2 text-sm text-muted">{service.description}</p>
          <div className="mt-4 flex gap-4">
            <Link href={`/services/${service.id}`} className="text-sm font-semibold text-navy hover:text-gold">Learn more <ArrowRight className="inline h-4 w-4" /></Link>
            <InquiryTrigger prefill={{ service: service.id, source: "Services" }} className="text-sm font-semibold text-gold">Request quote</InquiryTrigger>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-grey-light bg-white shadow-sm", className)}>
      <div className="grid md:grid-cols-5">
        <div className="relative aspect-[16/10] md:col-span-2 md:min-h-[280px]">
          <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="40vw" />
        </div>
        <div className="p-6 md:col-span-3 md:p-8">
          <h2 className="font-heading text-2xl font-semibold text-navy">{service.title}</h2>
          <p className="mt-2 text-muted">{service.description}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {service.features.map((f) => (
              <li key={f} className="flex gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-gold" />{f}</li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3">
            <Link href={`/services/${service.id}`} className="rounded-lg border border-navy px-5 py-2.5 text-sm font-semibold text-navy">View details</Link>
            <InquiryTrigger prefill={{ service: service.id, source: "Services" }} className="rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-white">Request service</InquiryTrigger>
          </div>
        </div>
      </div>
    </div>
  );
}

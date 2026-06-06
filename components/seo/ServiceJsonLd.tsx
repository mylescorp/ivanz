import type { Service } from "@/lib/data/services";
import { siteConfig } from "@/lib/config";

interface ServiceJsonLdProps {
  service: Service;
}

export function ServiceJsonLd({ service }: ServiceJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "GeneralContractor",
      name: siteConfig.name,
      url: siteConfig.url,
      areaServed: siteConfig.serviceArea,
    },
    areaServed: {
      "@type": "Place",
      name: siteConfig.serviceArea,
    },
    url: `${siteConfig.url}/services/${service.id}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

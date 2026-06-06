import { siteConfig } from "@/lib/config";

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.whatsappDisplayPrimary,
    areaServed: {
      "@type": "Place",
      name: siteConfig.serviceArea,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Busia District",
      addressRegion: "Eastern Uganda",
      addressCountry: "UG",
    },
    sameAs: [`https://wa.me/${siteConfig.whatsappPrimary}`],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

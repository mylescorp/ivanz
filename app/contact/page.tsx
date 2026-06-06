import type { Metadata } from "next";
import {
  Clock,
  Globe,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { ContactWhatsAppLink } from "@/components/contact/ContactWhatsAppLink";
import { PromptCards } from "@/components/home/PromptCards";
import { PageHero } from "@/components/ui/PageHero";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { pageHeroImages } from "@/lib/data/images";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact IvanZ Construction for civil engineering quotes and project inquiries across Africa. Headquartered in Uganda.",
};

const contactChannels = [
  {
    icon: MessageCircle,
    title: "Primary WhatsApp",
    description: "Fastest way to reach our team for quotes and project inquiries.",
    content: <ContactWhatsAppLink />,
  },
  {
    icon: Phone,
    title: "Secondary Contact",
    description: "Alternative line for follow-ups and coordination.",
    content: (
      <a
        href={`https://wa.me/${siteConfig.whatsappSecondary}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-navy transition-colors hover:text-gold"
      >
        {siteConfig.whatsappDisplaySecondary}
      </a>
    ),
  },
  {
    icon: MapPin,
    title: "Headquarters",
    description: "Our base of operations in Uganda.",
    content: (
      <p className="font-semibold text-navy">{siteConfig.location}</p>
    ),
  },
  {
    icon: Globe,
    title: "Service Area",
    description: "Where we deliver civil engineering and construction projects.",
    content: (
      <p className="font-semibold text-navy">
        Across {siteConfig.serviceArea} — including Uganda and the wider
        continent
      </p>
    ),
  },
  {
    icon: Clock,
    title: "Response Time",
    description: "Typical reply window for new inquiries.",
    content: (
      <p className="font-semibold text-navy">
        Within {siteConfig.stats.responseTime} on business days
      </p>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description={`Reach IvanZ Construction for civil engineering and construction inquiries across ${siteConfig.serviceArea}. We respond within ${siteConfig.stats.responseTime}.`}
        image={pageHeroImages.contact}
      >
        <MessageCircle className="mb-3 h-8 w-8 text-whatsapp" />
      </PageHero>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl rounded-2xl border border-grey-light bg-white p-8 text-center shadow-sm md:p-10">
            <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
              Start Your Project Inquiry
            </h2>
            <p className="mt-4 text-body leading-relaxed">
              Use our WhatsApp inquiry form to share your project details. We
              will open WhatsApp with your message ready to send — no duplicate
              forms, no waiting.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <InquiryButton
                prefill={{ source: "Contact Page" }}
                variant="primary"
                className="w-full max-w-sm text-base"
              >
                <MessageCircle className="h-5 w-5" />
                Send Inquiry via WhatsApp
              </InquiryButton>
              <p className="text-sm text-muted">
                Available for projects across Africa, including Uganda and
                neighbouring regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-grey-light bg-grey-light/50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-2xl font-bold text-navy md:text-3xl">
              Contact Information
            </h2>
            <p className="mt-3 text-body">
              Headquartered in Uganda with civil engineering delivery across
              Africa.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contactChannels.map((channel) => (
              <div
                key={channel.title}
                className="rounded-xl border border-grey-light bg-white p-6"
              >
                <channel.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-3 font-heading font-semibold text-navy">
                  {channel.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {channel.description}
                </p>
                <div className="mt-4 text-sm text-body">{channel.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-8 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-muted">
              Quick select your service
            </p>
            <h2 className="mt-2 font-heading text-xl font-semibold text-navy">
              Choose a service to pre-fill your inquiry
            </h2>
          </div>
          <PromptCards />
        </div>
      </section>
    </>
  );
}

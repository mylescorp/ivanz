import type { Metadata } from "next";
import { Suspense } from "react";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import { WhatsAppForm } from "@/components/contact/WhatsAppForm";
import { PromptCards } from "@/components/home/PromptCards";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact IvanZ Construction via WhatsApp for civil engineering quotes and project inquiries in Eastern Uganda.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-8 w-8 text-whatsapp" />
            <h1 className="font-heading text-4xl font-bold md:text-5xl">
              Contact Us
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Send your project details via WhatsApp. We respond within{" "}
            {siteConfig.stats.responseTime}.
          </p>
        </div>
      </section>

      <section className="border-b border-grey-light bg-grey-light/50 py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-muted">
            Quick select your service
          </p>
          <PromptCards />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-grey-light bg-white p-8 text-center text-muted">
                Loading inquiry form...
              </div>
            }
          >
            <WhatsAppForm />
          </Suspense>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-grey-light bg-white p-6">
              <Phone className="h-6 w-6 text-gold" />
              <h3 className="mt-3 font-heading font-semibold text-navy">
                Primary WhatsApp
              </h3>
              <a
                href={`https://wa.me/${siteConfig.whatsappPrimary}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-sm text-whatsapp hover:underline"
              >
                {siteConfig.whatsappDisplayPrimary}
              </a>
            </div>
            <div className="rounded-xl border border-grey-light bg-white p-6">
              <Phone className="h-6 w-6 text-gold" />
              <h3 className="mt-3 font-heading font-semibold text-navy">
                Secondary Contact
              </h3>
              <p className="mt-2 text-sm text-muted">
                {siteConfig.whatsappDisplaySecondary}
              </p>
            </div>
            <div className="rounded-xl border border-grey-light bg-white p-6">
              <MapPin className="h-6 w-6 text-gold" />
              <h3 className="mt-3 font-heading font-semibold text-navy">
                Location
              </h3>
              <p className="mt-2 text-sm text-muted">{siteConfig.location}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

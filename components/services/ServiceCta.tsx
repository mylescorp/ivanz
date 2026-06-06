import { ArrowRight, Calculator, MessageCircle } from "lucide-react";
import Link from "next/link";
import { InquiryButton } from "@/components/ui/InquiryButton";
import type { ServiceCategory } from "@/lib/data/services";
import { siteConfig } from "@/lib/config";

interface ServiceCtaProps {
  serviceId: ServiceCategory;
  serviceTitle: string;
}

export function ServiceCta({ serviceId, serviceTitle }: ServiceCtaProps) {
  return (
    <section className="bg-navy py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Ready to start your {serviceTitle.toLowerCase()} project?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Send your requirements via WhatsApp. We respond within{" "}
            {siteConfig.stats.responseTime}.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <InquiryButton
              prefill={{ service: serviceId, source: "Service Page" }}
              variant="whatsapp"
              className="px-8 py-4"
            >
              <MessageCircle className="h-5 w-5" />
              Request this service
            </InquiryButton>
            <Link
              href="/estimator"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy"
            >
              <Calculator className="h-5 w-5" />
              Get cost estimate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

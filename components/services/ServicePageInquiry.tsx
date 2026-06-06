"use client";

import { ArrowRight } from "lucide-react";
import { InquiryButton } from "@/components/ui/InquiryButton";
import { InquiryTrigger } from "@/components/whatsapp/InquiryTrigger";
import type { ServiceCategory } from "@/lib/data/services";

interface ServicePageInquiryButtonProps {
  serviceId: ServiceCategory;
  className?: string;
}

export function ServicePageInquiryButton({
  serviceId,
  className,
}: ServicePageInquiryButtonProps) {
  return (
    <InquiryButton
      prefill={{ service: serviceId, source: "Service Page" }}
      variant="gold"
      className={className}
    >
      Request this service
      <ArrowRight className="h-4 w-4" />
    </InquiryButton>
  );
}

export function ServicePageInquiryLink({
  serviceId,
}: {
  serviceId: ServiceCategory;
}) {
  return (
    <InquiryTrigger
      prefill={{ service: serviceId, source: "Service Page" }}
      className="font-semibold text-gold hover:underline"
    >
      contact us directly
    </InquiryTrigger>
  );
}

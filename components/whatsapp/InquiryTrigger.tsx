"use client";

import type { ReactNode } from "react";
import type { InquiryPrefill } from "@/lib/inquiry-prefill";
import { useWhatsAppInquiry } from "@/components/whatsapp/WhatsAppInquiryProvider";
import { cn } from "@/lib/utils";

interface InquiryTriggerProps {
  children: ReactNode;
  prefill?: InquiryPrefill;
  className?: string;
  ariaLabel?: string;
}

export function InquiryTrigger({
  children,
  prefill,
  className,
  ariaLabel = "Open WhatsApp inquiry form",
}: InquiryTriggerProps) {
  const { openInquiry } = useWhatsAppInquiry();

  return (
    <button
      type="button"
      onClick={() => openInquiry(prefill)}
      className={cn(className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

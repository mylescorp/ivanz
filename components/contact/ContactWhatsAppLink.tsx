"use client";

import { InquiryTrigger } from "@/components/whatsapp/InquiryTrigger";
import { siteConfig } from "@/lib/config";

export function ContactWhatsAppLink() {
  return (
    <InquiryTrigger
      prefill={{ source: "Contact Page" }}
      className="mt-2 block text-left text-sm text-whatsapp hover:underline"
    >
      {siteConfig.whatsappDisplayPrimary}
    </InquiryTrigger>
  );
}

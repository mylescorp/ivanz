"use client";

import { InquiryTrigger } from "@/components/whatsapp/InquiryTrigger";
import { siteConfig } from "@/lib/config";

export function FooterWhatsAppLink() {
  return (
    <InquiryTrigger
      prefill={{ source: "Footer" }}
      className="text-left transition-colors hover:text-white"
    >
      {siteConfig.whatsappDisplayPrimary}
    </InquiryTrigger>
  );
}

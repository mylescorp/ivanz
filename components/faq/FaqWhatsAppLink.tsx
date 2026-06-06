"use client";

import { InquiryTrigger } from "@/components/whatsapp/InquiryTrigger";

export function FaqWhatsAppLink() {
  return (
    <InquiryTrigger
      prefill={{ source: "FAQ" }}
      className="font-semibold text-gold hover:underline"
    >
      Contact us on WhatsApp
    </InquiryTrigger>
  );
}

"use client";

import { FileDown } from "lucide-react";
import { InquiryTrigger } from "@/components/whatsapp/InquiryTrigger";

export function DownloadsInquiryButton() {
  return (
    <InquiryTrigger
      prefill={{
        source: "Downloads",
        notes: "Requesting the IvanZ Construction company profile document.",
      }}
      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
    >
      <FileDown className="h-4 w-4" />
      Request Company Profile
    </InquiryTrigger>
  );
}

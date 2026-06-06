"use client";

import { ArrowRight } from "lucide-react";
import { InquiryButton } from "@/components/ui/InquiryButton";
import type { InquiryPrefill } from "@/lib/inquiry-prefill";

interface PortfolioInquiryButtonProps {
  prefill: InquiryPrefill;
  className?: string;
}

export function PortfolioInquiryButton({
  prefill,
  className,
}: PortfolioInquiryButtonProps) {
  return (
    <InquiryButton prefill={prefill} className={className}>
      Inquire about similar project
      <ArrowRight className="h-4 w-4" />
    </InquiryButton>
  );
}

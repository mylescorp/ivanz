"use client";

import type { ReactNode } from "react";
import { InquiryTrigger } from "@/components/whatsapp/InquiryTrigger";
import type { InquiryPrefill } from "@/lib/inquiry-prefill";
import { cn } from "@/lib/utils";

type InquiryButtonVariant = "primary" | "secondary" | "whatsapp" | "outline" | "gold";

const variants: Record<InquiryButtonVariant, string> = {
  primary: "bg-gold text-white hover:bg-gold/90 shadow-sm",
  secondary: "bg-navy text-white hover:bg-navy-light",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp/90 shadow-sm",
  outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
  gold: "bg-gold text-white hover:bg-gold/90",
};

interface InquiryButtonProps {
  children: ReactNode;
  prefill?: InquiryPrefill;
  variant?: InquiryButtonVariant;
  className?: string;
}

export function InquiryButton({
  children,
  prefill,
  variant = "whatsapp",
  className,
}: InquiryButtonProps) {
  return (
    <InquiryTrigger
      prefill={prefill}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200",
        variants[variant],
        className,
      )}
    >
      {children}
    </InquiryTrigger>
  );
}

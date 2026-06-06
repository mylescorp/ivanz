"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { InquiryPrefill } from "@/lib/inquiry-prefill";
import { WhatsAppInquiryModal } from "@/components/whatsapp/WhatsAppInquiryModal";

interface WhatsAppInquiryContextValue {
  openInquiry: (prefill?: InquiryPrefill) => void;
  closeInquiry: () => void;
  isOpen: boolean;
}

const WhatsAppInquiryContext = createContext<WhatsAppInquiryContextValue | null>(
  null,
);

export function WhatsAppInquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<InquiryPrefill | undefined>();

  const openInquiry = useCallback((nextPrefill?: InquiryPrefill) => {
    setPrefill(nextPrefill);
    setIsOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ openInquiry, closeInquiry, isOpen }),
    [openInquiry, closeInquiry, isOpen],
  );

  return (
    <WhatsAppInquiryContext.Provider value={value}>
      {children}
      <WhatsAppInquiryModal
        isOpen={isOpen}
        prefill={prefill}
        onClose={closeInquiry}
      />
    </WhatsAppInquiryContext.Provider>
  );
}

export function useWhatsAppInquiry() {
  const context = useContext(WhatsAppInquiryContext);
  if (!context) {
    throw new Error(
      "useWhatsAppInquiry must be used within WhatsAppInquiryProvider",
    );
  }
  return context;
}

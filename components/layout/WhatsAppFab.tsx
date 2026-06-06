"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useWhatsAppInquiry } from "@/components/whatsapp/WhatsAppInquiryProvider";
import { cn } from "@/lib/utils";

export function WhatsAppFab() {
  const { openInquiry } = useWhatsAppInquiry();
  const [showTooltip, setShowTooltip] = useState(false);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const resetIdle = () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000);
      }, 10000);
    };

    resetIdle();
    window.addEventListener("mousemove", resetIdle, { passive: true });
    window.addEventListener("scroll", resetIdle, { passive: true });
    window.addEventListener("touchstart", resetIdle, { passive: true });

    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("scroll", resetIdle);
      window.removeEventListener("touchstart", resetIdle);
    };
  }, []);

  return (
    <div className="fixed bottom-7 right-7 z-50">
      <div
        className={cn(
          "pointer-events-none absolute bottom-[calc(100%+10px)] right-0 rounded-full border border-gold/25 bg-[#0F1E30] px-3 py-1.5 text-xs font-medium text-white shadow-lg transition-all",
          showTooltip
            ? "translate-y-0 opacity-100"
            : "translate-y-1.5 opacity-0",
        )}
      >
        Need a quote? Chat now →
      </div>
      <button
        type="button"
        onClick={() => openInquiry({ source: "Floating Button" })}
        aria-label="Open WhatsApp inquiry drawer"
        className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/40 transition-transform hover:scale-110"
      >
        <span
          className="absolute inset-[-4px] animate-[pulse-ring_2.5s_ease-out_infinite] rounded-full border-2 border-whatsapp/50"
          aria-hidden
        />
        <span
          className="absolute inset-[-4px] animate-[pulse-ring_2.5s_ease-out_infinite] rounded-full border-2 border-whatsapp/50 [animation-delay:0.8s]"
          aria-hidden
        />
        <MessageCircle className="relative h-7 w-7" />
      </button>
    </div>
  );
}

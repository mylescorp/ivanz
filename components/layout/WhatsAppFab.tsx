"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getWhatsAppDirectUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function WhatsAppFab() {
  const [pulse, setPulse] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const lastScrollY = useRef(0);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pulseTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const resetInactivity = () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (pulseTimer.current) clearInterval(pulseTimer.current);
      setPulse(false);

      inactivityTimer.current = setTimeout(() => {
        pulseTimer.current = setInterval(() => {
          setPulse(true);
          setTimeout(() => setPulse(false), 1000);
        }, 8000);
      }, 10000);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current && currentY > 200) {
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 3000);
      }
      lastScrollY.current = currentY;
      resetInactivity();
    };

    const handleActivity = () => resetInactivity();

    resetInactivity();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleActivity, { passive: true });
    window.addEventListener("touchstart", handleActivity, { passive: true });

    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (pulseTimer.current) clearInterval(pulseTimer.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white shadow-lg">
          Need a quote? Chat now →
        </div>
      )}
      <a
        href={getWhatsAppDirectUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105",
          pulse && "animate-pulse",
        )}
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}

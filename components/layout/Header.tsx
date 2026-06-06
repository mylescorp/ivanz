"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, HardHat } from "lucide-react";
import { useState } from "react";
import { InquiryTrigger } from "@/components/whatsapp/InquiryTrigger";
import { navLinks } from "@/lib/config";
import { cn } from "@/lib/utils";

interface HeaderProps {
  siteName: string;
  location: string;
}

export function Header({ siteName, location }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-grey-light/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-gold">
            <HardHat className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <p className="font-heading text-lg font-bold leading-tight text-navy">
              {siteName}
            </p>
            <p className="text-xs text-muted">{location}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-navy text-white"
                  : "text-body hover:bg-grey-light hover:text-navy",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <InquiryTrigger
          prefill={{ source: "Header" }}
          className="hidden rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gold/90 md:inline-flex"
        >
          Get a Quote
        </InquiryTrigger>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-navy lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-grey-light bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium",
                  pathname === link.href
                    ? "bg-navy text-white"
                    : "text-body hover:bg-grey-light",
                )}
              >
                {link.label}
              </Link>
            ))}
            <InquiryTrigger
              prefill={{ source: "Header Mobile" }}
              className="mt-2 w-full rounded-lg bg-gold px-3 py-3 text-center text-sm font-semibold text-white"
            >
              Get a Quote
            </InquiryTrigger>
          </div>
        </nav>
      )}
    </header>
  );
}

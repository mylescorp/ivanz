import Link from "next/link";
import { HardHat, MapPin, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 md:px-6">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-gold">
              <HardHat className="h-5 w-5" aria-hidden />
            </div>
            <p className="font-heading text-lg font-bold">{siteConfig.name}</p>
          </div>
          <p className="text-sm leading-relaxed text-white/70">
            Professional civil engineering and construction services across{" "}
            {siteConfig.serviceArea}.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-gold">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/downloads"
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                Downloads
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-gold">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{siteConfig.location}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a
                href={`https://wa.me/${siteConfig.whatsappPrimary}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {siteConfig.whatsappDisplayPrimary}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{siteConfig.whatsappDisplaySecondary}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-gold">
            Service Area
          </h3>
          <p className="text-sm leading-relaxed text-white/70">
            Based in Busia District with project delivery across Eastern Uganda
            including road construction, structural engineering, drainage, and
            land surveying.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-white/50 md:flex-row md:px-6">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p>
            Built by{" "}
            <a
              href="https://mylescorptech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-colors hover:text-gold/80"
            >
              MylesCorp Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

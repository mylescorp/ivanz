import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { HeroServiceCarousel } from "@/components/home/HeroServiceCarousel";
import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { InquiryButton } from "@/components/ui/InquiryButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,131,26,0.12),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
              <CheckCircle2 className="h-4 w-4" />
              Serving {siteConfig.serviceArea}
            </p>

            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Civil Engineering & Construction Across{" "}
              <span className="text-gold">Africa</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
              {siteConfig.tagline}. From road construction and drainage to land
              surveying and structural engineering, IvanZ Construction delivers
              projects from our base in Uganda throughout Africa.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <InquiryButton
                prefill={{ source: "Homepage Hero" }}
                variant="primary"
                className="text-base"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </InquiryButton>
              <Button
                href="/services"
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-navy"
              >
                View Services
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <p className="font-heading text-2xl font-bold text-gold md:text-3xl">
                  {siteConfig.stats.projects}
                </p>
                <p className="mt-1 text-sm text-white/60">Projects completed</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-gold md:text-3xl">
                  {siteConfig.stats.regions}
                </p>
                <p className="mt-1 text-sm text-white/60">Regions served</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-gold md:text-3xl">
                  {siteConfig.stats.responseTime}
                </p>
                <p className="mt-1 text-sm text-white/60">Response time</p>
              </div>
            </div>
          </div>

          <HeroServiceCarousel />
        </div>
      </div>
    </section>
  );
}

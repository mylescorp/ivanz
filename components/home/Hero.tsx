import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,131,26,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(26,46,74,0.95),rgba(26,46,74,0.85))]" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
            <CheckCircle2 className="h-4 w-4" />
            Serving {siteConfig.serviceArea}
          </p>

          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Civil Engineering & Construction in{" "}
            <span className="text-gold">Eastern Uganda</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {siteConfig.tagline}. From road construction and drainage to land
            surveying and structural engineering, IvanZ Construction delivers
            projects across Busia District and beyond.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" variant="primary" className="text-base">
              Start Your Project
              <ArrowRight className="h-4 w-4" />
            </Button>
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
      </div>
    </section>
  );
}

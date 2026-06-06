import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { PromptCards } from "@/components/home/PromptCards";

export function WhatsAppCta() {
  return (
    <section className="bg-navy py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            Start your project today
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Tell us what you need. We respond on WhatsApp within{" "}
            {siteConfig.stats.responseTime}.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
            <span>{siteConfig.stats.projects} projects completed</span>
            <span className="hidden sm:inline">·</span>
            <span>{siteConfig.stats.regions} regions served</span>
            <span className="hidden sm:inline">·</span>
            <span>Response within {siteConfig.stats.responseTime}</span>
          </div>
          <Link
            href="/contact"
            className="mt-8 inline-flex animate-pulse items-center gap-2 rounded-lg bg-whatsapp px-8 py-4 text-base font-semibold text-white transition-all hover:animate-none hover:bg-whatsapp/90"
          >
            <MessageCircle className="h-5 w-5" />
            Send Project Inquiry
          </Link>
        </div>

        <div className="mt-16">
          <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-gold">
            What are you looking for?
          </p>
          <PromptCards />
        </div>
      </div>
    </section>
  );
}

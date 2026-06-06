import type { Metadata } from "next";
import { FaqWhatsAppLink } from "@/components/faq/FaqWhatsAppLink";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageHeroImages } from "@/lib/data/images";
import { faqItems } from "@/lib/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about IvanZ Construction civil engineering services across Africa.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="FAQ"
        description="Common questions about our services, quotes, and project process."
        image={pageHeroImages.faq}
      />

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <SectionHeading title="Frequently Asked Questions" />
          <div className="space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-grey-light bg-white"
              >
                <summary className="cursor-pointer list-none px-6 py-4 font-heading font-semibold text-navy marker:content-none">
                  {item.question}
                </summary>
                <div className="border-t border-grey-light px-6 py-4 text-sm leading-relaxed text-muted">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            Still have questions?{" "}
            <FaqWhatsAppLink />
          </p>
        </div>
      </section>
    </>
  );
}

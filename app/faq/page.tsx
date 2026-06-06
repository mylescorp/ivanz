import type { Metadata } from "next";
import Link from "next/link";
import { faqItems } from "@/lib/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about IvanZ Construction civil engineering services in Eastern Uganda.",
};

export default function FaqPage() {
  return (
    <>
      <section className="bg-navy py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">FAQ</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Common questions about our services, quotes, and project process.
          </p>
        </div>
      </section>

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
            <Link href="/contact" className="font-semibold text-gold hover:underline">
              Contact us on WhatsApp
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

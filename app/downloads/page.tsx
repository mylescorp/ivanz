import type { Metadata } from "next";
import { FileDown, FileText } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download the IvanZ Construction company profile for tenders and procurement submissions.",
};

export default function DownloadsPage() {
  return (
    <>
      <section className="bg-navy py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Downloads
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Company documents for tenders, procurement, and project submissions.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <SectionHeading title="Company Documents" />

          <div className="rounded-2xl border border-grey-light bg-white p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-lg font-semibold text-navy">
                  Company Profile
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The IvanZ Construction company profile document is being
                  prepared for download. Contact us to request a copy for your
                  tender or procurement submission.
                </p>
                <a
                  href="/contact?source=Downloads"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
                >
                  <FileDown className="h-4 w-4" />
                  Request Company Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

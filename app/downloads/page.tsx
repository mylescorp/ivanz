import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { DownloadsInquiryButton } from "@/components/downloads/DownloadsInquiryButton";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageHeroImages } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download the IvanZ Construction company profile for tenders and procurement submissions.",
};

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        title="Downloads"
        description="Company documents for tenders, procurement, and project submissions."
        image={pageHeroImages.downloads}
      />

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
                <DownloadsInquiryButton />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

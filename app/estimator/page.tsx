import type { Metadata } from "next";
import { CostEstimator } from "@/components/estimator/CostEstimator";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageHeroImages } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Cost Estimator",
  description:
    "Get an indicative UGX cost estimate for your civil engineering project across Africa.",
};

export default function EstimatorPage() {
  return (
    <>
      <PageHero
        title="Cost Estimator"
        description="Get an indicative cost range for your project, then request a formal quote from our engineering team."
        image={pageHeroImages.estimator}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading
            title="Estimate Your Project"
            subtitle="Answer four quick questions to receive an indicative UGX cost range. This is not a final quote."
          />
          <CostEstimator />
        </div>
      </section>
    </>
  );
}

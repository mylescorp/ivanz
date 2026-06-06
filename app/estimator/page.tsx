import type { Metadata } from "next";
import { CostEstimator } from "@/components/estimator/CostEstimator";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Cost Estimator",
  description:
    "Get an indicative UGX cost estimate for your civil engineering project in Eastern Uganda.",
};

export default function EstimatorPage() {
  return (
    <>
      <section className="bg-navy py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Cost Estimator
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Get an indicative cost range for your project, then request a
            formal quote from our engineering team.
          </p>
        </div>
      </section>

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

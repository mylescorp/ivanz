import type { Metadata } from "next";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Civil engineering project portfolio from IvanZ Construction — roads, drainage, structural, survey, and building projects across Eastern Uganda.",
};

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-navy py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Project Portfolio
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Showcasing civil engineering projects across Eastern Uganda.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <PortfolioSection />
        </div>
      </section>
    </>
  );
}

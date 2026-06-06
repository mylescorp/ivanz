import type { Metadata } from "next";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { PageHero } from "@/components/ui/PageHero";
import { pageHeroImages } from "@/lib/data/images";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Civil engineering project portfolio from IvanZ Construction — roads, drainage, structural, survey, and building projects across Africa.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        title="Project Portfolio"
        description="Showcasing civil engineering projects across Africa."
        image={pageHeroImages.portfolio}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <PortfolioSection />
        </div>
      </section>
    </>
  );
}

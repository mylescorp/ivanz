import type { Metadata } from "next";
import { MapPin, Target, Users, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about IvanZ Construction, a civil engineering company based in Busia District, Eastern Uganda.",
};

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every project is engineered with accuracy, from site surveys to final delivery.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "We maintain rigorous quality standards across road, structural, and drainage works.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building infrastructure that transforms communities across Eastern Uganda.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description:
      "Deep knowledge of Eastern Uganda terrain, regulations, and construction conditions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy py-16 text-white md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            IvanZ Construction delivers high-quality civil engineering and
            construction services across {siteConfig.serviceArea}.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                title="Who We Are"
                subtitle="A civil engineering company based in Busia District, serving clients across Eastern Uganda."
                align="left"
              />
              <div className="space-y-4 text-body leading-relaxed">
                <p>
                  IvanZ Construction is a civil engineering company based in{" "}
                  {siteConfig.location}. We specialise in road construction,
                  building design, land surveying, drainage systems, soil testing,
                  structural engineering, and project management.
                </p>
                <p>
                  Our mission is to deliver high-quality civil engineering and
                  construction services that transform communities and build
                  sustainable infrastructure across Eastern Uganda.
                </p>
                <p>
                  From gravel access roads to complex drainage infrastructure,
                  we bring engineering precision and on-the-ground expertise to
                  every project we undertake.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-grey-light p-8">
              <h3 className="font-heading text-xl font-semibold text-navy">
                Service Area
              </h3>
              <p className="mt-4 text-body leading-relaxed">
                We are headquartered in Busia District with active project
                delivery across Eastern Uganda including surrounding districts
                and rural communities.
              </p>
              <div className="mt-6 space-y-3 text-sm text-muted">
                <p>Primary base: Busia District, Eastern Uganda</p>
                <p>Coverage: Eastern Uganda region</p>
                <p>Services: Civil engineering and construction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-grey-light py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionHeading title="Our Values" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <value.icon className="h-8 w-8 text-gold" />
                <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";

import Image from "next/image";

import { MapPin, Target, Users, Award } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";

import { PageHero } from "@/components/ui/PageHero";

import { pageHeroImages } from "@/lib/data/images";

import { siteConfig } from "@/lib/config";



export const metadata: Metadata = {

  title: "About Us",

  description:

    "Learn about IvanZ Construction, a civil engineering company headquartered in Uganda and serving clients across Africa.",

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

      "Building infrastructure that transforms communities across Africa.",

  },

  {

    icon: MapPin,

    title: "Regional Expertise",

    description:

      "Deep knowledge of African terrain, regulations, and construction conditions.",

  },

];



export default function AboutPage() {

  return (

    <>

      <PageHero

        title="About Us"

        description={`IvanZ Construction delivers high-quality civil engineering and construction services across ${siteConfig.serviceArea}.`}

        image={pageHeroImages.about}

      />



      <section className="py-20">

        <div className="mx-auto max-w-7xl px-4 md:px-6">

          <div className="grid gap-12 lg:grid-cols-2">

            <div>

              <SectionHeading

                title="Who We Are"

                subtitle={`A civil engineering company headquartered in Uganda, serving clients across ${siteConfig.serviceArea}.`}

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

                  sustainable infrastructure across Africa — from Uganda to the

                  wider continent.

                </p>

                <p>

                  From gravel access roads to complex drainage infrastructure,

                  we bring engineering precision and on-the-ground expertise to

                  every project we undertake.

                </p>

              </div>

            </div>



            <div className="space-y-6">

              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">

                <Image

                  src={pageHeroImages.about.src}

                  alt={pageHeroImages.about.alt}

                  fill

                  className="object-cover"

                  sizes="(max-width: 1024px) 100vw, 50vw"

                />

              </div>

              <div className="rounded-2xl bg-grey-light p-8">

              <h3 className="font-heading text-xl font-semibold text-navy">

                Service Area

              </h3>

              <p className="mt-4 text-body leading-relaxed">

                We are headquartered in Uganda with active project delivery

                across Africa, including Uganda, East Africa, and neighbouring

                regions.

              </p>

              <div className="mt-6 space-y-3 text-sm text-muted">

                <p>Headquarters: {siteConfig.location}</p>

                <p>Coverage: {siteConfig.serviceArea}</p>

                <p>Services: Civil engineering and construction</p>

              </div>

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


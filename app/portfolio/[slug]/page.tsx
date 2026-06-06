import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";
import {
  getCategoryLabel,
  getProjectBySlug,
  projects,
} from "@/lib/data/projects";
import { siteConfig } from "@/lib/config";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const inquiryUrl = `/contact?service=${project.category === "structural" ? "structural" : project.category}&projectName=${encodeURIComponent(project.title)}&notes=${encodeURIComponent(`Interested in a project similar to: ${project.title}`)}&source=Portfolio`;

  return (
    <>
      <section className="bg-navy py-12 text-white md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <Link
            href="/portfolio"
            className="text-sm text-white/70 transition-colors hover:text-white"
          >
            ← Back to portfolio
          </Link>
          <span className="mt-6 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gold">
            {getCategoryLabel(project.category)}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold" />
              {project.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gold" />
              Completed {project.completedDate}
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <ProjectVisual
              title={project.title}
              category={project.category}
              images={project.images}
              className="aspect-[4/3] w-full rounded-2xl"
              priority
            />

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold">
                Project scope
              </p>
              <p className="mt-2 text-lg font-medium text-navy">{project.scope}</p>
              <p className="mt-6 leading-relaxed text-body">{project.description}</p>

              <ul className="mt-8 space-y-3">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm text-body"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <Link
                href={inquiryUrl}
                className="mt-10 inline-flex items-center gap-2 rounded-lg bg-whatsapp px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90"
              >
                Inquire about similar project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

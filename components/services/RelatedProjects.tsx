import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";
import { getCategoryLabel, getProjectsByCategory } from "@/lib/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServiceCategory } from "@/lib/data/services";

interface RelatedProjectsProps {
  category: ServiceCategory;
}

export function RelatedProjects({ category }: RelatedProjectsProps) {
  const related = getProjectsByCategory(category).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="bg-grey-light py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title="Related Projects"
          subtitle="Examples of our work in this service category."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((project, index) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group overflow-hidden rounded-2xl border border-grey-light bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <ProjectVisual
                title={project.title}
                category={project.category}
                images={project.images}
                imageIndex={index}
                className="aspect-[4/3] w-full"
              />
              <div className="p-5">
                <span className="inline-flex rounded-full bg-navy/5 px-2.5 py-0.5 text-xs font-medium text-navy">
                  {getCategoryLabel(project.category)}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-navy group-hover:text-gold">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">
                  {project.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

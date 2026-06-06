"use client";

import { useMemo, useState } from "react";
import { portfolioCategories } from "@/lib/data/services";
import { getProjectsByCategory, projects, type Project } from "@/lib/data/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ProjectDetailModal } from "@/components/portfolio/ProjectDetailModal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(
    () => getProjectsByCategory(activeCategory),
    [activeCategory],
  );

  return (
    <>
      <SectionHeading
        title="Our Work"
        subtitle={`${projects.length} civil engineering projects delivered across Africa. Select a category to filter.`}
      />

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {portfolioCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category.id
                ? "bg-navy text-white"
                : "bg-grey-light text-muted hover:bg-navy/10 hover:text-navy",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-live="polite"
      >
        {filteredProjects.map((project, index) => (
          <div key={project.slug} role="listitem">
            <ProjectCard
              project={project}
              imageIndex={index}
              onSelect={setSelectedProject}
            />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="rounded-2xl border border-grey-light bg-grey-light/30 p-8 text-center text-muted">
          No projects in this category yet. Contact us to discuss your
          requirements.
        </p>
      )}

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

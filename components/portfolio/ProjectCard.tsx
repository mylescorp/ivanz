import { Calendar, MapPin } from "lucide-react";
import {
  getCategoryLabel,
  type Project,
} from "@/lib/data/projects";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  imageIndex?: number;
  className?: string;
}

export function ProjectCard({ project, onSelect, imageIndex = 0, className }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className={cn(
        "group overflow-hidden rounded-2xl border border-grey-light bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gold/40",
        className,
      )}
    >
      <ProjectVisual
        title={project.title}
        category={project.category}
        images={project.images}
        imageIndex={imageIndex}
        className="aspect-[4/3] w-full"
      />
      <div className="p-5">
        <span className="inline-flex rounded-full bg-navy/5 px-2.5 py-0.5 text-xs font-medium text-navy">
          {getCategoryLabel(project.category)}
        </span>
        <h3 className="mt-3 font-heading text-lg font-semibold text-navy group-hover:text-gold">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {project.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {project.completedDate}
          </span>
        </div>
      </div>
    </button>
  );
}

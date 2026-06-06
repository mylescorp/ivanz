"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  X,
} from "lucide-react";
import { InquiryButton } from "@/components/ui/InquiryButton";
import {
  getCategoryLabel,
  type Project,
} from "@/lib/data/projects";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";
import { cn } from "@/lib/utils";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!project) return;
      if (event.key === "Escape") onClose();
      if (project.images.length > 1) {
        if (event.key === "ArrowLeft") {
          setImageIndex((index) =>
            index === 0 ? project.images.length - 1 : index - 1,
          );
        }
        if (event.key === "ArrowRight") {
          setImageIndex((index) =>
            index === project.images.length - 1 ? 0 : index + 1,
          );
        }
      }
    },
    [onClose, project],
  );

  useEffect(() => {
    if (!project) return;
    setImageIndex(0);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  if (!project) return null;

  const hasCarousel = project.images.length > 1;
  const activeImage = project.images[imageIndex];
  const inquiryPrefill = {
    service: project.category === "structural" ? "structural" : project.category,
    projectName: project.title,
    notes: `Interested in a project similar to: ${project.title}`,
    location: project.location,
    source: "Portfolio",
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/70 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative">
          {activeImage ? (
            <div className="relative aspect-[16/10] bg-navy">
              <ProjectVisual
                title={project.title}
                category={project.category}
                images={[activeImage]}
                className="h-full w-full"
                priority
              />
              {hasCarousel && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setImageIndex((index) =>
                        index === 0 ? project.images.length - 1 : index - 1,
                      )
                    }
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setImageIndex((index) =>
                        index === project.images.length - 1 ? 0 : index + 1,
                      )
                    }
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {project.images.map((image, index) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setImageIndex(index)}
                        className={cn(
                          "h-2 w-2 rounded-full transition-colors",
                          index === imageIndex ? "bg-gold" : "bg-white/60",
                        )}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <ProjectVisual
              title={project.title}
              category={project.category}
              images={[]}
              className="aspect-[16/10] w-full"
              priority
            />
          )}

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy shadow"
            aria-label="Close project details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <span className="inline-flex rounded-full bg-navy/5 px-2.5 py-0.5 text-xs font-medium text-navy">
            {getCategoryLabel(project.category)}
          </span>
          <h2
            id="project-modal-title"
            className="mt-3 font-heading text-2xl font-bold text-navy md:text-3xl"
          >
            {project.title}
          </h2>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gold" />
              {project.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gold" />
              Completed {project.completedDate}
            </span>
          </div>

          <p className="mt-2 text-sm font-medium text-navy">{project.scope}</p>
          <p className="mt-4 leading-relaxed text-body">{project.description}</p>

          <ul className="mt-6 space-y-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-sm text-body"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <InquiryButton prefill={inquiryPrefill} className="px-6 py-3">
              Inquire about similar project
              <ArrowRight className="h-4 w-4" />
            </InquiryButton>
            <Link
              href={`/portfolio/${project.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-grey-light px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-grey-light"
            >
              View full case study
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

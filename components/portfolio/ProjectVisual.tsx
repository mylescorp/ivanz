import Image from "next/image";
import {
  Building2,
  ClipboardList,
  Compass,
  Droplets,
  FlaskConical,
  Layers,
  Route,
} from "lucide-react";
import {
  getProjectGradient,
  type PortfolioCategory,
  type ProjectImage,
} from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const iconMap = {
  "road-construction": Route,
  "building-design": Building2,
  "land-survey": Compass,
  drainage: Droplets,
  "soil-testing": FlaskConical,
  structural: Layers,
  "project-management": ClipboardList,
} as const;

interface ProjectVisualProps {
  title: string;
  category: PortfolioCategory;
  images: ProjectImage[];
  className?: string;
  priority?: boolean;
}

export function ProjectVisual({
  title,
  category,
  images,
  className,
  priority = false,
}: ProjectVisualProps) {
  const Icon = iconMap[category];
  const cover = images[0];

  if (cover) {
    return (
      <div className={cn("relative overflow-hidden bg-navy", className)}>
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        getProjectGradient(category),
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,131,26,0.2),transparent_55%)]" />
      <Icon className="relative h-12 w-12 text-white/30 md:h-16 md:w-16" aria-hidden />
      <span className="sr-only">{title}</span>
    </div>
  );
}

import type { ServiceCategory } from "@/lib/data/services";
import type { PortfolioCategory } from "@/lib/data/projects";

function localImage(filename: string): string {
  return `/images/${filename}`;
}

export interface SiteImage {
  src: string;
  alt: string;
}

export const serviceImages: Record<
  ServiceCategory,
  SiteImage & { label: string }
> = {
  "road-construction": {
    src: localImage("road-construction.svg"),
    alt: "Road construction with paving machinery and workers",
    label: "Road Construction",
  },
  "building-design": {
    src: localImage("building-design.svg"),
    alt: "Modern commercial building design and construction",
    label: "Building Design",
  },
  "land-survey": {
    src: localImage("land-survey.svg"),
    alt: "Land survey and site measurement for civil engineering",
    label: "Land Survey",
  },
  drainage: {
    src: localImage("drainage.svg"),
    alt: "Drainage pipes and stormwater infrastructure installation",
    label: "Drainage Systems",
  },
  "soil-testing": {
    src: localImage("soil-testing.svg"),
    alt: "Geotechnical soil testing and laboratory analysis",
    label: "Soil Testing",
  },
  structural: {
    src: localImage("structural.svg"),
    alt: "Structural steel and reinforced concrete construction",
    label: "Structural Engineering",
  },
  "project-management": {
    src: localImage("project-management.svg"),
    alt: "Civil engineering project management on a construction site",
    label: "Project Management",
  },
};

export const pageHeroImages = {
  about: {
    src: localImage("building-design.svg"),
    alt: "Construction site with cranes and building development",
  },
  services: {
    src: localImage("project-management.svg"),
    alt: "Civil engineering and infrastructure construction services",
  },
  portfolio: {
    src: localImage("road-construction.svg"),
    alt: "Infrastructure and road projects across Africa",
  },
  contact: {
    src: localImage("land-survey.svg"),
    alt: "Engineering team planning a construction project",
  },
  estimator: {
    src: localImage("building-design.svg"),
    alt: "Architectural planning and project cost estimation",
  },
  faq: {
    src: localImage("structural.svg"),
    alt: "Construction workers on a civil engineering project",
  },
  downloads: {
    src: localImage("building-design.svg"),
    alt: "Commercial building project documentation",
  },
} as const satisfies Record<string, SiteImage>;

/** Extra portfolio images per category for project variety */
const portfolioImagePool: Record<PortfolioCategory, SiteImage[]> = {
  "road-construction": [
    serviceImages["road-construction"],
    {
      src: localImage("project-management.svg"),
      alt: "Road and infrastructure construction site",
    },
    {
      src: localImage("structural.svg"),
      alt: "Highway and road corridor development",
    },
  ],
  "building-design": [
    serviceImages["building-design"],
    {
      src: localImage("building-design.svg"),
      alt: "Building design and architectural planning",
    },
  ],
  structural: [
    serviceImages.structural,
    {
      src: localImage("drainage.svg"),
      alt: "Bridge and structural engineering works",
    },
  ],
  drainage: [serviceImages.drainage],
  "land-survey": [serviceImages["land-survey"]],
  "soil-testing": [serviceImages["soil-testing"]],
  "project-management": [
    serviceImages["project-management"],
    {
      src: localImage("road-construction.svg"),
      alt: "Construction site project oversight",
    },
  ],
};

export function getServiceImage(id: ServiceCategory): SiteImage {
  return serviceImages[id];
}

export function getPortfolioImage(
  category: PortfolioCategory,
  index = 0,
): SiteImage {
  const pool = portfolioImagePool[category];
  return pool[index % pool.length] ?? serviceImages["road-construction"];
}

export const heroCarouselSlides = Object.values(serviceImages);

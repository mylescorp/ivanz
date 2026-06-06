export type ServiceCategory =
  | "road-construction"
  | "building-design"
  | "land-survey"
  | "drainage"
  | "soil-testing"
  | "structural"
  | "project-management";

export interface Service {
  id: ServiceCategory;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "road-construction",
    title: "Road Construction",
    shortTitle: "Roads",
    icon: "road",
    description:
      "Gravel and paved road construction, access roads, and rural connectivity projects across Eastern Uganda.",
    features: [
      "Gravel and paved road construction",
      "Access road development",
      "Road rehabilitation and maintenance",
      "Drainage integration along road corridors",
    ],
  },
  {
    id: "building-design",
    title: "Building Design",
    shortTitle: "Buildings",
    icon: "building",
    description:
      "Structural and architectural design for residential, commercial, and institutional buildings.",
    features: [
      "Structural design and drawings",
      "Foundation and superstructure planning",
      "Building permit documentation support",
      "Cost-effective design for local conditions",
    ],
  },
  {
    id: "land-survey",
    title: "Land Survey",
    shortTitle: "Survey",
    icon: "compass",
    description:
      "Accurate land surveying for property boundaries, site planning, and construction layout.",
    features: [
      "Boundary and topographic surveys",
      "Site layout and setting out",
      "As-built surveys",
      "Survey reports for planning authorities",
    ],
  },
  {
    id: "drainage",
    title: "Drainage Systems",
    shortTitle: "Drainage",
    icon: "droplets",
    description:
      "Stormwater drainage, culverts, and flood mitigation infrastructure for sites and roads.",
    features: [
      "Stormwater drainage design",
      "Culvert and channel construction",
      "Flood mitigation solutions",
      "Site drainage integration",
    ],
  },
  {
    id: "soil-testing",
    title: "Soil Testing",
    shortTitle: "Soil",
    icon: "flask",
    description:
      "Geotechnical soil testing and site investigation to inform safe foundation design.",
    features: [
      "Soil bearing capacity testing",
      "Site geotechnical investigation",
      "Foundation recommendation reports",
      "Compaction and material testing",
    ],
  },
  {
    id: "structural",
    title: "Structural Engineering",
    shortTitle: "Structural",
    icon: "layers",
    description:
      "Structural analysis and engineering for bridges, retaining walls, and load-bearing structures.",
    features: [
      "Bridge and culvert engineering",
      "Retaining wall design",
      "Structural assessments",
      "Reinforced concrete and steel structures",
    ],
  },
  {
    id: "project-management",
    title: "Project Management",
    shortTitle: "Management",
    icon: "clipboard",
    description:
      "End-to-end project management for civil engineering and construction projects.",
    features: [
      "Project planning and scheduling",
      "Quality control and site supervision",
      "Budget and timeline management",
      "Contractor coordination",
    ],
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export const promptCards = [
  { id: "road-construction" as const, label: "Road construction", emoji: "🏗" },
  { id: "building-design" as const, label: "Building design", emoji: "🏢" },
  { id: "land-survey" as const, label: "Land survey", emoji: "📐" },
  { id: "drainage" as const, label: "Drainage", emoji: "💧" },
  { id: "soil-testing" as const, label: "Soil testing", emoji: "🔬" },
];

export const portfolioCategories = [
  { id: "all", label: "All" },
  { id: "road-construction", label: "Roads" },
  { id: "structural", label: "Structural" },
  { id: "drainage", label: "Drainage" },
  { id: "building-design", label: "Buildings" },
  { id: "land-survey", label: "Survey" },
] as const;

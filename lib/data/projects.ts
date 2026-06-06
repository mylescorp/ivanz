import type { ServiceCategory } from "@/lib/data/services";

export type PortfolioCategory = ServiceCategory | "structural";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  category: PortfolioCategory;
  location: string;
  completedDate: string;
  scope: string;
  summary: string;
  description: string;
  highlights: string[];
  images: ProjectImage[];
}

const categoryGradients: Record<PortfolioCategory, string> = {
  "road-construction": "from-slate-700 to-slate-900",
  "building-design": "from-amber-700 to-amber-950",
  "land-survey": "from-sky-700 to-sky-950",
  drainage: "from-cyan-700 to-cyan-950",
  "soil-testing": "from-stone-600 to-stone-900",
  structural: "from-indigo-700 to-indigo-950",
  "project-management": "from-emerald-700 to-emerald-950",
};

export function getProjectGradient(category: PortfolioCategory): string {
  return categoryGradients[category];
}

export const projects: Project[] = [
  {
    slug: "busia-town-access-road",
    title: "Busia Town Access Road Rehabilitation",
    category: "road-construction",
    location: "Busia Municipality",
    completedDate: "2024-11",
    scope: "2.8 km gravel-to-paved upgrade with drainage",
    summary:
      "Rehabilitation of a key municipal access corridor improving connectivity for traders and residents.",
    description:
      "IvanZ Construction delivered full road rehabilitation including subgrade preparation, base course installation, surfacing, and integrated side drains. The project improved year-round access for commercial traffic serving Busia's border trade economy.",
    highlights: [
      "2.8 km corridor upgraded",
      "Integrated culverts and side drains",
      "Completed ahead of rainy season",
    ],
    images: [],
  },
  {
    slug: "tororo-rural-connectivity",
    title: "Tororo District Rural Connectivity Road",
    category: "road-construction",
    location: "Tororo District",
    completedDate: "2024-06",
    scope: "4.2 km rural gravel road construction",
    summary:
      "New rural access road linking farming communities to Tororo market centres.",
    description:
      "Construction of a gravel access road with camber profiling, drainage channels, and community crossing points. The route supports agricultural produce transport and school access.",
    highlights: [
      "4.2 km new gravel road",
      "Community crossing points",
      "Drainage channels along full length",
    ],
    images: [],
  },
  {
    slug: "malaba-industrial-haul-road",
    title: "Malaba Industrial Haul Road",
    category: "road-construction",
    location: "Malaba, Busia District",
    completedDate: "2023-09",
    scope: "1.5 km heavy-duty haul road",
    summary:
      "Heavy-duty haul road for industrial site access with reinforced sub-base.",
    description:
      "Designed and built a haul road capable of supporting heavy commercial vehicles, including geotechnical assessment, reinforced sub-base, and surface compaction to industrial standards.",
    highlights: [
      "Heavy-duty sub-base design",
      "Industrial compaction standards",
      "Geotechnical assessment included",
    ],
    images: [],
  },
  {
    slug: "busia-commercial-block",
    title: "Busia Commercial Block Structural Design",
    category: "building-design",
    location: "Busia Town",
    completedDate: "2024-03",
    scope: "3-storey commercial building design",
    summary:
      "Structural and architectural design for a mixed-use commercial building in Busia Town.",
    description:
      "Complete structural design package including foundation recommendations, reinforced concrete frame design, and building permit documentation support for a three-storey commercial development.",
    highlights: [
      "3-storey RC frame design",
      "Foundation recommendations",
      "Permit documentation support",
    ],
    images: [],
  },
  {
    slug: "tororo-school-extension",
    title: "Tororo Primary School Extension",
    category: "building-design",
    location: "Tororo District",
    completedDate: "2023-12",
    scope: "2-classroom block design and supervision",
    summary:
      "Design and site supervision for a two-classroom school extension.",
    description:
      "Structural design and construction supervision for a school extension optimised for local materials and cost-effective foundation solutions on variable soils.",
    highlights: [
      "Cost-effective foundation design",
      "Local materials specification",
      "Full site supervision",
    ],
    images: [],
  },
  {
    slug: "busia-retaining-wall",
    title: "Busia Hillside Retaining Wall",
    category: "structural",
    location: "Busia District",
    completedDate: "2024-08",
    scope: "85 m reinforced concrete retaining wall",
    summary:
      "Reinforced concrete retaining wall stabilising a hillside residential plot.",
    description:
      "Structural engineering and construction of an 85-metre reinforced concrete retaining wall with weep holes, drainage blanket, and tie-back anchoring for hillside stability.",
    highlights: [
      "85 m RC retaining wall",
      "Drainage blanket system",
      "Hillside stability assessment",
    ],
    images: [],
  },
  {
    slug: "tororo-bridge-culvert",
    title: "Tororo Stream Bridge Culvert",
    category: "structural",
    location: "Tororo District",
    completedDate: "2023-06",
    scope: "Twin-cell box culvert bridge",
    summary:
      "Twin-cell box culvert replacing a failed timber crossing on a district road.",
    description:
      "Design and construction of a twin-cell reinforced concrete box culvert with wing walls and approach slab, restoring all-weather access across a seasonal stream.",
    highlights: [
      "Twin-cell box culvert",
      "Wing walls and approach slab",
      "All-weather stream crossing",
    ],
    images: [],
  },
  {
    slug: "busia-stormwater-drainage",
    title: "Busia Town Stormwater Drainage",
    category: "drainage",
    location: "Busia Municipality",
    completedDate: "2024-05",
    scope: "1.2 km open channel drainage network",
    summary:
      "Stormwater drainage network reducing seasonal flooding in a commercial zone.",
    description:
      "Installation of an open channel drainage network with catch pits, culvert connections, and outfall structures to reduce flooding in a high-traffic commercial area during heavy rains.",
    highlights: [
      "1.2 km drainage network",
      "Catch pits and culvert connections",
      "Flood reduction in commercial zone",
    ],
    images: [],
  },
  {
    slug: "malaba-site-drainage",
    title: "Malaba Logistics Site Drainage",
    category: "drainage",
    location: "Malaba",
    completedDate: "2023-11",
    scope: "Site drainage for 2-hectare logistics yard",
    summary:
      "Site-wide drainage design and installation for a logistics storage yard.",
    description:
      "Comprehensive site drainage including grading, French drains, and channel outfalls to keep a logistics yard operational during the rainy season.",
    highlights: [
      "2-hectare site coverage",
      "French drain installation",
      "Rainy-season operability",
    ],
    images: [],
  },
  {
    slug: "busia-boundary-survey",
    title: "Busia Agricultural Plot Boundary Survey",
    category: "land-survey",
    location: "Busia District",
    completedDate: "2024-02",
    scope: "12-hectare boundary and topographic survey",
    summary:
      "Boundary demarcation and topographic survey for an agricultural development.",
    description:
      "Full boundary survey with beacon placement, topographic mapping, and survey report suitable for land title processing and development planning.",
    highlights: [
      "12-hectare coverage",
      "Beacon placement and mapping",
      "Title-ready survey report",
    ],
    images: [],
  },
  {
    slug: "tororo-site-layout",
    title: "Tororo Construction Site Layout",
    category: "land-survey",
    location: "Tororo District",
    completedDate: "2023-08",
    scope: "Site setting-out for institutional building",
    summary:
      "Site layout and setting-out for a new institutional building footprint.",
    description:
      "Precise site setting-out from approved drawings, including foundation corner marking, level benchmarks, and as-built verification for the contractor.",
    highlights: [
      "Foundation corner marking",
      "Level benchmarks established",
      "As-built verification",
    ],
    images: [],
  },
  {
    slug: "busia-foundation-soil-test",
    title: "Busia Commercial Foundation Soil Test",
    category: "soil-testing",
    location: "Busia Town",
    completedDate: "2024-01",
    scope: "Geotechnical investigation for 4-storey building",
    summary:
      "Soil bearing capacity testing informing foundation design for a commercial build.",
    description:
      "Geotechnical site investigation including boreholes, soil bearing capacity tests, and a foundation recommendation report for a four-storey commercial development.",
    highlights: [
      "Borehole investigation",
      "Bearing capacity testing",
      "Foundation recommendation report",
    ],
    images: [],
  },
  {
    slug: "tororo-road-subgrade-test",
    title: "Tororo Road Subgrade Material Test",
    category: "soil-testing",
    location: "Tororo District",
    completedDate: "2023-10",
    scope: "Compaction and CBR testing for road subgrade",
    summary:
      "Subgrade material testing and compaction verification for a district road project.",
    description:
      "Laboratory and field testing including CBR values, compaction tests, and material suitability reporting for a 3.5 km road subgrade preparation contract.",
    highlights: [
      "CBR and compaction testing",
      "Field and laboratory analysis",
      "Material suitability report",
    ],
    images: [],
  },
  {
    slug: "busia-market-project-management",
    title: "Busia Market Infrastructure PM",
    category: "project-management",
    location: "Busia Municipality",
    completedDate: "2024-07",
    scope: "End-to-end PM for market paving and drainage",
    summary:
      "Project management for a municipal market paving and drainage upgrade.",
    description:
      "Full project management including scheduling, quality control, contractor coordination, and budget tracking for a market infrastructure upgrade spanning paving, drainage, and sanitation access.",
    highlights: [
      "Multi-contractor coordination",
      "Quality control inspections",
      "On-budget delivery",
    ],
    images: [],
  },
  {
    slug: "eastern-uganda-road-supervision",
    title: "Eastern Uganda Road Supervision",
    category: "project-management",
    location: "Eastern Uganda",
    completedDate: "2023-07",
    scope: "Site supervision for 6 km district road",
    summary:
      "Independent site supervision ensuring specification compliance on a district road.",
    description:
      "Third-party site supervision for a 6 km district road contract, including daily inspection reports, materials testing coordination, and milestone sign-off documentation.",
    highlights: [
      "6 km road supervision",
      "Daily inspection reports",
      "Milestone sign-off documentation",
    ],
    images: [],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return projects;
  return projects.filter((project) => project.category === category);
}

export function getCategoryLabel(category: PortfolioCategory): string {
  const labels: Record<PortfolioCategory, string> = {
    "road-construction": "Roads",
    "building-design": "Buildings",
    "land-survey": "Survey",
    drainage: "Drainage",
    "soil-testing": "Soil Testing",
    structural: "Structural",
    "project-management": "Management",
  };
  return labels[category];
}

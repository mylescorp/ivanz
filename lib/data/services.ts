export type ServiceCategory =
  | "road-construction"
  | "building-design"
  | "land-survey"
  | "drainage"
  | "soil-testing"
  | "structural"
  | "project-management";

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  id: ServiceCategory;
  title: string;
  shortTitle: string;
  icon: string;
  description: string;
  metaDescription: string;
  features: string[];
  overview: string[];
  process: ServiceProcessStep[];
  deliverables: string[];
  idealFor: string[];
  faqs: ServiceFaq[];
}

export const services: Service[] = [
  {
    id: "road-construction",
    title: "Road Construction",
    shortTitle: "Roads",
    icon: "road",
    description:
      "Gravel and paved road construction, access roads, and rural connectivity projects across Africa.",
    metaDescription:
      "Road construction services across Africa — gravel roads, paved access routes, rehabilitation, and drainage integration by IvanZ Construction.",
    features: [
      "Gravel and paved road construction",
      "Access road development",
      "Road rehabilitation and maintenance",
      "Drainage integration along road corridors",
    ],
    overview: [
      "IvanZ Construction designs and builds roads that withstand Africa's seasonal rains and heavy commercial use. From rural gravel access routes to municipal rehabilitation works, we handle subgrade preparation through final surfacing.",
      "Our road teams work across Busia District and surrounding regions, coordinating earthworks, compaction, drainage, and surfacing to deliver corridors that stay passable year-round.",
      "Whether you need a farm access road, an industrial haul route, or a community connectivity project, we provide site assessment, construction, and handover documentation.",
    ],
    process: [
      {
        title: "Site assessment and route survey",
        description:
          "We evaluate terrain, soil conditions, traffic requirements, and drainage needs before finalising the road alignment and specification.",
      },
      {
        title: "Earthworks and subgrade preparation",
        description:
          "Clearing, cut-and-fill, compaction, and subgrade stabilisation to create a durable foundation for the road structure.",
      },
      {
        title: "Drainage and structure installation",
        description:
          "Side drains, culverts, and crossing structures integrated along the corridor to manage stormwater and prevent erosion.",
      },
      {
        title: "Surfacing and handover",
        description:
          "Gravel or paved surfacing, final compaction, line marking where required, and completion documentation for the client.",
      },
    ],
    deliverables: [
      "Completed road corridor to agreed specification",
      "Compaction and material test records",
      "As-built survey and handover report",
      "Maintenance recommendations",
    ],
    idealFor: [
      "District and municipal road upgrades",
      "Rural community access roads",
      "Industrial and logistics site haul roads",
      "Road rehabilitation after seasonal damage",
    ],
    faqs: [
      {
        question: "Do you build both gravel and paved roads?",
        answer:
          "Yes. We construct gravel access roads and paved surfaces depending on traffic load, budget, and client requirements. We advise on the most cost-effective option during site assessment.",
      },
      {
        question: "Which areas do you cover for road projects?",
        answer:
          "We are based in Busia District and deliver road construction across Africa, including Tororo, Malaba, and surrounding rural districts.",
      },
      {
        question: "Can you rehabilitate existing damaged roads?",
        answer:
          "Yes. Road rehabilitation — including regrading, drainage repair, and resurfacing — is a core part of our road construction service.",
      },
    ],
  },
  {
    id: "building-design",
    title: "Building Design",
    shortTitle: "Buildings",
    icon: "building",
    description:
      "Structural and architectural design for residential, commercial, and institutional buildings.",
    metaDescription:
      "Building design and structural engineering across Africa — residential, commercial, and institutional projects by IvanZ Construction.",
    features: [
      "Structural design and drawings",
      "Foundation and superstructure planning",
      "Building permit documentation support",
      "Cost-effective design for local conditions",
    ],
    overview: [
      "Our building design team produces structural and architectural solutions suited to Africa's soils, climate, and local building regulations. We design for durability, safety, and cost efficiency.",
      "From single-storey residential builds to multi-storey commercial blocks and school extensions, we deliver complete drawing packages and specification documents.",
      "We work closely with clients and contractors through the design phase, supporting building permit submissions and on-site clarification during construction.",
    ],
    process: [
      {
        title: "Brief and site evaluation",
        description:
          "We review your project requirements, site constraints, and budget to establish the design scope and structural approach.",
      },
      {
        title: "Concept and structural design",
        description:
          "Foundation and superstructure design developed with local material availability and soil conditions in mind.",
      },
      {
        title: "Technical drawings and specifications",
        description:
          "Production of structural drawings, schedules, and specifications ready for contractor pricing and construction.",
      },
      {
        title: "Permit support and design review",
        description:
          "Assistance with building permit documentation and design clarification during the construction phase.",
      },
    ],
    deliverables: [
      "Structural design drawings and schedules",
      "Foundation and superstructure specifications",
      "Bill of quantities support for tendering",
      "Building permit documentation assistance",
    ],
    idealFor: [
      "Residential and commercial new builds",
      "School and institutional extensions",
      "Mixed-use commercial developments",
      "Clients needing permit-ready design packages",
    ],
    faqs: [
      {
        question: "Do you handle both structural and architectural design?",
        answer:
          "Our core strength is structural engineering and technical building design. We produce the structural drawings and specifications required for safe, permit-compliant construction.",
      },
      {
        question: "Can you design for variable soil conditions?",
        answer:
          "Yes. We recommend geotechnical investigation where needed and design foundations appropriate to the site — from simple strip footings to reinforced raft foundations.",
      },
      {
        question: "Do you support building permit applications?",
        answer:
          "We provide the technical documentation and drawings required for permit submissions and assist clients through the documentation process.",
      },
    ],
  },
  {
    id: "land-survey",
    title: "Land Survey",
    shortTitle: "Survey",
    icon: "compass",
    description:
      "Accurate land surveying for property boundaries, site planning, and construction layout.",
    metaDescription:
      "Professional land surveying across Africa — boundary surveys, topographic mapping, site layout, and as-built surveys by IvanZ Construction.",
    features: [
      "Boundary and topographic surveys",
      "Site layout and setting out",
      "As-built surveys",
      "Survey reports for planning authorities",
    ],
    overview: [
      "Accurate surveying is the foundation of every successful construction project. IvanZ Construction provides boundary demarcation, topographic mapping, and construction setting-out across Africa.",
      "Our survey outputs support land title processing, planning applications, contractor layout, and project verification — giving clients confidence that built works match approved designs.",
      "We deliver clear survey reports with coordinates, beacon placement, and topographic detail suitable for engineers, architects, and planning authorities.",
    ],
    process: [
      {
        title: "Scope definition and site mobilisation",
        description:
          "We confirm survey objectives — boundary, topographic, or setting-out — and mobilise equipment to site.",
      },
      {
        title: "Field measurement and data capture",
        description:
          "Boundary beaconing, topographic point collection, or construction layout marking carried out to required accuracy.",
      },
      {
        title: "Data processing and plan production",
        description:
          "Survey data processed into plans, coordinates, and reports suitable for design teams and authorities.",
      },
      {
        title: "Report delivery and site handover",
        description:
          "Final survey report delivered with marked beacons on site and explanation of findings to the client.",
      },
    ],
    deliverables: [
      "Survey report with coordinates and plans",
      "Boundary beacon placement (where applicable)",
      "Topographic map for design teams",
      "Setting-out marks for construction",
    ],
    idealFor: [
      "Land purchases and title processing",
      "Pre-construction site planning",
      "Construction layout and setting out",
      "As-built verification after construction",
    ],
    faqs: [
      {
        question: "What types of surveys do you offer?",
        answer:
          "We offer boundary surveys, topographic surveys, construction setting-out, and as-built surveys for completed works.",
      },
      {
        question: "Are your survey reports accepted for land titles?",
        answer:
          "We produce survey reports formatted for planning and land administration processes. Specific authority requirements should be confirmed at project outset.",
      },
      {
        question: "How long does a typical boundary survey take?",
        answer:
          "Duration depends on plot size and terrain. A standard residential plot survey is typically completed within a few days including report delivery.",
      },
    ],
  },
  {
    id: "drainage",
    title: "Drainage Systems",
    shortTitle: "Drainage",
    icon: "droplets",
    description:
      "Stormwater drainage, culverts, and flood mitigation infrastructure for sites and roads.",
    metaDescription:
      "Drainage system design and construction across Africa — stormwater management, culverts, channels, and flood mitigation by IvanZ Construction.",
    features: [
      "Stormwater drainage design",
      "Culvert and channel construction",
      "Flood mitigation solutions",
      "Site drainage integration",
    ],
    overview: [
      "Poor drainage is one of the leading causes of road failure and site flooding across Africa. IvanZ Construction designs and builds drainage systems that protect infrastructure and keep sites operational through the rainy season.",
      "Our drainage work spans open channels, culverts, catch pits, French drains, and integrated site drainage for commercial yards and municipal zones.",
      "We assess catchment areas, flow volumes, and outfall requirements to deliver drainage that works with local terrain rather than against it.",
    ],
    process: [
      {
        title: "Hydraulic assessment and design",
        description:
          "Evaluation of catchment area, flow paths, and existing drainage to design an effective stormwater management solution.",
      },
      {
        title: "Channel and structure layout",
        description:
          "Alignment of open channels, culvert positions, and outfall points coordinated with the overall site or road design.",
      },
      {
        title: "Construction and installation",
        description:
          "Excavation, culvert placement, channel lining, and connection to existing drainage infrastructure.",
      },
      {
        title: "Testing and commissioning",
        description:
          "Verification of flow paths, grate and pit installation, and handover with maintenance guidance.",
      },
    ],
    deliverables: [
      "Completed drainage network to specification",
      "Culvert and channel construction records",
      "Hydraulic design summary",
      "Maintenance and clearing schedule",
    ],
    idealFor: [
      "Commercial and industrial site drainage",
      "Municipal stormwater management",
      "Road corridor drainage integration",
      "Flood-prone area mitigation",
    ],
    faqs: [
      {
        question: "Can drainage be added to an existing road or site?",
        answer:
          "Yes. We design retrofit drainage solutions for existing roads, yards, and buildings that suffer from seasonal flooding or standing water.",
      },
      {
        question: "Do you build culverts as well as open channels?",
        answer:
          "Yes. Our drainage service includes box culverts, pipe culverts, open channels, catch pits, and French drain systems.",
      },
      {
        question: "How do you handle heavy seasonal rainfall?",
        answer:
          "We size channels and culverts based on local catchment assessment and design for peak storm flows typical of Africa's rainy seasons.",
      },
    ],
  },
  {
    id: "soil-testing",
    title: "Soil Testing",
    shortTitle: "Soil",
    icon: "flask",
    description:
      "Geotechnical soil testing and site investigation to inform safe foundation design.",
    metaDescription:
      "Geotechnical soil testing and site investigation across Africa — bearing capacity, compaction testing, and foundation reports by IvanZ Construction.",
    features: [
      "Soil bearing capacity testing",
      "Site geotechnical investigation",
      "Foundation recommendation reports",
      "Compaction and material testing",
    ],
    overview: [
      "Foundation failures are costly and preventable. IvanZ Construction provides geotechnical soil testing and site investigation to give engineers and clients the data needed for safe, economical foundation design.",
      "Our testing services cover soil bearing capacity, compaction verification, material suitability for road subgrades, and foundation recommendation reporting.",
      "We support building projects, road contracts, and industrial developments across Africa with field testing and clear, actionable reports.",
    ],
    process: [
      {
        title: "Investigation planning",
        description:
          "Scope of boreholes, test pits, and laboratory tests defined based on project type and structural requirements.",
      },
      {
        title: "Field sampling and testing",
        description:
          "On-site tests including bearing capacity, compaction, and sample collection for laboratory analysis.",
      },
      {
        title: "Laboratory analysis",
        description:
          "Processing of soil samples to determine strength, compressibility, and suitability for proposed works.",
      },
      {
        title: "Report and recommendations",
        description:
          "Geotechnical report delivered with foundation type recommendations and any special construction precautions.",
      },
    ],
    deliverables: [
      "Geotechnical investigation report",
      "Bearing capacity and test result data",
      "Foundation type recommendations",
      "Compaction and material suitability records",
    ],
    idealFor: [
      "New building foundation design",
      "Road subgrade verification",
      "Industrial site development",
      "Investigation of problem sites with settlement history",
    ],
    faqs: [
      {
        question: "When is soil testing required?",
        answer:
          "Soil testing is recommended before any significant building or road project, and is essential for multi-storey structures, bridges, and sites with unknown or variable ground conditions.",
      },
      {
        question: "How deep do you investigate?",
        answer:
          "Investigation depth depends on the proposed structure. We scope boreholes and test pits to reach the bearing stratum relevant to your foundation design.",
      },
      {
        question: "Do you test road construction materials?",
        answer:
          "Yes. We provide compaction testing and CBR testing for road subgrade and pavement layer verification.",
      },
    ],
  },
  {
    id: "structural",
    title: "Structural Engineering",
    shortTitle: "Structural",
    icon: "layers",
    description:
      "Structural analysis and engineering for bridges, retaining walls, and load-bearing structures.",
    metaDescription:
      "Structural engineering across Africa — bridges, culverts, retaining walls, and reinforced concrete structures by IvanZ Construction.",
    features: [
      "Bridge and culvert engineering",
      "Retaining wall design",
      "Structural assessments",
      "Reinforced concrete and steel structures",
    ],
    overview: [
      "IvanZ Construction provides structural engineering for infrastructure that must carry significant loads — bridges, culverts, retaining walls, and reinforced concrete frames.",
      "Our structural team analyses forces, designs reinforcement, and produces construction-ready drawings for structures built in demanding African conditions.",
      "From hillside retaining walls to twin-cell box culverts and commercial superstructures, we engineer solutions that prioritise safety and buildability.",
    ],
    process: [
      {
        title: "Structural requirements review",
        description:
          "Assessment of loads, spans, soil conditions, and environmental factors that govern the structural design.",
      },
      {
        title: "Analysis and design",
        description:
          "Structural analysis and member sizing for concrete, steel, or masonry elements as appropriate.",
      },
      {
        title: "Drawing production",
        description:
          "Reinforcement drawings, schedules, and construction details prepared for contractor execution.",
      },
      {
        title: "Site support and inspection",
        description:
          "Technical support during construction including reinforcement inspection and structural sign-off.",
      },
    ],
    deliverables: [
      "Structural analysis and design report",
      "Reinforcement and construction drawings",
      "Bar bending schedules",
      "Site inspection and sign-off records",
    ],
    idealFor: [
      "Bridge and culvert structures",
      "Hillside retaining walls",
      "Commercial and institutional buildings",
      "Structural assessments of existing buildings",
    ],
    faqs: [
      {
        question: "Do you design and build structural works?",
        answer:
          "Yes. We provide structural engineering design and can deliver construction for culverts, retaining walls, and other structural civil works.",
      },
      {
        question: "Can you assess an existing structure for safety?",
        answer:
          "Yes. We carry out structural assessments and provide reports on the condition and load capacity of existing buildings and infrastructure.",
      },
      {
        question: "What materials do you work with?",
        answer:
          "We primarily design reinforced concrete structures. Steel and masonry elements are included where appropriate to the project.",
      },
    ],
  },
  {
    id: "project-management",
    title: "Project Management",
    shortTitle: "Management",
    icon: "clipboard",
    description:
      "End-to-end project management for civil engineering and construction projects.",
    metaDescription:
      "Civil engineering project management across Africa — planning, site supervision, quality control, and contractor coordination by IvanZ Construction.",
    features: [
      "Project planning and scheduling",
      "Quality control and site supervision",
      "Budget and timeline management",
      "Contractor coordination",
    ],
    overview: [
      "Complex civil engineering projects need disciplined management to stay on schedule, on budget, and to specification. IvanZ Construction provides end-to-end project management for infrastructure contracts across Africa.",
      "Our project managers coordinate contractors, monitor quality, track milestones, and keep clients informed with clear reporting throughout the project lifecycle.",
      "Whether you are a private developer, district authority, or commercial operator, we bring structure and accountability to your construction programme.",
    ],
    process: [
      {
        title: "Project planning and mobilisation",
        description:
          "Work breakdown, schedule development, contractor briefing, and establishment of quality and reporting frameworks.",
      },
      {
        title: "Site supervision and quality control",
        description:
          "Daily site inspections, materials verification, and compliance checks against specifications and drawings.",
      },
      {
        title: "Progress tracking and reporting",
        description:
          "Regular progress reports, milestone tracking, and issue escalation to keep the project on course.",
      },
      {
        title: "Completion and handover",
        description:
          "Final inspections, snag resolution, completion documentation, and formal handover to the client.",
      },
    ],
    deliverables: [
      "Project schedule and milestone plan",
      "Daily and weekly progress reports",
      "Quality inspection records",
      "Completion and handover documentation",
    ],
    idealFor: [
      "District and municipal infrastructure contracts",
      "Multi-contractor civil engineering projects",
      "Clients without in-house technical oversight",
      "Independent supervision of third-party contractors",
    ],
    faqs: [
      {
        question: "Do you manage projects you did not design?",
        answer:
          "Yes. We provide third-party project management and site supervision for projects designed and built by other contractors.",
      },
      {
        question: "What reporting do clients receive?",
        answer:
          "Clients receive regular progress reports covering schedule status, quality inspections, issues, and upcoming milestones.",
      },
      {
        question: "Can you manage road and drainage projects together?",
        answer:
          "Yes. Our project management service covers multi-discipline civil engineering contracts including combined road, drainage, and structural works.",
      },
    ],
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getOtherServices(currentId: ServiceCategory): Service[] {
  return services.filter((service) => service.id !== currentId);
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

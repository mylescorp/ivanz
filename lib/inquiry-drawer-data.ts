export const dialCodeOptions = [
  { value: "+256", label: "🇺🇬 +256" },
  { value: "+254", label: "🇰🇪 +254" },
  { value: "+255", label: "🇹🇿 +255" },
  { value: "+250", label: "🇷🇼 +250" },
  { value: "+257", label: "🇧🇮 +257" },
  { value: "+243", label: "🇨🇩 +243" },
  { value: "+211", label: "🇸🇸 +211" },
  { value: "+251", label: "🇪🇹 +251" },
  { value: "+233", label: "🇬🇭 +233" },
  { value: "+234", label: "🇳🇬 +234" },
  { value: "+27", label: "🇿🇦 +27" },
  { value: "+44", label: "🇬🇧 +44" },
  { value: "+1", label: "🇺🇸 +1" },
  { value: "+971", label: "🇦🇪 +971" },
  { value: "+49", label: "🇩🇪 +49" },
  { value: "+86", label: "🇨🇳 +86" },
  { value: "+91", label: "🇮🇳 +91" },
] as const;

export const countryGroups = [
  {
    label: "East Africa",
    countries: [
      "Uganda",
      "Kenya",
      "Tanzania",
      "Rwanda",
      "Burundi",
      "South Sudan",
      "Ethiopia",
      "DR Congo",
    ],
  },
  {
    label: "West Africa",
    countries: ["Nigeria", "Ghana", "Senegal", "Ivory Coast"],
  },
  {
    label: "Southern Africa",
    countries: ["South Africa", "Zambia", "Zimbabwe", "Mozambique"],
  },
  {
    label: "North Africa & Middle East",
    countries: ["Egypt", "UAE", "Saudi Arabia"],
  },
  {
    label: "Europe & Americas",
    countries: ["United Kingdom", "United States", "Germany", "Canada"],
  },
  {
    label: "Asia",
    countries: ["China", "India"],
  },
] as const;

export const serviceChipOptions = [
  { emoji: "🛣", label: "Road Construction", value: "Road Construction" },
  { emoji: "🏗", label: "Building Design", value: "Structural Design" },
  { emoji: "📐", label: "Land Survey", value: "Land Surveying" },
  { emoji: "💧", label: "Drainage", value: "Drainage Engineering" },
  { emoji: "🔬", label: "Soil Testing", value: "Soil Testing" },
] as const;

export const drawerServiceOptions = [
  "Road Construction",
  "Structural Design",
  "Land Surveying",
  "Drainage Engineering",
  "Soil Testing & Analysis",
  "Project Management",
  "Building Inspection",
  "Environmental Assessment",
  "Bridge Engineering",
  "Quantity Surveying",
  "Other",
] as const;

export const urgencyOptions = [
  { emoji: "🔴", label: "Urgent", value: "Urgent — under 2 weeks" },
  { emoji: "🟡", label: "Standard", value: "Standard — 1 to 2 months" },
  { emoji: "🟢", label: "Planning", value: "Planning stage — 3+ months" },
] as const;

export const progressSteps = [
  "Your info",
  "Project",
  "Details",
  "Ready",
] as const;

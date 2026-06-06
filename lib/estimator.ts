import type { ServiceCategory } from "@/lib/data/services";

export type ProjectScale = "small" | "medium" | "large" | "enterprise";
export type ProjectRegion =
  | "busia"
  | "africa"
  | "uganda"
  | "east-africa"
  | "central"
  | "other";

export interface EstimatorInput {
  service: ServiceCategory;
  scale: ProjectScale;
  region: ProjectRegion;
  extras: string[];
}

export interface CostRange {
  min: number;
  max: number;
  formatted: string;
}

const baseRates: Record<
  ServiceCategory,
  Record<ProjectScale, { min: number; max: number }>
> = {
  "road-construction": {
    small: { min: 15_000_000, max: 50_000_000 },
    medium: { min: 50_000_000, max: 200_000_000 },
    large: { min: 200_000_000, max: 800_000_000 },
    enterprise: { min: 800_000_000, max: 2_000_000_000 },
  },
  "building-design": {
    small: { min: 2_000_000, max: 8_000_000 },
    medium: { min: 8_000_000, max: 30_000_000 },
    large: { min: 30_000_000, max: 120_000_000 },
    enterprise: { min: 120_000_000, max: 500_000_000 },
  },
  "land-survey": {
    small: { min: 500_000, max: 2_000_000 },
    medium: { min: 2_000_000, max: 8_000_000 },
    large: { min: 8_000_000, max: 25_000_000 },
    enterprise: { min: 25_000_000, max: 80_000_000 },
  },
  drainage: {
    small: { min: 3_000_000, max: 12_000_000 },
    medium: { min: 12_000_000, max: 45_000_000 },
    large: { min: 45_000_000, max: 150_000_000 },
    enterprise: { min: 150_000_000, max: 600_000_000 },
  },
  "soil-testing": {
    small: { min: 300_000, max: 1_500_000 },
    medium: { min: 1_500_000, max: 5_000_000 },
    large: { min: 5_000_000, max: 15_000_000 },
    enterprise: { min: 15_000_000, max: 50_000_000 },
  },
  structural: {
    small: { min: 5_000_000, max: 20_000_000 },
    medium: { min: 20_000_000, max: 80_000_000 },
    large: { min: 80_000_000, max: 300_000_000 },
    enterprise: { min: 300_000_000, max: 1_000_000_000 },
  },
  "project-management": {
    small: { min: 1_000_000, max: 5_000_000 },
    medium: { min: 5_000_000, max: 20_000_000 },
    large: { min: 20_000_000, max: 80_000_000 },
    enterprise: { min: 80_000_000, max: 300_000_000 },
  },
};

const regionMultipliers: Record<ProjectRegion, number> = {
  busia: 1.0,
  africa: 1.2,
  uganda: 1.05,
  "east-africa": 1.08,
  central: 1.15,
  other: 1.1,
};

const extraCosts: Record<string, number> = {
  "site-clearing": 0.08,
  "material-delivery": 0.05,
  "night-work": 0.12,
  "environmental": 0.06,
};

function formatUgx(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `UGX ${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `UGX ${(amount / 1_000_000).toFixed(0)}M`;
  }
  return `UGX ${amount.toLocaleString("en-UG")}`;
}

export function calculateCostRange(input: EstimatorInput): CostRange {
  const base = baseRates[input.service][input.scale];
  const regionFactor = regionMultipliers[input.region];
  const extraFactor =
    1 +
    input.extras.reduce((sum, extra) => sum + (extraCosts[extra] ?? 0), 0);

  const min = Math.round(base.min * regionFactor * extraFactor);
  const max = Math.round(base.max * regionFactor * extraFactor);

  return {
    min,
    max,
    formatted: `${formatUgx(min)} – ${formatUgx(max)}`,
  };
}

export const scaleOptions = [
  { id: "small" as const, label: "Small", description: "Under 1,000 sqm or under 1km" },
  { id: "medium" as const, label: "Medium", description: "1,000-5,000 sqm or 1-5km" },
  { id: "large" as const, label: "Large", description: "5,000-20,000 sqm or 5-20km" },
  { id: "enterprise" as const, label: "Enterprise", description: "20,000+ sqm or 20km+" },
];

export const regionOptions = [
  { id: "busia" as const, label: "Busia District" },
  { id: "africa" as const, label: "Africa (general)" },
  { id: "uganda" as const, label: "Uganda" },
  { id: "east-africa" as const, label: "East Africa" },
  { id: "central" as const, label: "Central Uganda" },
  { id: "other" as const, label: "Other Region" },
];

export const extraOptions = [
  { id: "site-clearing", label: "Site clearing required" },
  { id: "material-delivery", label: "Remote material delivery" },
  { id: "night-work", label: "Night or weekend work" },
  { id: "environmental", label: "Environmental assessment" },
];

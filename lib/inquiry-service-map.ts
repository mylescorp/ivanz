import type { ServiceCategory } from "@/lib/data/services";

const serviceIdToDrawerName: Record<ServiceCategory, string> = {
  "road-construction": "Road Construction",
  "building-design": "Structural Design",
  "land-survey": "Land Surveying",
  drainage: "Drainage Engineering",
  "soil-testing": "Soil Testing",
  structural: "Bridge Engineering",
  "project-management": "Project Management",
};

export function resolveDrawerService(service?: string): string {
  if (!service) return "";
  if (service in serviceIdToDrawerName) {
    return serviceIdToDrawerName[service as ServiceCategory];
  }
  return service;
}

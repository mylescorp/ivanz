import {
  Building2,
  ClipboardList,
  Compass,
  Droplets,
  FlaskConical,
  Layers,
  Route,
  type LucideIcon,
} from "lucide-react";

export const serviceIconMap = {
  road: Route,
  building: Building2,
  compass: Compass,
  droplets: Droplets,
  flask: FlaskConical,
  layers: Layers,
  clipboard: ClipboardList,
} as const satisfies Record<string, LucideIcon>;

export type ServiceIconKey = keyof typeof serviceIconMap;

export function getServiceIcon(icon: string): LucideIcon {
  return serviceIconMap[icon as ServiceIconKey] ?? Route;
}

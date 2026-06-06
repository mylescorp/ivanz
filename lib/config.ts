function requireEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const siteConfig = {
  name: requireEnv("NEXT_PUBLIC_SITE_NAME", "IvanZ Construction"),
  url: requireEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
  description:
    "Professional civil engineering and construction services across Africa. Headquartered in Uganda with project delivery throughout the continent.",
  location: requireEnv(
    "NEXT_PUBLIC_COMPANY_LOCATION",
    "Busia District, Uganda",
  ),
  serviceArea: requireEnv("NEXT_PUBLIC_SERVICE_AREA", "Africa"),
  whatsappPrimary: requireEnv("NEXT_PUBLIC_WHATSAPP_PRIMARY", "256787768534"),
  whatsappSecondary: requireEnv(
    "NEXT_PUBLIC_WHATSAPP_SECONDARY",
    "256702195377",
  ),
  whatsappDisplayPrimary: "+256 787 768 534",
  whatsappDisplaySecondary: "+256 702 195 377",
  tagline:
    "Building Africa with precision and integrity — from Uganda to the wider continent",
  stats: {
    projects: "47+",
    regions: "Africa",
    responseTime: "2 hrs",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/estimator", label: "Cost Estimator" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
] as const;

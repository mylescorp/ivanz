import { siteConfig } from "@/lib/config";
import type { ServiceCategory } from "@/lib/data/services";

export interface InquiryFormData {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  location: string;
  service: ServiceCategory | "";
  projectName?: string;
  siteLocation?: string;
  scale?: string;
  budget?: string;
  startDate?: string;
  urgency: "urgent" | "standard" | "planning";
  notes?: string;
  source?: string;
}

export function formatPhoneInput(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return "";

  let normalized = digits;
  if (normalized.startsWith("256")) {
    normalized = normalized.slice(3);
  } else if (normalized.startsWith("0")) {
    normalized = normalized.slice(1);
  }

  normalized = normalized.slice(0, 9);
  const parts = [
    normalized.slice(0, 3),
    normalized.slice(3, 6),
    normalized.slice(6, 9),
  ].filter(Boolean);

  return `+256 ${parts.join(" ")}`.trim();
}

export function isValidUgandaPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("256")) {
    return digits.length === 12;
  }
  if (digits.startsWith("0")) {
    return digits.length === 10;
  }
  return digits.length === 9;
}

const urgencyLabels = {
  urgent: "Urgent (within 2 weeks)",
  standard: "Standard (1-2 months)",
  planning: "Planning (3+ months)",
} as const;

export function buildWhatsAppMessage(data: InquiryFormData): string {
  const lines = [
    "📋 NEW PROJECT INQUIRY - IvanZ Construction Website",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "👤 CONTACT",
    `• Name: ${data.name}`,
    `• Phone: ${data.phone}`,
  ];

  if (data.email) lines.push(`• Email: ${data.email}`);
  if (data.company) lines.push(`• Company: ${data.company}`);
  lines.push(`• Location: ${data.location}`);
  lines.push("");
  lines.push("🏗️ PROJECT");

  if (data.service) {
    const serviceLabel = data.service
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    lines.push(`• Service: ${serviceLabel}`);
  }
  if (data.projectName) lines.push(`• Project: ${data.projectName}`);
  if (data.siteLocation) lines.push(`• Site: ${data.siteLocation}`);
  if (data.scale) lines.push(`• Scale: ${data.scale}`);
  if (data.budget) lines.push(`• Budget: ${data.budget}`);
  if (data.startDate) lines.push(`• Start: ${data.startDate}`);
  lines.push(`• Urgency: ${urgencyLabels[data.urgency]}`);

  if (data.notes) {
    lines.push("");
    lines.push("📝 NOTES");
    lines.push(data.notes);
  }

  lines.push("");
  if (data.source) lines.push(`📣 Source: ${data.source}`);
  lines.push(`🌐 Via: ${siteConfig.url.replace(/^https?:\/\//, "")}`);

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappPrimary}?text=${encoded}`;
}

export function getWhatsAppDirectUrl(): string {
  return `https://wa.me/${siteConfig.whatsappPrimary}`;
}

export function getRequiredFieldCount(data: InquiryFormData): number {
  const required = [data.name, data.phone, data.location, data.service];
  return required.filter((field) => field && String(field).trim().length > 0)
    .length;
}

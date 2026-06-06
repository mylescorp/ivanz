import { siteConfig } from "@/lib/config";

export interface InquiryFormData {
  name: string;
  dialCode: string;
  phone: string;
  email?: string;
  company?: string;
  country: string;
  service: string;
  location?: string;
  scale?: string;
  budget?: string;
  urgency?: string;
  notes?: string;
  source?: string;
}

export function formatPhoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, 15);
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 6;
}

export function buildWhatsAppMessage(data: InquiryFormData): string {
  const fullPhone = data.phone
    ? `${data.dialCode} ${data.phone}`
    : "Not provided";

  const lines = [
    "📋 NEW PROJECT INQUIRY — IvanZ Construction",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "👤 CONTACT INFORMATION",
    `• Name: ${data.name || "—"}`,
    `• Phone: ${fullPhone}`,
    `• Email: ${data.email || "N/A"}`,
    `• Company: ${data.company || "N/A"}`,
    `• Country: ${data.country || "—"}`,
    "",
    "🏗️ PROJECT DETAILS",
    `• Service: ${data.service || "—"}`,
    `• Location: ${data.location || "N/A"}`,
    `• Scale: ${data.scale || "N/A"}`,
    `• Budget: ${data.budget || "N/A"}`,
    `• Urgency: ${data.urgency || "N/A"}`,
    "",
    "📝 NOTES",
    data.notes || "None provided",
    "",
    `🌐 Sent via: ${siteConfig.url.replace(/^https?:\/\//, "")}`,
  ];

  if (data.source) {
    lines.splice(lines.length - 1, 0, `📣 Source: ${data.source}`);
  }

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappPrimary}?text=${encoded}`;
}

export function getWhatsAppDirectUrl(): string {
  return `https://wa.me/${siteConfig.whatsappPrimary}`;
}

export function getDrawerProgressPercent(data: InquiryFormData): number {
  let filled = 0;
  const total = 7;
  if (data.name.trim()) filled++;
  if (data.phone.trim()) filled++;
  if (data.country.trim()) filled++;
  if (data.service.trim()) filled++;
  if (data.location?.trim()) filled++;
  if (data.budget?.trim()) filled++;
  if (data.urgency?.trim()) filled++;
  return Math.round((filled / total) * 100);
}

export function isDrawerReady(data: InquiryFormData): boolean {
  return Boolean(
    data.name.trim() &&
      data.phone.trim() &&
      isValidPhone(data.phone) &&
      data.country.trim() &&
      data.service.trim(),
  );
}

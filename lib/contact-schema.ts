import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  company: z.string().optional(),
  location: z.string().min(2, "Enter your district or location"),
  service: z.string().min(1, "Select a service"),
  projectName: z.string().optional(),
  siteLocation: z.string().optional(),
  scale: z.string().optional(),
  budget: z.string().optional(),
  startDate: z.string().optional(),
  urgency: z.enum(["urgent", "standard", "planning"]),
  notes: z.string().optional(),
  source: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

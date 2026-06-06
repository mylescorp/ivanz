import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  dialCode: z.string().min(1),
  phone: z.string().min(6, "Please enter your phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  company: z.string().optional(),
  country: z.string().min(1, "Please select your country"),
  service: z.string().min(1, "Please select a service"),
  location: z.string().optional(),
  scale: z.string().optional(),
  budget: z.string().optional(),
  urgency: z.string().optional(),
  notes: z.string().optional(),
  source: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

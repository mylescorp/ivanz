"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Copy,
  Loader2,
  MessageCircle,
  Send,
} from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/lib/config";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatPhoneInput,
  getRequiredFieldCount,
  isValidUgandaPhone,
  type InquiryFormData,
} from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type SendState = "idle" | "sending" | "opened";

const budgetOptions = [
  { value: "under-10m", label: "Under UGX 10M" },
  { value: "10m-50m", label: "UGX 10M – 50M" },
  { value: "50m-200m", label: "UGX 50M – 200M" },
  { value: "200m-500m", label: "UGX 200M – 500M" },
  { value: "500m-plus", label: "UGX 500M+" },
];

const defaultValues: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
  service: "",
  projectName: "",
  siteLocation: "",
  scale: "",
  budget: "",
  startDate: "",
  urgency: "standard",
  notes: "",
  source: "Website",
};

export function WhatsAppForm() {
  const searchParams = useSearchParams();
  const [sendState, setSendState] = useState<SendState>("idle");
  const [showFallback, setShowFallback] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const values = watch();

  useEffect(() => {
    const service = searchParams.get("service");
    const notes = searchParams.get("notes");
    const scale = searchParams.get("scale");
    const budget = searchParams.get("budget");
    const projectName = searchParams.get("projectName");
    const source = searchParams.get("source");

    if (service) setValue("service", service);
    if (notes) setValue("notes", notes);
    if (scale) setValue("scale", scale);
    if (budget) setValue("budget", budget);
    if (projectName) setValue("projectName", projectName);
    if (source) setValue("source", source);

    if (service || notes || scale || budget) {
      const formElement = document.getElementById("inquiry-form");
      formElement?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchParams, setValue]);

  const inquiryData: InquiryFormData = useMemo(
    () => ({
      name: values.name,
      phone: values.phone,
      email: values.email,
      company: values.company,
      location: values.location,
      service: values.service as InquiryFormData["service"],
      projectName: values.projectName,
      siteLocation: values.siteLocation,
      scale: values.scale,
      budget: values.budget,
      startDate: values.startDate,
      urgency: values.urgency,
      notes: values.notes,
      source: values.source,
    }),
    [values],
  );

  const progress = (getRequiredFieldCount(inquiryData) / 4) * 100;
  const isValid =
    values.name.length >= 2 &&
    isValidUgandaPhone(values.phone) &&
    values.location.length >= 2 &&
    values.service.length > 0;

  const previewMessage = buildWhatsAppMessage(inquiryData);

  const urgencyBadge = {
    urgent: "Urgent",
    standard: "Standard",
    planning: "Planning",
  }[values.urgency];

  const onSubmit = () => {
    if (!isValid) return;

    setSendState("sending");
    const message = buildWhatsAppMessage(inquiryData);
    const url = buildWhatsAppUrl(message);

    setTimeout(() => {
      const opened = window.open(url, "_blank");
      if (!opened) {
        setShowFallback(true);
      }
      setSendState("opened");
    }, 500);
  };

  const copyNumber = async () => {
    await navigator.clipboard.writeText(siteConfig.whatsappDisplayPrimary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        id="inquiry-form"
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-grey-light bg-white p-6 shadow-sm md:p-8"
      >
        <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-grey-light">
          <div
            className="h-full rounded-full bg-gold transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Full Name *
              </label>
              <input
                {...register("name")}
                className="w-full rounded-lg border border-grey-light px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Phone Number *
              </label>
              <input
                value={values.phone}
                onChange={(event) =>
                  setValue("phone", formatPhoneInput(event.target.value), {
                    shouldValidate: true,
                  })
                }
                className="w-full rounded-lg border border-grey-light px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="+256 7XX XXX XXX"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full rounded-lg border border-grey-light px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Company
              </label>
              <input
                {...register("company")}
                className="w-full rounded-lg border border-grey-light px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="Company name (optional)"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy">
              Your Location *
            </label>
            <input
              {...register("location")}
              className="w-full rounded-lg border border-grey-light px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              placeholder="District or region"
            />
            {errors.location && (
              <p className="mt-1 text-xs text-red-600">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy">
              Service Required *
            </label>
            <select
              {...register("service")}
              className={cn(
                "w-full rounded-lg border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gold/20",
                searchParams.get("service")
                  ? "border-gold bg-gold/5 focus:border-gold"
                  : "border-grey-light focus:border-gold",
              )}
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-1 text-xs text-red-600">{errors.service.message}</p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Project Name
              </label>
              <input
                {...register("projectName")}
                className="w-full rounded-lg border border-grey-light px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="Project title"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Site Location
              </label>
              <input
                {...register("siteLocation")}
                className="w-full rounded-lg border border-grey-light px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="Where is the project site?"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Project Scale
              </label>
              <input
                {...register("scale")}
                className="w-full rounded-lg border border-grey-light px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="e.g. 3.5km road, 2-storey building"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Budget Range
              </label>
              <select
                {...register("budget")}
                className="w-full rounded-lg border border-grey-light px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              >
                <option value="">Select budget range</option>
                {budgetOptions.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Preferred Start Date
              </label>
              <input
                {...register("startDate")}
                type="month"
                className="w-full rounded-lg border border-grey-light px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy">
                Urgency
              </label>
              <div className="flex flex-wrap gap-3">
                {(["urgent", "standard", "planning"] as const).map((level) => (
                  <label
                    key={level}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-grey-light px-3 py-2 text-sm"
                  >
                    <input
                      type="radio"
                      value={level}
                      {...register("urgency")}
                      className="accent-gold"
                    />
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy">
              Additional Notes
            </label>
            <textarea
              {...register("notes")}
              rows={4}
              className="w-full rounded-lg border border-grey-light px-4 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              placeholder="Tell us more about your project requirements"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={!isValid || sendState === "sending"}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-sm font-semibold text-white transition-all",
              isValid
                ? "bg-whatsapp hover:bg-whatsapp/90"
                : "cursor-not-allowed bg-muted/40",
              isValid && sendState === "idle" && "animate-pulse",
            )}
          >
            {sendState === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
            {sendState === "opened" && <Check className="h-4 w-4" />}
            {sendState === "idle" && <Send className="h-4 w-4" />}
            {sendState === "opened" ? "WhatsApp Opened" : "Send via WhatsApp"}
          </button>
          <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy">
            {urgencyBadge}
          </span>
        </div>

        {showFallback && (
          <div className="mt-6 rounded-lg border border-whatsapp/20 bg-whatsapp/5 p-4">
            <p className="text-sm text-body">
              WhatsApp could not open automatically. Contact us directly:
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-semibold text-navy">
                {siteConfig.whatsappDisplayPrimary}
              </span>
              <button
                type="button"
                onClick={copyNumber}
                className="inline-flex items-center gap-1 rounded-lg bg-whatsapp px-3 py-1.5 text-xs font-medium text-white"
              >
                <Copy className="h-3 w-3" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </form>

      <div className="rounded-2xl border border-grey-light bg-grey-light/50 p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-whatsapp" />
          <h3 className="font-heading text-lg font-semibold text-navy">
            Live Message Preview
          </h3>
        </div>
        <p className="mb-4 text-sm text-muted">
          This is exactly what our team will receive on WhatsApp.
        </p>
        <pre className="whitespace-pre-wrap rounded-xl border border-whatsapp/20 bg-[#E9FBE6] p-4 font-mono text-xs leading-relaxed text-body">
          {previewMessage}
        </pre>
      </div>
    </div>
  );
}

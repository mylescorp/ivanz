"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Eye,
  Loader2,
  Lock,
  MessageCircle,
  X,
} from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import {
  countryGroups,
  dialCodeOptions,
  progressSteps,
  serviceChipOptions,
  drawerServiceOptions,
  urgencyOptions,
} from "@/lib/inquiry-drawer-data";
import {
  budgetMatchesCurrency,
  getBudgetOptionsForCurrency,
  getCountryForDialCode,
  getDialCodeForCountry,
  resolveCurrencyCode,
} from "@/lib/inquiry-budget-currency";
import type { InquiryPrefill } from "@/lib/inquiry-prefill";
import { resolveDrawerService } from "@/lib/inquiry-service-map";
import { siteConfig } from "@/lib/config";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  formatPhoneDigits,
  getDrawerProgressPercent,
  isDrawerReady,
  type InquiryFormData,
} from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type SendState = "idle" | "sending" | "sent";

const defaultValues: ContactFormValues = {
  name: "",
  dialCode: "+256",
  phone: "",
  email: "",
  company: "",
  country: "",
  service: "",
  location: "",
  scale: "",
  budget: "",
  urgency: "",
  notes: "",
  source: "Website",
};

interface WhatsAppInquiryModalProps {
  isOpen: boolean;
  prefill?: InquiryPrefill;
  onClose: () => void;
}

function getStepState(
  progress: number,
  index: number,
): "active" | "done" | "idle" {
  const thresholds = [0, 33, 66, 100];
  if (progress === 100 && index === 3) return "active";
  if (progress >= (thresholds[index + 1] ?? 101)) return "done";
  if (progress >= thresholds[index] && progress < (thresholds[index + 1] ?? 101)) {
    return "active";
  }
  return "idle";
}

export function WhatsAppInquiryModal({
  isOpen,
  prefill,
  onClose,
}: WhatsAppInquiryModalProps) {
  const [sendState, setSendState] = useState<SendState>("idle");
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  const lastCurrencyRef = useRef("UGX");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const values = watch();

  const currencyCode = resolveCurrencyCode(values.dialCode, values.country);
  const budgetOptions = useMemo(
    () => getBudgetOptionsForCurrency(currencyCode),
    [currencyCode],
  );

  useEffect(() => {
    if (lastCurrencyRef.current !== currencyCode) {
      if (currencyCode && !budgetMatchesCurrency(values.budget, currencyCode)) {
        setValue("budget", "");
      }
      lastCurrencyRef.current = currencyCode;
    }
  }, [currencyCode, setValue, values.budget]);

  const handleDialCodeChange = (dialCode: string) => {
    setValue("dialCode", dialCode, { shouldValidate: true });
    const country = getCountryForDialCode(dialCode);
    if (country) {
      setValue("country", country, { shouldValidate: true });
    }
  };

  const handleCountryChange = (country: string) => {
    setValue("country", country, { shouldValidate: true });
    const dialCode = getDialCodeForCountry(country);
    if (dialCode) {
      setValue("dialCode", dialCode, { shouldValidate: true });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setSendState("idle");
      setFallbackUrl(null);
      setShowValidation(false);
      return;
    }

    const resolvedService = resolveDrawerService(prefill?.service);

    reset({
      ...defaultValues,
      service: resolvedService,
      notes: prefill?.notes ?? "",
      scale: prefill?.scale ?? "",
      budget: prefill?.budget ?? "",
      location: prefill?.location ?? prefill?.siteLocation ?? "",
      source: prefill?.source ?? "Website Drawer",
    });
  }, [isOpen, prefill, reset]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const inquiryData: InquiryFormData = useMemo(
    () => ({
      name: values.name,
      dialCode: values.dialCode,
      phone: values.phone,
      email: values.email,
      company: values.company,
      country: values.country,
      service: values.service,
      location: values.location,
      scale: values.scale,
      budget: values.budget,
      urgency: values.urgency,
      notes: values.notes,
      source: values.source,
    }),
    [values],
  );

  const progress = getDrawerProgressPercent(inquiryData);
  const isReady = isDrawerReady(inquiryData);
  const previewMessage = buildWhatsAppMessage(inquiryData);
  const showPreview = Boolean(
    values.name || values.phone || values.service,
  );

  const selectChip = (serviceValue: string) => {
    setValue("service", serviceValue, { shouldValidate: true });
  };

  const selectUrgency = (urgencyValue: string) => {
    setValue("urgency", urgencyValue, { shouldValidate: true });
  };

  const onSubmit = () => {
    setShowValidation(true);
    if (!isReady) return;

    setSendState("sending");
    const message = buildWhatsAppMessage(inquiryData);
    const url = buildWhatsAppUrl(message);

    setTimeout(() => {
      const opened = window.open(url, "_blank");
      if (!opened) setFallbackUrl(url);
      setSendState("sent");
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[70] bg-navy/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden
      />

      <div
        className={cn(
          "fixed z-[71] flex max-h-[92vh] w-full flex-col overflow-hidden bg-white shadow-2xl",
          "bottom-0 left-0 right-0 rounded-t-3xl",
          "md:bottom-6 md:left-1/2 md:right-auto md:w-[520px] md:max-h-[88vh] md:-translate-x-1/2 md:rounded-3xl",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-drawer-title"
      >
        <div className="flex shrink-0 justify-center pt-3 md:hidden">
          <div className="h-1 w-10 rounded-full bg-grey-light" />
        </div>

        <div className="relative shrink-0 overflow-hidden bg-[#0F1E30] px-5 pb-4 pt-2 text-white md:px-6 md:pt-5">
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold/15"
            aria-hidden
          />
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-whatsapp">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-sm font-bold leading-tight">
                  {siteConfig.name}
                </p>
                <p className="text-xs text-gold">{siteConfig.location}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close inquiry drawer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <h2
            id="whatsapp-drawer-title"
            className="font-heading text-xl font-bold leading-tight"
          >
            Get a <span className="text-gold">Free Quote</span> in minutes
          </h2>
          <p className="mt-1 text-xs text-white/55">
            Fill in your details — we&apos;ll respond on WhatsApp within{" "}
            {siteConfig.stats.responseTime}
          </p>
        </div>

        <div className="shrink-0 bg-[#0F1E30] px-5 pb-4 md:px-6">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold to-[#D4A94E] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between">
            {progressSteps.map((label, index) => {
              const state = getStepState(progress, index);
              return (
                <span
                  key={label}
                  className={cn(
                    "text-[10px] font-medium uppercase tracking-wider",
                    state === "active" && "text-gold",
                    state === "done" && "text-white/60",
                    state === "idle" && "text-white/35",
                  )}
                >
                  {label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="shrink-0 border-b border-grey-light/60 px-5 py-3 md:px-6">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted">
            What do you need?
          </p>
          <div className="flex flex-wrap gap-1.5">
            {serviceChipOptions.map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => selectChip(chip.value)}
                className={cn(
                  "rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                  values.service === chip.value
                    ? "border-gold bg-[#FBF6EC] font-semibold text-navy"
                    : "border-grey-light bg-grey-light/40 text-muted hover:border-gold/50 hover:text-navy",
                )}
              >
                {chip.emoji} {chip.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 md:px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <section>
              <h3 className="mb-3 flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-widest text-navy">
                Your Contact Information
                <span className="h-px flex-1 bg-gradient-to-r from-gold/25 to-transparent" />
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Full Name" required error={showValidation ? errors.name?.message : undefined}>
                  <input
                    {...register("name")}
                    autoFocus
                    placeholder="e.g. John Mukasa"
                    className={fieldClass(showValidation && !!errors.name)}
                  />
                </Field>
                <Field label="Email Address">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@email.com"
                    className={fieldClass()}
                  />
                </Field>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Field
                  label="Phone Number"
                  required
                  error={showValidation ? errors.phone?.message : undefined}
                >
                  <div
                    className={cn(
                      "flex overflow-hidden rounded-lg border bg-grey-light/40",
                      showValidation && errors.phone
                        ? "border-red-500"
                        : "border-grey-light focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20",
                    )}
                  >
                    <select
                      value={values.dialCode}
                      onChange={(event) => handleDialCodeChange(event.target.value)}
                      className="border-r border-grey-light bg-[#EEF0F3] px-2 py-2.5 text-xs font-semibold text-navy outline-none"
                    >
                      {dialCodeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <input
                      value={values.phone}
                      onChange={(event) =>
                        setValue("phone", formatPhoneDigits(event.target.value), {
                          shouldValidate: true,
                        })
                      }
                      placeholder="700 000 000"
                      className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
                    />
                  </div>
                </Field>
                <Field label="Company / Organisation">
                  <input
                    {...register("company")}
                    placeholder="Optional"
                    className={fieldClass()}
                  />
                </Field>
              </div>
              <div className="mt-3">
                <Field
                  label="Your Country / Region"
                  required
                  error={showValidation ? errors.country?.message : undefined}
                >
                  <select
                    value={values.country}
                    onChange={(event) => handleCountryChange(event.target.value)}
                    className={fieldClass(showValidation && !!errors.country)}
                  >
                    <option value="">-- Select your country --</option>
                    {countryGroups.map((group) => (
                      <optgroup key={group.label} label={group.label}>
                        {group.countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </Field>
              </div>
            </section>

            <section>
              <h3 className="mb-3 flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-widest text-navy">
                Project Details
                <span className="h-px flex-1 bg-gradient-to-r from-gold/25 to-transparent" />
              </h3>
              <Field
                label="Service Required"
                required
                error={showValidation ? errors.service?.message : undefined}
              >
                <select
                  {...register("service")}
                  className={fieldClass(
                    showValidation && !!errors.service,
                    Boolean(prefill?.service),
                  )}
                >
                  <option value="">-- Select a service --</option>
                  {drawerServiceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Field label="Project Location">
                  <input
                    {...register("location")}
                    placeholder="e.g. Busia District"
                    className={fieldClass()}
                  />
                </Field>
                <Field label="Project Scale / Size">
                  <input
                    {...register("scale")}
                    placeholder="e.g. 3km road, 5-storey"
                    className={fieldClass()}
                  />
                </Field>
              </div>
              <div className="mt-3">
                <Field
                  label={`Estimated Budget Range (${currencyCode})`}
                >
                  <select {...register("budget")} className={fieldClass()}>
                    {budgetOptions.map((option) => (
                      <option key={`${currencyCode}-${option.label}`} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[10px] text-muted">
                    Currency set from your phone country code ({values.dialCode})
                    {values.country ? ` · ${values.country}` : ""}
                  </p>
                </Field>
              </div>
            </section>

            <section>
              <h3 className="mb-3 flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-widest text-navy">
                Additional Info
                <span className="h-px flex-1 bg-gradient-to-r from-gold/25 to-transparent" />
              </h3>
              <Field label="Project Urgency">
                <div className="flex flex-wrap gap-1.5">
                  {urgencyOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => selectUrgency(option.value)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        values.urgency === option.value
                          ? "border-gold bg-[#FBF6EC] font-semibold text-navy"
                          : "border-grey-light bg-grey-light/40 text-muted hover:border-gold/50",
                      )}
                    >
                      {option.emoji} {option.label}
                    </button>
                  ))}
                </div>
              </Field>
              <div className="mt-3">
                <Field label="Additional Notes">
                  <textarea
                    {...register("notes")}
                    rows={3}
                    placeholder="Any specific requirements, existing plans, site conditions..."
                    className={cn(fieldClass(), "resize-none")}
                  />
                </Field>
              </div>
            </section>

            {showPreview && (
              <div className="rounded-lg border border-green-200 bg-[#F0FDF4] p-3">
                <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-green-900">
                  <Eye className="h-3 w-3" />
                  Message preview — this is what the engineer receives
                </p>
                <pre className="max-h-36 overflow-y-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-green-800">
                  {previewMessage}
                </pre>
              </div>
            )}
          </form>
        </div>

        <div className="shrink-0 border-t border-grey-light bg-white px-5 py-4 md:px-6">
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={sendState === "sending"}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3.5 font-heading text-sm font-bold transition-all",
              isReady && sendState === "idle"
                ? "animate-pulse bg-whatsapp text-white shadow-lg shadow-whatsapp/30 hover:bg-whatsapp/90"
                : sendState === "sent"
                  ? "bg-navy text-white"
                  : sendState === "sending"
                    ? "bg-whatsapp text-white"
                    : "cursor-not-allowed bg-grey-light text-muted",
            )}
          >
            {sendState === "sending" && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {sendState === "sent" && <Check className="h-4 w-4" />}
            {sendState === "idle" && <MessageCircle className="h-4 w-4" />}
            {sendState === "sent"
              ? "Inquiry sent! Check WhatsApp"
              : sendState === "sending"
                ? "Opening WhatsApp..."
                : isReady
                  ? "Send Inquiry via WhatsApp"
                  : "Complete required fields to continue"}
          </button>

          {fallbackUrl && (
            <p className="mt-3 text-center text-xs text-body">
              WhatsApp didn&apos;t open automatically.{" "}
              <a
                href={fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-whatsapp hover:underline"
              >
                Tap here to open WhatsApp →
              </a>
            </p>
          )}

          <p className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted">
            <Lock className="h-3 w-3 opacity-60" />
            Your info is sent directly to WhatsApp — nothing is stored
          </p>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted">
        {label}
        {required && <span className="ml-0.5 text-gold">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-[10px] font-medium text-red-600">{error}</p>}
    </div>
  );
}

function fieldClass(hasError?: boolean, highlighted?: boolean) {
  return cn(
    "w-full rounded-lg border bg-grey-light/40 px-3 py-2.5 text-sm text-navy outline-none transition-colors",
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
      : highlighted
        ? "border-gold bg-gold/5 focus:border-gold focus:ring-2 focus:ring-gold/20"
        : "border-grey-light focus:border-gold focus:ring-2 focus:ring-gold/20",
  );
}

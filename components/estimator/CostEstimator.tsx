"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AlertTriangle, Calculator, ArrowRight } from "lucide-react";
import { services } from "@/lib/data/services";
import {
  calculateCostRange,
  extraOptions,
  regionOptions,
  scaleOptions,
  type EstimatorInput,
  type ProjectRegion,
  type ProjectScale,
} from "@/lib/estimator";
import type { ServiceCategory } from "@/lib/data/services";

export function CostEstimator() {
  const [service, setService] = useState<ServiceCategory>("road-construction");
  const [scale, setScale] = useState<ProjectScale>("medium");
  const [region, setRegion] = useState<ProjectRegion>("busia");
  const [extras, setExtras] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const input: EstimatorInput = { service, scale, region, extras };
  const result = useMemo(() => calculateCostRange(input), [service, scale, region, extras]);

  const toggleExtra = (id: string) => {
    setExtras((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const quoteUrl = `/contact?service=${service}&scale=${encodeURIComponent(
    scaleOptions.find((item) => item.id === scale)?.description ?? scale,
  )}&budget=${encodeURIComponent(result.formatted)}&source=Cost%20Estimator`;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        {[1, 2, 3, 4].map((number) => (
          <div key={number} className="flex flex-1 items-center">
            <button
              type="button"
              onClick={() => setStep(number)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                step >= number
                  ? "bg-navy text-white"
                  : "bg-grey-light text-muted"
              }`}
            >
              {number}
            </button>
            {number < 4 && (
              <div
                className={`mx-2 h-0.5 flex-1 ${
                  step > number ? "bg-navy" : "bg-grey-light"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-grey-light bg-white p-6 shadow-sm md:p-8">
        {step === 1 && (
          <div>
            <h3 className="font-heading text-xl font-semibold text-navy">
              Select Project Type
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setService(item.id);
                    setStep(2);
                  }}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    service === item.id
                      ? "border-gold bg-gold/5"
                      : "border-grey-light hover:border-gold/50"
                  }`}
                >
                  <p className="font-semibold text-navy">{item.title}</p>
                  <p className="mt-1 text-xs text-muted">{item.shortTitle}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-heading text-xl font-semibold text-navy">
              Project Scale
            </h3>
            <div className="mt-4 space-y-3">
              {scaleOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setScale(option.id);
                    setStep(3);
                  }}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    scale === option.id
                      ? "border-gold bg-gold/5"
                      : "border-grey-light hover:border-gold/50"
                  }`}
                >
                  <p className="font-semibold text-navy">{option.label}</p>
                  <p className="mt-1 text-sm text-muted">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-heading text-xl font-semibold text-navy">
              Project Region
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {regionOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setRegion(option.id);
                    setStep(4);
                  }}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    region === option.id
                      ? "border-gold bg-gold/5"
                      : "border-grey-light hover:border-gold/50"
                  }`}
                >
                  <p className="font-semibold text-navy">{option.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="font-heading text-xl font-semibold text-navy">
              Additional Requirements
            </h3>
            <div className="mt-4 space-y-3">
              {extraOptions.map((option) => (
                <label
                  key={option.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-grey-light p-4"
                >
                  <input
                    type="checkbox"
                    checked={extras.includes(option.id)}
                    onChange={() => toggleExtra(option.id)}
                    className="h-4 w-4 accent-gold"
                  />
                  <span className="text-sm text-body">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 rounded-xl bg-navy p-6 text-white">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-gold" />
            <h3 className="font-heading text-lg font-semibold">
              Estimated Cost Range
            </h3>
          </div>
          <p className="mt-3 font-heading text-3xl font-bold text-gold">
            {result.formatted}
          </p>
          <p className="mt-2 text-sm text-white/70">
            Indicative range for{" "}
            {services.find((item) => item.id === service)?.title} in{" "}
            {regionOptions.find((item) => item.id === region)?.label}
          </p>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg border border-gold/30 bg-gold/5 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p className="text-xs leading-relaxed text-muted">
            This is an indicative estimate only. A formal quote requires a site
            visit and detailed scope assessment by our engineering team.
          </p>
        </div>

        <Link
          href={quoteUrl}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-whatsapp px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-whatsapp/90 sm:w-auto"
        >
          Get Formal Quote
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

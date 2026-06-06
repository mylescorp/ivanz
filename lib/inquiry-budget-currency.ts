export interface BudgetOption {
  value: string;
  label: string;
}

interface CurrencyProfile {
  code: string;
  /** Approximate local currency units per 1 USD */
  perUsd: number;
}

const currencyProfiles: Record<string, CurrencyProfile> = {
  UGX: { code: "UGX", perUsd: 3_700 },
  KES: { code: "KES", perUsd: 130 },
  TZS: { code: "TZS", perUsd: 2_500 },
  RWF: { code: "RWF", perUsd: 1_300 },
  BIF: { code: "BIF", perUsd: 2_850 },
  CDF: { code: "CDF", perUsd: 2_800 },
  ETB: { code: "ETB", perUsd: 57 },
  GHS: { code: "GHS", perUsd: 15 },
  NGN: { code: "NGN", perUsd: 1_500 },
  ZAR: { code: "ZAR", perUsd: 18 },
  GBP: { code: "GBP", perUsd: 0.79 },
  USD: { code: "USD", perUsd: 1 },
  AED: { code: "AED", perUsd: 3.67 },
  EUR: { code: "EUR", perUsd: 0.92 },
  CNY: { code: "CNY", perUsd: 7.2 },
  INR: { code: "INR", perUsd: 83 },
  EGP: { code: "EGP", perUsd: 48 },
  SAR: { code: "SAR", perUsd: 3.75 },
  ZMW: { code: "ZMW", perUsd: 27 },
  MZN: { code: "MZN", perUsd: 64 },
  XOF: { code: "XOF", perUsd: 600 },
};

/** USD tier anchors (same project scale across regions) */
const USD_TIERS = [
  { upTo: 2_700, suffix: "low" },
  { upTo: 13_500, suffix: "mid" },
  { upTo: 54_000, suffix: "high" },
  { upTo: 135_000, suffix: "xl" },
] as const;

export const dialCodeToCountry: Record<string, string> = {
  "+256": "Uganda",
  "+254": "Kenya",
  "+255": "Tanzania",
  "+250": "Rwanda",
  "+257": "Burundi",
  "+243": "DR Congo",
  "+211": "South Sudan",
  "+251": "Ethiopia",
  "+233": "Ghana",
  "+234": "Nigeria",
  "+27": "South Africa",
  "+44": "United Kingdom",
  "+1": "United States",
  "+971": "UAE",
  "+49": "Germany",
  "+86": "China",
  "+91": "India",
};

export const countryToDialCode: Record<string, string> = {
  Uganda: "+256",
  Kenya: "+254",
  Tanzania: "+255",
  Rwanda: "+250",
  Burundi: "+257",
  "DR Congo": "+243",
  "South Sudan": "+211",
  Ethiopia: "+251",
  Ghana: "+233",
  Nigeria: "+234",
  "South Africa": "+27",
  "United Kingdom": "+44",
  "United States": "+1",
  Canada: "+1",
  UAE: "+971",
  Germany: "+49",
  China: "+86",
  India: "+91",
};

const countryToCurrency: Record<string, string> = {
  Uganda: "UGX",
  Kenya: "KES",
  Tanzania: "TZS",
  Rwanda: "RWF",
  Burundi: "BIF",
  "DR Congo": "CDF",
  "South Sudan": "USD",
  Ethiopia: "ETB",
  Ghana: "GHS",
  Nigeria: "NGN",
  "South Africa": "ZAR",
  Senegal: "XOF",
  "Ivory Coast": "XOF",
  Zambia: "ZMW",
  Zimbabwe: "USD",
  Mozambique: "MZN",
  Egypt: "EGP",
  UAE: "AED",
  "Saudi Arabia": "SAR",
  "United Kingdom": "GBP",
  "United States": "USD",
  Germany: "EUR",
  Canada: "USD",
  China: "CNY",
  India: "INR",
  Other: "USD",
};

const dialCodeToCurrency: Record<string, string> = {
  "+256": "UGX",
  "+254": "KES",
  "+255": "TZS",
  "+250": "RWF",
  "+257": "BIF",
  "+243": "CDF",
  "+211": "USD",
  "+251": "ETB",
  "+233": "GHS",
  "+234": "NGN",
  "+27": "ZAR",
  "+44": "GBP",
  "+1": "USD",
  "+971": "AED",
  "+49": "EUR",
  "+86": "CNY",
  "+91": "INR",
};

function formatLocalAmount(amount: number, code: string): string {
  if (code === "UGX" || code === "TZS" || code === "RWF" || code === "NGN" || code === "XOF") {
    if (amount >= 1_000_000) {
      const millions = amount / 1_000_000;
      return millions >= 10
        ? `${Math.round(millions)}M`
        : `${millions.toFixed(millions >= 1 ? 0 : 1)}M`;
    }
    if (amount >= 1_000) return `${Math.round(amount / 1_000)}K`;
    return Math.round(amount).toString();
  }

  if (code === "KES" || code === "GHS" || code === "ZAR" || code === "AED" || code === "SAR") {
    if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `${Math.round(amount / 1_000)}K`;
    return Math.round(amount).toString();
  }

  if (code === "USD" || code === "GBP" || code === "EUR") {
    if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K`;
    return Math.round(amount).toString();
  }

  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 10_000) return `${Math.round(amount / 1_000)}K`;
  return Math.round(amount).toLocaleString();
}

function formatUsd(amount: number): string {
  if (amount >= 1_000) return `$${Math.round(amount / 1_000)}K`;
  return `$${Math.round(amount).toLocaleString()}`;
}

function toLocal(usd: number, profile: CurrencyProfile): number {
  return usd * profile.perUsd;
}

export function resolveCurrencyCode(dialCode: string, country: string): string {
  if (dialCode && dialCodeToCurrency[dialCode]) {
    return dialCodeToCurrency[dialCode];
  }
  if (country && countryToCurrency[country]) {
    return countryToCurrency[country];
  }
  return "UGX";
}

export function getCountryForDialCode(dialCode: string): string | undefined {
  return dialCodeToCountry[dialCode];
}

export function getDialCodeForCountry(country: string): string | undefined {
  return countryToDialCode[country];
}

export function getBudgetOptionsForCurrency(currencyCode: string): BudgetOption[] {
  const profile = currencyProfiles[currencyCode] ?? currencyProfiles.USD;
  const code = profile.code;

  const t1 = toLocal(USD_TIERS[0].upTo, profile);
  const t2Low = toLocal(USD_TIERS[0].upTo, profile);
  const t2High = toLocal(USD_TIERS[1].upTo, profile);
  const t3Low = toLocal(USD_TIERS[1].upTo, profile);
  const t3High = toLocal(USD_TIERS[2].upTo, profile);
  const t4Low = toLocal(USD_TIERS[2].upTo, profile);
  const t4High = toLocal(USD_TIERS[3].upTo, profile);
  const t5 = toLocal(USD_TIERS[3].upTo, profile);

  const below = `Below ${code} ${formatLocalAmount(t1, code)}`;
  const range1 = `${code} ${formatLocalAmount(t2Low, code)} – ${formatLocalAmount(t2High, code)}`;
  const range2 = `${code} ${formatLocalAmount(t3Low, code)} – ${formatLocalAmount(t3High, code)}`;
  const range3 = `${code} ${formatLocalAmount(t4Low, code)} – ${formatLocalAmount(t4High, code)}`;
  const above = `Above ${code} ${formatLocalAmount(t5, code)}`;

  return [
    { value: "", label: `-- Select budget range (${code}) --` },
    {
      value: below,
      label: `${below} (approx. ${formatUsd(USD_TIERS[0].upTo)})`,
    },
    {
      value: range1,
      label: `${range1} (${formatUsd(USD_TIERS[0].upTo)} – ${formatUsd(USD_TIERS[1].upTo)})`,
    },
    {
      value: range2,
      label: `${range2} (${formatUsd(USD_TIERS[1].upTo)} – ${formatUsd(USD_TIERS[2].upTo)})`,
    },
    {
      value: range3,
      label: `${range3} (${formatUsd(USD_TIERS[2].upTo)} – ${formatUsd(USD_TIERS[3].upTo)})`,
    },
    {
      value: above,
      label: `${above} (${formatUsd(USD_TIERS[3].upTo)}+)`,
    },
    { value: "Not Sure", label: "Not Sure — need guidance" },
  ];
}

export function budgetMatchesCurrency(
  budget: string,
  currencyCode: string | undefined,
): boolean {
  if (!budget || budget === "Not Sure") return true;
  if (!currencyCode) return true;
  const profile = currencyProfiles[currencyCode] ?? currencyProfiles.USD;
  return budget.includes(profile.code);
}

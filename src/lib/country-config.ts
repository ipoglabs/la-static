/**
 * country-config.ts — Global per-country configuration for the entire app.
 *
 * HOW TO USE:
 *   import { COUNTRY_CONFIGS } from "@/lib/country-config";
 *   const config = COUNTRY_CONFIGS["in"];
 *
 * HOW TO ADD A NEW COUNTRY:
 *   1. Add the country code to CountryCode type  →  "au" | "my" | ...
 *   2. Add a new entry to COUNTRY_CONFIGS        →  au: { ... }
 *   TypeScript will error on any missing required field — that's intentional.
 *
 * HOW TO ADD A NEW FEATURE FLAG:
 *   1. Add the flag to the `features` block in CountryConfig
 *   2. TypeScript will immediately error on every country missing the new flag
 *   3. Make a deliberate true/false decision per country — no accidental defaults
 *
 * SCALING NOTE:
 *   When this file grows beyond ~100 lines, split into:
 *     lib/config/types.ts
 *     lib/config/countries/in.ts
 *     lib/config/countries/uk.ts
 *     lib/config/index.ts   ← re-export COUNTRY_CONFIGS from here
 *   The import path (@/lib/country-config) can remain unchanged via barrel.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type CountryCode = "in" | "uk" | "sg";

export interface CountryFeatures {
  /**
   * Show / hide the donation banner in the app footer.
   * Set true only for countries where donation campaigns are active.
   */
  donationFooter: boolean;

  // ── Add future flags below ─────────────────────────────────────────────────
  // payments: boolean;
  // premiumListings: boolean;
  // chat: boolean;
}

// ─── Global defaults — apply to ALL countries unless overridden ───────────────

export const GLOBAL_CONFIG = {
  /** Default date format used across all countries */
  dateFormat: "DD/MM/YYYY",

  /**
   * Default feature flags — apply to ALL countries unless overridden.
   * Override per country by setting features: { ... } in COUNTRY_CONFIGS.
   */
  features: {
    donationFooter: true,

    // ── Add future global feature defaults below ───────────────────────────
    // payments: false,
    // premiumListings: false,
    // chat: false,
  },

  // ── Add more global defaults below ────────────────────────────────────────
  // timezone: "UTC",
};

// ─── Country config — country-specific values + optional overrides ────────────

export interface CountryConfig {
  /**
   * Country-specific locale values — currency, region rules, overrides.
   * countryCode / countryLabel are identity fields — pass them dynamically
   * from context/session, not from this config.
   */

  /** Currency code (ISO 4217) e.g. "INR", "GBP", "SGD" */
  currency: string;

  /** Currency symbol e.g. "₹", "£", "$" */
  currencySymbol: string;

  /** Legal entity name for this country e.g. "Lokalads India Pvt. Ltd." */
  companyName: string;

  /** Company registration number for this country */
  companyRegNo: string;

  /**
   * Override date format for this country only.
   * If omitted, GLOBAL_CONFIG.dateFormat is used.
   */
  dateFormat?: string;

  // ── Add future locale overrides below ────────────────────────────────────
  // locale?: string;         // e.g. "en-IN", "en-GB", "en-SG"
  // timezone?: string;       // e.g. "Asia/Kolkata", "Europe/London"
  // phonePrefix?: string;    // e.g. "+91", "+44", "+65"

  /**
   * Override feature flags for this country only.
   * If omitted, GLOBAL_CONFIG.features is used.
   * Only specify flags that differ from the global default.
   */
  features?: Partial<CountryFeatures>;

  // ── Add future config namespaces below ────────────────────────────────────
  // footer?: FooterConfig;
  // header?: HeaderConfig;
  // payments?: PaymentsConfig;
}

// ─── Country configs ──────────────────────────────────────────────────────────

export const COUNTRY_CONFIGS: Record<CountryCode, CountryConfig> = {

  in: {
    currency: "INR",
    currencySymbol: "₹",
    companyName: "Lokalads India Pvt. Ltd.",
    companyRegNo: "U74999KA2020PTC123456",
    // dateFormat not set — uses GLOBAL_CONFIG.dateFormat
    features: {
      donationFooter: true, // override — India has active donation campaign
    },
  },

  uk: {
    currency: "GBP",
    currencySymbol: "£",
    companyName: "Lokalads UK Ltd.",
    companyRegNo: "12345678",
    dateFormat: "MM/DD/YYYY", // override example — UK uses different format
    // features not set — uses GLOBAL_CONFIG.features
  },

  sg: {
    currency: "SGD",
    currencySymbol: "S$",
    companyName: "Lokalads Singapore Pte. Ltd.",
    companyRegNo: "202012345G",
    // dateFormat not set — uses GLOBAL_CONFIG.dateFormat
    // features not set — uses GLOBAL_CONFIG.features
  },

};

// ─── Helper ───────────────────────────────────────────────────────────────────

/** Returns the effective date format — country override or global default */
export function getDateFormat(code: CountryCode): string {
  return COUNTRY_CONFIGS[code].dateFormat ?? GLOBAL_CONFIG.dateFormat;
}

/** Returns the effective feature flags — merges global defaults with country overrides */
export function getFeatures(code: CountryCode): CountryFeatures {
  return { ...GLOBAL_CONFIG.features, ...(COUNTRY_CONFIGS[code]?.features ?? {}) };
}

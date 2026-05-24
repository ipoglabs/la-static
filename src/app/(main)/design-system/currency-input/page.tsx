"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type CurrencyCode = "USD" | "EUR" | "GBP" | "INR" | "JPY" | "AUD" | "SGD";

type RuleState = "idle" | "pass" | "fail";

interface CurrencyOption {
  code: CurrencyCode;
  flag: string;
  label: string;
  symbol: string;
  decimals: number;
}

interface FieldValidation {
  status: "idle" | "ok" | "error" | "warning";
  message: string;
}

interface AllRules {
  nonempty: RuleState;
  positive: RuleState;
  integer: RuleState;
  minmax: RuleState;
  ceiling: RuleState;
  gap: RuleState;
  samecur: RuleState;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CURRENCIES: CurrencyOption[] = [
  { code: "USD", flag: "🇺🇸", label: "US Dollar",         symbol: "$",  decimals: 2 },
  { code: "EUR", flag: "🇪🇺", label: "Euro",               symbol: "€",  decimals: 2 },
  { code: "GBP", flag: "🇬🇧", label: "British Pound",      symbol: "£",  decimals: 2 },
  { code: "INR", flag: "🇮🇳", label: "Indian Rupee",       symbol: "₹",  decimals: 2 },
  { code: "JPY", flag: "🇯🇵", label: "Japanese Yen",       symbol: "¥",  decimals: 0 },
  { code: "AUD", flag: "🇦🇺", label: "Australian Dollar",  symbol: "A$", decimals: 2 },
  { code: "SGD", flag: "🇸🇬", label: "Singapore Dollar",   symbol: "S$", decimals: 2 },
];

const RATES: Record<CurrencyCode, Record<CurrencyCode, number>> = {
  USD: { USD: 1,      EUR: 0.92,   GBP: 0.79,   INR: 83.12,  JPY: 149.5,  AUD: 1.53,  SGD: 1.35  },
  EUR: { USD: 1.09,   EUR: 1,      GBP: 0.86,   INR: 90.5,   JPY: 162.8,  AUD: 1.66,  SGD: 1.47  },
  GBP: { USD: 1.27,   EUR: 1.16,  GBP: 1,       INR: 105.2,  JPY: 189.3,  AUD: 1.94,  SGD: 1.71  },
  INR: { USD: 0.012,  EUR: 0.011, GBP: 0.0095,  INR: 1,      JPY: 1.80,   AUD: 0.018, SGD: 0.016 },
  JPY: { USD: 0.0067, EUR: 0.0061, GBP: 0.0053, INR: 0.556,  JPY: 1,      AUD: 0.010, SGD: 0.009 },
  AUD: { USD: 0.654,  EUR: 0.601,  GBP: 0.516,  INR: 54.3,   JPY: 97.7,   AUD: 1,     SGD: 0.88  },
  SGD: { USD: 0.74,   EUR: 0.68,   GBP: 0.58,   INR: 61.5,   JPY: 110.7,  AUD: 1.13,  SGD: 1     },
};

const MAX_VALUE = 1_000_000_000_000_000; // 1 quadrillion

const RULE_LABELS: Record<keyof AllRules, string> = {
  nonempty: "At least one value entered",
  positive:  "Values must be greater than 0",
  integer:   "Whole numbers only (no decimals)",
  minmax:    "Max must be greater than min",
  ceiling:   "Cannot exceed 1,000,000,000,000,000",
  gap:       "Min and max must differ by at least 1",
  samecur:   "Both fields use the same currency",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseRaw(str: string): number {
  return parseInt(str.replace(/,/g, ""), 10) || 0;
}

function fmtCommas(str: string): string {
  const n = parseInt(str.replace(/,/g, ""), 10);
  return isNaN(n) ? "" : n.toLocaleString("en-US");
}

function abbrev(n: number): string {
  if (!n || n === 0) return "";
  if (n >= 1e15) return (n / 1e15).toFixed(3).replace(/\.?0+$/, "") + " quadrillion";
  if (n >= 1e12) return (n / 1e12).toFixed(2).replace(/\.?0+$/, "") + " trillion";
  if (n >= 1e9)  return (n / 1e9).toFixed(2).replace(/\.?0+$/, "")  + " billion";
  if (n >= 1e6)  return (n / 1e6).toFixed(2).replace(/\.?0+$/, "")  + " million";
  if (n >= 1e3)  return (n / 1e3).toFixed(1).replace(/\.?0+$/, "")  + " thousand";
  return "";
}

function formatCurrency(amount: number, currency: CurrencyCode): string {
  const cur = CURRENCIES.find((c) => c.code === currency)!;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: cur.decimals,
    maximumFractionDigits: cur.decimals,
  }).format(amount);
}

function computeRules(
  minRaw: string,
  maxRaw: string,
  minCur: CurrencyCode,
  maxCur: CurrencyCode
): AllRules {
  const minStr = minRaw.replace(/,/g, "");
  const maxStr = maxRaw.replace(/,/g, "");
  const minSet = minStr.trim() !== "";
  const maxSet = maxStr.trim() !== "";
  const anySet = minSet || maxSet;
  const bothSet = minSet && maxSet;
  const minVal = parseInt(minStr, 10) || 0;
  const maxVal = parseInt(maxStr, 10) || 0;

  const minDecimal = minStr.includes(".");
  const maxDecimal = maxStr.includes(".");
  const minNeg = minSet && minVal <= 0;
  const maxNeg = maxSet && maxVal <= 0;
  const minOver = minSet && minVal > MAX_VALUE;
  const maxOver = maxSet && maxVal > MAX_VALUE;

  return {
    nonempty: anySet ? "pass" : "idle",
    positive: !anySet ? "idle" : (minNeg || maxNeg) ? "fail" : "pass",
    integer:  !anySet ? "idle" : (minDecimal || maxDecimal) ? "fail" : "pass",
    minmax:   !bothSet ? "idle" : maxVal <= minVal ? "fail" : "pass",
    ceiling:  !anySet ? "idle" : (minOver || maxOver) ? "fail" : "pass",
    gap:      !bothSet ? "idle" : (maxVal - minVal) < 1 ? "fail" : "pass",
    samecur:  minCur === maxCur ? "pass" : "fail",
  };
}

function computeFieldValidation(
  raw: string,
  otherRaw: string,
  isMax: boolean,
  touched: boolean,
  sameCurrency: boolean
): FieldValidation {
  if (!touched) return { status: "idle", message: "" };
  const str = raw.replace(/,/g, "");
  const otherStr = otherRaw.replace(/,/g, "");
  if (!str) return { status: "idle", message: "" };

  const val = parseInt(str, 10) || 0;
  const otherVal = parseInt(otherStr, 10) || 0;

  if (str.includes("."))       return { status: "error",   message: "Whole numbers only" };
  if (val <= 0)                return { status: "error",   message: "Must be greater than 0" };
  if (val > MAX_VALUE)         return { status: "error",   message: "Exceeds maximum limit" };
  if (!sameCurrency)           return { status: "error",   message: "Currency mismatch" };

  const otherSet = otherStr.trim() !== "";
  if (isMax && otherSet) {
    if (val <= otherVal)       return { status: "error",   message: "Must be greater than min" };
    if (val - otherVal < 1)    return { status: "warning", message: "Difference too small" };
  }
  if (!isMax && otherSet) {
    if (otherVal <= val)       return { status: "error",   message: "Must be less than max" };
  }

  return { status: "ok", message: "Valid" };
}

function isFormValid(rules: AllRules): boolean {
  const vals = Object.values(rules);
  return vals.includes("pass") && !vals.includes("fail");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RuleRow({ state, label }: { state: RuleState; label: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs py-1 transition-colors duration-200",
        state === "pass" && "text-green-600 dark:text-green-400",
        state === "fail" && "text-destructive",
        state === "idle" && "text-muted-foreground"
      )}
    >
      {state === "pass" ? (
        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
      ) : state === "fail" ? (
        <XCircle className="h-3.5 w-3.5 shrink-0" />
      ) : (
        <Circle className="h-3.5 w-3.5 shrink-0" />
      )}
      <span>{label}</span>
    </div>
  );
}

interface PriceFieldProps {
  label: string;
  value: string;
  hint: string;
  validation: FieldValidation;
  currency: CurrencyCode;
  onValueChange: (val: string) => void;
  onCurrencyChange: (val: CurrencyCode) => void;
  onBlur: () => void;
  placeholder?: string;
}

function PriceField({
  label,
  value,
  hint,
  validation,
  currency,
  onValueChange,
  onCurrencyChange,
  onBlur,
  placeholder = "0",
}: PriceFieldProps) {
  const cur = CURRENCIES.find((c) => c.code === currency)!;

  const borderClass =
    validation.status === "error"
      ? "border-destructive"
      : validation.status === "ok"
      ? "border-green-500"
      : validation.status === "warning"
      ? "border-yellow-400"
      : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring";

  return (
    <div className="flex-1 min-w-0 space-y-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div
        className={cn(
          "flex flex-col rounded-lg border bg-background overflow-hidden transition-colors",
          borderClass
        )}
      >
        {/* Currency selector row */}
        <Select value={currency} onValueChange={(v) => onCurrencyChange(v as CurrencyCode)}>
          <SelectTrigger className="rounded-none border-0 border-b bg-muted/40 focus:ring-0 focus:ring-offset-0 h-9 text-sm font-medium">
            <SelectValue>
              <span className="flex items-center gap-1.5">
                <span>{cur.flag}</span>
                <span>{cur.symbol} {cur.code}</span>
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {CURRENCIES.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                <span className="flex items-center gap-2">
                  <span>{c.flag}</span>
                  <span className="font-medium">{c.symbol} {c.code}</span>
                  <span className="text-muted-foreground text-xs">{c.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Number input */}
        <input
          type="text"
          inputMode="numeric"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            onValueChange(raw);
          }}
          onFocus={(e) => {
            e.target.value = e.target.value.replace(/,/g, "");
            onValueChange(e.target.value);
          }}
          onBlur={(e) => {
            if (e.target.value) {
              onValueChange(fmtCommas(e.target.value));
            }
            onBlur();
          }}
          className="border-0 outline-none bg-transparent text-sm font-semibold px-3 py-2.5 w-full text-right tabular-nums placeholder:text-muted-foreground/50 placeholder:font-normal"
          aria-label={label}
        />

        {/* Abbreviation hint */}
        <div className="px-3 pb-2 min-h-[18px]">
          {hint && (
            <span className="text-[11px] text-muted-foreground">{hint}</span>
          )}
        </div>

        {/* Field status */}
        <div className="px-3 pb-2 min-h-[18px]">
          {validation.status === "ok" && (
            <span className="flex items-center gap-1 text-[11px] text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-3 w-3" /> {validation.message}
            </span>
          )}
          {validation.status === "error" && (
            <span className="flex items-center gap-1 text-[11px] text-destructive">
              <XCircle className="h-3 w-3" /> {validation.message}
            </span>
          )}
          {validation.status === "warning" && (
            <span className="flex items-center gap-1 text-[11px] text-yellow-600 dark:text-yellow-400">
              <AlertCircle className="h-3 w-3" /> {validation.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CurrencyInput() {
  // ── Price range state ────────────────────────────────────────────────────────
  const [minRaw, setMinRaw]         = useState<string>("");
  const [maxRaw, setMaxRaw]         = useState<string>("");
  const [minCurrency, setMinCurrency] = useState<CurrencyCode>("SGD");
  const [maxCurrency, setMaxCurrency] = useState<CurrencyCode>("SGD");
  const [minTouched, setMinTouched] = useState(false);
  const [maxTouched, setMaxTouched] = useState(false);
  const [priceOpen, setPriceOpen]   = useState(true);

  // ── Converter state (kept from original) ────────────────────────────────────
  const [convertFrom, setConvertFrom] = useState<CurrencyCode>("USD");
  const [convertTo, setConvertTo]     = useState<CurrencyCode>("INR");
  const [converterOpen, setConverterOpen] = useState(true);

  // ── Mode ─────────────────────────────────────────────────────────────────────
  const [mode, setMode] = useState<"buy" | "rent">("buy");

  // ── Derived: price range ─────────────────────────────────────────────────────
  const sameCurrency = minCurrency === maxCurrency;
  const minVal = parseRaw(minRaw);
  const maxVal = parseRaw(maxRaw);

  const minHint = abbrev(parseRaw(minRaw.replace(/,/g, "")));
  const maxHint = abbrev(parseRaw(maxRaw.replace(/,/g, "")));

  const rules = computeRules(minRaw, maxRaw, minCurrency, maxCurrency);
  const valid = isFormValid(rules);

  const minValidation = computeFieldValidation(minRaw, maxRaw, false, minTouched, sameCurrency);
  const maxValidation = computeFieldValidation(maxRaw, minRaw, true,  maxTouched, sameCurrency);

  const globalError = (() => {
    if (!minTouched && !maxTouched) return null;
    if (rules.samecur === "fail") return "Min and max must use the same currency";
    if (rules.ceiling === "fail") return "A value exceeds the maximum of 1,000,000,000,000,000";
    if (rules.minmax === "fail")  return "Max must be greater than min";
    if (rules.gap === "fail")     return "Min and max must differ by at least 1";
    if (rules.positive === "fail") return "Values must be greater than 0";
    if (rules.integer === "fail")  return "Whole numbers only — no decimal points";
    return null;
  })();

  const priceDotActive = valid && (minRaw !== "" || maxRaw !== "");

  // ── Derived: converter ───────────────────────────────────────────────────────
  const rate      = RATES[convertFrom][convertTo];
  const fromCur   = CURRENCIES.find((c) => c.code === convertFrom)!;
  const toCur     = CURRENCIES.find((c) => c.code === convertTo)!;

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    setMinRaw(""); setMaxRaw("");
    setMinTouched(false); setMaxTouched(false);
    setMinCurrency("SGD"); setMaxCurrency("SGD");
    setMode("buy");
  }, []);

  const handleSwap = useCallback(() => {
    setConvertFrom(convertTo);
    setConvertTo(convertFrom);
  }, [convertFrom, convertTo]);

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-md mx-auto space-y-0 rounded-2xl border bg-background overflow-hidden shadow-sm">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b">
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <span className="text-base font-medium">Filters</span>
        <button
          type="button"
          onClick={handleReset}
          className="text-sm text-muted-foreground bg-muted rounded-full px-3.5 py-1.5 hover:text-foreground transition-colors"
        >
          Reset
        </button>
      </div>

      {/* ── Buy / Rent toggle ── */}
      <div className="flex gap-2 px-4 py-3.5 border-b">
        {(["buy", "rent"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={cn(
              "px-5 py-2 rounded-full text-sm transition-all",
              mode === m
                ? "bg-foreground text-background"
                : "border text-muted-foreground hover:text-foreground"
            )}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Price section ── */}
      <div className="border-b">
        <button
          type="button"
          onClick={() => setPriceOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Price</span>
            {priceDotActive && (
              <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
            )}
          </div>
          {priceOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </button>

        {priceOpen && (
          <div className="px-4 pb-4 space-y-3">
            {/* Min / Max fields */}
            <div className="flex gap-2.5">
              <PriceField
                label="Minimum"
                value={minRaw}
                hint={minHint}
                validation={minValidation}
                currency={minCurrency}
                onValueChange={setMinRaw}
                onCurrencyChange={setMinCurrency}
                onBlur={() => setMinTouched(true)}
                placeholder="0"
              />
              <PriceField
                label="Maximum"
                value={maxRaw}
                hint={maxHint}
                validation={maxValidation}
                currency={maxCurrency}
                onValueChange={setMaxRaw}
                onCurrencyChange={setMaxCurrency}
                onBlur={() => setMaxTouched(true)}
                placeholder="1,000,000,000,000,000"
              />
            </div>

            {/* Global error banner */}
            {globalError && (
              <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{globalError}</span>
              </div>
            )}

            {/* Validation rules checklist */}
            <div className="rounded-lg bg-muted/40 border px-3 py-2.5 space-y-0.5">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Validation rules
              </p>
              {(Object.keys(RULE_LABELS) as (keyof AllRules)[]).map((key) => (
                <RuleRow key={key} state={rules[key]} label={RULE_LABELS[key]} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Currency converter section ── */}
      <div className="border-b">
        <button
          type="button"
          onClick={() => setConverterOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/30 transition-colors"
        >
          <span className="text-sm font-medium">Currency converter</span>
          {converterOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </button>

        {converterOpen && (
          <div className="px-4 pb-4 space-y-3">
            {/* From / To selectors */}
            <div className="flex items-center gap-2">
              <div className="flex-1 space-y-1">
                <Label className="text-xs text-muted-foreground">From</Label>
                <Select value={convertFrom} onValueChange={(v) => setConvertFrom(v as CurrencyCode)}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue>
                      <span className="flex items-center gap-1.5">
                        {fromCur.flag} {convertFrom}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        <span className="flex items-center gap-2">
                          {c.flag}
                          <span className="font-medium">{c.code}</span>
                          <span className="text-muted-foreground text-xs">{c.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <button
                type="button"
                onClick={handleSwap}
                className="mt-5 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
                aria-label="Swap currencies"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>

              <div className="flex-1 space-y-1">
                <Label className="text-xs text-muted-foreground">To</Label>
                <Select value={convertTo} onValueChange={(v) => setConvertTo(v as CurrencyCode)}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue>
                      <span className="flex items-center gap-1.5">
                        {toCur.flag} {convertTo}
                      </span>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.filter((c) => c.code !== convertFrom).map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        <span className="flex items-center gap-2">
                          {c.flag}
                          <span className="font-medium">{c.code}</span>
                          <span className="text-muted-foreground text-xs">{c.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Conversion result card */}
            <div
              className="rounded-lg border bg-muted/30 p-3.5 space-y-2.5"
              aria-live="polite"
              aria-atomic="true"
            >
              {/* Min converted */}
              {minVal > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Min ({minCurrency})</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {fromCur.symbol}{formatCurrency(minVal, convertFrom)}
                    </span>
                    <span className="text-xs text-muted-foreground">→</span>
                    <span className="text-sm font-semibold tabular-nums">
                      {toCur.symbol}{formatCurrency(minVal * RATES[convertFrom][convertTo], convertTo)}
                    </span>
                  </div>
                </div>
              )}

              {/* Max converted */}
              {maxVal > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Max ({maxCurrency})</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {fromCur.symbol}{formatCurrency(maxVal, convertFrom)}
                    </span>
                    <span className="text-xs text-muted-foreground">→</span>
                    <span className="text-sm font-semibold tabular-nums">
                      {toCur.symbol}{formatCurrency(maxVal * RATES[convertFrom][convertTo], convertTo)}
                    </span>
                  </div>
                </div>
              )}

              {minVal === 0 && maxVal === 0 && (
                <p className="text-xs text-muted-foreground text-center py-1">
                  Enter a price to see conversion
                </p>
              )}

              {/* Rate row */}
              <div className="pt-2 border-t flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  1 {convertFrom} = {toCur.symbol}{rate.toFixed(4)} {convertTo}
                </span>
                <Badge variant="secondary" className="gap-1 text-[10px] h-5">
                  <TrendingUp className="h-2.5 w-2.5" />
                  Live rate
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Show results CTA ── */}
      <div className="px-4 py-4">
        <button
          type="button"
          disabled={!valid && (minTouched || maxTouched) && (minRaw !== "" || maxRaw !== "")}
          className={cn(
            "w-full py-3.5 rounded-xl text-sm font-medium transition-all",
            valid || (!minTouched && !maxTouched) || (minRaw === "" && maxRaw === "")
              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
        >
          Show 35 properties
        </button>
      </div>

    </div>
  );
}
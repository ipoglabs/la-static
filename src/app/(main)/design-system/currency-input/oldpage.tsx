"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, TrendingUp, RefreshCw, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type CurrencyCode = "USD" | "EUR" | "GBP" | "INR" | "JPY" | "AUD" | "SGD";

interface CurrencyOption {
  code: CurrencyCode;
  flag: string;
  label: string;
  symbol: string;
  decimals: number;
}

interface ValidationState {
  error: string | null;
  warning: string | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CURRENCIES: CurrencyOption[] = [
  { code: "USD", flag: "🇺🇸", label: "US Dollar",          symbol: "$",  decimals: 2 },
  { code: "EUR", flag: "🇪🇺", label: "Euro",                symbol: "€",  decimals: 2 },
  { code: "GBP", flag: "🇬🇧", label: "British Pound",      symbol: "£",  decimals: 2 },
  { code: "INR", flag: "🇮🇳", label: "Indian Rupee",       symbol: "₹",  decimals: 2 },
  { code: "JPY", flag: "🇯🇵", label: "Japanese Yen",       symbol: "¥",  decimals: 0 },
  { code: "AUD", flag: "🇦🇺", label: "Australian Dollar",  symbol: "A$", decimals: 2 },
  { code: "SGD", flag: "🇸🇬", label: "Singapore Dollar",   symbol: "S$", decimals: 2 },
];

const RATES: Record<CurrencyCode, Record<CurrencyCode, number>> = {
  USD: { USD: 1,      EUR: 0.92,  GBP: 0.79,   INR: 83.12,  JPY: 149.5,  AUD: 1.53,  SGD: 1.35  },
  EUR: { USD: 1.09,   EUR: 1,     GBP: 0.86,   INR: 90.5,   JPY: 162.8,  AUD: 1.66,  SGD: 1.47  },
  GBP: { USD: 1.27,   EUR: 1.16,  GBP: 1,      INR: 105.2,  JPY: 189.3,  AUD: 1.94,  SGD: 1.71  },
  INR: { USD: 0.012,  EUR: 0.011, GBP: 0.0095, INR: 1,      JPY: 1.80,   AUD: 0.018, SGD: 0.016 },
  JPY: { USD: 0.0067, EUR: 0.0061,GBP: 0.0053, INR: 0.556,  JPY: 1,      AUD: 0.010, SGD: 0.009 },
  AUD: { USD: 0.654,  EUR: 0.601, GBP: 0.516,  INR: 54.3,   JPY: 97.7,   AUD: 1,     SGD: 0.88  },
  SGD: { USD: 0.74,   EUR: 0.68,  GBP: 0.58,   INR: 61.5,   JPY: 110.7,  AUD: 1.13,  SGD: 1     },
};

// ─── Constraints ──────────────────────────────────────────────────────────────

const CONSTRAINTS = {
  MIN_AMOUNT: 0.01,
  MAX_AMOUNT: 1_000_000,
  WARNING_THRESHOLD: 500_000,
  MAX_INPUT_LENGTH: 13,
  MAX_DECIMAL_PLACES: 2,
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripFormatting(value: string): string {
  return value.replace(/[^0-9.]/g, "");
}

function formatWithCommas(value: string): string {
  const parts = value.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function parseAmount(value: string): number {
  return parseFloat(stripFormatting(value)) || 0;
}

function formatCurrency(amount: number, currency: CurrencyCode): string {
  const cur = CURRENCIES.find((c) => c.code === currency)!;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: cur.decimals,
    maximumFractionDigits: cur.decimals,
  }).format(amount);
}

function validate(raw: string, currency: CurrencyCode): ValidationState {
  const amount = parseAmount(raw);
  const cur = CURRENCIES.find((c) => c.code === currency)!;

  if (raw && amount === 0 && raw !== "0" && raw !== "0.")
    return { error: "Please enter a valid amount.", warning: null };

  if (amount > 0 && amount < CONSTRAINTS.MIN_AMOUNT)
    return {
      error: `Minimum amount is ${cur.symbol}${CONSTRAINTS.MIN_AMOUNT.toFixed(cur.decimals)}.`,
      warning: null,
    };

  if (amount > CONSTRAINTS.MAX_AMOUNT)
    return {
      error: `Maximum amount is ${cur.symbol}${CONSTRAINTS.MAX_AMOUNT.toLocaleString()}.`,
      warning: null,
    };

  if (amount > CONSTRAINTS.WARNING_THRESHOLD)
    return {
      error: null,
      warning: `Large transfers above ${cur.symbol}${CONSTRAINTS.WARNING_THRESHOLD.toLocaleString()} may require additional verification.`,
    };

  return { error: null, warning: null };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CurrencyInput() {
  const [rawValue, setRawValue]         = useState<string>("");
  const [displayValue, setDisplayValue] = useState<string>("");
  const [currency, setCurrency]         = useState<CurrencyCode>("USD");
  const [toCurrency, setToCurrency]     = useState<CurrencyCode>("INR");
  const [touched, setTouched]           = useState<boolean>(false);

  // Derived
  const amount     = parseAmount(rawValue);
  const validation = touched ? validate(rawValue, currency) : { error: null, warning: null };
  const rate       = RATES[currency][toCurrency];
  const converted  = amount * rate;
  const toCur      = CURRENCIES.find((c) => c.code === toCurrency)!;
  const fromCur    = CURRENCIES.find((c) => c.code === currency)!;

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let raw = stripFormatting(e.target.value);

      if (raw.replace(".", "").length > CONSTRAINTS.MAX_INPUT_LENGTH) return;

      const decimals = CURRENCIES.find((c) => c.code === currency)?.decimals ?? 2;
      const dotIndex = raw.indexOf(".");
      if (dotIndex !== -1) {
        const decPart = raw.slice(dotIndex + 1);
        if (decPart.length > (decimals === 0 ? 0 : CONSTRAINTS.MAX_DECIMAL_PLACES)) return;
        if (decimals === 0) raw = raw.slice(0, dotIndex);
      }

      if ((raw.match(/\./g) || []).length > 1) return;

      if (raw.length > 1 && raw.startsWith("0") && raw[1] !== ".") {
        raw = raw.replace(/^0+/, "");
      }

      setRawValue(raw);
      setDisplayValue(raw === "" ? "" : formatWithCommas(raw));
    },
    [currency]
  );

  const handleCurrencyChange = useCallback(
    (val: string) => {
      const newCur = val as CurrencyCode;
      setCurrency(newCur);
      if (newCur === "JPY" && rawValue.includes(".")) {
        const stripped = rawValue.split(".")[0];
        setRawValue(stripped);
        setDisplayValue(formatWithCommas(stripped));
      }
      setTouched(false);
    },
    [rawValue]
  );

  const handleBlur = useCallback(() => setTouched(true), []);

  const handleSwap = useCallback(() => {
    setCurrency(toCurrency);
    setToCurrency(currency);
    setTouched(false);
  }, [currency, toCurrency]);

  const handleClear = useCallback(() => {
    setRawValue("");
    setDisplayValue("");
    setTouched(false);
  }, []);

  const isValid  = !validation.error && touched && amount > 0;
  const hasError = !!validation.error && touched;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-5">

      {/* ── Amount field ── */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="currency-amount" className="text-sm font-medium">
            Send amount
          </Label>
          {displayValue && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Clear amount"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>

        <div
          className={[
            "flex items-stretch rounded-lg border bg-background overflow-hidden transition-colors",
            hasError
              ? "border-destructive focus-within:border-destructive"
              : isValid
              ? "border-green-500 focus-within:border-green-500"
              : "border-input focus-within:border-ring focus-within:ring-1 focus-within:ring-ring",
          ].join(" ")}
        >
          {/* Currency selector */}
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger
              className="w-[110px] rounded-none border-0 border-r bg-muted/50 focus:ring-0 focus:ring-offset-0 shrink-0"
              aria-label="Select currency"
            >
              <SelectValue>
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  {fromCur.flag} {currency}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((cur) => (
                <SelectItem key={cur.code} value={cur.code}>
                  <span className="flex items-center gap-2">
                    <span>{cur.flag}</span>
                    <span className="font-medium">{cur.code}</span>
                    <span className="text-muted-foreground text-xs">{cur.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Amount input */}
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm select-none">
              {fromCur.symbol}
            </span>
            <Input
              id="currency-amount"
              inputMode="decimal"
              value={displayValue}
              onChange={handleInput}
              onBlur={handleBlur}
              placeholder="0.00"
              maxLength={CONSTRAINTS.MAX_INPUT_LENGTH + 4}
              aria-invalid={hasError}
              aria-describedby={
                hasError
                  ? "currency-error"
                  : validation.warning
                  ? "currency-warning"
                  : "currency-conversion"
              }
              className="border-0 rounded-none pl-8 pr-4 h-11 text-right text-base font-semibold focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
            />
          </div>
        </div>

        {/* Character/amount hint */}
        <div className="flex justify-between items-center px-0.5">
          <span className="text-xs text-muted-foreground">
            Min: {fromCur.symbol}{CONSTRAINTS.MIN_AMOUNT.toFixed(fromCur.decimals)} · Max: {fromCur.symbol}{CONSTRAINTS.MAX_AMOUNT.toLocaleString()}
          </span>
          <span
            className={[
              "text-xs tabular-nums",
              amount > CONSTRAINTS.MAX_AMOUNT * 0.9
                ? "text-destructive"
                : "text-muted-foreground",
            ].join(" ")}
          >
            {rawValue.replace(".", "").length}/{CONSTRAINTS.MAX_INPUT_LENGTH}
          </span>
        </div>
      </div>

      {/* ── Error alert ── */}
      {hasError && (
        <Alert variant="destructive" id="currency-error" role="alert">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{validation.error}</AlertDescription>
        </Alert>
      )}

      {/* ── Warning alert ── */}
      {validation.warning && !hasError && (
        <Alert
          id="currency-warning"
          role="status"
          className="border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{validation.warning}</AlertDescription>
        </Alert>
      )}

      {/* ── Convert to selector ── */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Convert to</Label>
          <button
            type="button"
            onClick={handleSwap}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Swap currencies"
          >
            <RefreshCw className="h-3 w-3" /> Swap
          </button>
        </div>
        <Select value={toCurrency} onValueChange={(v) => setToCurrency(v as CurrencyCode)}>
          <SelectTrigger aria-label="Select target currency">
            <SelectValue>
              <span className="flex items-center gap-2 text-sm font-medium">
                {toCur.flag} {toCurrency}
                <span className="text-muted-foreground font-normal text-xs">{toCur.label}</span>
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {CURRENCIES.filter((c) => c.code !== currency).map((cur) => (
              <SelectItem key={cur.code} value={cur.code}>
                <span className="flex items-center gap-2">
                  <span>{cur.flag}</span>
                  <span className="font-medium">{cur.code}</span>
                  <span className="text-muted-foreground text-xs">{cur.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Conversion result ── */}
      <div
        id="currency-conversion"
        className="rounded-lg border bg-muted/30 p-4 space-y-3"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              Converted amount
            </p>
            <p className="text-2xl font-semibold tabular-nums tracking-tight">
              {amount > 0 ? (
                `${toCur.symbol}${formatCurrency(converted, toCurrency)}`
              ) : (
                <span className="text-muted-foreground text-xl">—</span>
              )}
            </p>
          </div>
          {amount > 0 && (
            <Badge variant="secondary" className="shrink-0 mt-1 gap-1">
              <TrendingUp className="h-3 w-3" />
              Live rate
            </Badge>
          )}
        </div>

        <div className="pt-2 border-t flex justify-between text-xs text-muted-foreground">
          <span>
            1 {currency} = {toCur.symbol}{rate.toFixed(4)} {toCurrency}
          </span>
          {amount > 0 && (
            <span className="tabular-nums">
              {fromCur.symbol}{formatCurrency(amount, currency)} → {toCur.symbol}{formatCurrency(converted, toCurrency)}
            </span>
          )}
        </div>
      </div>

    </div>
  );
}

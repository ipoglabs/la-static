import { cookies } from "next/headers";
import {
  COUNTRY_COOKIE,
  isSupportedCountry,
} from "@/lib/country-context";
import { COUNTRIES } from "@/lib/data/countries";
import { ResetButton } from "@/components/country/ResetButton";

export default function CountryContextPocPage() {
  const jar = cookies();
  const raw = jar.get(COUNTRY_COOKIE)?.value ?? "";
  const isResolved = isSupportedCountry(raw);

  // CountryProvider in root layout handles detection/overlay
  // Just show a loading state if country not yet resolved
  if (!isResolved) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Detecting your region…</p>
      </div>
    );
  }

  const country = COUNTRIES.find((c) => c.code === raw)!;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Breadcrumb */}
        <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-6">
          POC · Country Context
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Country Detection
        </h1>

        {/* Description */}
        <p className="text-base text-muted-foreground leading-relaxed mb-12">
          Demonstrates IP-based auto-detection with a manual fallback.
          Country is stored in a cookie and enforced globally — no route is
          accessible until it resolves.
        </p>

        {/* Detected Country Card */}
        <div className="rounded-xl border border-border bg-card p-6 mb-4">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
            Detected Country
          </p>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-muted-foreground/40">
              {country.code}
            </span>
            <div>
              <p className="text-2xl font-semibold text-foreground">
                {country.name}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                ISO code:{" "}
                <span className="font-semibold text-foreground">{country.code}</span>
                {" · "}
                Dial:{" "}
                <span className="font-semibold text-foreground">{country.dial}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Cookie Info Card */}
        <div className="rounded-xl border border-border bg-card px-6 py-4 mb-4">
          <p className="text-sm text-muted-foreground">
            Cookie:{" "}
            <code className="font-mono font-semibold text-foreground">
              {COUNTRY_COOKIE}={raw}
            </code>
            {" · "}
            Expires in 30 days
          </p>
        </div>

        {/* Reset Button */}
        <ResetButton />

      </div>
    </div>
  );
}
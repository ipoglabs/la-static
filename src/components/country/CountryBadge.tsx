"use client";

import { useCountry } from "@/components/country/CountryProvider";
import { COUNTRIES } from "@/lib/data/countries";

export function CountryBadge() {
  const { country } = useCountry(); // ✅ destructure from context object
  const found = COUNTRIES.find((c) => c.code === country);
  if (!found) return null;

  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span>{found.flag}</span>
      <span className="font-medium text-foreground">{found.name}</span>
    </div>
  );
}
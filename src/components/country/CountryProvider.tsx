"use client";

import { createContext, useContext } from "react";
import type { SupportedCountry } from "@/lib/country-context";

const CountryContext = createContext<SupportedCountry | null>(null);

export function CountryProvider({
  country,
  children,
}: {
  country: SupportedCountry;
  children: React.ReactNode;
}) {
  return (
    <CountryContext.Provider value={country}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry(): SupportedCountry {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used inside CountryProvider");
  return ctx;
}

"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { CountrySelectOverlay } from "@/components/country/CountrySelectOverlay";
import { commitCountry } from "@/lib/country-cookie";
import {
  COUNTRY_COOKIE,
  PENDING_COOKIE,
  IPINFO_URL,
  DETECTION_TIMEOUT,
  isSupportedCountry,
  type SupportedCountry,
} from "@/lib/country-context";

interface CountryContextType {
  country: string | null;
  setCountry: (code: string) => void;
}

const CountryContext = createContext<CountryContextType | null>(null);

export function useCountry() {
  const ctx = useContext(CountryContext);
  if (!ctx) throw new Error("useCountry must be used within CountryProvider");
  return ctx;
}

interface Props {
  children: React.ReactNode;
  initialCountry: string | null; // passed from server via layout
}

function readCookie(name: string): string | null {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1] ?? null
  );
}

export function CountryProvider({ children, initialCountry }: Props) {
  const [country, setCountryState] = useState<string | null>(initialCountry);
  const [showOverlay, setShowOverlay] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // ✅ Case 1: Server already resolved a valid country cookie
    if (initialCountry) {
      setMounted(true);
      return;
    }

    // ✅ Case 2: No country — check pending cookie set by middleware
    const isPending = readCookie(PENDING_COOKIE);

    if (isPending) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), DETECTION_TIMEOUT);

      fetch(IPINFO_URL, { signal: controller.signal })
        .then((r) => r.json())
        .then((data: { country?: string }) => {
          clearTimeout(timeout);
          const code = (data?.country ?? "").toUpperCase();
          if (isSupportedCountry(code)) {
            // ✅ Auto-detected supported country
            commitCountry(code as SupportedCountry);
            setCountryState(code);
            setShowOverlay(false);
          } else {
            // ✅ Detected but not in supported list
            setShowOverlay(true);
          }
        })
        .catch(() => {
          clearTimeout(timeout);
          // ✅ Case 3: Browser blocked IP fetch — show manual picker
          setShowOverlay(true);
        })
        .finally(() => {
          setMounted(true);
        });

      return () => {
        clearTimeout(timeout);
        controller.abort();
      };
    }

    // ✅ Case 4: No cookie, no pending — show manual picker immediately
    setShowOverlay(true);
    setMounted(true);
  }, [initialCountry]);

  function setCountry(code: string) {
    if (!isSupportedCountry(code)) return;
    commitCountry(code as SupportedCountry);
    setCountryState(code);
    setShowOverlay(false);
  }

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {showOverlay && <CountrySelectOverlay onSelect={setCountry} />}
      {children}
    </CountryContext.Provider>
  );
}
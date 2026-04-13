import { cookies } from "next/headers";
import {
  COUNTRY_COOKIE,
  PENDING_COOKIE,
  isSupportedCountry,
} from "@/lib/country-context";
import { CountryProvider } from "@/components/country/CountryProvider";
import { CountryDetector } from "@/components/country/CountryDetector";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jar = cookies();
  const raw = jar.get(COUNTRY_COOKIE)?.value ?? "";
  const pending = jar.get(PENDING_COOKIE)?.value;
  const isResolved = isSupportedCountry(raw);

  return (
    <html lang="en">
      <body>
        {isResolved ? (
          <CountryProvider country={raw}>
            {children}
          </CountryProvider>
        ) : (
          // Shows spinner → auto-detects IP → falls back to manual overlay
          <CountryDetector />
        )}
      </body>
    </html>
  );
}
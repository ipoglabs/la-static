// ─── SERVER COMPONENT — reads cookie, passes countryCode to client ────────────
import { cookies } from "next/headers";
import { COUNTRY_COOKIE, isSupportedCountry } from "@/lib/country-context";
import { PriceRangeClient } from "./PriceRangeClient";

export default async function Page() {
  const jar = await cookies();
  const raw = jar.get(COUNTRY_COOKIE)?.value ?? "";
  const countryCode = isSupportedCountry(raw) ? raw : undefined;

  return <PriceRangeClient countryCode={countryCode} />;
}

"use client";

import { Button } from "@/components/ui/button";
import { clearCountryCookies } from "@/lib/country-cookie";

export function ResetButton() {
  function handleReset() {
    clearCountryCookies();
    // Full reload so middleware re-runs and sets PENDING_COOKIE again
    // which triggers IP detection / manual overlay flow from scratch
    window.location.reload();
  }

  return (
    <Button variant="outline" onClick={handleReset}>
      Reset — clear country cookie
    </Button>
  );
}
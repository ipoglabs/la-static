"use client";

import { Globe } from "lucide-react";
import { COUNTRIES } from "@/lib/data/countries";

interface Props {
  onSelect: (code: string) => void;
}

export function CountrySelectOverlay({ onSelect }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-sm mx-6 rounded-xl border border-border bg-card p-8 shadow-lg">

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 text-foreground" />
          </div>
          <h2 className="text-lg font-semibold text-foreground leading-tight">
            Where are you visiting from?
          </h2>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Select your country to continue.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => onSelect(c.code)}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              <span className="text-xl leading-none">{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
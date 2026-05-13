"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { ToggleButtonGroup, ToggleGroupButton } from "@/components/toggle-group/CompoundToggleGroup";
import {
  STATIC_SUGGESTIONS,
  matchesScope,
  SearchSuggestion,
} from "./LocationSearch";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RadiusUnit = "mi" | "km";

export type LocationValue = {
  label: string;
  sublabel?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  unit?: RadiusUnit;
};

export type LocationPickerProps = {
  value?: LocationValue | null;
  defaultValue?: LocationValue | null;
  onChange?: (v: LocationValue | null) => void;
  showRadius?: boolean;
  radiusUnit?: RadiusUnit;
  countryScope?: string[];
  searchProvider?: "google" | "none";
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

// ─── DB saved location type ───────────────────────────────────────────────────

type DbSavedLocation = SearchSuggestion & { id: string };

// ─── Radius options ───────────────────────────────────────────────────────────

const RADIUS_OPTIONS = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

// ─── Scope labels ─────────────────────────────────────────────────────────────

const SCOPE_LABELS: Record<string, string> = {
  UK: "United Kingdom", SG: "Singapore", IN: "India",
  US: "United States", AU: "Australia", AE: "UAE", CA: "Canada",
};

// ─── Reverse geocode helper ───────────────────────────────────────────────────

async function reverseGeocode(
  lat: number,
  lng: number
): Promise<{ label: string; sublabel?: string }> {
  try {
    const res = await fetch(`/api/places/reverse?lat=${lat}&lng=${lng}`);
    if (res.ok) {
      const data = await res.json();
      if (data?.label) return data;
    }
  } catch {}

  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) throw new Error("No API key");
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await res.json();
    if (data.status === "OK" && data.results?.length) {
      const result = data.results[0];
      const components: { types: string[]; long_name: string }[] =
        result.address_components ?? [];
      const get = (type: string) =>
        components.find((c) => c.types.includes(type))?.long_name ?? "";
      const neighborhood =
        get("neighborhood") || get("sublocality_level_1") || get("sublocality");
      const locality = get("locality") || get("postal_town");
      const area = get("administrative_area_level_2");
      const country = get("country");
      const label = neighborhood || locality || area || result.formatted_address;
      const sublabelParts = [
        neighborhood && locality ? locality : null,
        area && area !== label && area !== locality ? area : null,
        country,
      ].filter(Boolean);
      return {
        label,
        sublabel: sublabelParts.length ? sublabelParts.join(", ") : undefined,
      };
    }
  } catch {}

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    if (data?.address) {
      const a = data.address;
      const label =
        a.neighbourhood || a.suburb || a.village || a.town ||
        a.city || a.county || a.state || data.display_name.split(",")[0];
      const sublabelParts = [
        a.city || a.town || a.village || (a.suburb !== label ? a.suburb : null),
        a.state,
        a.country,
      ].filter(Boolean);
      return {
        label,
        sublabel: sublabelParts.length ? sublabelParts.join(", ") : undefined,
      };
    }
  } catch {}

  return { label: "Nearby Location", sublabel: undefined };
}

// ─── Check if sublabel matches country scope ──────────────────────────────────

function isWithinScope(sublabel: string | undefined, countryScope: string[]): boolean {
  if (!countryScope.length) return true;
  if (!sublabel) return false;
  return countryScope.some((code) => {
    const fullName = SCOPE_LABELS[code] ?? code;
    return (
      sublabel.toLowerCase().includes(fullName.toLowerCase()) ||
      sublabel.toLowerCase().includes(code.toLowerCase())
    );
  });
}

// ─── iOS-style Out-of-Scope Alert ─────────────────────────────────────────────

function OutOfScopeAlert({
  open,
  onClose,
  countryScope,
}: {
  open: boolean;
  onClose: () => void;
  countryScope: string[];
}) {
  const scopeName =
    countryScope.length === 1
      ? (SCOPE_LABELS[countryScope[0]] ?? countryScope[0])
      : countryScope.map((c) => SCOPE_LABELS[c] ?? c).join(" or ");

  const APP_NAMES: Record<string, string> = {
    UK: "Rightmove", US: "Zillow", AU: "Domain", IN: "Lokalads",
  };
  const appName =
    countryScope.length === 1 ? (APP_NAMES[countryScope[0]] ?? "This app") : "This app";

  const scopeLabel =
    countryScope.length === 1
      ? (SCOPE_LABELS[countryScope[0]] ?? countryScope[0])
      : "supported region";

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="mx-6 w-full max-w-[270px] overflow-hidden rounded-2xl bg-[#f2f2f7]/95 backdrop-blur-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="out-of-scope-title"
        aria-describedby="out-of-scope-desc"
      >
        <div className="px-4 pb-5 pt-5 text-center">
          <p
            id="out-of-scope-title"
            className="text-[17px] font-semibold leading-snug text-[#1c1c1e]"
          >
            Location outside {scopeLabel}
          </p>
          <p
            id="out-of-scope-desc"
            className="mt-1 text-[13px] leading-[1.4] text-[#1c1c1e]"
          >
            Sorry, {appName} only supports location searches within the {scopeName}
          </p>
        </div>
        <div className="h-px bg-[#3c3c43]/20" />
        <button
          type="button"
          onClick={onClose}
          className="w-full py-[11px] text-center text-[17px] font-normal text-[#007aff] transition-colors active:bg-[#e5e5ea]"
        >
          OK
        </button>
      </div>
    </div>
  );
}
 
// ─── Icons ────────────────────────────────────────────────────────────────────

function IconCrosshair({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <circle cx="12" cy="12" r="7" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="2" strokeWidth="1.75" fill="currentColor" stroke="none" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 13 6 13s6-8.582 6-13c0-3.314-2.686-6-6-6z" strokeWidth="1.75" />
      <circle cx="12" cy="8" r="2" strokeWidth="1.75" />
    </svg>
  );
}

function IconChevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Location row ─────────────────────────────────────────────────────────────

function LocationRow({
  suggestion,
  onSelect,
  onClear,
  onSave,
  isSaved,
  isSaving,
}: {
  suggestion: SearchSuggestion;
  onSelect: () => void;
  onClear?: () => void;
  onSave?: () => void;
  isSaved?: boolean;
  isSaving?: boolean;
}) {
  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={onSelect}
        className="flex flex-1 items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-blue-50"
      >
        <IconPin className={cn("h-4 w-4 flex-none", isSaved ? "text-blue-500" : "text-slate-400")} />
        <div className="w-0 flex-1 overflow-hidden">
          <div className="truncate text-base font-normal text-slate-800">{suggestion.label}</div>
          {suggestion.sublabel && (
            <div className="truncate text-sm font-light text-slate-800">{suggestion.sublabel}</div>
          )}
        </div>
      </button>

      {onSave && (
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          aria-label={isSaved ? `Unsave ${suggestion.label}` : `Save ${suggestion.label}`}
          title={isSaved ? "Unsave" : "Save"}
          className={cn(
            "flex h-7 w-7 flex-none items-center justify-center rounded-full transition-colors disabled:opacity-40",
            isSaved
              ? "text-blue-500 hover:bg-blue-50"
              : "text-slate-300 hover:bg-slate-100 hover:text-slate-500"
          )}
        >
          {isSaving ? (
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              <circle cx="12" cy="12" r="9" strokeWidth="2" strokeDasharray="28 56" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" aria-hidden
              fill={isSaved ? "currentColor" : "none"}
            >
              <path d="M5 3h14a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" strokeWidth="1.75" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      )}

      {isSaved && !onSave && (
        <span className="flex h-7 w-7 flex-none items-center justify-center text-blue-500" aria-label="Saved">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" aria-hidden>
            <path d="M5 3h14a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
          </svg>
        </span>
      )}

      {onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label={`Remove ${suggestion.label}`}
          className="mr-3 flex h-7 w-7 flex-none items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-800"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── Panel content ─────────────────────────────────────────────────────────────

type PanelContentProps = {
  current: LocationValue | null;
  showRadius: boolean;
  radiusUnit: RadiusUnit;
  countryScope?: string[];
  searchProvider: "google" | "none";
  placeholder: string;
  disabled: boolean;
  gpsLoading: boolean;
  gpsError: string | null;
  gpsPermissionDenied: boolean;
  recentItems: SearchSuggestion[];
  savedItems: DbSavedLocation[];
  savingKey: string | null;
  isMobile?: boolean;
  onClearRecent: (index: number) => void;
  onToggleSave: (s: SearchSuggestion) => void;
  onDeleteSaved: (id: string) => void;
  onRequestGps: () => void;
  onSelect: (s: SearchSuggestion) => void;
  onRadiusChange: (r: number) => void;
  onClose?: () => void;
};

function PanelContent({
  current,
  showRadius,
  radiusUnit,
  countryScope,
  searchProvider,
  placeholder,
  disabled,
  gpsLoading,
  gpsError,
  gpsPermissionDenied,
  recentItems,
  savedItems,
  savingKey,
  isMobile = false,
  onClearRecent,
  onToggleSave,
  onDeleteSaved,
  onRequestGps,
  onSelect,
  onRadiusChange,
  onClose,
}: PanelContentProps) {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [fetchError, setFetchError] = React.useState<string | null>(null);
  const [searchOutOfScope, setSearchOutOfScope] = React.useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = React.useState<string | null>(null);
  const [savedOnly, setSavedOnly] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const t = setTimeout(() => {
      inputRef.current?.focus({ preventScroll: false });
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    const q = query.trim();
    if (!q) { setResults([]); setFetchError(null); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (searchProvider === "google") {
        setLoading(true);
        setFetchError(null);
        setSearchOutOfScope(false);
        try {
          const res = await fetch(`/api/places?input=${encodeURIComponent(q)}`);
          if (!res.ok) throw new Error("Places API error");
          const all: SearchSuggestion[] = await res.json();
          if (countryScope?.length) {
            const filtered = all.filter((s) => matchesScope(s.sublabel, countryScope));
            setSearchOutOfScope(all.length > 0 && filtered.length === 0);
            setResults(filtered);
          } else {
            setResults(all);
          }
        } catch {
          setFetchError("Couldn't fetch suggestions. Try again.");
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        const lower = q.toLowerCase();
        const all = STATIC_SUGGESTIONS.filter(
          (s) =>
            s.label.toLowerCase().includes(lower) ||
            (s.sublabel?.toLowerCase().includes(lower) ?? false)
        );
        if (countryScope?.length) {
          const filtered = all.filter((s) => matchesScope(s.sublabel, countryScope));
          setSearchOutOfScope(all.length > 0 && filtered.length === 0);
          setResults(filtered);
        } else {
          setResults(all);
        }
        setFetchError(null);
      }
    }, searchProvider === "google" ? 350 : 0);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, searchProvider, countryScope]);

  const isTyping = query.trim().length > 0;

  const isSavedFn = (s: SearchSuggestion) =>
    savedItems.some((sv) => sv.label === s.label && sv.sublabel === s.sublabel);

  const savingKeyFor = (s: SearchSuggestion) => `${s.label}||${s.sublabel ?? ""}`;

  return (
    <div className="flex flex-col flex-1 min-h-0">

      {/* ── Mobile: GPS button + search bar + Cancel ── */}
      {isMobile ? (
        <div className="sticky top-0 z-20 flex items-center gap-2 border-b border-slate-200 bg-white px-3 py-2.5">
          <button
            type="button"
            onClick={onRequestGps}
            disabled={gpsLoading || disabled}
            aria-label="Use current location"
            title={gpsPermissionDenied ? "Location access blocked" : gpsError ?? "Use current location"}
            className={cn(
              "flex flex-none items-center justify-center rounded-full border transition-colors disabled:opacity-50",
              "h-[40px] w-[40px]",
              gpsPermissionDenied
                ? "border-red-200 bg-red-50 text-red-500"
                : gpsError
                ? "border-slate-200 bg-slate-100 text-red-400"
                : "border-slate-300 bg-slate-100 text-blue-500 hover:bg-blue-50 hover:border-blue-300"
            )}
          >
            {gpsLoading ? (
              <svg className="h-[18px] w-[18px] animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <circle cx="12" cy="12" r="9" strokeWidth="2" strokeDasharray="28 56" strokeLinecap="round" />
              </svg>
            ) : (
              <IconCrosshair className="h-[18px] w-[18px]" />
            )}
          </button>

          <div className="flex flex-1 items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-2">
            {loading ? (
              <svg className="h-4 w-4 flex-none animate-spin text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <circle cx="12" cy="12" r="9" strokeWidth="2" strokeDasharray="28 56" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="h-4 w-4 flex-none text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <circle cx="10" cy="10" r="7" strokeWidth="1.75" />
                <path d="M21 21l-4.35-4.35" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            )}
            <input
              ref={inputRef}
              type="text"
              inputMode="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              className="flex-1 bg-transparent text-base font-semibold text-slate-900 placeholder:text-slate-500 outline-none disabled:cursor-not-allowed"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(""); setFetchError(null); inputRef.current?.focus(); }}
                aria-label="Clear search"
                className="text-slate-500 transition-colors hover:text-slate-800"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex-none text-sm font-medium text-blue-500 transition-colors hover:text-blue-700 active:text-blue-800 px-1 whitespace-nowrap"
          >
            Cancel
          </button>
        </div>
      ) : (
        /* ── Desktop: original search bar with GPS button ── */
        <div className="sticky top-0 z-20 flex items-center gap-2 border-t border-b border-lime-200 bg-lime-100 px-3 py-2">
          <button
            type="button"
            onClick={onRequestGps}
            disabled={gpsLoading || disabled}
            aria-label="Use current location"
            title="Use current location"
            className={cn(
              "flex h-8 w-8 flex-none items-center justify-center rounded-lg transition-colors disabled:opacity-50",
              gpsPermissionDenied ? "text-red-500 hover:bg-red-50" : gpsError ? "text-red-400 hover:bg-slate-100" : "text-slate-500 hover:bg-slate-100"
            )}
          >
            {gpsLoading ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <circle cx="12" cy="12" r="9" strokeWidth="2" strokeDasharray="28 56" strokeLinecap="round" />
              </svg>
            ) : (
              <IconCrosshair className="h-4 w-4" />
            )}
          </button>

          <div className="flex flex-1 items-center gap-2 rounded-full border border-slate-300 bg-slate-200 px-3 py-1.5">
            {loading ? (
              <svg className="h-4 w-4 flex-none animate-spin text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <circle cx="12" cy="12" r="9" strokeWidth="2" strokeDasharray="28 56" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="h-4 w-4 flex-none text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                <circle cx="11" cy="11" r="7" strokeWidth="1.75" />
                <path d="M21 21l-4.35-4.35" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            )}
            <input
              ref={inputRef}
              type="text"
              inputMode="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              disabled={disabled}
              className="flex-1 bg-transparent text-base text-slate-900 placeholder:text-slate-700 outline-none disabled:cursor-not-allowed"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(""); setFetchError(null); inputRef.current?.focus(); }}
                aria-label="Clear search"
                className="text-slate-500 transition-colors hover:text-slate-800"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                  <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {fetchError && <p className="px-4 pt-1.5 pb-0 text-xs text-red-400">{fetchError}</p>}

      {/* Scrollable list */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-500">

        {isTyping ? (
      results.length === 0 && !loading ? (
      <div className="px-4 py-2.5 text-sm text-slate-500">
         No results for <span className="font-medium text-slate-700">&ldquo;{query}&rdquo;</span>
        </div>
        ) : (
            <div role="list" aria-label="Search results">
              {results.map((s) => (
                <div key={`${s.label}-${s.sublabel}`} role="listitem">
                  <LocationRow
                    suggestion={s}
                    onSelect={() => onSelect(s)}
                    onSave={() => onToggleSave(s)}
                    isSaved={isSavedFn(s)}
                    isSaving={savingKey === savingKeyFor(s)}
                  />
                </div>
              ))}
            </div>
          )
        ) : (
          <div>
            {!savedOnly && (
              <>
                {recentItems.length === 0 ? (
                  <p className="px-4 pt-3 pb-1 text-sm text-slate-400">No recent searches</p>
                ) : (
                  <div role="list">
                    {recentItems.map((s, i) => (
                      <div key={`r-${i}-${s.label}`} role="listitem">
                        <LocationRow
                          suggestion={s}
                          onSelect={() => onSelect(s)}
                          onSave={() => onToggleSave(s)}
                          isSaved={isSavedFn(s)}
                          isSaving={savingKey === savingKeyFor(s)}
                          onClear={() => onClearRecent(i)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── Saved toggle + Clear all — hidden, uncomment to re-enable ──
            <div className="flex items-center justify-between px-4 py-2">
              <button
                type="button"
                onClick={() => setSavedOnly((v) => !v)}
                data-state={savedOnly ? "on" : "off"}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors",
                  savedOnly
                    ? "border-teal-300 bg-teal-50 text-teal-600"
                    : "border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
                )}
              >
                <svg className="h-3 w-3" viewBox="0 0 24 24" stroke="currentColor" fill={savedOnly ? "currentColor" : "none"} aria-hidden>
                  <path d="M5 3h14a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" strokeWidth="1.75" strokeLinejoin="round" />
                </svg>
                Saved
              </button>
              {!savedOnly && recentItems.length > 0 && (
                <button
                  type="button"
                  onClick={() => recentItems.forEach((_, i) => onClearRecent(recentItems.length - 1 - i))}
                  className="text-[11px] text-slate-400 transition-colors hover:text-slate-700"
                >
                  Clear all
                </button>
              )}
            </div>
            ── end hidden section ── */}

            {!savedOnly && <div className="mt-1 border-t border-slate-100" />}
            {savedItems.length === 0 ? (
              <p className="px-4 py-3 text-xs text-slate-400">No saved locations</p>
            ) : (
              <div role="list">
                {savedItems.map((s) => (
                  <div key={s.id} role="listitem">
                    <LocationRow
                      suggestion={s}
                      onSelect={() => onSelect(s)}
                      onClear={() => setConfirmDeleteId(s.id)}
                      isSaved
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Cancel — closes the panel */}
            <div className="border-t border-slate-100 px-4 py-3 flex justify-center">
              <button
                  type="button"
                  onClick={() => recentItems.forEach((_, i) => onClearRecent(recentItems.length - 1 - i))}
                  className="text-sm text-slate-400 transition-colors hover:text-slate-700"
                >
                  Clear all
                </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirm delete dialog */}
      <Dialog
        open={confirmDeleteId !== null}
        onOpenChange={(open) => { if (!open) setConfirmDeleteId(null); }}
      >
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>Remove saved location?</DialogTitle>
            <DialogClose asChild>
              <button type="button" className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-slate-300 text-slate-500 transition-colors hover:bg-slate-400/50 hover:text-slate-700" aria-label="Close">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </DialogClose>
          </DialogHeader>
          <div className="flex flex-col gap-2 px-5 pt-4 pb-4">
            <p className="text-sm leading-relaxed text-slate-500">
              {confirmDeleteId !== null && savedItems.find((s) => s.id === confirmDeleteId) ? (
                <>
                  <span className="font-medium text-slate-700">
                    &ldquo;{savedItems.find((s) => s.id === confirmDeleteId)!.label}&rdquo;
                  </span>{" "}
                  will be removed from your saved locations.
                </>
              ) : (
                "This location will be removed from your saved locations."
              )}
            </p>
          </div>
          <div className="flex justify-end gap-2 px-5 pb-5">
            <DialogClose asChild>
              <button type="button" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
                Cancel
              </button>
            </DialogClose>
            <button
              type="button"
              onClick={() => {
                if (confirmDeleteId) {
                  onDeleteSaved(confirmDeleteId);
                  setConfirmDeleteId(null);
                }
              }}
              className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Radius footer */}
      {showRadius && (
        <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
          <p className="mb-2 truncate text-sm font-medium text-slate-700">
            {current ? buildPillText(current.label, current.sublabel) : "Select location"}
          </p>
          {isMobile ? (
            <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {RADIUS_OPTIONS.map((r) => {
                const isSelected = current?.radius === r;
                return (
                  <button
                    key={r}
                    type="button"
                    disabled={!current}
                    onClick={() => onRadiusChange(r)}
                    className={cn(
                      "flex-none rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors disabled:opacity-40",
                      isSelected
                        ? "border-slate-800 bg-slate-800 text-white"
                        : "border-slate-300 border-1.5 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-800"
                    )}
                  >
                    {r} {radiusUnit}
                  </button>
                );
              })}
            </div>
          ) : (
            <ToggleButtonGroup
              singleSelect
              requireSelection
              value={current?.radius != null ? [String(current.radius)] : []}
              onChange={(vals) => {
                if (!vals[0]) return;
                onRadiusChange(parseFloat(vals[0]));
              }}
            >
              {RADIUS_OPTIONS.map((r) => (
                <ToggleGroupButton key={r} value={String(r)} size="default" disabled={!current}>
                  {r} {radiusUnit}
                </ToggleGroupButton>
              ))}
            </ToggleButtonGroup>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Pill helpers ─────────────────────────────────────────────────────────────

function buildPillText(label: string, sublabel?: string): string {
  if (!sublabel) return label;
  const parts = sublabel.split(", ");
  const stripped = parts.length > 1 ? parts.slice(0, -1).join(", ") : parts[0];
  if (!stripped || stripped === label) return label;
  return `${label}, ${stripped}`;
}

// ─── Main component ───────────────────────────────────────────────────────────

export function LocationPicker({
  value,
  defaultValue = null,
  onChange,
  showRadius = true,
  radiusUnit = "km",
  countryScope,
  searchProvider = "none",
  placeholder = "Search location…",
  disabled = false,
  className,
}: LocationPickerProps) {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const [mounted, setMounted] = React.useState(false);
  const controlled = typeof value !== "undefined";
  const [internal, setInternal] = React.useState<LocationValue | null>(defaultValue);
  const [open, setOpen] = React.useState(false);
  const [gpsLoading, setGpsLoading] = React.useState(false);
  const [gpsError, setGpsError] = React.useState<string | null>(null);
  const [gpsPermissionDenied, setGpsPermissionDenied] = React.useState(false);

  // ── NEW: out-of-scope alert state ─────────────────────────────────────────
  const [outOfScopeAlert, setOutOfScopeAlert] = React.useState(false);

  // ─── Recents — localStorage ───────────────────────────────────────────────
  const [recentItems, setRecentItems] = React.useState<SearchSuggestion[]>(() => {
    try {
      const stored = localStorage.getItem("location-recents");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  React.useEffect(() => {
    localStorage.setItem("location-recents", JSON.stringify(recentItems));
  }, [recentItems]);

  // ─── Saved — SQLite database via API ─────────────────────────────────────
  const [savedItems, setSavedItems] = React.useState<DbSavedLocation[]>([]);
  const [savedLoading, setSavedLoading] = React.useState(false);
  const [savingKey, setSavingKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSavedLoading(true);
    fetch("/api/saved-locations")
      .then((r) => r.json())
      .then((data: DbSavedLocation[]) => setSavedItems(data))
      .catch(() => {})
      .finally(() => setSavedLoading(false));
  }, []);

  async function toggleSave(s: SearchSuggestion) {
    const key = `${s.label}||${s.sublabel ?? ""}`;
    const existing = savedItems.find(
      (sv) => sv.label === s.label && sv.sublabel === s.sublabel
    );
    setSavingKey(key);
    try {
      if (existing) {
        await fetch(`/api/saved-locations/${existing.id}`, { method: "DELETE" });
        setSavedItems((prev) => prev.filter((sv) => sv.id !== existing.id));
      } else {
        const res = await fetch("/api/saved-locations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(s),
        });
        const created: DbSavedLocation = await res.json();
        setSavedItems((prev) => [created, ...prev]);
      }
    } catch {
      // silently fail
    } finally {
      setSavingKey(null);
    }
  }

  async function deleteSaved(id: string) {
    try {
      await fetch(`/api/saved-locations/${id}`, { method: "DELETE" });
      setSavedItems((prev) => prev.filter((sv) => sv.id !== id));
    } catch {}
  }

  React.useEffect(() => { setMounted(true); }, []);

  const current = controlled ? (value ?? null) : internal;

  function emit(v: LocationValue | null) {
    if (!controlled) setInternal(v);
    onChange?.(v);
  }

  function pushRecent(s: SearchSuggestion) {
    setRecentItems((prev) => {
      const filtered = prev.filter(
        (r) => !(r.label === s.label && r.sublabel === s.sublabel)
      );
      return [s, ...filtered].slice(0, 8);
    });
  }

  // ─── GPS ─────────────────────────────────────────────────────────────────
  async function requestGps() {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser");
      return;
    }
    setGpsLoading(true);
    setGpsError(null);
    setGpsPermissionDenied(false);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const { label, sublabel } = await reverseGeocode(lat, lng);
        setGpsLoading(false);

        // ── Scope check: show iOS-style alert if outside allowed region ──
        if (countryScope?.length && !isWithinScope(sublabel, countryScope)) {
          setOutOfScopeAlert(true);
          return; // Do NOT emit or close the panel
        }

        emit({
          label,
          sublabel,
          lat,
          lng,
          radius: current?.radius ?? (showRadius ? RADIUS_OPTIONS[0] : undefined),
          unit: current?.unit ?? radiusUnit,
        });
        setOpen(false);
        pushRecent({ label, sublabel, lat, lng });
      },
      (err) => {
        setGpsLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGpsPermissionDenied(true);
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setGpsError("Location unavailable. Try again.");
        } else {
          setGpsError("Couldn't get location. Try again.");
        }
      }
    );
  }

  const scopeDefault =
    !current && countryScope?.length === 1
      ? (SCOPE_LABELS[countryScope[0]] ?? countryScope[0])
      : null;

  const pillLabel = current
    ? buildPillText(current.label, current.sublabel)
    : (scopeDefault ?? "Set location");
  const pillTitle = current?.sublabel
    ? `${current.label}, ${current.sublabel}`
    : pillLabel;
  const pillRadius =
    current?.radius != null
      ? `±${current.radius} ${current.unit ?? radiusUnit}`
      : null;

  const panelProps = {
    current,
    showRadius,
    radiusUnit,
    countryScope,
    searchProvider,
    placeholder,
    disabled,
    gpsLoading,
    gpsError,
    gpsPermissionDenied,
    recentItems,
    savedItems,
    savingKey,
    onClearRecent: (i: number) => setRecentItems((prev) => prev.filter((_, idx) => idx !== i)),
    onToggleSave: toggleSave,
    onDeleteSaved: deleteSaved,
    onRequestGps: requestGps,
    onSelect: (s: SearchSuggestion) => {
      emit({
        ...s,
        radius: current?.radius ?? (showRadius ? RADIUS_OPTIONS[0] : undefined),
        unit: current?.unit ?? radiusUnit,
      });
      pushRecent(s);
      setOpen(false);
    },
    onRadiusChange: (r: number) => {
      if (current) emit({ ...current, radius: r, unit: radiusUnit });
    },
  };

  return (
    <div className={cn("flex items-center", className)}>

      {/* Split pill */}
      <div className={cn(
        "flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm shadow-md overflow-hidden",
        disabled && "opacity-50 cursor-not-allowed"
      )}>
        {/* GPS half */}
        <button
          type="button"
          onClick={requestGps}
          disabled={disabled || gpsLoading}
          aria-label="Use current location"
          title={gpsPermissionDenied ? "Location access blocked" : gpsError ?? "Use current location"}
          className={cn(
            "flex h-8 w-9 flex-none items-center justify-center transition-colors",
            gpsPermissionDenied ? "text-red-400 hover:bg-red-500/20" : gpsError ? "text-red-400 hover:bg-white/10" : "text-white/70 hover:bg-white/20 hover:text-white",
            "disabled:cursor-not-allowed"
          )}
        >
          {gpsLoading ? (
            <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
              <circle cx="12" cy="12" r="9" strokeWidth="2" strokeDasharray="28 56" strokeLinecap="round" />
            </svg>
          ) : (
            <IconCrosshair className="h-3.5 w-3.5" />
          )}
        </button>

        <span className="h-4 w-px bg-white/20 flex-none" aria-hidden />

        {/* Location half */}
        <button
          type="button"
          onClick={() => !disabled && setOpen(true)}
          disabled={disabled}
          aria-haspopup="dialog"
          className="flex h-8 min-w-0 max-w-full items-center gap-2 px-3 text-sm font-medium text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed"
        >
          <span className="truncate" title={pillTitle}>{pillLabel}</span>
          {pillRadius && (
            <>
              <span className="font-normal text-white/40">·</span>
              <span className="whitespace-nowrap font-normal text-white/60">{pillRadius}</span>
            </>
          )}
          <IconChevron className={cn("h-3.5 w-3.5 flex-none text-white/40 transition-transform", open && "rotate-180")} />
        </button>
      </div>

      {/* Responsive overlay */}
      {mounted && (
        isTablet ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="flex max-h-[min(80vh,600px)] flex-col overflow-hidden max-w-sm p-0">
              <div className="relative flex items-center justify-center rounded-t-2xl bg-linear-to-b from-slate-100 to-white px-4 py-2.5 border-b border-slate-200/60">
                <DialogTitle className="text-sm font-semibold text-slate-700 tracking-tight">Set Location</DialogTitle>
                <DialogClose asChild>
                  <button type="button" aria-label="Close" className="absolute right-3 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700">
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                      <path d="M18 6L6 18M6 6l12 12" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </DialogClose>
              </div>
              {savedLoading ? (
                <div className="flex flex-1 items-center justify-center py-10">
                  <svg className="h-5 w-5 animate-spin text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" strokeDasharray="28 56" strokeLinecap="round" />
                  </svg>
                </div>
              ) : <PanelContent {...panelProps} isMobile={false} />}
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent
              className="h-dvh w-full overflow-hidden rounded-none"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <DrawerTitle className="sr-only">Set Location</DrawerTitle>
              {savedLoading ? (
                <div className="flex flex-1 items-center justify-center py-10">
                  <svg className="h-5 w-5 animate-spin text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" strokeDasharray="28 56" strokeLinecap="round" />
                  </svg>
                </div>
              ) : (
                <PanelContent
                  {...panelProps}
                  isMobile={true}
                  onClose={() => setOpen(false)}
                />
              )}
            </DrawerContent>
          </Drawer>
        )
      )}

      {/* ── iOS-style Out-of-Scope Alert ── */}
      {mounted && countryScope?.length && (
        <OutOfScopeAlert
          open={outOfScopeAlert}
          onClose={() => setOutOfScopeAlert(false)}
          countryScope={countryScope}
        />
      )}

      {/* GPS permission denied dialog */}
      {mounted && (
        <Dialog open={gpsPermissionDenied} onOpenChange={(o) => { if (!o) setGpsPermissionDenied(false); }}>
          <DialogContent className="max-w-xs p-0 overflow-hidden border-none">
            <div className="flex flex-col items-center gap-2 bg-red-500 px-6 pt-6 pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                  <path d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 13 6 13s6-8.582 6-13c0-3.314-2.686-6-6-6z" strokeWidth="2" />
                  <circle cx="12" cy="8" r="2" strokeWidth="2" />
                </svg>
              </div>
              <DialogTitle className="text-center text-[15px] font-bold text-white leading-snug">
                Location access is blocked
              </DialogTitle>
              <p className="text-center text-xs text-red-100 leading-relaxed">
                Allow access in your browser settings to use your current location.
              </p>
            </div>
            <div className="px-5 py-3">
              <ol className="flex flex-col gap-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="flex h-4.5 w-4.5 flex-none items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-700 mt-px">1</span>
                  <span className="text-xs text-slate-500 leading-snug">Click the <strong className="text-slate-800">lock icon</strong> in your browser&apos;s address bar</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-4.5 w-4.5 flex-none items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-700 mt-px">2</span>
                  <span className="text-xs text-slate-500 leading-snug">Find <strong className="text-slate-800">Location</strong> and set it to <strong className="text-slate-800">Allow</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="flex h-4.5 w-4.5 flex-none items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-700 mt-px">3</span>
                  <span className="text-xs text-slate-500 leading-snug">Reload the page and try again</span>
                </li>
              </ol>
            </div>
            <div className="px-5 pb-5 pt-0">
              <DialogClose asChild>
                <button type="button" className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700">
                  Got it
                </button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default LocationPicker;

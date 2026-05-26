"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { COUNTRIES } from "@/lib/data/countries";

// ─── Currency resolution ──────────────────────────────────────────────────────

function getCurrencyForCountry(countryCode?: string): { symbol: string } | null {
  if (!countryCode) return null;
  const country = COUNTRIES.find((c) => c.code === countryCode.toUpperCase());
  if (!country) return null;
  return { symbol: country.currencySymbol };
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ABSOLUTE_MAX = 1_000_000_000_000_000;

// ─── Preset generator ─────────────────────────────────────────────────────────

type Preset = { value: number | null; label: string };

function buildPresets(sym: string): { min: Preset[]; max: Preset[] } {
  const amounts = [200, 400, 600, 800, 1000, 1200, 1500, 2000, 2500, 3000];
  const fmt = (n: number) => n.toLocaleString("en-US");
  return {
    min: [
      { value: 0, label: "No Min" },
      ...amounts.map((v) => ({ value: v, label: `${sym} ${fmt(v)}` })),
    ],
    max: [
      { value: null, label: "No Max" },
      ...amounts.filter((v) => v >= 400).map((v) => ({ value: v, label: `${sym} ${fmt(v)}` })),
    ],
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtNum(n: number | string) {
  const v = parseInt(String(n).replace(/,/g, ""), 10);
  return isNaN(v) ? "" : v.toLocaleString("en-US");
}

// ─── Types ────────────────────────────────────────────────────────────────────

type DrawerType = "min" | "max";

type RangeProps = {
  label?: string;
  minValue: number;
  maxValue: number;
  onMinChange?: (v: number) => void;
  onMaxChange?: (v: number) => void;
  countryCode?: string;
};

// ─── LaAmountRange ────────────────────────────────────────────────────────────

function LaAmountRange({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  countryCode,
}: RangeProps) {
  const currency = getCurrencyForCountry(countryCode);
  const sym = currency ? currency.symbol : "N/A";
  const presetDefs = buildPresets(sym);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<DrawerType>("min");
  const [drawerInputText, setDrawerInputText] = useState("");
  const [minInput, setMinInput] = useState(minValue === 0 ? "" : fmtNum(minValue));
  const [maxInput, setMaxInput] = useState(maxValue === ABSOLUTE_MAX ? "" : fmtNum(maxValue));

  // Track which field the user last typed in — only that field shows the error
  const [lastEdited, setLastEdited] = useState<"min" | "max" | null>(null);

  // ── Derived numeric values ────────────────────────────────────────
  const minNum = minInput === "" ? 0 : parseInt(minInput.replace(/,/g, ""), 10);
  const maxNum = maxInput === "" ? ABSOLUTE_MAX : parseInt(maxInput.replace(/,/g, ""), 10);

  // Conflict: both fields filled and min >= max
  const hasConflict =
    minInput !== "" &&
    maxInput !== "" &&
    !isNaN(minNum) &&
    !isNaN(maxNum) &&
    minNum >= maxNum;

  // Only show error on the field the user last typed in
  const minError = hasConflict && lastEdited === "min";
  const maxError = hasConflict && lastEdited === "max";

  // ── Drawer input validation ───────────────────────────────────────
  const drawerNum = parseInt(drawerInputText.replace(/,/g, ""), 10);
  const drawerInvalid =
    drawerInputText !== "" &&
    (isNaN(drawerNum) ||
      drawerNum < 0 ||
      (drawerType === "min" && maxValue !== ABSOLUTE_MAX && drawerNum >= maxValue) ||
      (drawerType === "max" && minValue > 0 && drawerNum <= minValue));

  const openDrawer = (type: DrawerType) => {
    setDrawerType(type);
    setDrawerInputText("");
    setDrawerOpen(true);
  };

  const handleSelect = (val: number | null) => {
    setLastEdited(null); // clear error state when preset selected
    setDrawerInputText("");
    if (drawerType === "min") {
      const resolved = val === null ? 0 : val;
      onMinChange?.(resolved);
      setMinInput(resolved === 0 ? "" : fmtNum(resolved));
      if (maxValue !== ABSOLUTE_MAX && resolved >= maxValue) {
        onMaxChange?.(ABSOLUTE_MAX);
        setMaxInput("");
      }
    } else {
      const resolved = val === null ? ABSOLUTE_MAX : val;
      onMaxChange?.(resolved);
      setMaxInput(resolved === ABSOLUTE_MAX ? "" : fmtNum(resolved));
      if (resolved !== ABSOLUTE_MAX && resolved <= minValue) {
        onMinChange?.(0);
        setMinInput("");
      }
    }
    setDrawerOpen(false);
  };

  const handleDrawerApply = () => {
    const raw = parseInt(drawerInputText.replace(/,/g, ""), 10);
    if (isNaN(raw) || raw < 0) return;
    handleSelect(raw === 0 && drawerType === "min" ? 0 : raw);
  };

  const presets: Preset[] = drawerType === "min" ? presetDefs.min : presetDefs.max;

  // ── Currency badge ────────────────────────────────────────────────
  const CurrencyBadge = ({ isError }: { isError: boolean }) => (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isError ? "#c0392b" : "#111",
        color: "#fff",
        fontWeight: 700,
        fontSize: 13,
        borderRadius: 8,
        padding: "4px 10px",
        margin: "0 8px",
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: "background 0.15s",
        minWidth: 36,
      }}
    >
      {sym}
    </span>
  );

  // ── Input box renderer ────────────────────────────────────────────
  const inputBox = (type: DrawerType) => {
    const isMin = type === "min";
    const val = isMin ? minInput : maxInput;
    const isError = isMin ? minError : maxError;
    const placeholder = isMin ? "No Min" : "No Max";
    const errMsg = isMin
      ? `Min. value cannot be more than max (${sym} ${fmtNum(maxNum)})`
      : `Max. value cannot be less than min (${sym} ${fmtNum(minNum)})`;

    return (
      <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: `1.5px solid ${isError ? "#c0392b" : "#d8d8d8"}`,
            borderRadius: 14,
            height: 52,
            overflow: "hidden",
            background: "#fff",
            transition: "border-color 0.15s",
          }}
        >
          <CurrencyBadge isError={isError} />
          <input
            type="text"
            inputMode="numeric"
            placeholder={placeholder}
            value={val}
            onFocus={() => setLastEdited(null)} // clear errors when user focuses
            onChange={(e) => {
              // Set lastEdited FIRST so validation knows which field to flag
              setLastEdited(type);
              const raw = e.target.value.replace(/[^0-9]/g, "");
              const n = raw === "" ? null : parseInt(raw, 10);
              const formatted = n === null ? "" : fmtNum(n);
              if (isMin) {
                setMinInput(formatted);
                onMinChange?.(n === null ? 0 : n);
              } else {
                setMaxInput(formatted);
                onMaxChange?.(n === null ? ABSOLUTE_MAX : n);
              }
            }}
            style={{
              flex: 1,
              minWidth: 0,
              width: 0,
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: 16,
              fontWeight: 500,
              color: isError ? "#c0392b" : "#222",
              transition: "color 0.15s",
            }}
          />
          <button
            onClick={() => openDrawer(type)}
            style={{
              width: 36,
              height: 52,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#888",
              padding: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 5L7 9.5L11.5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Inline error — only shown on the field that caused the conflict */}
        {isError && (
          <p style={{ fontSize: 12, color: "#c0392b", margin: "0 2px" }}>
            {errMsg}
          </p>
        )}
      </div>
    );
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
      {label && (
        <div style={{ fontSize: 15, fontWeight: 500, color: "#222" }}>{label}</div>
      )}

      {!currency && countryCode && (
        <div
          style={{
            fontSize: 12,
            color: "#888",
            background: "#f5f5f5",
            borderRadius: 6,
            padding: "4px 10px",
            alignSelf: "flex-start",
          }}
        >
          Currency not available for <strong>{countryCode.toUpperCase()}</strong>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 2px" }}>
        <span style={{ fontSize: 13, color: "#666" }}>Minimum</span>
        <span style={{ fontSize: 13, color: "#666" }}>Maximum</span>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        {inputBox("min")}
        {inputBox("max")}
      </div>

      <div style={{ fontSize: 12, color: "#888", textAlign: "center" }}>
        {minValue === 0 ? "No Min" : `${sym} ${fmtNum(minValue)}`}
        {" — "}
        {maxValue === ABSOLUTE_MAX ? "No Limit" : `${sym} ${fmtNum(maxValue)}`}
      </div>

      {/* ── Drawer ── */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{drawerType === "min" ? "Minimum" : "Maximum"}</DrawerTitle>
            <DrawerClose asChild>
              <button
                style={{
                  position: "absolute",
                  right: 20,
                  top: 20,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#f2f2f2",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  color: "#555",
                }}
              >
                ✕
              </button>
            </DrawerClose>
          </DrawerHeader>

          {/* Custom amount input */}
          <div style={{ padding: "12px 20px 8px", borderBottom: "1px solid #f0f0f0" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: drawerInvalid ? "1.5px solid #c0392b" : "1.5px solid #d8d8d8",
                borderRadius: 12,
                padding: "0 14px",
                height: 48,
                background: "#fafafa",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 14, color: "#222", whiteSpace: "nowrap" }}>
                {sym}
              </span>
              <input
                type="text"
                inputMode="numeric"
                placeholder={drawerType === "min" ? "Enter min amount" : "Enter max amount"}
                value={drawerInputText}
                onChange={(e) => setDrawerInputText(e.target.value.replace(/[^0-9]/g, ""))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !drawerInvalid && drawerInputText !== "")
                    handleDrawerApply();
                }}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#222",
                }}
              />
              {drawerInputText !== "" && (
                <button
                  onClick={() => setDrawerInputText("")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    color: "#aaa",
                    fontSize: 16,
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {drawerInvalid && (
              <p style={{ fontSize: 12, color: "#c0392b", margin: "6px 2px 0" }}>
                {drawerType === "min"
                  ? `Must be less than max (${sym} ${fmtNum(maxValue)})`
                  : `Must be greater than min (${sym} ${fmtNum(minValue)})`}
              </p>
            )}

            {drawerInputText !== "" && !drawerInvalid && (
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleDrawerApply();
                }}
                style={{
                  marginTop: 10,
                  width: "100%",
                  height: 44,
                  borderRadius: 12,
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            )}
          </div>

          {/* Preset list */}
          <div style={{ overflowY: "auto", flex: 1, paddingBottom: 24 }}>
            {presets.map(({ value: val, label: presetLabel }, i) => {
              const isSelected =
                drawerType === "min"
                  ? val === minValue
                  : maxValue === ABSOLUTE_MAX
                  ? val === null
                  : val === maxValue;

              const isDisabled =
                drawerType === "min"
                  ? maxValue !== ABSOLUTE_MAX &&
                    val !== null &&
                    val !== 0 &&
                    (val as number) >= maxValue
                  : val !== null &&
                    minValue > 0 &&
                    (val as number) <= minValue;

              return (
                <div key={i}>
                  <div
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (!isDisabled) handleSelect(val);
                    }}
                    onClick={() => !isDisabled && handleSelect(val)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "15px 20px",
                      cursor: isDisabled ? "not-allowed" : "pointer",
                      background: isSelected ? "#f5f5f5" : "transparent",
                      opacity: isDisabled ? 0.35 : 1,
                      WebkitTapHighlightColor: "transparent",
                      userSelect: "none",
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: isSelected ? "2px solid #111" : "2px solid #ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#111",
                          }}
                        />
                      )}
                    </div>
                    <span style={{ fontSize: 16, color: isDisabled ? "#bbb" : "#222" }}>
                      {presetLabel}
                    </span>
                  </div>
                  {i < presets.length - 1 && (
                    <div style={{ height: 1, background: "#f0f0f0", margin: "0 20px" }} />
                  )}
                </div>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

// ─── Page shell ───────────────────────────────────────────────────────────────

export function PriceRangeClient({ countryCode }: { countryCode?: string }) {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(ABSOLUTE_MAX);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f7f7f7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, color: "#111" }}>
          Price Range
        </div>
        <LaAmountRange
          label="Select your budget"
          minValue={minVal}
          maxValue={maxVal}
          onMinChange={setMinVal}
          onMaxChange={setMaxVal}
          countryCode={countryCode}
        />
      </div>
    </main>
  );
}
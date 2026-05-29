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

function buildPresets(sym: string): Preset[] {
  const amounts = [200, 400, 600, 800, 1000, 1200, 1500, 2000, 2500, 3000];
  const fmt = (n: number) => n.toLocaleString("en-US");
  return [
    { value: null, label: "No Amount" },
    ...amounts.map((v) => ({ value: v, label: `${sym} ${fmt(v)}` })),
  ];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtNum(n: number | string) {
  const v = parseInt(String(n).replace(/,/g, ""), 10);
  return isNaN(v) ? "" : v.toLocaleString("en-US");
}

// ─── Types ────────────────────────────────────────────────────────────────────

type LaAmountInputProps = {
  label?: string;
  value: number;
  onChange?: (v: number) => void;
  countryCode?: string;
  placeholder?: string;
};

// ─── LaAmountInput ────────────────────────────────────────────────────────────

function LaAmountInput({
  label,
  value,
  onChange,
  countryCode,
  placeholder = "No Amount",
}: LaAmountInputProps) {
  const currency = getCurrencyForCountry(countryCode);
  const sym = currency ? currency.symbol : "N/A";
  const presets = buildPresets(sym);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inputText, setInputText] = useState(
    value === 0 ? "" : fmtNum(value)
  );

  const handleSelect = (val: number | null) => {
    const resolved = val === null ? 0 : val;
    onChange?.(resolved);
    setInputText(resolved === 0 ? "" : fmtNum(resolved));
    setDrawerOpen(false);
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

      {/* ── Single input box ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1.5px solid #d8d8d8",
          borderRadius: 14,
          height: 52,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111",
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            borderRadius: 8,
            padding: "4px 10px",
            margin: "0 8px",
            flexShrink: 0,
            whiteSpace: "nowrap",
            minWidth: 36,
          }}
        >
          {sym}
        </span>

        <input
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={inputText}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            const n = raw === "" ? null : parseInt(raw, 10);
            const formatted = n === null ? "" : fmtNum(n);
            setInputText(formatted);
            onChange?.(n === null ? 0 : n);
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
            color: "#222",
          }}
        />

        <button
          onClick={() => setDrawerOpen(true)}
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

      <div style={{ fontSize: 12, color: "#888", textAlign: "center" }}>
        {value === 0 ? "No Amount" : `${sym} ${fmtNum(value)}`}
      </div>

      {/* ── Drawer ── */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Select Amount</DrawerTitle>
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

          {/* Preset list only — no custom input */}
          <div style={{ overflowY: "auto", flex: 1, paddingBottom: 24 }}>
            {presets.map(({ value: val, label: presetLabel }, i) => {
              const isSelected = val === null ? value === 0 : val === value;

              return (
                <div key={i}>
                  <div
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(val);
                    }}
                    onClick={() => handleSelect(val)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "15px 20px",
                      cursor: "pointer",
                      background: isSelected ? "#f5f5f5" : "transparent",
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
                    <span style={{ fontSize: 16, color: "#222" }}>
                      {presetLabel}
                    </span>
                  </div>
                  {i < presets.length - 1 && (
                    <div
                      style={{ height: 1, background: "#f0f0f0", margin: "0 20px" }}
                    />
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

export function PriceInput({ countryCode }: { countryCode?: string }) {
  const [amount, setAmount] = useState(0);

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
          la-amount-input
        </div>
        <LaAmountInput
          label="Enter your amount"
          value={amount}
          onChange={setAmount}
          countryCode={countryCode}
        />
      </div>
    </main>
  );
}
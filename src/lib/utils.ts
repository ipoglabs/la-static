import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats a country dial code + raw digit string into a readable phone number
// e.g. country.dial="65", phone="12345678" → "+65 1234 5678"
export function formatPhone(country: { dial: string }, phone: string): string {
  const clean = phone.replace(/\D/g, "");
  let grouped = clean;
  if (clean.length > 8) {
    grouped = `${clean.slice(0, 4)} ${clean.slice(4, 8)} ${clean.slice(8)}`;
  } else if (clean.length > 4) {
    grouped = `${clean.slice(0, 4)} ${clean.slice(4)}`;
  }
  return `+${country.dial} ${grouped}`.trim();
}
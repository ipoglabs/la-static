import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formats a raw digit string into a readable phone number
// e.g. "12345678" → "1234 5678"
export function formatPhone(digits: string): string {
  const clean = digits.replace(/\D/g, "");
  if (clean.length <= 4) return clean;
  if (clean.length <= 8) return `${clean.slice(0, 4)} ${clean.slice(4)}`;
  return `${clean.slice(0, 4)} ${clean.slice(4, 8)} ${clean.slice(8)}`;
}
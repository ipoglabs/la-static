export function isValidEmail(value: string) {
  if (!value) return false;
  return /^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(value.trim());
}

export function normalizePhoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function isValidPhone(value: string, minLen = 6) {
  const digits = normalizePhoneDigits(value);
  return digits.length >= minLen;
}

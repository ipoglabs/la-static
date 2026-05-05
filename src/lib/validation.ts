export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
export function isValidPhone(phone: string, minLen: number) {
  return phone.replace(/\D/g, "").length >= minLen;
}
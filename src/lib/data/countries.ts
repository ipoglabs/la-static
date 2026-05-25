export const COUNTRIES = [
  { code: "SG", name: "Singapore",   dial: "65",  flag: "🇸🇬", minLen: 8,  maxLen: 8,  currency: "SGD", currencySymbol: "S$"  },
  { code: "IN", name: "India",       dial: "91",  flag: "🇮🇳", minLen: 10, maxLen: 10, currency: "INR", currencySymbol: "₹"   },
  { code: "GB", name: "UK",          dial: "44",  flag: "🇬🇧", minLen: 10, maxLen: 10, currency: "GBP", currencySymbol: "£"   },
  { code: "US", name: "USA",         dial: "1",   flag: "🇺🇸", minLen: 10, maxLen: 10, currency: "USD", currencySymbol: "$"   },
  { code: "AU", name: "Australia",   dial: "61",  flag: "🇦🇺", minLen: 9,  maxLen: 9,  currency: "AUD", currencySymbol: "A$"  },
  { code: "MY", name: "Malaysia",    dial: "60",  flag: "🇲🇾", minLen: 9,  maxLen: 10, currency: "MYR", currencySymbol: "RM"  },
  { code: "CA", name: "Canada",      dial: "1",   flag: "🇨🇦", minLen: 10, maxLen: 10, currency: "CAD", currencySymbol: "C$"  },
  { code: "NZ", name: "New Zealand", dial: "64",  flag: "🇳🇿", minLen: 9,  maxLen: 9,  currency: "NZD", currencySymbol: "NZ$" },
  { code: "CH", name: "Switzerland", dial: "41",  flag: "🇨🇭", minLen: 9,  maxLen: 9,  currency: "CHF", currencySymbol: "Fr"  },
  { code: "FR", name: "France",      dial: "33",  flag: "🇫🇷", minLen: 9,  maxLen: 9,  currency: "EUR", currencySymbol: "€"   },
  { code: "AE", name: "UAE",         dial: "971", flag: "🇦🇪", minLen: 9,  maxLen: 9,  currency: "AED", currencySymbol: "AED" },
  { code: "DE", name: "Germany",     dial: "49",  flag: "🇩🇪", minLen: 10, maxLen: 12, currency: "EUR", currencySymbol: "€"   },
  { code: "AT", name: "Austria",     dial: "43",  flag: "🇦🇹", minLen: 9,  maxLen: 10, currency: "EUR", currencySymbol: "€"   },
] as const;

export type Country = (typeof COUNTRIES)[number];

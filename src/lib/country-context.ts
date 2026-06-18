import appConfig from "@/config/app.config.yaml";

export const COUNTRY_COOKIE  = appConfig.cookies.countryCookie as string;
export const PENDING_COOKIE  = appConfig.cookies.pendingCookie as string;
export const COOKIE_MAX_AGE  = appConfig.cookies.cookieMaxAgeSeconds as number;
export const PENDING_MAX_AGE = appConfig.cookies.pendingMaxAgeSeconds as number;

// Detection config
export const IPINFO_URL        = appConfig.ipDetection.url as string;
export const DETECTION_TIMEOUT = appConfig.ipDetection.timeoutMs as number;

// Countries this app serves
export const SUPPORTED_CODES = appConfig.supportedCountryCodes as readonly string[];
export type  SupportedCountry = string;

export function isSupportedCountry(code: string): code is SupportedCountry {
  return SUPPORTED_CODES.includes(code);
}

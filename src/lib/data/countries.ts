import countriesConfig from "@/config/countries.yaml";

export type Country = {
  code: string;
  name: string;
  dial: string;
  flag: string;
  minLen: number;
  maxLen: number;
  currency: string;
  currencySymbol: string;
};

export const COUNTRIES: Country[] = countriesConfig.countries;

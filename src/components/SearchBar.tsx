"use client";

import { useState } from "react";
import { useCountry } from "@/components/country/CountryProvider";
import { LocationPicker } from "@/components/location-picker";
import type { LocationValue } from "@/components/location-picker";

const SCOPE_CODE_MAP: Record<string, string> = { GB: "UK" };

export default function SearchBar() {
  const { country } = useCountry();
  const [location, setLocation] = useState<LocationValue | null>(null);

  const scopeCode = country ? (SCOPE_CODE_MAP[country] ?? country) : null;

  return (
    <div className="bg-slate-800 pt-4 pb-4 shadow-gray-200 shadow-lg w-full">

      {/* TITLE */}
      <div className="container max-w-screen-sm mx-auto px-4 text-center pb-1">
        <h1 className="text-white text-2xl sm:text-4xl leading-tight font-bold mb-3">
          You can find anything with lokalads, just start...
        </h1>
        <h3 className="text-slate-300">Search from 3.2M posts</h3>
      </div>

      {/* SEARCH FORM */}
      <form className="container mx-auto px-4 flex flex-col gap-2 max-w-screen-lg pb-0">

        {/* 🔍 KEYWORD */}
        <div className="relative w-full">

          {/* ICON */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 absolute left-2 top-[50%] -translate-y-1/2 text-slate-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm-8.25 6.75a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>

          {/* INPUT */}
          <input
            className="w-full h-[38px] pl-10 pr-20 rounded-md bg-gray-100 focus:bg-white outline-none text-sm"
            placeholder="ex: Toyota Hybrid Car in Vehicles"
          />

          {/* GO BUTTON */}
          <button
            type="submit"
            className="absolute right-[2px] top-[2px] h-[34px] px-6 rounded-md bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold"
          >
            GO
          </button>
        </div>

        {/* 📍 LOCATION + 🔔 ALERT */}
        {scopeCode && (
          <div className="flex items-center justify-between gap-3">

            <LocationPicker
              countryScope={[scopeCode]}
              onChange={setLocation}
              searchProvider="google"
            />

            <a
              href="#"
              className="group flex flex-none items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-sm font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 rotate-12 transition-colors group-hover:text-rose-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>
              <span className="hidden sm:inline">Create Alert</span>
            </a>

          </div>
        )}

      </form>

    </div>
  );
}

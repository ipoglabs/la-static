"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ListingPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-200 min-h-screen">

      {/* 🔥 SEARCH BAR */}
      <div className="bg-slate-800 py-2">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row gap-2">

          {/* KEYWORD */}
          <div className="relative flex-1 h-[30px]">
            <svg className="size-4 absolute left-2 top-[6px] text-slate-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Z" />
            </svg>
            <input
              className="w-full h-[30px] pl-7 rounded-md bg-gray-100 text-sm"
              placeholder="ex: Toyota Hybrid Car"
            />
          </div>

          {/* LOCATION */}
          <div className="flex flex-1">
            <div className="relative flex-1 h-[30px]">
              <svg className="size-4 absolute left-2 top-[6px] text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25c-5 0-9 4-9 9 0 7 9 12 9 12s9-5 9-12c0-5-4-9-9-9z" />
              </svg>
              <input
                className="w-full h-[30px] pl-7 rounded-l-md bg-gray-100 text-sm"
                placeholder="Location"
              />
            </div>

            <button className="bg-slate-200 px-3 text-sm rounded-r-md">
              + 0 km
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="container mx-auto px-4 py-4 flex gap-4">

        {/* SIDEBAR (DESKTOP) */}
        <div className="hidden md:block w-64 bg-white border rounded-md p-4 shadow-sm self-start sticky top-4">
          <SidebarContent />
        </div>

        {/* MOBILE SIDEBAR */}
        {open && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />
            <div className="relative w-72 bg-white p-4 shadow-lg overflow-y-auto">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-slate-500"
              >
                ✕
              </button>
              <SidebarContent />
            </div>
          </div>
        )}

        {/* RIGHT */}
        <div className="flex-1">

          {/* TOP BAR */}
          <div className="flex items-center mb-3">

            {/* 🔥 MOBILE FILTER ICON */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden flex items-center justify-center w-9 h-9 bg-slate-300 rounded-lg mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5 text-slate-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </button>

            <p className="text-sm">
              <span className="text-lg font-semibold">918</span> results
            </p>

            <div className="flex-1" />

            <button className="bg-white border px-3 py-1 rounded-full text-sm">
              Sort by: Newest
            </button>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Link
                key={item}
                href="/detail"
                className="bg-white rounded-lg border shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src="/images/img6.jpg"
                    alt="listing"
                    width={400}
                    height={160}
                    className="h-40 w-full object-cover"
                  />
                </div>

                <div className="p-3">
                  <div className="flex justify-between">
                    <div className="text-lg font-semibold">$4500</div>
                    <span>♡</span>
                  </div>

                  <h4 className="text-sm mt-1">
                    Beautiful 5 Bed Room Villa
                  </h4>

                  <p className="text-xs mt-2">📍 Dartford</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function SidebarContent() {
  return (
    <>
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5 text-slate-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
        <h2 className="text-lg font-semibold text-slate-700">Filters</h2>
      </div>

      {/* PRICE */}
      <div className="border-b border-slate-300 mt-3">
        <p className="text-sm font-semibold text-slate-800">Price Range</p>

        <div className="flex items-end justify-between gap-1 pt-2 pb-3">
          <div className="flex-1">
            <span className="text-xs text-slate-500">Min Price</span>
            <button className="w-full bg-slate-200 rounded-md text-xs px-3 py-1 mt-1">
              No Min
            </button>
          </div>

          <span className="text-xs">to</span>

          <div className="flex-1 text-right">
            <span className="text-xs text-slate-500">Max Price</span>
            <button className="w-full bg-slate-200 rounded-md text-xs px-3 py-1 mt-1">
              No Max
            </button>
          </div>
        </div>
      </div>

      {/* PROPERTY TYPE */}
      <div className="border-b border-slate-300 mt-3">
        <p className="text-sm font-semibold text-slate-800">Property type</p>

        <div className="flex flex-wrap gap-2 pt-2 pb-3">
          {[
            "Detached",
            "Semi Detached",
            "Terraced",
            "Apartment",
            "Bungalow",
            "Farm House",
          ].map((item, i) => (
            <button
              key={i}
              className={`text-xs px-3 py-1 rounded-full border ${
                i === 2 || i === 3
                  ? "bg-slate-600 text-white"
                  : "bg-slate-200 text-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* BEDROOMS */}
      <div className="border-b border-slate-300 mt-3">
        <p className="text-sm font-semibold text-slate-800">
          Number of Bedrooms
        </p>

        <div className="flex items-end justify-between gap-1 pt-2 pb-3">
          <div className="flex-1">
            <span className="text-xs text-slate-500">Min Beds</span>
            <button className="w-full bg-slate-200 rounded-md text-xs px-3 py-1 mt-1">
              No Min
            </button>
          </div>

          <span className="text-xs">to</span>

          <div className="flex-1 text-right">
            <span className="text-xs text-slate-500">Max Beds</span>
            <button className="w-full bg-slate-200 rounded-md text-xs px-3 py-1 mt-1">
              No Max
            </button>
          </div>
        </div>
      </div>

      {/* ADDED */}
      <div className="border-b border-slate-300 mt-3 pb-3">
        <p className="text-sm font-semibold text-slate-800">Added to Site</p>
        <button className="w-full bg-slate-200 rounded-md text-xs px-3 py-1 mt-2">
          Anytime
        </button>
      </div>

      {/* MUST HAVE */}
      <div className="border-b border-slate-300 mt-3">
        <p className="text-sm font-semibold text-slate-800">Must have</p>

        <div className="flex flex-wrap gap-2 pt-2 pb-3">
          {["Garden", "Parking", "Utility Room"].map((item) => (
            <button
              key={item}
              className="bg-slate-200 text-xs px-3 py-1 rounded-full border"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* LISTED BY */}
      <div className="mt-3">
        <p className="text-sm font-semibold text-slate-800">Listed by</p>

        <div className="flex gap-2 pt-2 pb-3">
          <button className="bg-slate-200 text-xs px-3 py-1 rounded-full border">
            Owner
          </button>
          <button className="bg-slate-200 text-xs px-3 py-1 rounded-full border">
            Agent
          </button>
        </div>
      </div>

      {/* APPLY */}
      <div className="mt-4">
        <button className="w-full bg-slate-700 text-white py-2 rounded-full">
          Apply
        </button>
      </div>
    </>
  );
}
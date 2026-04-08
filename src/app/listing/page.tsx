"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ListingPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-200 min-h-screen">

      {/* SEARCH */}
      <div className="bg-slate-800 py-2">
        <div className="container mx-auto px-4 flex gap-2">
          <input className="flex-1 h-[34px] rounded-md px-3 text-sm bg-gray-100" />
          <input className="flex-1 h-[34px] rounded-md px-3 text-sm bg-gray-100" />
          <button className="bg-slate-200 px-4 rounded-md text-sm">
            + 0 miles
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="container mx-auto px-4 py-4 flex gap-4">

        {/* SIDEBAR (DESKTOP) */}
        <div className="hidden md:block w-64 bg-white border rounded-md p-4 shadow-sm">
          <SidebarContent />
        </div>

        {/* MOBILE SIDEBAR OVERLAY */}
        {open && (
          <div className="fixed inset-0 z-50 flex">
            {/* background */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />

            {/* sidebar */}
            <div className="relative w-72 bg-white p-4 shadow-lg">
              <SidebarContent />
            </div>
          </div>
        )}

        {/* RIGHT */}
        <div className="flex-1">

          {/* TOP BAR */}
          <div className="flex items-center mb-3">

            {/* MOBILE FILTER BUTTON */}
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
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            {[1,2,3].map((item) => (
              <Link
                key={item}
                href="/listing/details"
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
                  <span className="absolute bottom-2 left-2 bg-black text-white text-xs px-2 rounded">
                    1/18
                  </span>
                </div>

                <div className="p-3">
                  <div className="flex justify-between">
                    <div className="text-lg font-semibold">$4500</div>
                    <span>♡</span>
                  </div>

                  <h4 className="text-sm mt-1 line-clamp-2">
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

        <h2 className="text-[16px] font-semibold text-slate-700">
          Filters
        </h2>
      </div>

      {/* PRICE */}
      <div className="border-b pb-3 mb-3">
        <p className="text-sm font-semibold">Price Range</p>
        <div className="flex gap-2 mt-2">
          <button className="flex-1 bg-slate-200 text-xs py-1 rounded">
            No Min
          </button>
          <button className="flex-1 bg-slate-200 text-xs py-1 rounded">
            No Max
          </button>
        </div>
      </div>

      {/* PROPERTY TYPE */}
      <div className="border-b pb-3 mb-3">
        <p className="text-sm font-semibold">Property type</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {[
            "Detached",
            "Semi Detached",
            "Terraced",
            "Appartment",
            "Bungalow",
            "Farm House",
          ].map((item, i) => (
            <button
              key={i}
              className={`text-xs px-3 py-1 rounded-full ${
                i >= 2
                  ? "bg-slate-700 text-white"
                  : "bg-slate-200 text-slate-800"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* BEDROOMS */}
      <div className="border-b pb-3 mb-3">
        <p className="text-sm font-semibold">Number of Bedrooms</p>
        <div className="flex gap-2 mt-2">
          <button className="flex-1 bg-slate-200 text-xs py-1 rounded">
            No Min
          </button>
          <button className="flex-1 bg-slate-200 text-xs py-1 rounded">
            No Max
          </button>
        </div>
      </div>

      {/* ADDED */}
      <div className="border-b pb-3 mb-3">
        <p className="text-sm font-semibold">Added to Site</p>
        <button className="w-full bg-slate-200 text-xs py-1 rounded mt-2">
          Anytime
        </button>
      </div>

      {/* MUST HAVE */}
      <div className="border-b pb-3 mb-3">
        <p className="text-sm font-semibold">Must have</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Garden", "Parking", "Utility Room"].map((item) => (
            <button
              key={item}
              className="bg-slate-200 text-xs px-3 py-1 rounded-full"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* LISTED BY */}
      <div className="mb-3">
        <p className="text-sm font-semibold">Listed by</p>
        <div className="flex gap-2 mt-2">
          <button className="bg-slate-200 text-xs px-3 py-1 rounded-full">
            Owner
          </button>
          <button className="bg-slate-200 text-xs px-3 py-1 rounded-full">
            Agent
          </button>
        </div>
      </div>

      {/* APPLY */}
      <button className="w-full bg-slate-700 text-white py-2 rounded-full mt-3">
        Apply
      </button>
    </>
  );
}



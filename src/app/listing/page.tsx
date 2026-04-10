"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ListingPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="bg-slate-950/10 min-h-screen">

      {/* SEARCH BAR */}
      <div className="bg-slate-800 py-2">
        <form className="container mx-auto px-4 sm:px-6 lg:px-16 flex flex-col sm:flex-row gap-2">

          {/* KEYWORD */}
          <div className="relative flex-1 h-[30px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 absolute left-2 top-[6px] text-slate-500 pointer-events-none"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="appearance-none w-full h-[30px] pl-7 pr-9 focus:outline-none rounded-md bg-gray-100 focus:bg-white text-sm text-slate-900 placeholder:text-slate-600"
              type="text"
              placeholder="ex: Toyota Hybrid Car"
            />
          </div>

          {/* LOCATION */}
          <div className="flex flex-1">
            <div className="relative flex-1 h-[30px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 absolute left-1.5 top-[6px] text-slate-500 pointer-events-none"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="appearance-none w-full h-[30px] pl-7 pr-9 focus:outline-none rounded-l-md bg-gray-100 focus:bg-white text-sm text-slate-900 placeholder:text-slate-600"
                type="text"
                placeholder="Dartford, Kent"
              />
            </div>
            <button
              type="button"
              className="relative flex items-center rounded-r-md border-l border-slate-400 bg-slate-200 active:bg-slate-300 h-[30px] pl-4 pr-6"
            >
              <span className="text-sm font-semibold text-slate-900">+ 0 miles</span>
              <svg className="absolute top-2 right-1 w-4 h-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* MAIN */}
      <div className="container mx-auto flex flex-row items-start flex-nowrap gap-4 px-4 sm:px-6 lg:px-16 py-4">

        {/* SIDEBAR (DESKTOP) */}
        <div
          className="w-64 flex-none bg-white border border-slate-400 rounded-md shadow-md hidden md:flex flex-col sticky top-4 self-start"
          style={{ maxHeight: "calc(100vh - 2rem)" }}
        >
          {/* Sticky Header */}
          <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-slate-200 flex-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-slate-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            <h2 className="text-lg font-semibold text-slate-700">Filters</h2>
          </div>
          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 px-4">
            <SidebarContent />
          </div>
          {/* Sticky Footer */}
          <div className="px-4 py-3 border-t border-slate-200 flex-none">
            <button className="w-full bg-slate-700 hover:bg-slate-900 rounded-full text-white text-sm text-center font-medium px-3 pt-1 pb-2">
              Apply
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 max-sm:w-full">

          {/* TOP BAR */}
          <div className="flex items-center">

            {/* MOBILE FILTER BUTTON */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 bg-slate-300 hover:bg-slate-50 rounded-lg mr-2"
              onClick={() => setDrawerOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-slate-800">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
            </button>

            <p className="font-normal">
              <span className="text-lg font-semibold">918</span> results
            </p>

            <div className="flex-1" />

            <div className="text-sm flex items-center gap-1">
              <span>Sort by: </span>
              <div className="relative inline-block">
                <button type="button" className="relative inline-flex items-center text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 border border-slate-400 rounded-full px-3 pb-1 pt-[2px] pr-7">
                  Newest
                  <svg className="absolute top-1.5 right-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* GRID */}
          <div className="w-full mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Link key={item} href="/detail" className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-slate-300">
                <div className="relative overflow-hidden">
                  <span className="inline-block absolute left-1.5 bottom-1.5 bg-gray-900 bg-opacity-75 text-white py-0.5 px-2 text-xs rounded-full uppercase font-semibold tracking-tight z-10">
                    1 / 18
                  </span>
                  <Image src="/images/img6.jpg" alt="listing" width={400} height={160} className="h-40 w-full object-cover transition duration-200" />
                </div>
                <div className="px-4 pt-1">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-xl text-gray-700">
                      $4500 || Appartment <span className="text-gray-600 text-sm"></span>
                    </div>
                    <span className="flex-1" />
                    <button className="size-8 flex items-center justify-center bg-slate-50 hover:bg-slate-200 -mr-2" onClick={(e) => e.preventDefault()}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9 text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                      </svg>
                    </button>
                  </div>
                  <h4 className="text-sm font-normal line-clamp-2">
                    Beautiful 5 Bed Room Villa Home in the dartford countryside, 3 mins walk to station.
                  </h4>
                  <div className="text-gray-500 text-[11px] uppercase font-semibold tracking-wide pt-1.5 pb-1 -mt-0.5">
                    3 beds &bull; 2 baths &bull; Apartment
                  </div>
                  <div className="flex items-end text-xs font-normal text-slate-700 pt-2 pb-3">
                    <span className="flex-1 pr-4 leading-normal">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 inline text-slate-500 -translate-y-0.5">
                        <path fillRule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
                      </svg>
                      {" "}Dartford, Kent
                    </span>
                    <span className="text-slate-900">2d ago</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== MOBILE FILTER PANEL ===================== */}
      {drawerOpen && (
        <>
          {/* Backdrop — clicking closes the panel */}
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Panel: right-14 = 56px gap on the right so it looks like a sidebar, not full screen */}
          <div className="fixed top-0 bottom-0 left-0 right-14 z-50 bg-white flex flex-col md:hidden shadow-2xl">

            {/* Sticky Header */}
            <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-slate-200 flex-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-slate-700 flex-none">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
              <h2 className="text-lg font-semibold text-slate-700 flex-1">Filters</h2>
              {/* ✕ Close Icon */}
              <button
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 flex-none"
                onClick={() => setDrawerOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content only */}
            <div className="overflow-y-auto flex-1 px-4">
              <SidebarContent />
            </div>

            {/* Sticky Footer */}
            <div className="px-4 py-3 border-t border-slate-200 flex-none">
              <button
                className="w-full bg-slate-700 hover:bg-slate-900 rounded-full text-white text-sm text-center font-medium px-3 pt-1 pb-2"
                onClick={() => setDrawerOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SidebarContent() {
  return (
    <>
      {/* PRICE */}
      <div className="border-b border-slate-300 mt-3">
        <p className="text-sm font-semibold text-slate-800">Price Range</p>
        <div className="flex flex-row flex-nowrap items-end justify-between gap-1 pt-2 pb-3">
          <div className="flex-1 flex flex-col">
            <span className="text-xs font-semibold text-slate-500">Min Price</span>
            <button className="w-full bg-slate-200 hover:bg-slate-300 rounded-md text-slate-800 border border-slate-300 text-xs text-center font-medium px-3 pt-1 pb-2">No Min</button>
          </div>
          <span className="text-xs">to</span>
          <div className="flex-1 flex flex-col items-end">
            <span className="text-xs font-semibold text-slate-500">Max Price</span>
            <button className="w-full bg-slate-200 hover:bg-slate-300 rounded-md text-slate-800 border border-slate-300 text-xs text-center font-medium px-3 pt-1 pb-2">No Max</button>
          </div>
        </div>
      </div>

      {/* PROPERTY TYPE */}
      <div className="border-b border-slate-300 mt-3">
        <p className="text-sm font-semibold text-slate-800">Property type</p>
        <div className="flex flex-wrap gap-2 pt-2 pb-3">
          {["Detached", "Semi Detached", "Terraced", "Apartment", "Bungalow", "Farm House"].map((item, i) => (
            <button key={i} className={`text-xs px-3 py-1 rounded-full border font-medium ${i === 2 || i === 3 ? "bg-slate-600 text-white border-slate-600" : "bg-slate-200 text-slate-800 border-slate-300 hover:bg-slate-300"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* BEDROOMS */}
      <div className="border-b border-slate-300 mt-3">
        <p className="text-sm font-semibold text-slate-800">Number of Bedrooms</p>
        <div className="flex flex-row flex-nowrap items-end justify-between gap-1 pt-2 pb-3">
          <div className="flex-1 flex flex-col">
            <span className="text-xs font-semibold text-slate-500">Min Beds</span>
            <button className="w-full bg-slate-200 hover:bg-slate-300 rounded-md text-slate-800 border border-slate-300 text-xs text-center font-medium px-3 pt-1 pb-2">No Min</button>
          </div>
          <span className="text-xs">to</span>
          <div className="flex-1 flex flex-col items-end">
            <span className="text-xs font-semibold text-slate-500">Max Beds</span>
            <button className="w-full bg-slate-200 hover:bg-slate-300 rounded-md text-slate-800 border border-slate-300 text-xs text-center font-medium px-3 pt-1 pb-2">No Max</button>
          </div>
        </div>
      </div>

      {/* ADDED TO SITE */}
      <div className="border-b border-slate-300 mt-3 pb-3">
        <p className="text-sm font-semibold text-slate-800">Added to Site</p>
        <button className="w-full bg-slate-200 hover:bg-slate-300 rounded-md text-slate-800 border border-slate-300 text-xs text-center font-medium px-3 pt-1 pb-2 mt-2">Anytime</button>
      </div>

      {/* MUST HAVE */}
      <div className="border-b border-slate-300 mt-3">
        <p className="text-sm font-semibold text-slate-800">Must have</p>
        <div className="flex flex-wrap gap-2 pt-2 pb-3">
          {["Garden", "Parking", "Utility Room"].map((item) => (
            <button key={item} className="bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300 text-xs px-3 py-1 rounded-full font-medium">{item}</button>
          ))}
        </div>
      </div>

      {/* LISTED BY */}
      <div className="mt-3 pb-3">
        <p className="text-sm font-semibold text-slate-800">Listed by</p>
        <div className="flex gap-2 pt-2">
          <button className="bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300 text-xs px-3 py-1 rounded-full font-medium">Owner</button>
          <button className="bg-slate-200 hover:bg-slate-300 text-slate-800 border border-slate-300 text-xs px-3 py-1 rounded-full font-medium">Agent</button>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";

export default function SearchBar() {
  return (
    <div className="bg-slate-800 pt-4 pb-8 shadow-gray-200 shadow-lg w-full">

      {/* TITLE */}
      <div className="container max-w-screen-sm mx-auto px-4 text-center pb-4">
        <h1 className="text-white text-2xl sm:text-4xl leading-tight font-bold mb-3">
          You can find anything with lokalads, just start...
        </h1>
        <h3 className="text-slate-300">Search from 3.2M posts</h3>
      </div>

      {/* SEARCH FORM */}
      <form className="container mx-auto px-4 flex flex-col gap-2 max-w-screen-lg pb-1">

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

      </form>

    </div>
  );
}
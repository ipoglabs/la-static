"use client";

import Link from "next/link";

export default function SearchBar() {
  return (
    <div className="bg-slate-800 pt-4 pb-1 shadow-gray-200 shadow-lg w-full">

      {/* TITLE */}
      <div className="container max-w-screen-sm mx-auto px-4 text-center pb-4">
        <h1 className="text-white text-2xl sm:text-4xl leading-tight font-bold mb-3">
          You can find anything with lokalads, just start...
        </h1>
        <h3 className="text-slate-300">Search from 3.2M posts</h3>
      </div>

      {/* SEARCH FORM */}
      <form className="container mx-auto px-4 flex flex-col gap-2 max-w-screen-lg">

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

        {/* 📍 LOCATION + CREATE ALERT */}
        <div className="flex w-full items-center gap-2 pb-1">

          {/* INPUT */}
          <div className="relative w-48 sm:w-64 flex-shrink-0">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 absolute left-2 top-[50%] -translate-y-1/2 text-slate-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              className="w-full h-[38px] pl-10 rounded-l-md bg-gray-100 focus:bg-white outline-none text-sm"
              placeholder="ex: Dartford, Kent"
            />
          </div>

          {/* RADIUS */}
          <button
            type="button"
            className="flex items-center bg-slate-200 border-l px-4 h-[38px] rounded-r-md text-sm whitespace-nowrap flex-shrink-0"
          >
            + 0 miles
            <svg
              className="size-4 ml-1 text-slate-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 12l-5-5h10l-5 5z" />
            </svg>
          </button>

          {/* CREATE ALERT */}
          <Link
            href="#"
            className="flex items-center gap-2 text-slate-100 text-sm font-semibold hover:text-rose-400 ml-auto whitespace-nowrap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            Create Alert
          </Link>

        </div>
      </form>

    </div>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";


export default function Header() {
 

  return (
    <header className="border-b border-slate-200 shadow-md shadow-gray-300 bg-white w-full">
      <div className="container mx-auto h-16 flex items-center px-4 max-w-screen-lg">
        
        {/* Logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Image
            className="size-10"
            src="/assets/la-logo-symbol-color.svg"
            alt="logo"
            width={40}
            height={40}
          />
          <Image
            className="w-24 max-sm:hidden"
            src="/assets/la-text-black.svg"
            alt="logo"
            width={96}
            height={32}
          />
        </Link>

        
        <div className="flex-1" />

        {/* Right Section */}
        <div className="h-full flex items-center gap-2">
          
          {/* Wishlist */}
          <button className="hover:bg-slate-300 flex items-center justify-center w-11 max-sm:w-9 h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8 text-slate-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>

          {/* Post (Mobile) */}
          <Link
            href="#"
            className="size-9 bg-rose-500 hover:bg-rose-600 flex items-center justify-center rounded-full text-white text-2xl font-medium mr-2 sm:hidden"
          >
            +
          </Link>

          {/* Post (Desktop) */}
          <Link
            href="#"
            className="bg-rose-500 hover:bg-rose-600 flex items-center rounded-full text-white text-sm font-medium pl-2 pr-3 py-1 shadow-sm max-sm:hidden mr-2"
          >
            <svg width="20" height="20" fill="currentColor" className="mr-1">
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            POST
          </Link>

          {/* Avatar */}
          <button className="hover:bg-slate-300 flex items-center justify-center w-11 max-sm:w-9 h-full">
            <div className="relative size-10 bg-indigo-200 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-slate-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
          </button>

        </div>
      </div>
    </header>
  );
}
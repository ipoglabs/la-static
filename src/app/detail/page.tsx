"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

/* ─────────────────────────────────────────────
   Small reusable SVG helpers
───────────────────────────────────────────── */
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="block h-5 w-5 group-open:hidden">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="hidden h-5 w-5 group-open:block">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="me-1 h-6 w-6 text-green-800">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const BadgeCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline size-6 text-blue-600">
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
  </svg>
);

/* ─────────────────────────────────────────────
   Shared section card style
───────────────────────────────────────────── */
const sectionCls =
  "bg-white px-4 py-5 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md";

/* ─────────────────────────────────────────────
   ChitChat component (shared mobile + desktop)
───────────────────────────────────────────── */
function ChitChat({ sendIconOnly = false }: { sendIconOnly?: boolean }) {
  const [message, setMessage] = useState("");

  return (
    <section className={`${sectionCls} flex flex-col`}>
      <h2 className="font-bold text-2xl text-gray-700">ChitChat</h2>
      <p className="mb-4">Don&apos;t worry this is private message to owner.</p>

      <div className="flex-grow overflow-y-auto bg-gray-200 rounded-xl px-4 py-5">
        <div className="flex flex-col gap-3">
          <div className="flex justify-end">
            <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
              <p className="text-white text-sm">Hey, how are you?</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-white rounded-lg px-4 py-2 max-w-[80%]">
              <p className="text-gray-900 text-sm">I&apos;m good, thanks! How about you?</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[80%]">
              <p className="text-white text-sm">I am good, thank you! Could you please help share your number to call you over WhatsUp?</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center h-16">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border border-gray-500 rounded-lg py-2 px-4 w-full mr-3"
          placeholder="Type a message..."
        />
        <button className="border border-blue-600 bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-bold py-2 px-5 flex items-center justify-center">
          {sendIconOnly ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6">
              <path fill="currentColor" d="M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.837t.95-.088l15.4 6.5q.625.275.625.925t-.625.925z" />
            </svg>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   KeyDetailsTable component
───────────────────────────────────────────── */
function KeyDetailsTable({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <section className={sectionCls}>
      <h2 className="mb-2 text-xl font-medium text-slate-700">{title}</h2>
      <table className="min-w-full border-collapse">
        <tbody>
          {rows.map(([key, val], i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-slate-50 border-b" : "bg-white border-b"}>
              <td className="text-gray-900 font-normal px-5 py-1.5 whitespace-nowrap border border-slate-300">{key}</td>
              <td className="text-gray-900 font-normal px-5 py-1.5 whitespace-nowrap border border-slate-300">{val}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export default function PostDetailsPage() {
  const keyDetails1: [string, string][] = [
    ["Key 1", "Value 1"],
    ["Key 2", "Value 2"],
    ["Key 3", "Value 3"],
    ["Key 4", "Value 4"],
  ];

  const keyDetails2: [string, string][] = [
    ["Key 1", "Value 1"],
    ["Key 2", "Value 2"],
    ["Key 3", "Value 3"],
    ["Key 4", "Value 4"],
  ];

  return (
    <div className="bg-slate-950/15 min-w-[375px]">

      {/* ── MAIN BODY ── */}
      <div className="max-w-screen-2xl mx-auto sm:px-6 md:px-12 lg:px-20 xl:px-28 flex flex-col gap-y-2 items-stretch flex-nowrap">

        {/* Breadcrumb */}
        <div className="bg-slate-800 -mx-4 sm:mx-0 sm:rounded-b-md">
          <div className="px-4 sm:px-6 h-9 flex items-center">
            <ul className="flex items-center">
              <li className="inline-flex items-center">
                <Link href="/" className="hover:text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-200" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-2 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="inline-flex items-center">
                <Link href="#" className="text-slate-200 hover:text-slate-50 text-sm font-semibold">Main Category</Link>
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-2 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className="inline-flex items-center">
                <Link href="#" className="text-slate-200 hover:text-slate-50 text-sm font-semibold">Sub Category</Link>
              </li>
            </ul>

            <div className="flex-1" />

            <Link href="#" className="group flex items-center gap-2 text-slate-200 text-sm font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 rotate-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
              </svg>
              <span className="max-sm:hidden">Create Alert</span>
            </Link>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-stretch bg-white px-4 py-4 border-b border-slate-900/25 sm:rounded-md sm:border sm:shadow-md sm:shadow-black/10">
          <h2 className="font-semibold text-xl text-gray-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </h2>

          <div className="mt-0.5 flex items-start sm:gap-6 justify-between sm:justify-start">
            <div className="flex items-center gap-1 text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 text-slate-600">
                <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
              </svg>
              <span>James Smith Court, Dartford, DA1</span>
            </div>

            <button className="flex gap-2 items-center justify-between bg-blue-600 rounded-full text-white font-normal px-3 pt-[2px] pb-[4px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="max-sm:size-5 size-4">
                <path fillRule="evenodd" d="M3.74 20.25a.75.75 0 0 0 .75-.75V8.999h13.938l-2.47 2.47a.75.75 0 0 0 1.061 1.06l3.75-3.75a.75.75 0 0 0 0-1.06l-3.75-3.75a.75.75 0 0 0-1.06 1.06l2.47 2.47H3.738a.75.75 0 0 0-.75.75V19.5c0 .414.336.75.75.75Z" clipRule="evenodd" />
              </svg>
              <span className="text-sm max-sm:hidden">Direction</span>
            </button>
          </div>
        </div>

        {/* 2-col layout */}
        <div className="md:grid md:grid-cols-3 gap-x-2">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col flex-nowrap gap-y-2 col-span-1 md:col-span-2">

            {/* Gallery */}
            <section className={sectionCls}>
              <div className="flex flex-col gap-1">
                <div className="inline-block bg-slate-400 h-48 w-full rounded" />
                <div className="flex flex-row gap-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="size-12 bg-slate-400 rounded" />
                  ))}
                </div>
              </div>

              <div className="flex flex-row items-start gap-2 mt-3">
                <div className="font-bold text-2xl text-gray-800">$4500<span className="text-lg">pcm</span></div>
                <span className="flex-1" />
                <button className="size-10 flex items-center justify-center bg-slate-50 hover:bg-slate-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-slate-600">
                    <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="size-10 flex items-center justify-center bg-slate-50 hover:bg-slate-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-slate-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
              </div>
            </section>

            {/* Seller Info — mobile only */}
            <section className={`md:hidden ${sectionCls} relative flex flex-col flex-nowrap`}>
              <h2 className="mb-2 text-xl font-medium text-slate-700">Seller Details</h2>
              <div className="flex flex-row flex-nowrap gap-2">
                <div className="flex-none size-28 border-4 border-white rounded-full overflow-hidden mr-0.5">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max"
                    alt="Seller"
                    width={112}
                    height={128}
                    className="object-cover object-center h-32"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-1">Jannet Willson</h3>
                  <p className="-mt-1 mb-3 text-sm text-slate-600">
                    Property Agent, located in Dartford, Kent |{" "}
                    <span className="text-sm italic font-normal text-slate-600">&ldquo;Specializes in premium property listing&rdquo;</span>
                  </p>
                  <div className="flex items-center justify-start gap-2">
                    <div className="text-blue-700 inline-flex items-center text-sm rounded-md font-semibold mr-4">
                      <BadgeCheckIcon />
                      <span>Verified</span>
                    </div>
                    <div className="mr-1 px-2 py-1 flex items-center gap-1 text-xs text-slate-600 bg-slate-100 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                        <path d="M2.09 15a1 1 0 0 0 1-1V8a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM5.765 13H4.09V8c.663 0 1.218-.466 1.556-1.037a4.02 4.02 0 0 1 1.358-1.377c.478-.292.907-.706.989-1.26V4.32a9.03 9.03 0 0 0 0-2.642c-.028-.194.048-.394.224-.479A2 2 0 0 1 11.09 3c0 .812-.08 1.605-.235 2.371a.521.521 0 0 0 .502.629h1.733c1.104 0 2.01.898 1.901 1.997a19.831 19.831 0 0 1-1.081 4.788c-.27.747-.998 1.215-1.793 1.215H9.414c-.215 0-.428-.035-.632-.103l-2.384-.794A2.002 2.002 0 0 0 5.765 13Z" />
                      </svg>
                      <span>1.9K</span>
                    </div>
                    <div className="px-2 py-1 flex items-center gap-1 text-xs text-slate-600 bg-slate-100 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                        <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                      </svg>
                      <span>0.8K</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-2 text-xs text-[14px] text-slate-700 leading-4">
                <span>Loyal user since 2021</span> | <span>37 active Listing</span> | <span>Active: 2d ago</span>
              </div>
            </section>

            {/* CTA — mobile only */}
            <section className="md:hidden bg-slate-700 p-3 sm:rounded-b-md sm:shadow-black/10 sm:shadow-md flex flex-row flex-nowrap items-center gap-3 -mt-4 z-10">
              <button className="flex-1 bg-blue-500 rounded-lg h-11 text-white font-semibold">
                <div className="flex gap-3 justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                  <span className="text-lg">Email</span>
                </div>
              </button>
              <button className="flex-1 bg-rose-600 rounded-lg h-11 text-white font-semibold">
                <div className="flex gap-3 justify-center items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">Call</span>
                </div>
              </button>
            </section>

            {/* Description */}
            <section className={sectionCls}>
              <h2 className="mb-2 text-xl font-medium text-slate-700 flex items-center justify-between">
                <span>Description</span>
                <span className="text-sm font-normal text-slate-800">Posted on 21/01/2025</span>
              </h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <ul className="mt-5 px-3 sm:grid sm:grid-cols-2 md:grid-cols-3">
                {["Tailwind", "TW Elements", "UI/UX design", "Responsive web design"].map((item) => (
                  <li key={item} className="mb-2 flex">
                    <CheckCircleIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Key Details tables */}
            <KeyDetailsTable title="Key Details 1" rows={keyDetails1} />
            <KeyDetailsTable title="Key Details 2" rows={keyDetails2} />

            {/* Facts from Google */}
            <section className={sectionCls}>
              <h2 className="mb-2 text-xl font-medium text-slate-700">Facts from Google</h2>
              <div className="divide-y divide-gray-300">
                {["Stations nearby", "Schools nearby", "Walkable Shops"].map((item) => (
                  <details key={item} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-lg font-medium text-slate-600 group-open:text-slate-700">
                      {item}
                      <div>
                        <PlusIcon />
                        <MinusIcon />
                      </div>
                    </summary>
                    <div className="pb-4 text-slate-500">Content about {item.toLowerCase()} will appear here.</div>
                  </details>
                ))}
              </div>
            </section>

            {/* Map Snap — mobile only */}
            <section className="md:hidden bg-white border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md">
              <div className="px-4 pt-5 py-3">
                <h2 className="text-xl font-medium text-slate-700">Map Snap View</h2>
              </div>
              <div className="w-full p-1">
                <div className="p-2 flex items-center justify-center bg-slate-300 h-40 rounded-b-md">
                  <p>GMap iFrame view</p>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="bg-yellow-300 px-4 py-5 border-y border-yellow-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md">
              <h2 className="mb-2 text-xl font-medium text-slate-700">Disclaimer</h2>
              <p className="text-slate-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
            </section>

            {/* Adv ID & Report */}
            <section className={`${sectionCls} flex items-center justify-start`}>
              <p>Adv ID: <span className="font-bold">89788</span></p>
              <button className="ml-4 flex gap-2 items-center justify-between bg-red-600 hover:bg-red-700 rounded-full text-white font-normal px-4 pt-[3px] pb-[5px]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                  <path d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.392l1.657-.348a6.449 6.449 0 0 1 4.271.572 7.948 7.948 0 0 0 5.965.524l2.078-.64A.75.75 0 0 0 18 12.25v-8.5a.75.75 0 0 0-.904-.734l-2.38.501a7.25 7.25 0 0 1-4.186-.363l-.502-.2a8.75 8.75 0 0 0-5.053-.439l-1.475.31V2.75Z" />
                </svg>
                <span className="text-sm">REPORT</span>
              </button>
            </section>

            {/* ChitChat — mobile only */}
            <div className="md:hidden">
              <ChitChat sendIconOnly={false} />
            </div>

          </div>{/* end left col */}

          {/* ── RIGHT COLUMN ── */}
          <div className="max-md:hidden md:col-span-1 flex flex-col flex-nowrap gap-y-2">

            {/* Seller Details */}
            <section className="bg-white border border-slate-900/25 rounded-md shadow-black/10 shadow-md overflow-hidden">
              <div className="bg-slate-500 rounded-tl-md h-32 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max"
                  alt="Banner"
                  width={400}
                  height={128}
                  className="object-cover object-top w-full"
                />
              </div>

              <div className="max-lg:px-2 px-5 pt-3 mb-2 text-center">
                <div className="mx-auto w-32 h-32 relative -mt-28 border-4 border-white rounded-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max"
                    alt="Seller"
                    width={128}
                    height={128}
                    className="object-cover object-center h-32"
                  />
                </div>

                <h3 className="relative inline-block font-bold max-lg:text-xl text-2xl text-gray-800 mb-1">Jannet Willson</h3>

                <p className="-mt-1 mb-0.5 text-slate-600 max-lg:text-sm">
                  Property Agent, located in{" "}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3 inline">
                    <path fillRule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" />
                  </svg>{" "}
                  Dartford, Kent
                </p>

                <p className="italic max-lg:text-sm text-lg font-thin text-slate-800 mb-4">&ldquo;Specializes in premium property listing&rdquo;</p>

                <div className="bg-blue-200 text-blue-700 inline-flex items-center text-sm px-2 py-1 mb-2 rounded-md font-semibold">
                  <BadgeCheckIcon />
                  <span className="ml-1">Verified Seller</span>
                </div>

                <div className="mb-4 px-5 text-[14px] text-slate-700 leading-6">
                  <span>Loyal user since 2021</span> |{" "}
                  <span>37 active Listing</span> |{" "}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="inline size-4 text-slate-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>{" "}
                  <span>Last Active: 2d ago</span>
                </div>

                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="px-3 py-1 flex flex-row flex-nowrap gap-1 text-sm text-slate-600 bg-slate-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                      <path d="M2.09 15a1 1 0 0 0 1-1V8a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM5.765 13H4.09V8c.663 0 1.218-.466 1.556-1.037a4.02 4.02 0 0 1 1.358-1.377c.478-.292.907-.706.989-1.26V4.32a9.03 9.03 0 0 0 0-2.642c-.028-.194.048-.394.224-.479A2 2 0 0 1 11.09 3c0 .812-.08 1.605-.235 2.371a.521.521 0 0 0 .502.629h1.733c1.104 0 2.01.898 1.901 1.997a19.831 19.831 0 0 1-1.081 4.788c-.27.747-.998 1.215-1.793 1.215H9.414c-.215 0-.428-.035-.632-.103l-2.384-.794A2.002 2.002 0 0 0 5.765 13Z" />
                    </svg>
                    <span>1.9K <span className="max-lg:hidden">likes</span></span>
                  </div>
                  <div className="px-3 py-1 flex flex-row flex-nowrap gap-1 text-sm text-slate-600 bg-slate-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                      <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
                    </svg>
                    <span>0.8K <span className="max-lg:hidden">reviews</span></span>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="px-6 mb-5 flex flex-col flex-nowrap items-start gap-2.5">
                <button className="w-full border-2 border-gray-400 hover:bg-slate-100 rounded-lg py-1.5 text-black font-semibold">
                  <div className="flex gap-3 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>
                    <span className="text-lg">Email</span>
                  </div>
                </button>
                <button className="w-full border-2 bg-rose-600 rounded-lg text-white font-semibold py-2">
                  <div className="flex gap-3 justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-lg">Call</span>
                  </div>
                </button>
              </div>
            </section>

            {/* ChitChat — desktop */}
            <ChitChat sendIconOnly={true} />

            {/* Map Snap — desktop */}
            <section className="bg-white border border-slate-900/25 rounded-md shadow-black/10 shadow-md">
              <div className="px-4 pt-5 py-3">
                <h2 className="text-xl font-medium text-slate-700">Map Snap View</h2>
              </div>
              <div className="w-full p-1">
                <div className="p-2 flex items-center justify-center bg-slate-300 h-40 rounded-b-md">
                  <p>GMap iFrame view</p>
                </div>
              </div>
            </section>

          </div>{/* end right col */}
        </div>
      </div>

    </div>
  );
}

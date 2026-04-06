import Link from 'next/link'
import Image from 'next/image'

export default function PostPage() {
  return (
    <div className="bg-slate-950/15 min-w-[375px]">
      {/* Header */}
      <header className="shadow-md">
        <div className="bg-white">
          <div className="max-w-screen-2xl mx-auto sm:px-6 md:px-12 lg:px-20 xl:px-28 h-12 flex items-center">
            <Link className="flex gap-2 items-center" href="/">
              <Image className="size-10" src="/assets/la-logo-symbol-color.svg" alt="logo" width={40} height={40} />
              <Image className="w-24 max-sm:hidden" src="/assets/la-text-black.svg" alt="logo" width={96} height={32} />
            </Link>
            <div className="flex-1"></div>
            <span className="bg-lime-400 py-0.5 px-4 border-none rounded-full text-xs text-lime-900 font-medium mr-3">BETA</span>
            <div className="h-full flex items-center gap-2">
              <button className="hover:bg-slate-300 flex items-center justify-center flex-none w-11 max-sm:w-9 h-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-slate-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </button>
              <Link href="#" className="bg-rose-500 hover:bg-rose-600 group flex items-center rounded-full text-white text-sm font-medium pl-2 pr-3 py-1 shadow-sm max-sm:hidden mr-2">
                <svg width="20" height="20" fill="currentColor" className="mr-1" aria-hidden="true">
                  <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                </svg>
                POST
              </Link>
              <button className="hover:bg-slate-300 flex items-center justify-center flex-none w-11 max-sm:w-9 h-full">
                <div className="relative size-10 bg-indigo-200 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-slate-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto sm:px-6 md:px-12 lg:px-20 xl:px-28 flex flex-col gap-y-2 items-stretch flex-nowrap">

        {/* Title */}
        <div className="flex flex-col items-stretch bg-white px-4 py-4 border-b border-slate-900/25 sm:rounded-b-md sm:border-x sm:border-b sm:shadow-md sm:shadow-black/10">
          <h2 className="font-semibold text-xl text-gray-800">Beautiful 5 Bedroom Villa Home in the Dartford countryside, 3 mins walk to station.</h2>
          <div className="mt-0.5 flex items-start sm:gap-6 justify-between sm:justify-start">
            <div className="flex items-center gap-1 text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 text-slate-600">
                <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
              </svg>
              <span>James Smith Court, Dartford, DA1</span>
            </div>
            <button className="flex gap-2 items-center justify-between bg-blue-600 rounded-full text-white font-normal px-3 pt-[2px] pb-[4px]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path fillRule="evenodd" d="M3.74 20.25a.75.75 0 0 0 .75-.75V8.999h13.938l-2.47 2.47a.75.75 0 0 0 1.061 1.06l3.75-3.75a.75.75 0 0 0 0-1.06l-3.75-3.75a.75.75 0 0 0-1.06 1.06l2.47 2.47H3.738a.75.75 0 0 0-.75.75V19.5c0 .414.336.75.75.75Z" clipRule="evenodd" />
              </svg>
              <span className="text-sm max-sm:hidden">Direction</span>
            </button>
          </div>
        </div>

        {/* 2-col layout */}
        <div className="md:grid md:grid-cols-3 gap-x-2">

          {/* Left column */}
          <div className="flex flex-col flex-nowrap gap-y-2 col-span-1 md:col-span-2">

            {/* Gallery & price */}
            <section className="bg-white px-4 py-5 flex flex-col items-stretch gap-3 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md">
              <div className="flex flex-col gap-1">
                <div className="bg-slate-200 h-64 rounded-md overflow-hidden relative">
                  <Image src="/assets/img/img6.jpg" alt="Property" fill className="object-cover" />
                </div>
                <div className="flex flex-row gap-1">
                  {['/assets/img/img1.jpg', '/assets/img/img2.jpg', '/assets/img/img3.jpg', '/assets/img/img4.jpg', '/assets/img/img5.jpg'].map((src, i) => (
                    <div key={i} className="size-14 bg-slate-400 rounded overflow-hidden relative">
                      <Image src={src} alt={`photo ${i+1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-row items-start gap-2">
                <div className="font-bold text-2xl text-gray-800">$4500<span className="text-lg">pcm</span></div>
                <span className="flex-1"></span>
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

            {/* Mobile Seller Info */}
            <section className="md:hidden bg-white px-4 py-5 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md relative flex flex-col flex-nowrap">
              <h2 className="mb-2 text-xl font-medium text-slate-700">Seller Details</h2>
              <div className="flex flex-row flex-nowrap gap-2">
                <div className="flex-none size-28 border-4 border-white rounded-full overflow-hidden mr-0.5">
                  <Image className="object-cover object-center" src="https://picsum.photos/200" alt="Seller" width={112} height={112} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-1">Jannet Willson</h3>
                  <p className="-mt-1 mb-3 text-sm text-slate-600">Property Agent, located in Dartford, Kent</p>
                  <div className="flex items-center gap-2">
                    <div className="text-blue-700 inline-flex items-center text-sm font-semibold">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline size-5 text-blue-600 mr-1">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </div>
                    <div className="px-2 py-1 flex items-center gap-1 text-xs text-slate-600 bg-slate-100 rounded-md">1.9K likes</div>
                    <div className="px-2 py-1 flex items-center gap-1 text-xs text-slate-600 bg-slate-100 rounded-md">0.8K followers</div>
                  </div>
                </div>
              </div>
              <div className="my-2 text-xs text-slate-700">Loyal user since 2021 | 37 active Listings | Active: 2d ago</div>
            </section>

            {/* Mobile CTA */}
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
            <section className="bg-white px-4 py-5 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md">
              <h2 className="mb-2 text-xl font-medium text-slate-700 flex items-center justify-between">
                <span>Description</span>
                <span className="text-sm font-normal text-slate-800">Posted on 21/01/2025</span>
              </h2>
              <p className="text-slate-700 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

              <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-slate-700">
                {['5 Bedrooms', '2 Bathrooms', 'Apartment', 'Available Now', 'Garden', 'Parking'].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 text-emerald-500 flex-none">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </section>

            {/* Map placeholder */}
            <section className="bg-white px-4 py-5 border-y border-slate-900/25 sm:rounded-md sm:border sm:shadow-black/10 sm:shadow-md">
              <h2 className="mb-2 text-xl font-medium text-slate-700">Location</h2>
              <div className="h-48 bg-slate-200 rounded-md flex items-center justify-center text-slate-500">Map placeholder — integrate Google Maps here</div>
            </section>

          </div>

          {/* Right column - desktop seller */}
          <div className="hidden md:flex flex-col gap-y-2 col-span-1">
            {/* Seller card */}
            <section className="bg-white px-4 py-5 border border-slate-900/25 rounded-md shadow-md shadow-black/10 flex flex-col">
              <h2 className="mb-3 text-xl font-medium text-slate-700">Seller Details</h2>
              <div className="flex items-center gap-3 mb-3">
                <div className="size-16 rounded-full overflow-hidden flex-none">
                  <Image className="object-cover" src="https://picsum.photos/200" alt="Seller" width={64} height={64} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Jannet Willson</h3>
                  <p className="text-xs text-slate-600">Property Agent, Dartford, Kent</p>
                  <span className="inline-flex items-center text-xs text-blue-600 font-semibold mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 mr-1">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-600 mb-4">Loyal user since 2021 | 37 active Listings | Active: 2d ago</div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 rounded-lg h-10 text-white font-semibold mb-2 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
                Email Seller
              </button>
              <button className="w-full bg-rose-600 hover:bg-rose-700 rounded-lg h-10 text-white font-semibold flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
                Call Seller
              </button>
            </section>

            {/* Donate link */}
            <section className="bg-white px-4 py-4 border border-slate-900/25 rounded-md shadow-md shadow-black/10">
              <h3 className="font-medium text-slate-700 mb-2">Support LokalAds</h3>
              <p className="text-xs text-slate-500 mb-3">Help us keep listings free for everyone.</p>
              <Link href="/donate" className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center font-semibold py-2 rounded-lg text-sm">Donate</Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

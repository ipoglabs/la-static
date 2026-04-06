'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'

export default function DonateReviewPage() {
  const [tab, setTab] = useState<'sp' | 'cc'>('sp')

  return (
    <div className="bg-white min-w-[375px]">
      <Header />

      <div className="max-w-screen-lg container mx-auto flex flex-col items-stretch flex-nowrap px-4 sm:px-6 lg:px-16 pt-6 pb-5">

        {/* Payment method toggle */}
        <div className="px-4 py-4 flex flex-col items-center gap-3 rounded-md mb-3">
          <legend className="text-center text-lg font-semibold select-none">Select Payment Method:</legend>

          <div className="bg-slate-200 border border-slate-300 rounded-full p-1 flex flex-row flex-nowrap gap-0.5 max-w-96 mb-1 sm:mb-4 -mt-2">
            <button
              type="button"
              onClick={() => setTab('sp')}
              className={`relative flex-1 px-6 py-2 rounded-full select-none text-lg font-semibold flex flex-row justify-center items-center gap-2 transition-colors ${tab === 'sp' ? 'bg-slate-700 text-white' : 'bg-transparent text-slate-800'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Z" clipRule="evenodd" />
              </svg>
              <span className="whitespace-nowrap">Scan Pay</span>
            </button>

            <button
              type="button"
              onClick={() => setTab('cc')}
              className={`relative flex-1 px-6 py-2 rounded-full select-none text-lg font-semibold flex flex-row justify-center items-center gap-2 transition-colors ${tab === 'cc' ? 'bg-slate-700 text-white' : 'bg-transparent text-slate-800'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
              </svg>
              <span className="whitespace-nowrap">Credit Card</span>
            </button>
          </div>
        </div>

        {/* Mobile thank you note */}
        <div className="md:hidden text-center mb-4">
          <p className="text-slate-800 text-2xl font-bold mb-1">Thank you, Jannet Willson!</p>
          <p className="text-slate-600 text-xl font-semibold">You&apos;ve chosen to donate <span className="font-bold">£500</span>.</p>
        </div>

        <div className="flex flex-col md:flex-row flex-nowrap gap-6">

          {/* Left column */}
          <div className="flex-1 md:w-1/2 max-md:order-2 max-md:pt-8">

            {/* Scan Pay tab */}
            {tab === 'sp' && (
              <div>
                <div className="hidden md:block text-center mb-4">
                  <p className="text-slate-800 text-2xl font-bold mb-1">Thank you, Jannet Willson!</p>
                  <p className="text-slate-600 text-xl font-semibold">You&apos;ve chosen to donate <span className="font-bold">£500</span>.</p>
                </div>
                <ol className="text-slate-700 list-decimal ml-5 mb-6 space-y-2">
                  <li>Scan the QR code using your mobile banking app, or save &amp; upload it from your device.</li>
                  <li>Complete the payment before the QR code expires.</li>
                  <li>You will be redirected to a confirmation page after payment.</li>
                </ol>
                <div className="bg-red-100 rounded-lg py-4 px-5 text-base text-red-700 mb-3" role="alert">
                  <b>Please stay on this page until your payment is processed.</b>{' '}
                  If you face issues, check the donation status on the home page after <b>30 minutes</b>.
                </div>
              </div>
            )}

            {/* Credit Card tab */}
            {tab === 'cc' && (
              <div className="flex flex-col items-center text-center">
                <Image className="inline-block w-36 mb-4" src="/assets/paypal-sheild-logo.svg" alt="PayPal Shield Logo" width={144} height={144} />
                <h2 className="w-8/12 text-2xl font-semibold text-slate-700 mb-2">PayPal is the safer, easier way to pay</h2>
                <p className="w-10/12 text-slate-700 mb-4">No matter which card you use, we keep your financial information secure.</p>
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="flex-1 relative max-md:order-1">

            {/* Scan Pay QR */}
            {tab === 'sp' && (
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center px-5 pb-4 mb-3">
                  <div className="flex gap-2 items-center scale-90 mb-3">
                    <Image className="size-10" src="/assets/la-logo-symbol-color.svg" alt="logo" width={40} height={40} />
                    <Image className="w-24" src="/assets/la-text-black.svg" alt="logo" width={96} height={32} />
                  </div>
                  <p className="text-lg font-semibold text-center mb-3">Scan with your bank or payment app</p>
                  <div className="size-60 border border-slate-500 rounded-md -mb-3 p-1">
                    <Image className="inline-block w-full h-full" src="/assets/dummy-qr.png" alt="QR Code" width={240} height={240} />
                  </div>
                  <div className="rounded-full bg-red-500 px-3 font-mono text-md font-medium tracking-tight text-white uppercase">
                    Scan to Pay
                  </div>
                </div>
                <button className="bg-blue-800 rounded-md text-sm text-white flex items-center gap-3 px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                    <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                  </svg>
                  <span>Download QR Code</span>
                </button>
              </div>
            )}

            {/* Credit Card form */}
            {tab === 'cc' && (
              <div className="flex flex-col gap-0 max-md:px-8">
                <div className="flex flex-row justify-between items-center border-b border-slate-300 py-8 mb-8">
                  <Image className="inline-block w-32" src="/assets/paypal-logo-color.svg" alt="PayPal" width={128} height={40} />
                  <div className="text-2xl font-bold text-slate-800">£500 <span className="font-normal text-sm">GBP</span></div>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full rounded-md px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Expiry</label>
                      <input type="text" placeholder="MM / YY" className="w-full rounded-md px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">CVV</label>
                      <input type="text" placeholder="123" className="w-full rounded-md px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name on Card</label>
                    <input type="text" placeholder="John Smith" className="w-full rounded-md px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm" />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <Image src="/assets/visa-logo.svg" alt="Visa" width={48} height={28} />
                    <Image src="/assets/mastercard-logo.svg" alt="Mastercard" width={48} height={28} />
                    <Image src="/assets/paypal-pp-color-logo.svg" alt="PayPal" width={28} height={28} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <Link
            href="/donate/status"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-10 py-3 rounded-full shadow-md transition"
          >
            Confirm &amp; Pay £500
          </Link>
        </div>
      </div>
    </div>
  )
}

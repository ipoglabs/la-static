import Link from 'next/link'
import Image from 'next/image'

export default function DonateStatusPage() {
  return (
    <div className="bg-white min-w-[375px] min-h-screen flex flex-col">

      {/* Simple header */}
      <header className="border-b border-slate-200 shadow-sm">
        <div className="container mx-auto h-12 flex items-center px-4 max-w-screen-lg">
          <Link className="flex gap-2 items-center" href="/">
            <Image className="size-10" src="/assets/la-logo-symbol-color.svg" alt="logo" width={40} height={40} />
            <Image className="w-24" src="/assets/la-text-black.svg" alt="logo" width={96} height={32} />
          </Link>
        </div>
      </header>

      <div className="flex-1 max-w-screen-lg container mx-auto flex flex-col items-stretch flex-nowrap sm:px-6 lg:px-16 pb-5">

        {/* Blue success banner */}
        <div className="bg-blue-800 rounded-b-3xl flex flex-col justify-center px-5">
          {/* Tick icon */}
          <div className="mx-auto size-24 inline-flex items-center justify-center bg-green-100 rounded-full my-6">
            <svg className="size-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-white text-2xl sm:text-3xl font-bold text-center -mt-4 mb-3">
            Thank you, Jannet Willson!
          </p>
          <p className="text-blue-50 text-xl sm:text-2xl text-center mb-8">
            Your <span className="font-bold">£500</span> donation has been successfully received.
          </p>
        </div>

        {/* Details */}
        <div className="flex flex-col items-center justify-center px-7 text-center pt-8">
          <p className="text-lg text-slate-500 mb-5">30 Jan 2025 at 10:52AM</p>
          <p className="text-lg text-slate-700 mb-6">
            Transaction ID<br />
            <span className="text-slate-800 font-semibold">20250130TRBUSGSGBRT2740753</span>
          </p>
          <p className="text-lg sm:text-xl text-center max-w-screen-md">
            Your support helps us grow LokalAds and build stronger communities. We truly appreciate your generosity!
          </p>

          {/* What's next */}
          <section className="inline-block bg-slate-100 border border-slate-300 rounded-xl p-5 text-left max-w-screen-sm my-7">
            <p className="font-semibold mb-2">What&apos;s Next?</p>
            <ol className="list-decimal ml-6 space-y-1 text-slate-700">
              <li>A confirmation email has been sent to you.</li>
              <li>Stay connected for updates on how your contribution makes an impact.</li>
            </ol>
          </section>

          {/* Back to home */}
          <Link
            href="/"
            className="px-8 py-2 border border-rose-600 bg-rose-500 hover:bg-rose-600 rounded-full text-lg text-rose-50 font-semibold mb-6 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 border-t-4 border-rose-500 mt-auto">
        <details className="max-w-screen-lg group container mx-auto flex max-sm:flex-col flex-row flex-nowrap gap-2 px-4 sm:px-6 lg:px-16 py-4">
          <summary className="cursor-pointer flex flex-col items-stretch justify-center">
            <div className="flex items-center">
              <Link className="flex gap-2 items-center" href="/">
                <Image className="size-11" src="/assets/la-logo-symbol-black.svg" alt="logo" width={44} height={44} />
                <div className="relative">
                  <Image className="w-24" src="/assets/la-text-white.svg" alt="logo" width={96} height={32} />
                  <span className="absolute right-1 -bottom-4 text-[11px] font-semibold text-white">India</span>
                </div>
              </Link>
            </div>
            <p className="text-slate-300 text-sm font-normal mt-2">find anything with lokalads, its just secure..</p>
          </summary>
        </details>

        <div className="relative flex pb-5 px-4 sm:px-6 lg:px-16 m-auto text-gray-800 text-sm flex-col items-center">
          <hr className="absolute w-48 h-px border-slate-500" />
          <div className="mt-4 flex flex-row gap-3">
            {['T', 'F', 'Y', 'in'].map((s) => (
              <a key={s} href="#" className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-200 text-xs font-bold">{s}</a>
            ))}
          </div>
          <div className="flex flex-row flex-wrap items-center justify-center p-2 text-slate-300">
            <p className="inline-block py-1 text-nowrap">© 2025 lokalads | Co. Reg. No. 8765412345.</p>
            <span className="mx-2">·</span>
            <a className="py-1 text-nowrap" href="#">Privacy Policy</a>
            <span className="mx-2">·</span>
            <a className="py-1 text-nowrap" href="#">Conditions</a>
            <span className="mx-2">·</span>
            <a className="py-1 text-nowrap" href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

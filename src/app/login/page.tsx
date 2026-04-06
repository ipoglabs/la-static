import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="min-w-[375px] bg-white min-h-screen flex flex-col items-stretch justify-start">
      <header className="relative">
        <div className="container mx-auto h-16 flex items-center px-4 max-w-screen-lg">
          <Link className="flex gap-2 items-center" href="/">
            <Image className="size-10" src="/assets/la-logo-symbol-color.svg" alt="logo" width={40} height={40} />
            <div className="relative">
              <Image className="w-24" src="/assets/la-text-black.svg" alt="logo" width={96} height={32} />
            </div>
          </Link>
          <div className="flex-1"></div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex items-center justify-center max-sm:bg-white">
        <div className="relative">
          <div className="relative">
            {/* Colorful Shadow Effect */}
            <div className="absolute w-full h-full opacity-60 blur bg-gradient-to-r from-slate-600 via-red-400 via-pink-500 to-green-600 -z-10"></div>

            <div className="bg-white sm:rounded-xl px-10 pt-8 pb-10">
              <h1 className="text-2xl font-semibold text-slate-700 mb-1">Sign In</h1>
              <p className="text-slate-700 mb-3">Stay updated on your professional world.</p>

              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="block text-base font-medium text-slate-600 mb-1">Email or phone</label>
                  <input
                    id="email"
                    name="email"
                    placeholder="user@example.com"
                    type="email"
                    required
                    className="text-base leading-6 text-gray-900 appearance-none block w-full rounded-md px-3 py-2 border border-gray-600 outline-none ring-2 ring-transparent focus:ring-sky-500 transition duration-300 ease-in-out"
                  />
                </div>

                <div className="mb-1">
                  <label htmlFor="password" className="block text-base font-medium text-slate-600 mb-1">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="text-base leading-6 text-gray-900 appearance-none block w-full rounded-md px-3 py-2 border border-gray-600 outline-none ring-2 ring-transparent focus:ring-sky-500 transition duration-300 ease-in-out"
                  />
                </div>

                <div className="flex justify-end mb-2">
                  <Link href="#" className="text-sm font-medium text-blue-500 hover:text-blue-700">
                    Forgot your password?
                  </Link>
                </div>

                <div className="flex items-center mb-4">
                  <input
                    id="remember_me"
                    name="remember"
                    type="checkbox"
                    className="size-5 text-indigo-600 transition duration-150 ease-in-out rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
                    Keep me logged in
                  </label>
                </div>

                <div className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent text-base font-medium rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none transition duration-150 ease-in-out"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer Links */}
          <div className="relative flex justify-center items-center gap-2 py-5">
            <p className="text-slate-700">New to Lokalads?</p>
            <button className="bg-transparent hover:bg-blue-500/15 rounded-full text-blue-600 text-base text-center font-medium px-3 pt-0.5 pb-1.5 transition duration-300 ease-in-out">
              Get started for free
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 border-t-4 border-rose-500">
        <details className="group container mx-auto flex max-sm:flex-col flex-row flex-nowrap gap-2 px-4 py-4 max-w-screen-lg">
          <summary className="cursor-pointer flex flex-col items-stretch justify-center">
            <div className="flex items-center justify-between">
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

          <div className="hidden group-open:grid flex-1 pt-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex-1 mb-5">
              <div className="mb-2 text-sm text-slate-200 font-bold">Resources</div>
              <a className="my-1 block text-sm text-slate-200" href="#">Tutorials</a>
              <a className="my-1 block text-sm text-slate-200" href="#">Frequent Questions (FAQ)</a>
              <a className="my-1 block text-sm text-slate-200" href="#">Support <span className="text-teal-200 text-xs p-1">New</span></a>
            </div>
            <div className="flex-1 mb-5">
              <div className="mb-2 text-sm text-slate-200 font-bold">Popular Category</div>
              <a className="my-1 block text-sm text-slate-200" href="#">Property</a>
              <a className="my-1 block text-sm text-slate-200" href="#">Jobs</a>
              <a className="my-1 block text-sm text-slate-200" href="#">For Sale <span className="text-teal-200 text-xs p-1">New</span></a>
            </div>
            <div className="flex-1 mb-5">
              <div className="mb-2 text-sm text-slate-200 font-bold">Top Locations</div>
              <a className="my-1 block text-sm text-slate-200" href="#">London</a>
              <a className="my-1 block text-sm text-slate-200" href="#">Bristol</a>
              <a className="my-1 block text-sm text-slate-200" href="#">Scotland <span className="text-teal-200 text-xs p-1">New</span></a>
            </div>
            <div className="flex-1 mb-5">
              <div className="mb-2 text-sm text-slate-200 font-bold">About Us</div>
              <a className="my-1 block text-sm text-slate-200" href="#">About lokalads</a>
              <a className="my-1 block text-sm text-slate-200" href="#">Why Advertise With Us?</a>
              <a className="my-1 block text-sm text-slate-200" href="#">Careers</a>
              <a className="my-1 block text-sm text-slate-200" href="#">Contact <span className="text-teal-200 text-xs p-1">New</span></a>
            </div>
          </div>
        </details>

        <div className="relative flex pb-5 px-4 sm:px-12 m-auto text-gray-800 text-sm flex-col max-w-screen-lg items-center">
          <hr className="absolute w-48 h-px border-slate-500" />
          <div className="md:flex-auto mt-4 flex-row flex max-sm:px-4 gap-2">
            {/* Social icons */}
            {['Twitter', 'Facebook', 'YouTube', 'LinkedIn'].map((s) => (
              <a key={s} href="#" className="w-6 mx-1 text-slate-400 hover:text-slate-200 text-xs">{s[0]}</a>
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

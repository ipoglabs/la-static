import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'

const amounts = [
  { id: 'opt1', value: '£10', desc: 'Help keep Lokalads running smoothly everyday.' },
  { id: 'opt2', value: '£30', desc: 'Drive essential improvements and innovation.' },
  { id: 'opt3', value: '£50', desc: 'Empower us to deliver better features and services.' },
  { id: 'opt4', value: '£100', desc: 'Be the reason Lokalads transforms for the better.' },
  { id: 'opt5', value: '£500', desc: 'Fuel major growth and help us reach more people.' },
  { id: 'opt6', value: 'Other', desc: 'Enter a custom amount of your choice.' },
]

export default function DonatePage() {
  return (
    <div className="bg-white min-w-[375px]">
      <Header />

      <div className="max-w-screen-lg container mx-auto flex flex-col items-stretch flex-nowrap px-4 sm:px-6 lg:px-16 py-4">
        {/* Hero */}
        <div className="text-center">
          <h2 className="mt-4 text-2xl font-bold mb-2 text-slate-700 sm:text-3xl">
            Support Lokalads: Together, We Build Stronger Communities!
          </h2>
          <p className="text-lg mb-2 italic text-slate-700 sm:text-xl">
            &quot;Your contribution keeps Lokalads free and growing, so millions can benefit from our platform&quot;
          </p>
        </div>

        {/* Donation Form */}
        <form className="block">
          <div className="px-4 py-4 flex flex-col gap-3 rounded-md mb-10">
            <legend className="text-center text-lg sm:text-xl font-semibold mb-3 select-none">
              Choose your contribution amount:
            </legend>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 mb-4">
              {amounts.map((a, i) => (
                <label
                  key={a.id}
                  htmlFor={a.id}
                  className="relative pl-4 pr-12 py-3 bg-transparent border border-slate-400 rounded-lg hover:bg-zinc-100 has-[:checked]:ring-2 has-[:checked]:text-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-400 select-none flex flex-col gap-1 cursor-pointer"
                >
                  <span className="text-2xl sm:text-3xl text-slate-800 font-bold">{a.value}</span>
                  <span className="text-base text-slate-600">{a.desc}</span>
                  <input
                    defaultChecked={i === 0}
                    type="radio"
                    name="amount"
                    className="size-8 absolute right-3 top-1/2 -translate-y-1/2 accent-blue-600"
                    id={a.id}
                  />
                </label>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="flex flex-col gap-1">
              <label htmlFor="custom_amount" className="text-sm font-semibold text-slate-700">Custom Amount (£)</label>
              <input
                id="custom_amount"
                type="number"
                placeholder="Enter amount"
                min="1"
                className="appearance-none w-full sm:max-w-xs rounded-md px-3 py-2 border border-gray-400 outline-none ring-2 ring-transparent focus:ring-sky-500 transition duration-300"
              />
            </div>

            {/* Payment Methods */}
            <div className="mt-4">
              <legend className="text-lg font-semibold mb-3">Choose payment method:</legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {[
                  { id: 'paypal', label: 'PayPal', logo: '/assets/paypal-logo-color.svg' },
                  { id: 'card', label: 'Credit / Debit Card', logo: '/assets/creditcard-ico.svg' },
                  { id: 'upi', label: 'UPI / Paytm', logo: '/assets/paytm-logo.svg' },
                ].map((m) => (
                  <label
                    key={m.id}
                    htmlFor={m.id}
                    className="relative pl-4 pr-12 py-3 border border-slate-400 rounded-lg hover:bg-zinc-100 has-[:checked]:ring-2 has-[:checked]:ring-blue-400 has-[:checked]:bg-blue-50 select-none flex items-center gap-3 cursor-pointer"
                  >
                    <Image src={m.logo} alt={m.label} width={32} height={32} />
                    <span className="font-medium text-slate-800">{m.label}</span>
                    <input type="radio" name="payment" id={m.id} className="size-5 absolute right-3 top-1/2 -translate-y-1/2 accent-blue-600" />
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6 flex justify-center">
              <Link
                href="/donate/review"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-10 py-3 rounded-full shadow-md transition"
              >
                Continue to Review
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

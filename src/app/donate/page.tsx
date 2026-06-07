'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { useDonationStore } from '@/app/store/donationStore'

const amounts = [
  { id: 'opt1', value: '1',     label: '£1',           desc: 'Help keep Lokalads running smoothly everyday.' },
  { id: 'opt2', value: '30',    label: '£30',          desc: 'Drive essential improvements and innovation.' },
  { id: 'opt3', value: '50',    label: '£50',          desc: 'Empower us to deliver better features and services.' },
  { id: 'opt4', value: '100',   label: '£100',         desc: 'Be the reason Lokalads transforms for the better.' },
  { id: 'opt5', value: '500',   label: '£500',         desc: 'Fuel a bigger change and help us reach more communities.' },
  { id: 'opt6', value: 'other', label: 'Other Amount', desc: 'Every pound counts. Customize your support and make a difference!' },
]

// ── Step progress bar (matches the HTML header dark bar) ─────────────────────
const StepProgress = ({ step }: { step: number }) => {
  const steps = [
    { n: 1, label: 'Step 1: Choose Amount' },
    { n: 2, label: 'Step 2: Select Payment Type' },
    { n: 3, label: 'Step 3: Payment Confirmation' },
  ]

  return (
    <div className="bg-slate-800 py-1">
      <div className="max-w-screen-lg container mx-auto px-4 sm:px-6 lg:px-36 pt-3 pb-2.5">

        {/* Mobile: single bar + label */}
        <nav className="w-full sm:hidden" aria-label="Progress">
          <div className="flex flex-row flex-nowrap gap-x-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className={`w-full h-2 rounded-sm mb-1 ${s.n <= step ? 'bg-teal-600' : 'bg-slate-400'}`}
              />
            ))}
          </div>
          <p className="text-base font-medium text-slate-200">
            {steps[step - 1]?.label}
          </p>
        </nav>

        {/* Desktop: all three labels */}
        <nav className="w-full max-sm:hidden" aria-label="Progress">
          <ol role="list" className="flex space-x-4">
            {steps.map((s) => (
              <li key={s.n} className="flex-1">
                <div className={`w-full h-1.5 rounded-sm mb-1 ${s.n <= step ? 'bg-teal-600' : 'bg-slate-400'}`} />
                <p className={`text-base font-medium ${s.n <= step ? 'text-slate-200' : 'text-slate-400'}`}>
                  {s.label}
                </p>
              </li>
            ))}
          </ol>
        </nav>

      </div>
    </div>
  )
}

export default function DonatePage() {
  const router = useRouter()
  const { setAmount, setMethod, setDonor } = useDonationStore()

  const [selAmt, setSelAmt]       = useState('1')
  const [customAmt, setCustomAmt] = useState('')
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [message, setMessage]     = useState('')
  const [errors, setErrors]       = useState<{ name?: string; email?: string; amount?: string }>({})

  const rawAmt = selAmt === 'other' ? Number(customAmt) : Number(selAmt)

  const validate = () => {
    const e: typeof errors = {}
    if (!name.trim())                          e.name   = 'Please enter your name.'
    if (!email.trim() || !email.includes('@')) e.email  = 'Please enter a valid email.'
    if (!rawAmt || rawAmt < 1)                 e.amount = 'Please select or enter an amount.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleContinue = () => {
    if (!validate()) return
    const displayAmt = `£${rawAmt}`
    setAmount(displayAmt, rawAmt, 'GBP')
    // Default payment method — carried forward to review page
    setMethod('qr')
    setDonor({ name: name.trim(), email: email.trim() })
    router.push('/donate/review')
  }

  return (
    <div className="bg-white min-w-[375px] min-h-screen flex flex-col">

      {/* ── Header (your existing component) + step bar ─────────────────── */}
      <header className="border-b border-slate-200 shadow-md">
        <Header />
        <StepProgress step={1} />
      </header>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="max-w-screen-lg container mx-auto flex flex-col items-stretch px-4 sm:px-6 lg:px-16 py-4 flex-1">

        {/* Headline */}
        <div className="text-center">
          <h2 className="mt-4 text-2xl font-bold mb-2 text-slate-700 sm:text-3xl">
            Support Lokalads: Together, We build Stronger Communities!
          </h2>
          <p className="text-lg mb-2 italic text-slate-700 sm:text-xl">
            "Your contribution keeps Lokalads free and growing, so millions can benefit from our platform"
          </p>
        </div>

        {/* ── Amount selection ───────────────────────────────────────────── */}
        <div className="px-4 py-2 flex flex-col gap-3 rounded-md mb-10">
          <legend className="text-center text-lg sm:text-xl font-semibold mb-3 select-none">
            Choose your contribution amount:
          </legend>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 mb-4">
            {amounts.map((a) => {
              const checked = selAmt === a.value
              return (
                <label
                  key={a.id}
                  htmlFor={a.id}
                  className={`relative pl-4 pr-12 py-3 bg-transparent border rounded-lg select-none flex flex-col gap-1 cursor-pointer transition-all
                    ${checked
                      ? 'ring-2 text-blue-600 bg-blue-50 ring-blue-400 border-blue-400'
                      : 'border-slate-400 hover:bg-zinc-100'}`}
                >
                  <span className={`font-bold ${a.value === 'other' ? 'text-2xl' : 'text-2xl sm:text-3xl'} text-slate-800`}>
                    {a.label}
                  </span>
                  <span className="text-base text-slate-600">{a.desc}</span>
                  <input
                    type="radio"
                    id={a.id}
                    name="donationAmount"
                    value={a.value}
                    checked={checked}
                    onChange={() => { setSelAmt(a.value); setErrors(e => ({ ...e, amount: undefined })) }}
                    className="size-8 absolute right-3 top-1/2 -translate-y-1/2 accent-blue-600"
                  />
                </label>
              )
            })}
          </div>

          {/* Other amount input — always visible, matching HTML */}
          <div className="border-l-4 border-blue-500 bg-blue-50 text-green-800 p-4 pl-6">
            <label htmlFor="customAmt" className="block text-xl font-medium text-gray-700 mb-2">
              Please Enter Other Amount
            </label>
            <div className="mt-1">
              <input
                id="customAmt"
                name="name"
                type="text"
                inputMode="numeric"
                placeholder="Other Amount"
                value={customAmt}
                onChange={(e) => {
                  setCustomAmt(e.target.value)
                  setSelAmt('other')
                  setErrors(er => ({ ...er, amount: undefined }))
                }}
                className="block w-2/3 appearance-none py-3 px-4 rounded-md bg-gray-100 placeholder-gray-500 border border-gray-700 focus:border-sky-900 focus:ring-2 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset"
              />
            </div>
          </div>

          {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount}</p>}
        </div>

        {/* ── Donor details ──────────────────────────────────────────────── */}
        {/* NOTE: Horizontal rule removed per design update */}
        <div className="px-4">
          <h2 className="text-2xl mb-6">Please enter your details:</h2>

          {/* Row 1: Name + Email side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-y-6 mb-6">

            {/* Full name */}
            <div>
              <label htmlFor="donorName" className="block text-base font-medium text-gray-700">
                Your Full Name
              </label>
              <div className="mt-1">
                <input
                  id="donorName"
                  name="name"
                  type="text"
                  autoComplete="off"
                  placeholder="Please enter your full name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors(er => ({ ...er, name: undefined })) }}
                  className={`block w-full appearance-none py-3 px-4 rounded-md bg-gray-100 placeholder-gray-500 border focus:border-sky-900 focus:ring-2 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset
                    ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-700'}`}
                />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="donorEmail" className="block text-base font-medium text-gray-700">
                Your Email Address
              </label>
              <div className="mt-1">
                <input
                  id="donorEmail"
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="Please enter your email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(er => ({ ...er, email: undefined })) }}
                  className={`block w-full appearance-none py-3 px-4 rounded-md bg-gray-100 placeholder-gray-500 border focus:border-sky-900 focus:ring-2 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset
                    ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-700'}`}
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

          </div>

          {/* Row 2: Message full width */}
          <div>
            <label htmlFor="donorMessage" className="block text-base font-medium text-gray-700">
              Do you want to say anything ? (Optional)
            </label>
            <div className="mt-1">
              <textarea
                id="donorMessage"
                name="message"
                placeholder="Feel free to say your experience with Lokalads!"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full appearance-none py-3 px-4 rounded-md bg-gray-100 placeholder-gray-500 border border-gray-700 focus:border-sky-900 focus:ring-2 focus:bg-white focus:outline-none focus:ring-blue-500 focus:ring-inset"
              />
            </div>
          </div>

        </div>

        {/* CTA button */}
        <div className="flex justify-center py-5">
          <button
            onClick={handleContinue}
            className="mt-6 px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-xl text-yellow-900 font-semibold rounded-full focus:outline-none transition-colors"
          >
            Yes, I want to Support Lokalads!
          </button>
        </div>

        {/* Sub-headline */}
        <p className="mt-4 mb-8 text-xl text-slate-800 text-center">
          ...every contribution empowers us to enhance your experience, introduce
          new features, and keep Lokalads thriving for everyone. Be a part of this journey!
        </p>

      </main>
    </div>
  )
}
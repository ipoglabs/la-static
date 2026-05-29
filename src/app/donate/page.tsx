'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { useDonationStore } from '@/app/store/donationStore'

const amounts = [
  { id: 'opt1', value: '10',  label: '£10',  desc: 'Keep Lokalads running smoothly.' },
  { id: 'opt2', value: '30',  label: '£30',  desc: 'Drive essential improvements.' },
  { id: 'opt3', value: '50',  label: '£50',  desc: 'Deliver better features.' },
  { id: 'opt4', value: '100', label: '£100', desc: 'Transform Lokalads for the better.' },
  { id: 'opt5', value: '500', label: '£500', desc: 'Fuel major growth.' },
  { id: 'opt6', value: 'other', label: 'Other', desc: 'Enter a custom amount.' },
]

const paymentMethods = [
  { id: 'qr',     label: 'Scan & Pay', icon: '📱' },
  { id: 'card',   label: 'Credit Card', icon: '💳' },
  { id: 'paypal', label: 'PayPal',      icon: '🅿️' },
]

const Stepper = ({ step }: { step: number }) => (
  <div className="flex items-center gap-0 mb-7">
    {[1, 2, 3].map((n, i) => (
      <div key={n} className="flex items-center flex-1 last:flex-none">
        <div className="flex items-center gap-1.5">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all
            ${n < step ? 'bg-green-600 text-white' : n === step ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-400'}`}>
            {n < step ? '✓' : n}
          </div>
          <span className={`text-xs font-medium whitespace-nowrap
            ${n < step ? 'text-green-600' : n === step ? 'text-blue-700' : 'text-slate-400'}`}>
            {['Amount', 'Review', 'Done'][n - 1]}
          </span>
        </div>
        {i < 2 && (
          <div className={`flex-1 h-0.5 mx-1 transition-colors ${n < step ? 'bg-green-500' : 'bg-slate-200'}`} />
        )}
      </div>
    ))}
  </div>
)

export default function DonatePage() {
  const router = useRouter()
  const { setAmount, setMethod, setDonor } = useDonationStore()

  const [selAmt, setSelAmt]       = useState('30')
  const [customAmt, setCustomAmt] = useState('')
  const [selPm, setSelPm]         = useState('qr')
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [errors, setErrors]       = useState<{ name?: string; email?: string; amount?: string }>({})

  // Raw numeric value of selected amount
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

    // FIX: setAmount(displayString, rawNumber, currencyCode)
    // Store needs all three — display for UI, raw for Stripe, currency for the API
    const displayAmt = `£${rawAmt}`
    setAmount(displayAmt, rawAmt, 'GBP')

    setMethod(selPm as 'qr' | 'card' | 'paypal')
    setDonor({ name: name.trim(), email: email.trim() })

    router.push('/donate/review')
  }

  return (
    <div className="bg-slate-50 min-w-[375px] min-h-screen">
      <Header />
      <div className="max-w-screen-sm mx-auto px-4 py-6">
        <Stepper step={1} />

        {/* ── Amount ──────────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-4">
          <p className="text-sm font-semibold text-slate-700 mb-3">Contribution amount</p>
          <div className="grid grid-cols-3 gap-2">
            {amounts.map((a) => (
              <button
                key={a.id}
                onClick={() => { setSelAmt(a.value); setErrors(e => ({ ...e, amount: undefined })) }}
                className={`text-left p-3 rounded-lg border-[1.5px] transition-all flex flex-col gap-1
                  ${selAmt === a.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-slate-50 hover:border-blue-400 hover:bg-blue-50'}`}
              >
                <span className={`text-lg font-bold ${selAmt === a.value ? 'text-blue-700' : 'text-slate-800'}`}>
                  {a.label}
                </span>
                <span className="text-[11px] text-slate-500 leading-snug">{a.desc}</span>
              </button>
            ))}
          </div>

          {selAmt === 'other' && (
            <div className="mt-3 flex flex-col gap-1">
              <label htmlFor="customAmt" className="text-xs font-medium text-slate-600">
                Custom amount (£)
              </label>
              <input
                id="customAmt"
                type="number"
                min="1"
                placeholder="e.g. 75"
                value={customAmt}
                onChange={(e) => { setCustomAmt(e.target.value); setErrors(er => ({ ...er, amount: undefined })) }}
                className="w-36 px-3 py-2 rounded-lg border-[1.5px] border-slate-300 text-sm outline-none focus:border-blue-500 transition"
              />
            </div>
          )}
          {errors.amount && <p className="text-xs text-red-500 mt-2">{errors.amount}</p>}
        </div>

        {/* ── Payment method ───────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-4">
          <p className="text-sm font-semibold text-slate-700 mb-3">Payment method</p>
          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelPm(m.id)}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg border-[1.5px] transition-all
                  ${selPm === m.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-slate-50 hover:border-blue-400'}`}
              >
                <span className="text-xl">{m.icon}</span>
                <span className={`text-xs font-medium ${selPm === m.id ? 'text-blue-700' : 'text-slate-500'}`}>
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Donor details ────────────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">Your details</p>
          <div className="flex flex-col gap-3">

            <div className="flex flex-col gap-1">
              <label htmlFor="donorName" className="text-xs font-medium text-slate-600">Full name</label>
              <input
                id="donorName"
                type="text"
                placeholder="Janet Wilson"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors(er => ({ ...er, name: undefined })) }}
                className={`px-3 py-2 rounded-lg border-[1.5px] text-sm outline-none transition
                  ${errors.name ? 'border-red-400 bg-red-50' : 'border-slate-300 focus:border-blue-500'}`}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="donorEmail" className="text-xs font-medium text-slate-600">Email address</label>
              <input
                id="donorEmail"
                type="email"
                placeholder="janet@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(er => ({ ...er, email: undefined })) }}
                className={`px-3 py-2 rounded-lg border-[1.5px] text-sm outline-none transition
                  ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-300 focus:border-blue-500'}`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              <p className="text-[11px] text-slate-400">Your receipt will be sent here.</p>
            </div>

          </div>
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-3 rounded-full bg-blue-700 hover:bg-blue-600 disabled:bg-slate-300 text-white font-semibold text-base transition"
        >
          Continue to Review →
        </button>
      </div>
    </div>
  )
}

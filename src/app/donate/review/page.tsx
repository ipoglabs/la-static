'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { useDonationStore } from '@/app/store/donationStore'
import StripeProvider from '@/components/StripeProvider'
import CheckoutForm from '@/components/CheckoutForm'

// ─── Stepper ──────────────────────────────────────────────────────────────────
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

// ─── Currency options (value = lowercase for Stripe) ─────────────────────────
const CURRENCIES = [
  { value: 'sgd', label: 'SGD — Singapore Dollar', symbol: 'S$' },
  { value: 'inr', label: 'INR — Indian Rupee',      symbol: '₹'  },
  { value: 'gbp', label: 'GBP — British Pound',     symbol: '£'  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DonateReviewPage() {
  const router = useRouter()

  // FIX: read amountRaw (clean number) instead of amount (display string like "£30")
  const { amount, amountRaw, method, donor, setStatus, setTransactionId } = useDonationStore()

  // Destructure primitives to avoid object-reference issues in useEffect deps
  const donorName  = donor?.name  ?? ''
  const donorEmail = donor?.email ?? ''

  const [mounted, setMounted]           = useState(false)   // hydration guard
  const [currency, setCurrency]         = useState('gbp')   // default to GBP (store default)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading]           = useState(false)
  const [apiError, setApiError]         = useState('')
  const [retryKey, setRetryKey]         = useState(0)       // triggers retry

  const pmLabels: Record<string, string> = {
    qr: 'Scan & Pay (UPI)', card: 'Credit Card', paypal: 'PayPal',
  }
  const currencySymbol = CURRENCIES.find(c => c.value === currency)?.symbol ?? ''

  // Wait for Zustand to hydrate from sessionStorage before checking store
  useEffect(() => { setMounted(true) }, [])

  // Guard: only redirect after hydration
  useEffect(() => {
    if (!mounted) return
    if (!donorName || !donorEmail) router.replace('/donate')
  }, [mounted, donorName, donorEmail, router])

  // Auto-select INR for UPI/QR; GBP for card/paypal
  useEffect(() => {
    if (method === 'qr') setCurrency('inr')
    else setCurrency('gbp')
  }, [method])

  // Create Stripe PaymentIntent
  useEffect(() => {
    if (!mounted || !amountRaw || !donorName || !donorEmail) return

    const create = async () => {
      setLoading(true)
      setApiError('')
      setClientSecret(null)

      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: amountRaw,          // FIX: clean number directly, no string stripping needed
            currency,                   // FIX: already lowercase ('gbp'/'inr'/'sgd') — Stripe requires lowercase
            donorName,
            email: donorEmail,
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Could not initialise payment')
        setClientSecret(data.clientSecret)
      } catch (err: any) {
        setApiError(err.message)
      } finally {
        setLoading(false)
      }
    }

    create()
  }, [mounted, amountRaw, currency, donorName, donorEmail, retryKey])

  const handleSuccess = (txId: string) => {
    setTransactionId(txId)
    setStatus('success')
    router.push('/donate/status')
  }

  const handleError = (msg: string) => {
    setStatus('failed')
    setApiError(msg)
  }

  // Don't render until store has hydrated — prevents flicker + false redirects
  if (!mounted) return null

  return (
    <div className="bg-slate-50 min-w-[375px] min-h-screen">
      <Header />
      <div className="max-w-screen-sm mx-auto px-4 py-6">
        <Stepper step={2} />

        {/* Heading */}
        <div className="text-center mb-5">
          <p className="text-lg font-bold text-slate-800">
            Thank you, {donorName || 'there'}!
          </p>
          <p className="text-sm text-slate-500 mt-0.5">
            Donating{' '}
            {/* FIX: show amount (display string from store e.g. "£30") as-is */}
            <span className="font-bold text-blue-700">{amount}</span>{' '}
            via <span className="font-semibold text-slate-700">{pmLabels[method] ?? method}</span>
          </p>
        </div>

        {/* Currency picker */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
          <label className="block text-xs font-semibold text-slate-600 mb-2">
            Pay in currency
          </label>
          <div className="flex gap-2 flex-wrap">
            {CURRENCIES.map((c) => (
              <button
                key={c.value}
                onClick={() => setCurrency(c.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition
                  ${currency === c.value
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'}`}
              >
                {c.symbol} {c.value.toUpperCase()}
              </button>
            ))}
          </div>
          {method === 'qr' && currency !== 'inr' && (
            <p className="text-xs text-amber-600 mt-2">
              ⚠ UPI works best with INR. Switch to ₹ INR for UPI QR code.
            </p>
          )}
        </div>

        {/* Stripe Payment Form */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Payment Details
          </p>

          {loading && (
            <div className="flex items-center justify-center py-10 gap-3">
              <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span className="text-sm text-slate-500">Setting up secure payment...</span>
            </div>
          )}

          {apiError && !loading && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 mb-3 flex items-center justify-between gap-2">
              <span>{apiError}</span>
              {/* FIX: retryKey increment actually re-triggers the useEffect */}
              <button
                onClick={() => setRetryKey(k => k + 1)}
                className="shrink-0 underline text-red-600 font-medium"
              >
                Retry
              </button>
            </div>
          )}

          {clientSecret && !loading && (
            <StripeProvider clientSecret={clientSecret}>
              <CheckoutForm
                amount={amountRaw}        // FIX: clean number, no stripping
                currency={currency}       // already lowercase
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </StripeProvider>
          )}
        </div>

        {/* Payment method info */}
        <div className="bg-slate-100 rounded-xl px-4 py-3 mb-4 text-xs text-slate-500 leading-relaxed">
          {currency === 'inr' && '🇮🇳 UPI, Netbanking, and Indian debit/credit cards supported.'}
          {currency === 'sgd' && '🇸🇬 PayNow, GrabPay, and Visa/Mastercard supported.'}
          {currency === 'gbp' && '🇬🇧 Apple Pay, Google Pay, and UK cards supported.'}
        </div>

        <button
          onClick={() => router.back()}
          className="w-full py-2.5 rounded-full border border-slate-200 bg-white text-slate-500 text-sm font-medium hover:bg-slate-50 transition"
        >
          ← Back
        </button>
      </div>
    </div>
  )
}

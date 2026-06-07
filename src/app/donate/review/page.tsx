'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import QRCode from 'qrcode'
import Header from '@/components/Header'
import { useDonationStore } from '@/app/store/donationStore'
import StripeProvider from '@/components/StripeProvider'
import CheckoutForm from '@/components/CheckoutForm'

const MONZO_PAYMENT_LINK = 'https://monzo.com/pay/r/lokaladscom-uk-limited_GjsQ9QudO1guTV?from_qr=true'

// ─── Step Progress Bar (same as donate page) ─────────────────────────────────
const StepProgress = ({ step }: { step: number }) => {
  const steps = [
    { n: 1, label: 'Step 1: Choose Amount' },
    { n: 2, label: 'Step 2: Select Payment Type' },
    { n: 3, label: 'Step 3: Payment Confirmation' },
  ]
  return (
    <div className="bg-slate-800 py-1">
      <div className="max-w-screen-lg container mx-auto px-4 sm:px-6 lg:px-36 pt-3 pb-2.5">
        {/* Mobile */}
        <nav className="w-full sm:hidden" aria-label="Progress">
          <div className="flex flex-row flex-nowrap gap-x-4">
            {steps.map((s) => (
              <div key={s.n} className={`w-full h-2 rounded-sm mb-1 ${s.n <= step ? 'bg-teal-600' : 'bg-slate-400'}`} />
            ))}
          </div>
          <p className="text-base font-medium text-slate-200">{steps[step - 1]?.label}</p>
        </nav>
        {/* Desktop */}
        <nav className="w-full max-sm:hidden" aria-label="Progress">
          <ol role="list" className="flex space-x-4">
            {steps.map((s) => (
              <li key={s.n} className="flex-1">
                <div className={`w-full h-1.5 rounded-sm mb-1 ${s.n <= step ? 'bg-teal-600' : 'bg-slate-400'}`} />
                <p className={`text-base font-medium ${s.n <= step ? 'text-slate-200' : 'text-slate-400'}`}>{s.label}</p>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}

// ─── Currency options ─────────────────────────────────────────────────────────
const CURRENCIES = [
  { value: 'sgd', label: 'SGD — Singapore Dollar', symbol: 'S$' },
  { value: 'inr', label: 'INR — Indian Rupee',      symbol: '₹'  },
  { value: 'gbp', label: 'GBP — British Pound',     symbol: '£'  },
]

// ─── Payment method tab type ──────────────────────────────────────────────────
type Tab = 'sp' | 'cc'

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DonateReviewPage() {
  const router = useRouter()
  const { amount, amountRaw, method, donor, setStatus, setTransactionId } = useDonationStore()

  const donorName  = donor?.name  ?? ''
  const donorEmail = donor?.email ?? ''

  const [mounted, setMounted]           = useState(false)
  // ── Change 2: always open credit card tab by default ──
  const [activeTab, setActiveTab]       = useState<Tab>('cc')
  const [currency, setCurrency]         = useState('gbp')
  const [qrDataUrl, setQrDataUrl]       = useState('')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading]           = useState(false)
  const [apiError, setApiError]         = useState('')
  const [retryKey, setRetryKey]         = useState(0)

  const currencySymbol = CURRENCIES.find(c => c.value === currency)?.symbol ?? ''

  useEffect(() => { setMounted(true) }, [])

  // Generate Monzo QR once on mount
  useEffect(() => {
    QRCode.toDataURL(MONZO_PAYMENT_LINK, {
      width: 240,
      margin: 1,
      color: { dark: '#000000', light: '#ffffff' },
    }).then(setQrDataUrl)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (!donorName || !donorEmail) router.replace('/donate')
  }, [mounted, donorName, donorEmail, router])

  // Auto-select GBP for card tab only
  useEffect(() => {
    if (activeTab === 'cc') setCurrency('gbp')
  }, [activeTab])

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
          body: JSON.stringify({ amount: amountRaw, currency, donorName, email: donorEmail }),
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

  if (!mounted) return null

  return (
    <div className="bg-white min-w-[375px] min-h-screen flex flex-col">

      {/* ── Header + step bar ───────────────────────────────────────────── */}
      <header className="border-b border-slate-200 shadow-md">
        <Header />
        <StepProgress step={2} />
      </header>

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <main className="max-w-screen-lg container mx-auto flex flex-col items-stretch px-4 sm:px-6 lg:px-16 pt-6 pb-5 flex-1">

        {/* ── Payment method toggle ──────────────────────────────────────── */}
        <div className="px-4 py-2 flex flex-col items-center gap-3 rounded-md mb-3">
          <legend className="text-center text-lg font-semibold select-none">
            Select Payment Method:
          </legend>

          <div className="bg-slate-200 border border-slate-300 rounded-full p-1 flex flex-row flex-nowrap gap-0.5 max-w-96 mb-1 sm:mb-4 -mt-2">

            {/* Scan & Pay tab */}
            <label
              htmlFor="optScanPay"
              onClick={() => setActiveTab('sp')}
              className={`relative flex-1 px-6 py-2 rounded-full select-none text-lg font-semibold flex flex-row justify-center items-center gap-2 cursor-pointer transition-colors
                ${activeTab === 'sp' ? 'bg-slate-700 text-white' : 'bg-transparent text-slate-800'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z" clipRule="evenodd" />
              </svg>
              <span className="whitespace-nowrap">Scan Pay</span>
              <input type="radio" id="optScanPay" name="paymentTab" checked={activeTab === 'sp'} onChange={() => setActiveTab('sp')} className="absolute hidden size-0" />
            </label>

            {/* Credit Card tab */}
            <label
              htmlFor="optCreditCard"
              onClick={() => setActiveTab('cc')}
              className={`relative flex-1 px-6 py-2 rounded-full select-none text-lg font-semibold flex flex-row justify-center items-center gap-2 cursor-pointer transition-colors
                ${activeTab === 'cc' ? 'bg-slate-700 text-white' : 'bg-transparent text-slate-800'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
              </svg>
              <span className="whitespace-nowrap">Credit Card</span>
              <input type="radio" id="optCreditCard" name="paymentTab" checked={activeTab === 'cc'} onChange={() => setActiveTab('cc')} className="absolute hidden size-0" />
            </label>

          </div>
        </div>

        {/* ── Thank you note (mobile — above the two columns) ────────────── */}
        <div className="md:hidden text-center">
          <p className="text-slate-800 text-2xl sm:text-3xl font-bold">
            Thank you {donorName || 'there'}!
          </p>
          <p className="text-slate-600 text-xl sm:text-2xl font-semibold">
            You've chosen to donate 
          </p>
        </div>

        {/* ── Two-column layout ──────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row flex-nowrap">

          {/* ── LEFT column ─────────────────────────────────────────────── */}
          <div className="flex-1 md:flex-none md:w-1/2 max-md:order-2 max-md:pt-8">

            {/* SCAN PAY — left content */}
            {activeTab === 'sp' && (
              <div>
                {/* Thank you note — desktop only */}
                <div className="max-md:hidden text-center mb-2">
                  <p className="text-slate-800 text-2xl sm:text-3xl font-bold mb-1">
                    Thank you {donorName || 'there'}!
                  </p>
                  <p className="text-slate-600 text-xl sm:text-2xl font-semibold mb-4">
                    You've chosen to donate <span className="font-bold">{amount}</span>.
                  </p>
                </div>

                <ol className="text-slate-700 list-decimal ml-5 mb-6 space-y-1">
                  <li>Scan the QR code using your mobile banking app, or save &amp; upload it from your device.</li>
                  <li>Complete the payment before the QR code expires.</li>
                  <li>You will be redirected to a confirmation page after payment.</li>
                </ol>

                {/* Red alert */}
                <div className="bg-red-100 rounded-lg py-4 px-5 text-base text-red-700 mb-3" role="alert">
                  <b>Please stay on this page until your payment is processed.</b>{' '}
                  If you are or face issues, check the donation status on the home page after{' '}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 inline">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clipRule="evenodd" />
                  </svg>{' '}
                  <b>30 minutes</b>.
                </div>
              </div>
            )}

            {/* CREDIT CARD — left content */}
            {activeTab === 'cc' && (
              <div className="flex flex-col items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-28 text-blue-700 mb-4">
                  <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                  <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                </svg>
                <h2 className="w-8/12 text-2xl font-semibold text-slate-700 mb-2">
                  Secure credit card payment
                </h2>
                <p className="w-10/12 text-slate-700 mb-4">
                  No matter which card you use, we keep your financial information secure.
                </p>
              </div>
            )}

          </div>

          {/* ── RIGHT column ────────────────────────────────────────────── */}
          <div className="flex-1 relative max-md:order-1">

            {/* SCAN PAY — QR panel */}
            {activeTab === 'sp' && (
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center px-5 pb-4 mb-3">
                  <p className="text-lg font-semibold text-center mb-3">
                    Scan with your bank or payment app
                  </p>

                  {/* QR Code box */}
                  <div className="size-60 border border-slate-500 rounded-md -mb-3 p-1 bg-white flex items-center justify-center">
                    {qrDataUrl ? (
                      <img src={qrDataUrl} alt="Scan to Pay via Monzo" className="w-full h-full" />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span className="text-xs text-slate-500">Generating QR...</span>
                      </div>
                    )}
                  </div>

                  {/* Scan to Pay badge */}
                  <div className="rounded-full bg-red-500 px-3 font-mono text-sm font-medium tracking-tight text-white uppercase">
                    Scan to Pay
                  </div>
                </div>

                <button
                  disabled={!qrDataUrl}
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = qrDataUrl
                    link.download = 'lokalads-donation-qr.png'
                    link.click()
                  }}
                  className="bg-blue-800 disabled:opacity-50 rounded-md text-sm text-white flex items-center gap-3 px-4 py-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                    <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                    <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                  </svg>
                  <span>Download QR Code</span>
                </button>
              </div>
            )}

            {/* CREDIT CARD — Stripe form panel */}
            {activeTab === 'cc' && (
              <div className="flex flex-col gap-0 max-md:px-8">

                {/* Amount header row */}
                <div className="flex flex-row justify-center md:justify-between items-center py-2 mb-1">
                  <div className="flex items-center justify-center md:justify-end gap-0 text-2xl font-bold text-slate-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 shrink-0"
                    >
                      <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
                        clipRule="evenodd"
                      />
                      <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                    </svg>
                    <span>{amount}</span>
                    <span className="font-normal text-sm">
                      {currency.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Loading / error */}
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
                    <button onClick={() => setRetryKey(k => k + 1)} className="shrink-0 underline text-red-600 font-medium">Retry</button>
                  </div>
                )}

                {/* Note section */}
                {!loading && !apiError && (
                  <section className="bg-slate-100 px-4 py-3 rounded-lg text-sm mb-6">
                    <h2 className="text-base font-semibold flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 text-green-600">
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                      </svg>
                      Secure Stripe Payment
                    </h2>
                    <p>Your card details are encrypted and processed securely via Stripe. We never store your card information.</p>
                  </section>
                )}

                {/* Stripe checkout form */}
                {clientSecret && !loading && (
                  <StripeProvider clientSecret={clientSecret}>
                    <CheckoutForm
                      amount={amountRaw}
                      currency={currency}
                      onSuccess={handleSuccess}
                      onError={handleError}
                    />
                  </StripeProvider>
                )}

                {/* Proceed to Pay placeholder button (visible before Stripe loads) */}
                {!clientSecret && !loading && !apiError && (
                  <button
                    disabled
                    className="px-8 py-2 border border-blue-600 bg-blue-500 opacity-50 cursor-not-allowed rounded-md text-lg text-rose-50 font-semibold mb-6"
                  >
                    Proceed to Pay
                  </button>
                )}
              </div>
            )}

          </div>
        </div>

        {/* ── Sub headline ──────────────────────────────────────────────── */}
        <p className="mt-8 mb-4 text-base text-slate-600 text-center italic">
          ...every contribution empowers us to enhance your experience, introduce
          new features, and keep Lokalads thriving for everyone. Be a part of this journey!
        </p>

        {/* ── Back button ───────────────────────────────────────────────── */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 rounded-full border border-slate-300 text-slate-500 text-sm font-medium hover:bg-slate-50 transition"
          >
            ← Back
          </button>
        </div>

      </main>
    </div>
  )
}
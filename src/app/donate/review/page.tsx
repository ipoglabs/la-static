'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import QRCode from 'qrcode'
import Header from '@/components/Header'
import { useDonationStore } from '@/app/store/donationStore'
import StripeProvider from '@/components/StripeProvider'
import CheckoutForm from '@/components/CheckoutForm'
import { cn } from '@/lib/utils'

const MONZO_PAYMENT_LINK = 'https://monzo.com/pay/r/lokaladscom-uk-limited_GjsQ9QudO1guTV?from_qr=true'

// ─── Step Progress Bar ────────────────────────────────────────────────────────
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

// ─── QR Timer ─────────────────────────────────────────────────────────────────
const QR_SECONDS = 5 * 60

function QrTimer() {
  const [secs, setSecs] = useState(QR_SECONDS)
  useEffect(() => {
    if (secs <= 0) return
    const id = setTimeout(() => setSecs((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [secs])
  const pct = (secs / QR_SECONDS) * 100
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  const expired = secs === 0
  return (
    <div className="w-full">
      <div className="h-1.5 bg-slate-200 rounded-full mb-1 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-1000', expired ? 'bg-rose-500' : 'bg-teal-500')}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={cn('text-xs text-center font-mono', expired ? 'text-rose-600 font-semibold' : 'text-slate-500')}>
        {expired ? 'QR code expired — refresh to get a new one' : `QR expires in ${mm}:${ss}`}
      </p>
    </div>
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = 'sp' | 'wp' | 'cc'
type WalletMethod = 'apple-pay' | 'google-pay' | 'paypal' | null

// ─── Currency options ─────────────────────────────────────────────────────────
const CURRENCIES = [
  { value: 'sgd', label: 'SGD — Singapore Dollar', symbol: 'S$' },
  { value: 'inr', label: 'INR — Indian Rupee',      symbol: '₹'  },
  { value: 'gbp', label: 'GBP — British Pound',     symbol: '£'  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DonateReviewPage() {
  const router = useRouter()
  const { amount, amountRaw, method, donor, setStatus, setTransactionId } = useDonationStore()

  const donorName  = donor?.name  ?? ''
  const donorEmail = donor?.email ?? ''

  const [mounted, setMounted]             = useState(false)
  const [activeTab, setActiveTab]         = useState<Tab>('cc')
  const [walletMethod, setWalletMethod]   = useState<WalletMethod>(null)
  const [currency, setCurrency]           = useState('gbp')
  const [qrDataUrl, setQrDataUrl]         = useState('')
  const [clientSecret, setClientSecret]   = useState<string | null>(null)
  const [loading, setLoading]             = useState(false)
  const [apiError, setApiError]           = useState('')
  const [retryKey, setRetryKey]           = useState(0)

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

  // Auto-select GBP for card tab
  useEffect(() => {
    if (activeTab === 'cc') setCurrency('gbp')
  }, [activeTab])

  // Create Stripe PaymentIntent (only for card tab)
  useEffect(() => {
    if (!mounted || !amountRaw || !donorName || !donorEmail) return
    if (activeTab !== 'cc') return
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
  }, [mounted, amountRaw, currency, donorName, donorEmail, retryKey, activeTab])

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

        {/* ── Thank you note ────────────────────────────────────────────── */}
        <div className="text-center mb-5">
          <p className="text-slate-800 text-2xl sm:text-3xl font-bold">
            Thank you {donorName || 'there'}!
          </p>
          <p className="text-slate-600 text-sm sm:text-2xl font-semibold">
            You've chosen to donate <span className="font-bold">{amount}</span>.
          </p>
           <div className="flex items-center justify-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 text-blue-700 shrink-0">
                    <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                    <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-2xl font-bold text-slate-800">{amount}</span>
                  <span className="text-sm font-normal text-slate-500">{currency.toUpperCase()}</span>
                </div>

        </div>

        {/* ── Payment method toggle (3 tabs, original pill style) ────────── */}
        <div className="px-4 py-2 flex flex-col items-center gap-3 rounded-md mb-3">
          <legend className="text-center text-lg font-semibold select-none">
            Select Payment Method:
          </legend>

          <div className="bg-slate-200 border border-slate-300 rounded-2xl sm:rounded-full p-1 flex flex-row flex-nowrap gap-0.5 w-full max-w-lg mb-1 sm:mb-4 -mt-2">

            {/* Scan Pay tab */}
            <label
              htmlFor="optScanPay"
              onClick={() => setActiveTab('sp')}
              className={`relative flex-1 px-2 py-2 sm:px-3 rounded-xl sm:rounded-full select-none cursor-pointer transition-colors
                flex flex-col sm:flex-row justify-center items-center gap-0.5 sm:gap-1.5
                text-xs sm:text-base font-semibold
                ${activeTab === 'sp' ? 'bg-slate-700 text-white' : 'bg-transparent text-slate-800'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
                <path fillRule="evenodd" d="M3 4.875C3 3.839 3.84 3 4.875 3h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 9.375v-4.5ZM4.875 4.5a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875.375c0-1.036.84-1.875 1.875-1.875h4.5C20.16 3 21 3.84 21 4.875v4.5c0 1.036-.84 1.875-1.875 1.875h-4.5a1.875 1.875 0 0 1-1.875-1.875v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75A.75.75 0 0 1 6 7.5v-.75Zm9.75 0A.75.75 0 0 1 16.5 6h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM3 14.625c0-1.036.84-1.875 1.875-1.875h4.5c1.036 0 1.875.84 1.875 1.875v4.5c0 1.035-.84 1.875-1.875 1.875h-4.5A1.875 1.875 0 0 1 3 19.125v-4.5Zm1.875-.375a.375.375 0 0 0-.375.375v4.5c0 .207.168.375.375.375h4.5a.375.375 0 0 0 .375-.375v-4.5a.375.375 0 0 0-.375-.375h-4.5Zm7.875-.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75ZM6 16.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm9.75 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm-3 3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Zm6 0a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-.75.75h-.75a.75.75 0 0 1-.75-.75v-.75Z" clipRule="evenodd" />
              </svg>
              <span className="leading-tight text-center">Scan Pay</span>
              <input type="radio" id="optScanPay" name="paymentTab" checked={activeTab === 'sp'} onChange={() => setActiveTab('sp')} className="absolute hidden size-0" />
            </label>

            {/* Wallet Pay tab */}
            <label
              htmlFor="optWalletPay"
              onClick={() => setActiveTab('wp')}
              className={`relative flex-1 px-2 py-2 sm:px-3 rounded-xl sm:rounded-full select-none cursor-pointer transition-colors
                flex flex-col sm:flex-row justify-center items-center gap-0.5 sm:gap-1.5
                text-xs sm:text-base font-semibold
                ${activeTab === 'wp' ? 'bg-slate-700 text-white' : 'bg-transparent text-slate-800'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
                <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H5.25Zm7.5 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
              </svg>
              <span className="leading-tight text-center">Wallet Pay</span>
              <input type="radio" id="optWalletPay" name="paymentTab" checked={activeTab === 'wp'} onChange={() => setActiveTab('wp')} className="absolute hidden size-0" />
            </label>

            {/* Card Payment tab */}
            <label
              htmlFor="optCreditCard"
              onClick={() => setActiveTab('cc')}
              className={`relative flex-1 px-2 py-2 sm:px-3 rounded-xl sm:rounded-full select-none cursor-pointer transition-colors
                flex flex-col sm:flex-row justify-center items-center gap-0.5 sm:gap-1.5
                text-xs sm:text-base font-semibold
                ${activeTab === 'cc' ? 'bg-slate-700 text-white' : 'bg-transparent text-slate-800'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
                <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
              </svg>
              <span className="leading-tight text-center">Card Pay</span>
              <input type="radio" id="optCreditCard" name="paymentTab" checked={activeTab === 'cc'} onChange={() => setActiveTab('cc')} className="absolute hidden size-0" />
            </label>

          </div>
        </div>

        {/* ── Two-column layout ──────────────────────────────────────────── */}
        <div className={cn("flex flex-nowrap", activeTab === 'cc' ? "flex-col items-center" : "flex-col md:flex-row")}>

          {/* ── LEFT column (hidden for card tab) ─────────────────────────────── */}
          <div className={cn("flex-1 md:flex-none md:w-1/2 max-md:order-2 max-md:pt-8", activeTab === 'cc' && "hidden")}>

            {/* SCAN PAY — left content */}
            {activeTab === 'sp' && (
              <div>
                <ol className="text-slate-700 list-decimal ml-5 mb-6 space-y-1">
                  <li>Scan the QR code using your mobile banking app, or save &amp; upload it from your device.</li>
                  <li>Complete the payment before the QR code expires.</li>
                  <li>You will be redirected to a confirmation page after payment.</li>
                </ol>
                <div className="bg-red-100 rounded-lg py-4 px-5 text-base text-red-700 mb-3" role="alert">
                  <b>Please stay on this page until your payment is processed.</b>{' '}
                  If you face issues, check the donation status on the home page after{' '}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 inline">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm7.75-4.25a.75.75 0 0 0-1.5 0V8c0 .414.336.75.75.75h3.25a.75.75 0 0 0 0-1.5h-2.5v-3.5Z" clipRule="evenodd" />
                  </svg>{' '}
                  <b>30 minutes</b>.
                </div>
              </div>
            )}

            {/* WALLET PAY — left content */}
            {activeTab === 'wp' && (
              <div className="flex flex-col items-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-28 text-blue-700 mb-4">
                  <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H5.25Zm7.5 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
                </svg>
                <h2 className="w-8/12 text-2xl font-semibold text-slate-700 mb-2">
                  1-Tap Wallet Payment
                </h2>
                <p className="w-10/12 text-slate-700 mb-4">
                  Pay instantly with Apple Pay, Google Pay, or PayPal. Your wallet handles authentication securely — no card details needed.
                </p>
              </div>
            )}
          </div>

          {/* ── RIGHT column ────────────────────────────────────────────── */}
          <div className={cn("flex-1 relative max-md:order-1", activeTab === 'cc' && "w-full max-w-lg")}>

            {/* ── SCAN PAY — QR panel ─────────────────────────────────── */}
            {activeTab === 'sp' && (
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center px-5 pb-4 mb-3">
                  <p className="text-lg font-semibold text-center mb-3">
                    Scan with your bank or payment app
                  </p>

                  {/* QR Code box */}
                  <div className="relative mb-6">
                    <div className="size-56 border-2 border-slate-300 rounded-xl p-1.5 bg-white shadow-sm flex items-center justify-center">
                      {qrDataUrl ? (
                        <img src={qrDataUrl} alt="Scan to Pay via Monzo" className="w-full h-full object-contain" />
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
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap">
                      Scan to Pay
                    </span>
                  </div>

                  {/* QR Timer */}
                  <div className="w-56 mb-3">
                    <QrTimer />
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

            {/* ── WALLET PAY — wallet options panel ───────────────────── */}
            {activeTab === 'wp' && (
              <div className="flex flex-col gap-0 max-md:px-4">
                <p className="text-sm text-slate-500 mb-4 text-center">Choose your preferred wallet:</p>

                {/* Apple Pay */}
                <label className={cn('flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer mb-2 transition-all',
                  walletMethod === 'apple-pay' ? 'border-slate-700 bg-white shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300')}>
                  <input type="radio" name="wallet" checked={walletMethod === 'apple-pay'}
                    onChange={() => setWalletMethod('apple-pay')} className="sr-only" />
                  <div className="size-9 bg-black rounded-lg flex items-center justify-center flex-none">
                    <svg viewBox="0 0 24 24" fill="white" className="size-5">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Apple Pay</p>
                    <p className="text-xs text-slate-500">Face ID / Touch ID secured</p>
                  </div>
                  <div className={cn('size-4 rounded-full border-2 flex items-center justify-center',
                    walletMethod === 'apple-pay' ? 'border-slate-700' : 'border-slate-300')}>
                    {walletMethod === 'apple-pay' && <span className="size-2 rounded-full bg-slate-700 block" />}
                  </div>
                </label>

                {/* Google Pay */}
                <label className={cn('flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer mb-2 transition-all',
                  walletMethod === 'google-pay' ? 'border-slate-700 bg-white shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300')}>
                  <input type="radio" name="wallet" checked={walletMethod === 'google-pay'}
                    onChange={() => setWalletMethod('google-pay')} className="sr-only" />
                  <div className="size-9 rounded-lg flex items-center justify-center flex-none bg-white border border-slate-200">
                    <svg viewBox="0 0 48 48" className="size-5">
                      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
                      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
                      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
                      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Google Pay</p>
                    <p className="text-xs text-slate-500">Fingerprint / PIN secured</p>
                  </div>
                  <div className={cn('size-4 rounded-full border-2 flex items-center justify-center',
                    walletMethod === 'google-pay' ? 'border-slate-700' : 'border-slate-300')}>
                    {walletMethod === 'google-pay' && <span className="size-2 rounded-full bg-slate-700 block" />}
                  </div>
                </label>

                {/* PayPal */}
                <label className={cn('flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer mb-4 transition-all',
                  walletMethod === 'paypal' ? 'border-slate-700 bg-white shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300')}>
                  <input type="radio" name="wallet" checked={walletMethod === 'paypal'}
                    onChange={() => setWalletMethod('paypal')} className="sr-only" />
                  <div className="size-9 rounded-lg flex items-center justify-center flex-none bg-[#003087]">
                    <svg viewBox="0 0 24 24" fill="white" className="size-5">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.58 2.975-2.477 4.6-5.716 4.6h-2.19c-1.515 0-2.8 1.106-3.034 2.6l-1.12 7.107h2.606c.524 0 .968-.382 1.05-.9l.44-2.782c.082-.518.527-.9 1.05-.9h.668c3.845 0 6.538-1.563 7.374-6.082a5.026 5.026 0 0 0-.48-3.356z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">PayPal</p>
                    <p className="text-xs text-slate-500">Safe buyer protection included</p>
                  </div>
                  <div className={cn('size-4 rounded-full border-2 flex items-center justify-center',
                    walletMethod === 'paypal' ? 'border-slate-700' : 'border-slate-300')}>
                    {walletMethod === 'paypal' && <span className="size-2 rounded-full bg-slate-700 block" />}
                  </div>
                </label>

                {/* Pay button (shown once a wallet is selected) */}
                {walletMethod && (
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('success')
                      router.push('/donate/status')
                    }}
                    className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-base font-bold rounded-full transition-colors"
                  >
                    Pay with {walletMethod === 'apple-pay' ? 'Apple Pay' : walletMethod === 'google-pay' ? 'Google Pay' : 'PayPal'} — {amount}
                  </button>
                )}
              </div>
            )}

            {/* ── CARD PAYMENT — Stripe form panel ────────────────────── */}
            {activeTab === 'cc' && (
              <div className="flex flex-col items-center w-full max-md:px-4">
    
                {/* Loading */}
                {loading && (
                  <div className="flex items-center justify-center py-10 gap-3">
                    <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span className="text-sm text-slate-500">Setting up secure payment...</span>
                  </div>
                )}

                {/* API error */}
                {apiError && !loading && (
                  <div className="w-full rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700 mb-3 flex items-center justify-between gap-2">
                    <span>{apiError}</span>
                    <button onClick={() => setRetryKey(k => k + 1)} className="shrink-0 underline text-red-600 font-medium">Retry</button>
                  </div>
                )}

                {/* Secure note */}
                {!loading && !apiError && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 text-green-600 shrink-0">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                    </svg>
                    Encrypted &amp; processed securely via Stripe. We never store your card details.
                  </div>
                )}

                {/* Stripe checkout form */}
                {clientSecret && !loading && (
                  <div className="w-full">
                    <StripeProvider clientSecret={clientSecret}>
                      <CheckoutForm
                        amount={amountRaw}
                        currency={currency}
                        onSuccess={handleSuccess}
                        onError={handleError}
                      />
                    </StripeProvider>
                  </div>
                )}

                {/* Placeholder button before Stripe loads */}
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
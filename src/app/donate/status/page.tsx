'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useStripe } from '@stripe/react-stripe-js'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import { useDonationStore } from '../../store/donationStore'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

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

// ─── Inner content ────────────────────────────────────────────────────────────
function StatusContent() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const stripe       = useStripe()
  const { width, height } = useWindowSize()

  const { amount, method, donor, status, transactionId, setStatus, setTransactionId, reset } =
    useDonationStore()

  const [resolvedStatus, setResolvedStatus] = useState<'loading' | 'success' | 'failed' | 'pending'>('loading')
  const [resolvedTxId, setResolvedTxId]     = useState('')
  const [showConfetti, setShowConfetti]     = useState(false)

  const pmLabels: Record<string, string> = { qr: 'Scan & Pay (UPI)', card: 'Credit Card', paypal: 'PayPal' }

  const now     = new Date()
  const dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  // Fire confetti only on success, stop after 5 seconds
  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  useEffect(() => {
    const clientSecret   = searchParams.get('payment_intent_client_secret')

    // ── Case 1: 3DS redirect (India) ─────────────────────────────────────────
    if (clientSecret && stripe) {
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        if (!paymentIntent) { setResolvedStatus('failed'); return }

        const txId = paymentIntent.id
        setResolvedTxId(txId)
        setTransactionId(txId)

        if (paymentIntent.status === 'succeeded') {
          setStatus('success')
          setResolvedStatus('success')
          triggerConfetti()                         // 🎉 fire on 3DS success
        } else if (['requires_payment_method', 'canceled'].includes(paymentIntent.status)) {
          setStatus('failed'); setResolvedStatus('failed')
        } else {
          setStatus('pending'); setResolvedStatus('pending')
        }
      })
      return
    }

    // ── Case 2: Direct flow ───────────────────────────────────────────────────
    if (status === 'success' || status === 'failed' || status === 'pending') {
      setResolvedStatus(status)
      setResolvedTxId(transactionId || '')
      if (status === 'success') triggerConfetti()   // 🎉 fire on direct success
      return
    }

    // ── Case 3: No payment data — send back ───────────────────────────────────
    if (!donor.name || !donor.email) {
      router.replace('/donate')
    }
  }, [stripe, searchParams, status, transactionId, donor])

  const handleBackToHome = () => { reset(); router.push('/') }

  // ── Loading ───────────────────────────────────────────────────────────────
  if (resolvedStatus === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <svg className="animate-spin h-10 w-10 text-blue-600" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        <p className="text-slate-500 text-sm">Confirming your payment...</p>
      </div>
    )
  }

  const displayTxId = resolvedTxId || transactionId || 'Awaiting confirmation...'

  return (
    <>
      {/* 🎉 Confetti — only fires on success */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={450}
          gravity={0.18}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}

      {/* Banner */}
      <div className={`rounded-2xl px-5 py-7 text-center text-white mb-5
        ${resolvedStatus === 'failed' ? 'bg-red-600' : 'bg-blue-800'}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
          ${resolvedStatus === 'failed' ? 'bg-red-100' : 'bg-green-100'}`}>
          {resolvedStatus === 'failed' ? (
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : resolvedStatus === 'pending' ? (
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="9" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <p className="text-xl font-bold mb-1">
          {resolvedStatus === 'failed'
            ? 'Payment Failed'
            : resolvedStatus === 'pending'
            ? 'Payment Pending'
            : `Thank you, ${donor.name || 'there'}! 🎉`}
        </p>
        <p className="text-blue-100 text-base">
          {resolvedStatus === 'failed'
            ? 'Something went wrong. Please try again.'
            : resolvedStatus === 'pending'
            ? "We're waiting for bank confirmation."
            : <> Your <span className="font-bold text-white">{amount}</span> donation has been received.</>}
        </p>
      </div>

      {/* Transaction details */}
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 mb-4">
        {[
          { label: 'Donor',          value: donor.name },
          { label: 'Email',          value: donor.email },
          { label: 'Date & Time',    value: `${dateStr} · ${timeStr}` },
          { label: 'Transaction ID', value: displayTxId, mono: true },
          { label: 'Amount',         value: amount, highlight: true },
          { label: 'Method',         value: pmLabels[method] ?? method },
          { label: 'Status',         badge: true },
        ].map((row) => (
          <div key={row.label} className="flex justify-between items-center px-4 py-3">
            <span className="text-xs text-slate-500">{row.label}</span>
            {row.badge ? (
              <span className={`text-xs font-semibold px-3 py-0.5 rounded-full
                ${resolvedStatus === 'failed'
                  ? 'bg-red-100 text-red-600'
                  : resolvedStatus === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-amber-100 text-amber-700'}`}>
                {resolvedStatus === 'failed' ? 'Failed' : resolvedStatus === 'success' ? 'Successful' : 'Pending'}
              </span>
            ) : (
              <span className={`text-right break-all max-w-[55%]
                ${row.mono      ? 'font-mono text-[11px] text-slate-600' : ''}
                ${row.highlight ? 'text-blue-700 font-bold text-base'    : 'text-sm font-medium text-slate-800'}`}>
                {row.value}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* What's next */}
      {resolvedStatus !== 'failed' && (
        <div className="bg-slate-100 rounded-xl p-4 mb-5">
          <p className="text-sm font-semibold text-slate-700 mb-2">What&apos;s next?</p>
          <ol className="list-decimal ml-4 text-sm text-slate-600 space-y-1 leading-relaxed">
            <li>A confirmation email will be sent to <strong>{donor.email}</strong>.</li>
            <li>Stay connected for updates on how your contribution makes an impact.</li>
          </ol>
        </div>
      )}

      <p className="text-center text-sm text-slate-500 mb-5 leading-relaxed max-w-xs mx-auto">
        Your support helps us grow Lokalads and build stronger communities.
      </p>

      {resolvedStatus === 'failed' && (
        <button
          onClick={() => router.push('/donate/review')}
          className="block w-full text-center py-3 rounded-full bg-blue-700 hover:bg-blue-600 text-white font-semibold text-base transition mb-3"
        >
          Try Again
        </button>
      )}

      <button
        onClick={handleBackToHome}
        className="block w-full text-center py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold text-base transition"
      >
        Back to Home
      </button>
    </>
  )
}

// ─── Page wrapper ─────────────────────────────────────────────────────────────
export default function DonateStatusPage() {
  return (
    <div className="bg-slate-50 min-w-[375px] min-h-screen flex flex-col">

      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-sm mx-auto h-12 flex items-center px-4">
          <Link className="flex gap-2 items-center" href="/">
            <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center text-white text-xs font-bold">LA</div>
            <span className="font-bold text-blue-800 text-base tracking-tight">Lokalads</span>
          </Link>
        </div>
      </header>

      <div className="max-w-screen-sm mx-auto w-full px-4 py-6 flex-1">
        <Stepper step={3} />
        <Elements stripe={stripePromise}>
          <StatusContent />
        </Elements>
      </div>

      <footer className="bg-slate-800 border-t-4 border-rose-500 mt-auto">
        <div className="max-w-screen-sm mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-white text-xs font-bold">LA</div>
            <span className="font-bold text-white text-sm">Lokalads</span>
          </div>
          <p className="text-slate-400 text-xs mb-3">find anything with lokalads, its just secure..</p>
          <hr className="border-slate-600 mb-3" />
          <div className="flex flex-wrap items-center gap-1 text-slate-400 text-xs">
            <span>© 2025 lokalads</span>
            <span>·</span>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition">Conditions</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
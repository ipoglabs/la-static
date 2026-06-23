// Save as: components/RazorpayCheckoutButton.tsx
//
// The Razorpay script is loaded ONCE in page.tsx via <Script> and
// `rzpScriptLoaded` is passed down as a prop. This avoids the race condition
// where each button instance loaded its own script and wasn't ready in time.
'use client'

import { useRef, useState } from 'react'

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayCheckoutButtonProps {
  amountInRupees: number
  currency?: string
  name?: string
  donorName?: string
  donorMessage?: string   // optional message from the donate page — used in description & notes
  email?: string
  contact?: string
  label?: string
  className?: string
  /** Pass `method` to open the Razorpay modal pre-selected to that tab (wallet/UPI).
   *  Omit to render the inline card form instead. */
  method?: 'card' | 'wallet' | 'upi' | 'netbanking' | 'emi'
  wallet?: string
  /** Passed from page.tsx — true once the shared Razorpay <Script> has loaded. */
  scriptLoaded: boolean
  onSuccess: (paymentId: string) => void
  onError: (message: string) => void
}

// ─── Inline card form ─────────────────────────────────────────────────────────
function RazorpayCardForm({
  amountInRupees,
  currency = 'INR',
  name = 'Lokalads',
  donorName,
  donorMessage,
  email,
  contact,
  scriptLoaded,
  onSuccess,
  onError,
}: Omit<RazorpayCheckoutButtonProps, 'label' | 'className' | 'method' | 'wallet'>) {
  const [cardNumber, setCardNumber]     = useState('')
  const [expiry, setExpiry]             = useState('')
  const [cvv, setCvv]                   = useState('')
  const [cardName, setCardName]         = useState(donorName ?? '')
  const [submitting, setSubmitting]     = useState(false)
  const [orderLoading, setOrderLoading] = useState(false)
  const [fieldError, setFieldError]     = useState('')
  const rzpRef = useRef<any>(null)

  const handleCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 16)
    setCardNumber(digits.replace(/(.{4})/g, '$1 ').trim())
  }

  const handleExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4)
    setExpiry(digits.length >= 3 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits)
  }

  const handleCvv = (v: string) => setCvv(v.replace(/\D/g, '').slice(0, 4))

  const handlePay = async () => {
    setFieldError('')
    const rawCard = cardNumber.replace(/\s/g, '')
    if (rawCard.length < 15)              { setFieldError('Enter a valid card number.'); return }
    if (!/^\d{2}\/\d{2}$/.test(expiry))  { setFieldError('Enter expiry as MM/YY.'); return }
    if (cvv.length < 3)                   { setFieldError('Enter a valid CVV.'); return }
    if (!cardName.trim())                 { setFieldError('Enter the name on your card.'); return }

    if (!scriptLoaded || !window.Razorpay) {
      setFieldError('Payment script still loading — please wait a moment and try again.')
      return
    }

    setOrderLoading(true)
    setSubmitting(true)

    try {
      // 1. Create Razorpay order
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInRupees,
          currency,
          receipt: `rcpt_${Date.now()}`,
          donorName,
          donorEmail: email,
          donorMessage,
        }),
      })
      const order = await res.json()
      if (!res.ok) throw new Error(order.error || 'Could not create order')
      setOrderLoading(false)

      // 2. Init Razorpay in Custom UI mode — no modal opens
      const [expMM, expYY] = expiry.split('/')
      rzpRef.current = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name,
        description: order.description || 'Donation Lokalads',
        prefill: { name: donorName, email, contact },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })
            const verifyData = await verifyRes.json()
            if (verifyRes.ok && verifyData.success) {
              onSuccess(response.razorpay_payment_id)
            } else {
              setFieldError(verifyData.error || 'Payment verification failed.')
            }
          } catch (err: any) {
            setFieldError(err.message || 'Verification failed.')
          } finally {
            setSubmitting(false)
          }
        },
        modal: { ondismiss: () => setSubmitting(false) },
        theme: { color: '#0f172a' },
      })

      rzpRef.current.on('payment.failed', (resp: any) => {
        setSubmitting(false)
        setFieldError(resp.error?.description || 'Payment failed. Please check your card details.')
      })

      // 3. Submit card directly — triggers OTP/3DS without opening modal
      rzpRef.current.createPayment({
        method: 'card',
        card: {
          number: rawCard,
          name: cardName,
          expiry_month: expMM,
          expiry_year: '20' + expYY,
          cvv,
        },
        email,
        contact: contact || '',
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
      })
    } catch (err: any) {
      setSubmitting(false)
      setOrderLoading(false)
      setFieldError(err.message || 'Could not start payment.')
    }
  }

  const inputClass =
    'w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent transition'

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-3">
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Card number</label>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={e => handleCardNumber(e.target.value)}
            className={inputClass}
            disabled={submitting}
          />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-slate-400 pointer-events-none">
            <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
            <path fillRule="evenodd" d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Name on card</label>
        <input
          type="text"
          placeholder="As printed on card"
          value={cardName}
          onChange={e => setCardName(e.target.value)}
          className={inputClass}
          disabled={submitting}
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">Expiry</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="MM/YY"
            value={expiry}
            onChange={e => handleExpiry(e.target.value)}
            className={inputClass}
            disabled={submitting}
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">CVV</label>
          <input
            type="password"
            inputMode="numeric"
            placeholder="•••"
            value={cvv}
            onChange={e => handleCvv(e.target.value)}
            className={inputClass}
            disabled={submitting}
          />
        </div>
      </div>

      {fieldError && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {fieldError}
        </p>
      )}

      <button
        onClick={handlePay}
        disabled={submitting || !scriptLoaded}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
      >
        {orderLoading ? 'Creating order...' : submitting ? 'Processing...' : `Pay ₹${amountInRupees}`}
      </button>

      <p className="text-[11px] text-slate-400 text-center">
        You may be redirected to your bank for OTP / 3D Secure verification.
      </p>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function RazorpayCheckoutButton({
  amountInRupees,
  currency = 'INR',
  name = 'Lokalads',
  donorName,
  donorMessage,
  email,
  contact,
  label = 'Pay Now',
  className = 'px-8 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-md text-white font-semibold',
  method,
  wallet,
  scriptLoaded,
  onSuccess,
  onError,
}: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  // ── Modal button (wallet / UPI / netbanking) ───────────────────────────────
  const handlePay = async () => {
    if (!scriptLoaded || !window.Razorpay) {
      onError('Payment script is still loading — try again in a moment.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInRupees,
          currency,
          receipt: `rcpt_${Date.now()}`,
          donorName,
          donorEmail: email,
          donorMessage,
        }),
      })
      const order = await res.json()
      if (!res.ok) throw new Error(order.error || 'Could not create order')

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name,
        description: order.description || 'Donation Lokalads',
        prefill: {
          name: donorName,
          email,
          contact,
          ...(method ? { method } : {}),
          ...(wallet ? { wallet } : {}),
        },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })
            const verifyData = await verifyRes.json()
            if (verifyRes.ok && verifyData.success) {
              onSuccess(response.razorpay_payment_id)
            } else {
              onError(verifyData.error || 'Payment verification failed')
            }
          } catch (err: any) {
            onError(err.message || 'Payment verification failed')
          } finally {
            setLoading(false)
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
            onError('Payment cancelled')
          },
        },
        theme: { color: '#0f172a' },
      })

      rzp.on('payment.failed', (response: any) => {
        setLoading(false)
        onError(response.error?.description || 'Payment failed')
      })

      rzp.open()
    } catch (err: any) {
      setLoading(false)
      onError(err.message || 'Could not start payment')
    }
  }

  // No method = inline card form; with method = modal button
  if (!method) {
    return (
      <RazorpayCardForm
        amountInRupees={amountInRupees}
        currency={currency}
        name={name}
        donorName={donorName}
        donorMessage={donorMessage}
        email={email}
        contact={contact}
        scriptLoaded={scriptLoaded}
        onSuccess={onSuccess}
        onError={onError}
      />
    )
  }

  return (
    <button onClick={handlePay} disabled={loading || !scriptLoaded} className={className}>
      {loading ? 'Processing...' : label}
    </button>
  )
}
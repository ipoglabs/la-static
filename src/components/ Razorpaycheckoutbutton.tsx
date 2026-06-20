// Save as: components/RazorpayCheckoutButton.tsx
'use client'

import Script from 'next/script'
import { useState } from 'react'

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayCheckoutButtonProps {
  amountInRupees: number
  currency?: string
  name?: string        // shown in the modal header
  donorName?: string   // prefilled in the modal
  email?: string
  contact?: string
  label?: string
  className?: string
  method?: 'card' | 'wallet' | 'upi' | 'netbanking' | 'emi'  // jumps straight to this tab in the modal
  wallet?: string       // e.g. 'paytm', 'amazonpay', 'mobikwik', 'freecharge' — preselects the wallet
  onSuccess: (paymentId: string) => void
  onError: (message: string) => void
}

export default function RazorpayCheckoutButton({
  amountInRupees,
  currency = 'INR',
  name = 'Lokalads',
  donorName,
  email,
  contact,
  label = 'Pay Now',
  className = 'px-8 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-md text-white font-semibold',
  method,
  wallet,
  onSuccess,
  onError,
}: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  const handlePay = async () => {
    if (!scriptLoaded || !window.Razorpay) {
      onError('Payment script is still loading — try again in a moment.')
      return
    }

    setLoading(true)
    try {
      // Send the raw amount (e.g. 500 for ₹500) — same convention as
      // /api/create-qr-payment, which converts to paise server-side.
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInRupees,
          currency,
          receipt: `rcpt_${Date.now()}`,
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
        description: 'Donation',
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

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
      />
      <button
        onClick={handlePay}
        disabled={loading}
        className={className}
      >
        {loading ? 'Processing...' : label}
      </button>
    </>
  )
}
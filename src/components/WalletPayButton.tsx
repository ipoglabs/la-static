// components/WalletPayButton.tsx
'use client'
import { useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'

export default function WalletPayButton({
  amount,        // in pence/cents e.g. 100 for £1
  currency,      // 'gbp'
  onSuccess,
  onError,
}: {
  amount: number
  currency: string
  onSuccess: (txId: string) => void
  onError: (msg: string) => void
}) {
  const stripe = useStripe()
  const [paymentRequest, setPaymentRequest] = useState<any>(null)
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    if (!stripe) return

    const pr = stripe.paymentRequest({
      country: 'GB',
      currency: currency.toLowerCase(),
      total: { label: 'Lokalads Donation', amount },
      requestPayerName: true,
      requestPayerEmail: true,
    })

    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr)
        setAvailable(true)
      }
    })

    pr.on('paymentmethod', async (e) => {
      // Confirm the PaymentIntent server-side first, then confirm here
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency }),
      })
      const { clientSecret } = await res.json()

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: e.paymentMethod.id },
        { handleActions: false }
      )

      if (error) {
        e.complete('fail')
        onError(error.message ?? 'Payment failed')
      } else {
        e.complete('success')
        if (paymentIntent.status === 'requires_action') {
          await stripe.confirmCardPayment(clientSecret)
        }
        onSuccess(paymentIntent.id)
      }
    })
  }, [stripe, amount, currency])

  if (!available) return (
    <p className="text-xs text-slate-400 text-center">
      Apple Pay / Google Pay not available on this device or browser.
    </p>
  )

  return (
    <PaymentRequestButtonElement
      options={{ paymentRequest, style: { paymentRequestButton: { height: '48px' } } }}
    />
  )
}
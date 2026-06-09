// components/WalletPayButton.tsx
'use client'
import { useStripe, PaymentRequestButtonElement } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'

export default function WalletPayButton({
  amount,
  currency,
  clientSecret,
  onSuccess,
  onError,
}: {
  amount: number
  currency: string
  clientSecret: string
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
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: e.paymentMethod.id },
        { handleActions: false }
      )

      if (error) {
        e.complete('fail')
        onError(error.message ?? 'Payment failed')
        return
      }

      e.complete('success')

      if (paymentIntent.status === 'requires_action') {
        const { error: actionError } = await stripe.confirmCardPayment(clientSecret)
        if (actionError) {
          onError(actionError.message ?? 'Authentication failed')
          return
        }
      }

      onSuccess(paymentIntent.id)
    })
  }, [stripe, amount, currency, clientSecret])

  if (!available) return (
    <p className="text-xs text-slate-400 text-center py-2">
      Apple Pay / Google Pay not available on this device or browser.
    </p>
  )

  return (
    <PaymentRequestButtonElement
      options={{
        paymentRequest,
        style: { paymentRequestButton: { height: '48px' } },
      }}
    />
  )
}
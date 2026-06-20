// app/api/create-order/route.ts
//
// Creates a Razorpay order for the Wallet Pay / Card Pay tabs (India only).
// RazorpayCheckoutButton converts the donation amount to paise client-side
// before calling this route, so `amount` here is already in the smallest
// currency unit — do not multiply again.

import { NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json()

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount), // already in paise — see note above
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    })

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (err: any) {
    console.error('Razorpay create-order error:', err)
    const status = err?.statusCode === 401 ? 401 : 500
    return NextResponse.json(
      { error: err?.error?.description || err.message || 'Order creation failed' },
      { status }
    )
  }
}
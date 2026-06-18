// Save as: app/api/create-order/route.ts
//
// Reuses the Razorpay client from lib/razorpay.ts (already created for the
// UPI QR flow earlier — no need to duplicate that file).

import { NextRequest, NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt } = await req.json()

    // `amount` is expected in paise already (smallest currency unit), per
    // Razorpay's Standard Checkout spec.
    const amountInPaise = Math.round(Number(amount))

    if (!amountInPaise || amountInPaise < 100) {
      return NextResponse.json(
        { error: 'Amount must be at least 100 paise (₹1)' },
        { status: 400 }
      )
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    })

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (err: any) {
    console.error('Razorpay order creation failed:', err)

    // Razorpay auth errors surface as 401 from their API
    const status = err?.statusCode === 401 ? 401 : 500
    return NextResponse.json(
      { error: err?.error?.description || err.message || 'Failed to create order' },
      { status }
    )
  }
}
// Save as: app/api/verify-payment/route.ts

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      // Do NOT mark the order/donation as paid on mismatch
      return NextResponse.json({ success: false, error: 'Signature mismatch' }, { status: 400 })
    }

    // TODO: mark your order/donation record as paid here, e.g.
    // await updateDonationStatus(razorpay_order_id, 'success', razorpay_payment_id)

    return NextResponse.json({ success: true, paymentId: razorpay_payment_id })
  } catch (err: any) {
    console.error('Razorpay signature verification failed:', err)
    return NextResponse.json({ error: err.message || 'Verification failed' }, { status: 500 })
  }
}
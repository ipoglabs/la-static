// app/api/create-order/route.ts
import { NextResponse } from 'next/server'
import { razorpay } from '@/lib/razorpay'
import { getOrCreateRazorpayCustomer } from '@/lib/rzpcustomer'

export async function POST(req: Request) {
  try {
    const {
      amount,
      currency = 'INR',
      receipt,
      donorName,
      donorEmail,
      donorMessage,
    } = await req.json()

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const description = donorMessage?.trim()
      ? `Donation Lokalads - ${donorMessage.trim()}`
      : 'Donation Lokalads'

    // Get or create Razorpay customer (populates "Customer detail" in dashboard)
    const customerId = donorEmail
      ? await getOrCreateRazorpayCustomer(donorEmail, donorName || '')
      : undefined

    const orderPayload: Record<string, any> = {
      amount:   Math.round(amount),
      currency,
      receipt:  receipt || `receipt_${Date.now()}`,
      notes: {
        donor_name:    donorName        || '',
        donor_email:   donorEmail       || '',
        donor_message: donorMessage?.trim() || '',
        description,
      },
    }
    if (customerId) orderPayload.customer_id = customerId

    const order = await razorpay.orders.create(orderPayload)

    return NextResponse.json({
      order_id:    order.id,
      amount:      order.amount,
      currency:    order.currency,
      description,
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
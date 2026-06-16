// app/api/create-qr-payment/route.ts
//
// Creates QR-based payments:
//   SG  → Stripe Payment Link QR (currency: sgd) — PayNow requires SG Stripe account
//   IN  → UPI     (currency: inr)  — covers GPay, PhonePe, Paytm, BHIM
//   GB  → Stripe Payment Link QR  (currency: gbp)
//
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
})

export async function POST(req: Request) {
  try {
    const { amount, country, donorName, email } = await req.json()

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }
    if (!['SG', 'IN', 'GB'].includes(country)) {
      return NextResponse.json({ error: 'Unsupported country for QR payment' }, { status: 400 })
    }

    const amountInSmallestUnit = Math.round(amount * 100)

    // ── Singapore: Stripe Payment Link QR (SGD) ──────────────────────────────
    // PayNow requires a Singapore-registered Stripe account.
    // Payment Link QR works with any Stripe account and accepts card/wallet.
    if (country === 'SG') {
      const product = await stripe.products.create({
        name: `Lokalads Donation — ${donorName || 'Anonymous'}`,
      })
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amountInSmallestUnit,
        currency: 'sgd',
      })
      const link = await stripe.paymentLinks.create({
        line_items: [{ price: price.id, quantity: 1 }],
        metadata: { donorName: donorName || 'Anonymous', email: email || '', country: 'SG' },
        after_completion: {
          type: 'redirect',
          redirect: { url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/donate/status` },
        },
      })

      return NextResponse.json({
        method: 'payment_link',
        paymentLinkUrl: link.url,
        paymentLinkId: link.id,
      })
    }

    // ── India: UPI ───────────────────────────────────────────────────────────
    // UPI covers Google Pay (IN), PhonePe, Paytm, BHIM, and all UPI apps.
    if (country === 'IN') {
      const intent = await stripe.paymentIntents.create({
        amount: amountInSmallestUnit,
        currency: 'inr',
        payment_method_types: ['upi'],
        metadata: { donorName: donorName || 'Anonymous', email: email || '', country: 'IN' },
        description: `Lokalads donation from ${donorName || 'Anonymous'}`,
      })

      return NextResponse.json({
        method: 'upi',
        clientSecret: intent.client_secret,
        paymentIntentId: intent.id,
      })
    }

    // ── UK: Stripe Payment Link QR (GBP) ─────────────────────────────────────
    if (country === 'GB') {
      const product = await stripe.products.create({
        name: `Lokalads Donation — ${donorName || 'Anonymous'}`,
      })
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amountInSmallestUnit,
        currency: 'gbp',
      })
      const link = await stripe.paymentLinks.create({
        line_items: [{ price: price.id, quantity: 1 }],
        metadata: { donorName: donorName || 'Anonymous', email: email || '', country: 'GB' },
        after_completion: {
          type: 'redirect',
          redirect: { url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'}/donate/status` },
        },
      })

      return NextResponse.json({
        method: 'payment_link',
        paymentLinkUrl: link.url,
        paymentLinkId: link.id,
      })
    }
  } catch (err: any) {
    console.error('QR payment error:', err)
    return NextResponse.json({ error: err.message || 'QR payment creation failed' }, { status: 500 })
  }
}
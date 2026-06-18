import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    // ✅ Safe JSON parsing (prevents crashes)
    let body: any = {};

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const amount = Number(body.amount);

    // ✅ Validation
    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: "Minimum amount is 100 paise (₹1)" },
        { status: 400 }
      );
    }

    // ✅ Create Razorpay order
    const order = await razorpay.orders.create({
      amount,
      currency: body.currency || "INR",
      receipt: body.receipt || `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: any) {
    console.error("Create Order Error:", err);

    return NextResponse.json(
      {
        error:
          err?.error?.description ||
          err?.message ||
          "Order creation failed",
      },
      { status: 500 }
    );
  }
}
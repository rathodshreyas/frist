import { NextRequest, NextResponse } from "next/server";

// This API route creates a Razorpay order for premium template unlock
// Requires RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET env variables

export async function POST(req: NextRequest) {
  try {
    const { templateId, amount = 4900 } = await req.json(); // ₹49 = 4900 paise

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 503 });
    }

    // Dynamically import Razorpay to avoid build issues
    const Razorpay = (await import("razorpay")).default;
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `template_${templateId}_${Date.now()}`,
      notes: { templateId, purpose: "premium_template_unlock" },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, templateId } = await req.json();

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 503 });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // Payment verified - in production, save to database and generate access token
    const accessToken = crypto.randomBytes(32).toString("hex");

    // TODO: Save accessToken to MongoDB with templateId and expiry
    // await db.premiumAccess.create({ templateId, paymentId: razorpay_payment_id, token: accessToken })

    return NextResponse.json({
      success: true,
      templateId,
      accessToken,
      message: "Payment verified! Premium template unlocked.",
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}

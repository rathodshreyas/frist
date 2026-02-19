import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      templateId,
      templateType,
    } = body;

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, error: "Payment gateway not configured" },
        { status: 503 }
      );
    }

    // Verify HMAC signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed: Invalid signature" },
        { status: 400 }
      );
    }

    // Generate access token
    const accessToken = uuidv4();

    // Save to DB if MongoDB is configured
    try {
      const { connectDB, PremiumAccess } = await import("@/lib/db");
      const db = await connectDB();
      if (db) {
        await PremiumAccess.create({
          templateId,
          templateType,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          accessToken,
        });
      }
    } catch (dbErr) {
      console.warn("[DB] Could not save premium access:", dbErr);
    }

    return NextResponse.json({
      success: true,
      data: {
        accessToken,
        templateId,
        message: "Payment verified! Premium template unlocked.",
      },
    });
  } catch (error) {
    console.error("[API] verify-payment error:", error);
    return NextResponse.json(
      { success: false, error: "Payment verification failed" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
// import { razorpayInstance } from "@/lib/razorpay";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { database } from "@/database";
import { Invoices11 } from "@/database/schema";

export async function POST(req) {
  try {
    const { invoiceId, paymentId, orderId, signature } = await req.json();

    if (!invoiceId || !paymentId || !orderId || !signature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Signature verification
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Update invoice status to "paid"
    await database
      .update(Invoices11)
      .set({ status: "paid" })
      .where(eq(Invoices11.id, parseInt(invoiceId)));

    return NextResponse.json({ success: true, message: "Payment successful!" });
  } catch (error) {
    console.error("Payment success error:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}

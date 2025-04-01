import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay keys are missing from environment variables.");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    // Validate the amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    // Create the Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay requires the amount in paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
      // payment_capture: 1, // Auto-capture payment
    });

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Error creating Razorpay order" },
      { status: 500 }
    );
  }
}

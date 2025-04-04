// import { NextResponse } from "next/server";
// // import { razorpayInstance } from "@/lib/razorpay";
// import crypto from "crypto";
// import { eq } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// export async function POST(req) {
//   try {
//     const { invoiceId, paymentId, orderId, signature } = await req.json();

//     if (!invoiceId || !paymentId || !orderId || !signature) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // Signature verification
//     const body = orderId + "|" + paymentId;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== signature) {
//       return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
//     }

//     // Update invoice status to "paid"
//     await database
//       .update(Invoices11)
//       .set({ status: "paid" })
//       .where(eq(Invoices11.id, parseInt(invoiceId)));

//     return NextResponse.json({ success: true, message: "Payment successful!" });
//   } catch (error) {
//     console.error("Payment success error:", error);
//     return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { database } from "@/database";
import { Invoices11 } from "@/database/schema";

export async function POST(req) {
  try {
    // Parse request body
    const body = await req.json();
    const { invoiceId, paymentId, orderId, signature } = body;

    // Validate input fields
    if (!invoiceId || !paymentId || !orderId || !signature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if RAZORPAY_KEY_SECRET is set
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("❌ RAZORPAY_KEY_SECRET is missing in environment variables.");
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }

    // Verify payment signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (generatedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    console.log("✅ Payment verified! Updating invoice...");

    // Ensure invoiceId is a valid integer
    const invoiceIdInt = parseInt(invoiceId, 10);
    if (isNaN(invoiceIdInt)) {
      return NextResponse.json({ error: "Invalid invoice ID" }, { status: 400 });
    }

    // Update invoice status in the database
    await database
      .update(Invoices11)
      .set({ status: "paid" })
      .where(eq(Invoices11.id, invoiceIdInt));

    return NextResponse.json({ success: true, message: "Payment successful!" });
  } catch (error) {
    console.error("❌ Payment verification error:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}

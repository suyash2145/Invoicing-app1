import { NextResponse } from "next/server";
import { database, Invoices11 } from "@/database";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { id } = await req.json(); // Extract invoice ID from request body

    if (!id) {
      return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
    }

    // Update the invoice status to 'paid'
    await database
      .update(Invoices11)
      .set({ status: "paid" })
      .where(eq(Invoices11.id, id));

    return NextResponse.json({ message: "Invoice marked as paid" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}



// import { NextResponse } from "next/server";
// import { database, Invoices11 } from "@/database";
// import { eq } from "drizzle-orm";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-02-20" });

// export async function POST(req: Request) {
//     try {
//         const { id, session_id } = await req.json();
//         const invoiceId = Number(id);

//         if (!invoiceId || isNaN(invoiceId) || !session_id) {
//             return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//         }

//         // 🔍 Verify payment status with Stripe
//         const session = await stripe.checkout.sessions.retrieve(session_id);

//         if (session.payment_status !== "paid") {
//             return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
//         }

//         // ✅ Update invoice status to "paid"
//         await database
//             .update(Invoices11)
//             .set({ status: "paid" })
//             .where(eq(Invoices11.id, invoiceId))
//             .execute();

//         return NextResponse.json({ message: "✅ Invoice marked as paid!" }, { status: 200 });

//     } catch (error) {
//         console.error("Error verifying payment:", error);
//         return NextResponse.json({ error: "⚠️ Internal server error" }, { status: 500 });
//     }
// }

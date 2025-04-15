
import Razorpay from "razorpay";
import { eq } from "drizzle-orm";
import { database } from "@/database";
import { Invoices11 } from "@/database/schema";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json(); // Read JSON body
    console.log("Received body:", body); // Debugging log

    const { invoiceId } = body;
    if (!invoiceId) {
      return new Response(
        JSON.stringify({ error: "Invoice ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch invoice from database
    const [invoice] = await database
      .select({ value: Invoices11.value })
      .from(Invoices11)
      .where(eq(Invoices11.id, parseInt(invoiceId)));

    if (!invoice) {
      return new Response(
        JSON.stringify({ error: "Invoice not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const amount = invoice.value * 100; // Convert to paise

    const options = {
      amount : amount/100,
      currency: "INR",
      receipt: `invoice_${invoiceId}`,
      payment_capture: 1,
    };

    // Create order in Razorpay
    const order = await razorpayInstance.orders.create(options);
    console.log("✅ Order created:", order);

    return new Response(
      JSON.stringify({ order }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Error creating order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create order" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

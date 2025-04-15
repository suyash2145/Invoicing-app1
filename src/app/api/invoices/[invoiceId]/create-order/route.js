
import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { database } from "@/database";
import { Invoices11 } from "@/database/schema";

export async function POST(req, { params }) {
    try {
        const { invoiceId } = params;

        // Validate and parse the invoice ID
        const invoiceIdNumber = parseInt(invoiceId, 10);
        if (isNaN(invoiceIdNumber)) {
            return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
        }

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Fetch the invoice amount from the database
        const [invoice] = await database
            .select({ value: Invoices11.value })
            .from(Invoices11)
            .where(eq(Invoices11.id, invoiceIdNumber));

        if (!invoice) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        const amount = Number(invoice.value) * 100;

        const options = {
            amount,
            currency: "INR",
            receipt: `invoice_${invoiceIdNumber}`,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);

        if (!order || !order.id) {
            return NextResponse.json({ error: "Failed to create order with Razorpay" }, { status: 500 });
        }

        return NextResponse.json({ order });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}

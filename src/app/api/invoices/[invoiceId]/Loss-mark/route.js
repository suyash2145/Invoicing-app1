import { NextResponse } from "next/server";
import { database } from "@/database";
import { Invoices11 } from "@/database";
import { eq } from "drizzle-orm";

// Assuming your table has columns: id, status, createTs (timestamp)

export async function GET(req, context) {
  try {
    const invoiceId = parseInt(context.params.invoiceId);
    if (isNaN(invoiceId)) {
      return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
    }

    // Fetch the invoice
    const [invoice] = await database
      .select()
      .from(Invoices11)
      .where(eq(Invoices11.id, invoiceId))
      .limit(1);

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Check if unpaid and older than 28 days
    const now = new Date();
    const createdAt = new Date(invoice.createTs);
    const diffInDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

    if (invoice.status !== "paid" && diffInDays >= 28) {
      // Update status to "uncollectible"
      await database
        .update(Invoices11)
        .set({ status: "uncollectible" })
        .where(eq(Invoices11.id, invoiceId));

      // Return updated invoice
      return NextResponse.json({
        ...invoice,
        status: "uncollectible",
        message: "Invoice marked as uncollectible after 28 days",
      });
    }

    // Return original invoice if conditions not met
    return NextResponse.json(invoice);

  } catch (error) {
    console.error("Error fetching/updating invoice:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

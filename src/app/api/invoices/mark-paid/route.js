
import { NextResponse } from "next/server";
import { database, Invoices11 } from "@/database";
import { eq } from "drizzle-orm";

export async function POST(req) {
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
    console.error("Error updating invoice:", error); 
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}

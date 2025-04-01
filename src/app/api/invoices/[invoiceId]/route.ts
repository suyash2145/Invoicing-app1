import { NextResponse } from "next/server";
import { database } from "@/database"; 
import { Invoices11 } from "@/database"; 
import { eq } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: { invoiceId: string } }) {
  try {
    console.log("Fetching invoice for ID:", params.invoiceId);

    const invoiceId = parseInt(params.invoiceId);
    if (isNaN(invoiceId)) {
      console.error("Invalid Invoice ID:", params.invoiceId);
      return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
    }

    // Correct Drizzle ORM syntax using eq() and selecting all columns
    const [invoice] = await database
      .select()
      .from(Invoices11)
      .where(eq(Invoices11.id, invoiceId))
      .limit(1); // Ensures we only get one result

    console.log("Query result:", invoice);

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


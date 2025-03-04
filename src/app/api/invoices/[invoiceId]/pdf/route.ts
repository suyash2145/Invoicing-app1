
import { NextResponse } from "next/server";
import { database, Invoices11 } from "@/database";
import { eq } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
    }

    // Fetch invoice from database
    // const invoice = await database
    //   .select()
    //   .from(Invoices11)
    //   .where(eq(Invoices11.id, parseInt(id)))
    //   .execute();


    const invoice = await database
  .select({
    id: Invoices11.id,
    name: Invoices11.name,
    email: Invoices11.email,
    value: Invoices11.value,
    description: Invoices11.description // Ensure this is selected
  })
  .from(Invoices11)
  .where(eq(Invoices11.id, parseInt(id)))
  .execute();

    // Log the fetched data to debug
    console.log("Fetched Invoice:", invoice);

    if (!invoice || invoice.length === 0) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(invoice[0]); // Return the first matching invoice
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return NextResponse.json({ error: "Failed to fetch invoice" }, { status: 500 });
  }
}

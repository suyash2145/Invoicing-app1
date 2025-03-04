import { revalidatePath } from "next/cache"; // ✅ Import
import { NextResponse } from "next/server";
import { database, Invoices11, Customers } from "@/database";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, context: { params: { invoiceId: string } }) {
    try {
        const { invoiceId } = context.params; // ✅ Correct way to access params

        if (!invoiceId) {
            return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
        }

        const invoiceIdNum = Number(invoiceId);
        if (isNaN(invoiceIdNum)) {
            return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
        }

        const { name, email, phone, value, description } = await req.json();

        if (!name || !email || !phone || value === undefined || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const existingInvoice = await database
            .select({ customerId: Invoices11.customerId })
            .from(Invoices11)
            .where(eq(Invoices11.id, invoiceIdNum))
            .limit(1);

        if (existingInvoice.length === 0) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        const customerId = existingInvoice[0].customerId;

        await database
            .update(Invoices11)
            .set({ 
                value: Number(value) * 100,
                description 
            })
            .where(eq(Invoices11.id, invoiceIdNum))
            .execute();

        if (customerId) {
            await database
                .update(Customers)
                .set({ name, email, phone })
                .where(eq(Customers.id, customerId))
                .execute();
        }

        revalidatePath(`/invoices/${invoiceId}`);

        return NextResponse.json({ 
            message: "✅ Invoice & Customer updated successfully!" 
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating invoice and customer:", error);
        return NextResponse.json({ error: "⚠️ Internal server error" }, { status: 500 });
    }
}

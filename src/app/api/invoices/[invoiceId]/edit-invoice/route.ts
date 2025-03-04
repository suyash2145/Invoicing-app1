
import { revalidatePath } from "next/cache"; // ✅ Import
import { NextResponse } from "next/server";
import { database, Invoices11, Customers } from "@/database";
import { eq } from "drizzle-orm";

// ✅ Handle PUT request to update an invoice and its customer
export async function PUT(req: Request, { params }: { params: { invoiceId: string } }) {
    try {
        if (!params.invoiceId) {
            return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
        }

        const invoiceId = Number(params.invoiceId); // ✅ Convert to a number
        if (isNaN(invoiceId)) {
            return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
        }

        const { name, email, phone, value, description } = await req.json();

        // ✅ Validate required fields
        if (!name || !email || !phone || value === undefined || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 🔍 Check if the invoice exists and get the customerId
        const existingInvoice = await database
            .select({ customerId: Invoices11.customerId })
            .from(Invoices11)
            .where(eq(Invoices11.id, invoiceId))
            .limit(1);

        if (existingInvoice.length === 0) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        const customerId = existingInvoice[0].customerId;

        // 📝 Update the invoice
        const updatedInvoice = await database
            .update(Invoices11)
            .set({ 
                name, 
                    email, 
                    phone ,
                value: Number(value) * 100, // ✅ Ensure correct type
                description 
            })
            .where(eq(Invoices11.id, invoiceId))
            .returning();

        // 📝 Update the customer in the Customers table
        if (customerId) {
            await database
                .update(Customers)
                .set({ 
                    name, 
                    email, 
                    phone ,
                    // value: Number(value) * 100, // ✅ Ensure correct type
                    description 
                })
                .where(eq(Customers.id, customerId));
        }

        // 🔄 **Revalidate dashboard so it updates instantly**
        // revalidatePath("/dashboard");
        revalidatePath(`/invoices/${invoiceId}`);
        

        return NextResponse.json({ 
            message: "✅ Invoice & Customer updated successfully!", 
            invoice: updatedInvoice[0] 
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating invoice and customer:", error);
        return NextResponse.json({ error: "⚠️ Internal server error" }, { status: 500 });
    }
}

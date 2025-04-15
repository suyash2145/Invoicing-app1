
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { database, Invoices11, Customers } from "@/database";
import { eq } from "drizzle-orm";

export async function PUT(req, { params }) {
    try {
        // Get the invoice ID from the params
        const { invoiceId } = params;

        // Check if invoice ID is present
        if (!invoiceId) {
            return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
        }

        // Convert invoice ID to a number and validate
        const invoiceIdNum = parseInt(invoiceId, 10);
        if (isNaN(invoiceIdNum)) {
            return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
        }

        // Parse the request body
        const body = await req.json();
        const { name, email, phone, value, description } = body;

        // Validate the required fields
        if (!name || !email || !phone || value == null || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if the invoice exists
        const existingInvoice = await database
            .select({ customerId: Invoices11.customerId })
            .from(Invoices11)
            .where(eq(Invoices11.id, invoiceIdNum))
            .limit(1);

        // If no invoice found, return 404
        if (existingInvoice.length === 0) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        // Update the invoice details
        const customerId = existingInvoice[0].customerId;
        await database
            .update(Invoices11)
            .set({ 
                name,
                email,
                value: Number(value) * 100,
                description, 
                phone 
            })
            .where(eq(Invoices11.id, invoiceIdNum))
            .execute();

        // Update customer details if necessary
        if (customerId) {
            await database
                .update(Customers)
                .set({ name, email, phone })
                .where(eq(Customers.id, customerId))
                .execute();
        }

        // Revalidate the path to update the cached data
        revalidatePath(`/invoices/${invoiceId}`, 'page');

        // Return a success response
        return NextResponse.json({ 
            message: "✅ Invoice & Customer updated successfully!" 
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating invoice and customer:", error);
        return NextResponse.json({ error: "⚠️ Internal server error" }, { status: 500 });
    }
}

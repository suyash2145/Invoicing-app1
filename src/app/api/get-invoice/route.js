import { NextResponse } from "next/server";
import { database } from "@/database";
import { Invoices11 } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const invoiceId = searchParams.get("invoiceId");

        if (!invoiceId) {
            return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
        }

        const invoice = await database.query.Invoices11.findFirst({
            where: eq(Invoices11.id, invoiceId),
        });

        if (!invoice) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        return NextResponse.json({
            name: invoice.name,
            email: invoice.email,
            contact: invoice.phone,
        });
    } catch (error) {
        console.error("❌ Error fetching invoice details:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

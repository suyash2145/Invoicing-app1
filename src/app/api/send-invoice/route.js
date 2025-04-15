
import { NextResponse } from "next/server";
import { resend } from "@/lib/resend"; 
import InvoiceCreatedEmail from "@/emails/invoice-created"; 

export async function POST(req) {
    try {
        const { email, invoiceId } = await req.json();

        if (!email || !invoiceId) {
            return NextResponse.json({ error: "Missing email or invoice ID." }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: "Suyash Invoice <info@suyashinvoice.online>",
            to: [email],
            subject: "Pay your New Invoice",
            react: InvoiceCreatedEmail({ invoiceId }),
        });
        console.log("Email response data:", data);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Mail sent successfully! ✅" });
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }
}

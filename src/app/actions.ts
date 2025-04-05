
"use server";

import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { Customers, Invoices11, Status } from "@/database/schema";
import { database } from "@/database";
import { and, eq, isNull } from 'drizzle-orm';
import { Resend } from 'resend';
import InvoiceCreatedEmail from '@/emails/invoice-created';
import Stripe from 'stripe';
import { headers } from 'next/headers';
import axios from "axios";

const stripe = new Stripe(String(process.env.STRIPE_API_SECRET!));
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function createAction(formData: FormData) {
    const { userId, orgId } = await auth();
    if (!userId) return;

    const value = Math.floor(parseFloat(String(formData.get('value')))) * 100;
    const description = formData.get('description') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    // Capture the current UTC time and convert to IST (Indian Standard Time)
    const utcDate = new Date();
    const istDate = new Date(utcDate.getTime() + (5 * 60 + 30) * 60000);

    const [customer] = await database.insert(Customers)
        .values({ createTs: istDate, phone, description, name, email, userId, OrganizationId: orgId || null })
        .returning({ id: Customers.id });

    const [invoice] = await database.insert(Invoices11)
        .values({ createTs: istDate, value, description, name, email, phone, userId, customerId: customer.id, status: 'open', OrganizationId: orgId || null })
        .returning({ id: Invoices11.id });

    await resend.emails.send({
        from: 'Suyash Invoice <info@suyashinvoice.online>',
        to: [email],
        subject: 'Pay your New Invoice',
        react: InvoiceCreatedEmail({ invoiceId: invoice.id }),
    });

    redirect(`/invoices/${invoice.id}`);
}

export async function updateStatusAction(formData: FormData) {
    const { userId, orgId } = await auth();
    if (!userId) return;

    const id = formData.get('id') as string;
    const status = formData.get('status') as Status;

    await database.update(Invoices11)
        .set({ status })
        .where(orgId ? and(eq(Invoices11.id, parseInt(id)), eq(Invoices11.OrganizationId, orgId))
                     : and(eq(Invoices11.id, parseInt(id)), eq(Invoices11.userId, userId), isNull(Invoices11.OrganizationId)));
    
    // revalidatePath(`/invoices/${id}`, 'page');
    // // redirect(`/invoices/${id}`);
    // return { redirectUrl: `/invoices/${id}` };

    revalidatePath(`/invoices/${id}`, 'page');

    return redirect(`/invoices/${id}`);
}

export async function deleteInvoiceAction(formData: FormData) {
    const { userId, orgId } = await auth();
    if (!userId) return;

    const id = formData.get('id') as string;
    await database.delete(Invoices11)
        .where(orgId ? and(eq(Invoices11.id, parseInt(id)), eq(Invoices11.OrganizationId, orgId))
                     : and(eq(Invoices11.id, parseInt(id)), eq(Invoices11.userId, userId), isNull(Invoices11.OrganizationId)));
    
    redirect('/dashboard?message=Invoice deleted successfully');
}

export async function createPayment(formData: FormData) {
    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";
    const id = parseInt(formData.get("id") as string);

    const [result] = await database.select({ status: Invoices11.status, value: Invoices11.value })
        .from(Invoices11)
        .where(eq(Invoices11.id, id))
        .limit(1);

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'INR',
                product: 'prod_RoD0MV0hclO1LH',
                unit_amount: result.value,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `${origin}/payment-success?id=${id}`,
        cancel_url: `${origin}/invoices/${id}/payment?status=canceled`,
    });

    if (!session.url) {
        throw new Error('Invalid Session');
    }
    
    redirect(session.url);
}


export async function refundInvoiceAction(formData: FormData) {
    const invoiceId = formData.get("id") as string;
    const paymentId = formData.get("paymentId") as string;
  
    if (!invoiceId || !paymentId) {
      return { success: false, message: "Invalid invoice or payment ID." };
    }
  
    try {
      // 🔹 Step 1: Call Razorpay Refund API
      const res = await axios.post(
        `https://api.razorpay.com/v1/payments/${paymentId}/refund`,
        {},
        {
          auth: {
            username: process.env.RAZORPAY_KEY_ID!,
            password: process.env.RAZORPAY_KEY_SECRET!,
          },
        }
      );
  
      console.log("✅ Refund Successful:", res.data);
  
      // 🔹 Step 2: Update Invoice Status in DB
      await database
        .update(Invoices11)
        .set({ status: "void" })
        .where(eq(Invoices11.id, Number(invoiceId)));
  
      // Refresh the invoices page after the refund
      revalidatePath("/invoices");
  
      return { success: true, message: "Refund successful. Invoice marked as void." };
    } catch (error) {
      console.error("❌ Refund Failed:", error);
      return { success: false, message: "Refund failed." };
    }
  }

  export async function updateStatusToVoidAction(formData: FormData) {
    const { userId, orgId } = await auth();
    if (!userId) return;
  
    const id = formData.get("id") as string;
    const status = formData.get("status") as Status;
  
    if (!id || status !== "void") return;
  
    await database
      .update(Invoices11)
      .set({ status: "void" })
      .where(
        orgId
          ? and(eq(Invoices11.id, parseInt(id)), eq(Invoices11.OrganizationId, orgId))
          : and(eq(Invoices11.id, parseInt(id)), eq(Invoices11.userId, userId), isNull(Invoices11.OrganizationId))
      );
    
      
    revalidatePath(`/invoices/${id}`, 'page');
    
    
  }
  
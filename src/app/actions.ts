"use server";

import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
// import { ChevronDown } from 'lucide-react';
import { Customers, Invoices11, Status } from "@/database/schema";
import { database } from "@/database";
import { and, eq, isNull } from 'drizzle-orm';
import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
// import { LinearLoginCodeEmail } from '@/emails/invoice-created';
import InvoiceCreatedEmail from '@/emails/invoice-created';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(String(process.env.STRIPE_API_SECRET!));
const resend = new Resend(process.env.RESEND_API_KEY!);

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID!,
//     key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// console.log(process.env.RAZORPAY_KEY_ID)

export async function createAction(formData: FormData) {
    const { userId, orgId } = await auth();

    // const userId = auth().userId;
    const value = Math.floor(parseFloat(String(formData.get('value')))) * 100;
    console.log('value', value);
    const description = formData.get('description') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string; 

    if ( !userId ) {
        return
    }

    // Capture the current UTC time and convert to IST (Indian Standard Time)
    const utcDate = new Date();  // Current time in UTC
    const istDate = new Date(utcDate.getTime() + (5 * 60 + 30) * 60000);  // Convert UTC to IST


const [customer] = await database.insert(Customers)
        .values({
            createTs: istDate,   // ✅ Fix: Add timestamp
            phone,               // ✅ Fix: Add phone
            description,         // ✅ Fix: Add description
            name, 
            email,
            userId,
            OrganizationId: orgId || null
        })
        .returning({
            id: Customers.id
        });

    // Insert invoice
    const results = await database.insert(Invoices11)
        .values({
            createTs: istDate,  // ✅ Fix: Add timestamp
            value,  
            description,
            name,        // ✅ Fix: Add name
            email,       // ✅ Fix: Add email
            phone,       // ✅ Fix: Add phone
            userId,
            customerId: customer.id,  
            status: 'open',
            OrganizationId: orgId || null
        })
        .returning({
            id: Invoices11.id
        })

    // if (!results.length) {
    //     throw new Error("Failed to insert invoice");
    // }

    const { data, error } = await resend.emails.send({
      // from: 'Suyash Invoice <info@resend.dev>',
      from: 'Suyash Invoice <info@suyashinvoice.online>',
      // from: 'onboarding@resend.dev',
      to: [email],
      subject: 'Pay your New Invoice ',
      react: InvoiceCreatedEmail({ invoiceId: results[0].id }),
    });

    redirect(`/invoices/${results[0].id}`)
}


export async  function updateStatusAction(formdata: FormData){
    const { userId, orgId } = await auth();

    if ( !userId ) {
        return;
    }

    const id =formdata.get('id') as string;
    const status =formdata.get('status') as Status;

    if( orgId ){
            const results = await database.update(Invoices11)
    .set({ status })
     .where(
            and(
            eq(Invoices11.id, parseInt(id)),
            eq(Invoices11.OrganizationId, orgId),
            )
        )

    }else{
        const results = await database.update(Invoices11)
    .set({ status })
     .where(
            and(
            eq(Invoices11.id, parseInt(id)),
            eq(Invoices11.userId, userId),
            isNull(Invoices11.OrganizationId)
            )
        )
    
        revalidatePath(`/invoices/${id}`, 'page');

        console.log('results', results)
}
    }


export async  function deleteInvoiceAction(formdata: FormData){
    const { userId, orgId } = await auth();

    if ( !userId ) {
        return;
    }

    const id =formdata.get('id') as string;
    
   if(orgId ){
    
    await database.delete(Invoices11)
     .where(
            and(
            eq(Invoices11.id, parseInt(id)),
            eq(Invoices11.OrganizationId, orgId),
            )
        )
        // redirect('/dashboard')
        redirect("/dashboard?message=Invoice deleted successfully");
        
}
 else {
    
    const results = await database.delete(Invoices11)
     .where(
            and(
            eq(Invoices11.id, parseInt(id)),
            eq(Invoices11.userId, userId),
            isNull(Invoices11.OrganizationId)
            )
        )
        redirect('/dashboard')
 }
   }


export async function createPayment(formData: FormData) {
  const headersList =  await headers();
  // const origin = headersList.get("origin");
  const origin = headersList.get("origin") || "http://localhost:3000"; // Change to your actual domain in production
  console.log("Origin:", origin);

  
    const id = parseInt(formData.get("id") as string);

   const [result] = await database.select({
    status: Invoices11.status,
    value: Invoices11.value,
   })
   .from(Invoices11)
   .where(eq(Invoices11.id, id))
   .limit(1)
  
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        // payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
                currency: 'INR',
                // product: 'prod_Rmv9IScIbTX1bZ',
                product: 'prod_RoD0MV0hclO1LH',
                unit_amount: result.value,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        // success_url: `${origin}/invoices/${id}/payment?status=success`,
        // cancel_url: `${origin}/invoices/${id}/payment?status=canceled`,
        // success_url: `${origin}/payment-success`,
        success_url: `${origin}/payment-success?id=${id}`,
        // cancel_url: `${origin}/payment-canceled`,
        cancel_url: `${origin}/invoices/${id}/payment?status=canceled`,
        
      });

//    console.log('result', result)
if (!session.url) {
    throw new Error('Invalid Session');
  }
  
  // Redirect user to Stripe checkout
  redirect(session.url);
  
}


function setLoading(arg0: boolean) {
    throw new Error('Function not implemented.');
}


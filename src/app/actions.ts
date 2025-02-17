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

import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(String(process.env.STRIPE_API_SECRET));

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

    // const customer = customer[0];

    // if (!customer) {
    //     throw new Error("Failed to insert customer");
    // }

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
        });

    if (!results.length) {
        throw new Error("Failed to insert invoice");
    }

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


// export async function createPayment(formData: FormData) {
//   const HeadersList = headers();
//   const origin = (await HeadersList).get('origin');
  
//     const id = parseInt(formData.get('id') as string);

//    const [result] = await database.select({
//     status: Invoices11.status,
//     value: Invoices11.value,
//    })
//    .from(Invoices11)
//    .where(eq(Invoices11.id, id))
//    .limit(1)
  
//       // Create Checkout Sessions from body params.
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//           {
//             price_data: {
//                 currency: 'INR',
//                 product: 'prod_Rmv9IScIbTX1bZ',
//                 unit_amount: result.value,
//             },
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: `${origin}/invoices/${id}/payment?status=success`,
//         cancel_url: `${origin}/invoices/${id}/payment?status=canceled`,
//       });

// //    console.log('result', result)
//      if ( !session.url ) {
//         throw new Error('Invalid Session');
//      }
//      redirect (session.url);
// }



export async function createPayment(formData: FormData) {
    const HeadersList = await headers();
    const origin = HeadersList.get('origin');
  
    // Ensure 'id' is present in the formData and is a valid number
    const id = parseInt(formData.get('id') as string);
    if (isNaN(id)) {
      throw new Error('Invalid or missing invoice ID');
    }
  
    const [result] = await database.select({
      status: Invoices11.status,
      value: Invoices11.value,
    })
    .from(Invoices11)
    .where(eq(Invoices11.id, id))
    .limit(1);
  
    // Ensure result is not empty
    if (!result) {
      throw new Error('Invoice not found');
    }
  
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product: 'prod_Rmv9IScIbTX1bZ', // This should be a valid product ID in your Stripe account
            unit_amount: result.value,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/invoices/${id}/payment?status=success`,
      cancel_url: `${origin}/invoices/${id}/payment?status=canceled`,
    });
  
    // Check if the session URL is valid
    if (!session.url) {
      throw new Error('Invalid Session');
    }
  
    // Redirect to the checkout session URL
    redirect(session.url);
  }
  

//     const results = await database.delete(Invoices11)
//      .where(
//             and(
//             eq(Invoices11.id, parseInt(id)),
//             eq(Invoices11.userId, userId),
//             )
//         )
//         redirect('/dashboard')
        
// }
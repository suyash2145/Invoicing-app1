// "use client";
// "use strict";


import { notFound , redirect } from "next/navigation";
import { eq , and, isNull } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import { database } from '@/database';
import { Customers, Invoices11 } from '@/database/schema';
import Invoice from "./invoice";


export default async function InvoicePage( { params }: { params: { invoiceId: string; } }) {
    const { userId, orgId } = await auth();

     if ( !userId ) return;

    const invoiceId = parseInt(params.invoiceId)  
    
    // parseInt('asdf');
    if ( isNaN( invoiceId )) {
        throw new Error('Invalid Invoice ID');
    }

   let result;

    if ( orgId ) {
        
    [result] = await database
    .select()
    .from(Invoices11)
    .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
    .where(
        and(
        eq(Invoices11.id, invoiceId),
        eq(Invoices11.OrganizationId, orgId),
        )
    )
    .limit(1);
    console.log('result', result)
    }else{
        
    [result] = await database
    .select()
    .from(Invoices11)
    .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
    .where(
        and(
        eq(Invoices11.id, invoiceId),
        eq(Invoices11.userId, userId),
        isNull(Invoices11.OrganizationId)
        )
    )
    .limit(1);
    
    console.log('result', result)

    }

    if ( !result ) {
        notFound();
    }

     const invoice = {
        ...result.invoices11,
        customer: result.customers
     }

    // console.log('result', result);

    async function handleDelete() {
        "use server"; // Ensures this runs on the server
        await database.delete(Invoices11).where(eq(Invoices11.id, invoiceId));
        // console.log("Invoice deleted:", invoiceId);
        // redirect("/dashboard"); 
        console.log("Invoice deleted:", invoiceId);
      }

  return <Invoice invoice={invoice}/>
}



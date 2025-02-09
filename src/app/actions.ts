
"use server";

import { redirect } from 'next/navigation'

import { Invoices } from "@/database/schema";
import { database } from "@/database";

export async function createAction(formData: FormData) {
    const value = Math.floor(parseFloat(String(formData.get('value')))) * 100;
    console.log('value', value);
    const description = formData.get('description') as string;

    // Capture the current UTC time and convert to IST (Indian Standard Time)
    const utcDate = new Date();  // Current time in UTC
    const istDate = new Date(utcDate.getTime() + (5 * 60 + 30) * 60000);  // Convert UTC to IST

    // Insert data into the database
    const results = await database.insert(Invoices)
        .values({
            createTs: istDate,  // Save the IST time
            value,
            description,
            status: 'open'
        })
        .returning({
            id: Invoices.id
        })
        redirect(`/invoices/${results[0].id}`)
}



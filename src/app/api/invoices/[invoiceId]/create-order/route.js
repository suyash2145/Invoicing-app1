// import { razorpayInstance } from "@/lib/razorpay";
// import { eq } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// export default async function handler(req, res) {
//     if (req.method !== "POST") {
//         return res.status(405).json({ error: "Method not allowed" });
//     }

//     const { invoiceId } = req.body;

//     if (!invoiceId) {
//         return res.status(400).json({ error: "Invoice ID is required" });
//     }

//     try {
//         // Fetch the invoice amount from the database
//         const [invoice] = await database.select({
//             value: Invoices11.value,
//         })
//         .from(Invoices11)
//         .where(eq(Invoices11.id, parseInt(invoiceId)));

//         if (!invoice) {
//             return res.status(404).json({ error: "Invoice not found" });
//         }

//         const amount = invoice.value; // Amount should be in paise (cents)

//         const options = {
//             amount, // Amount from the database
//             currency: "INR",
//             receipt: `invoice_${invoiceId}`,
//             payment_capture: 1, // Auto-capture
//         };

//         const order = await razorpayInstance.orders.create(options);
//         res.status(200).json({ order });
//     } catch (error) {
//         console.error("Error creating order:", error);
//         res.status(500).json({ error: "Failed to create order" });
//     }
// }

// import { razorpayInstance } from "@/lib/razorpay";

// import { eq } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// export default async function handler(req, res) {
//     if (req.method !== "POST") {
//         return res.status(405).json({ error: "Method not allowed" });
//     }

//     const { invoiceId } = req.body;

//     if (!invoiceId) {
//         return res.status(400).json({ error: "Invoice ID is required" });
//     }

//     const invoiceIdNumber = Number(invoiceId);
//     if (isNaN(invoiceIdNumber)) {
//         return res.status(400).json({ error: "Invalid Invoice ID" });
//     }

//     try {
//         // Fetch the invoice amount from the database
//         const [invoice] = await database.select({
//             value: Invoices11.value,
//         })
//         .from(Invoices11)
//         .where(eq(Invoices11.id, invoiceIdNumber));

//         console.log("Fetched invoice:", invoice);
//         if (!invoice) {
//             return res.status(404).json({ error: "Invoice not found" });
//         }

//         const amount = invoice.value; // Amount should be in paise (cents)

//         const options = {
//             amount, // Amount from the database
//             currency: "INR",
//             receipt: `invoice_${invoiceId}`,
//             payment_capture: 1, // Auto-capture
//         };

//         const order = await razorpayInstance.orders.create(options);
//         console.log("Created order:", order);

//         if (!order || !order.id) {
//             return res.status(500).json({ error: "Failed to create order with Razorpay" });
//         }

//         res.status(200).json({ order });
//     } catch (error) {
//         console.error("Error creating order:", error);
//         res.status(500).json({ error: "Failed to create order" });
//     }
// }


// import Razorpay from "razorpay";
// import { NextResponse } from "next/server";
// import { eq } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// // Named export for POST method
// export async function POST(req) {
//     try {
//         const body = await req.json();
//         const { invoiceId } = body;

//         if (!invoiceId) {
//             return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
//         }

//         const invoiceIdNumber = Number(invoiceId);
//         if (isNaN(invoiceIdNumber)) {
//             return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
//         }

//         // Initialize Razorpay
//         const razorpay = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_KEY_SECRET,
//         });

//         // Fetch the invoice amount from the database
//         const [invoice] = await database
//             .select({ value: Invoices11.value })
//             .from(Invoices11)
//             .where(eq(Invoices11.id, invoiceIdNumber));

//         if (!invoice) {
//             return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//         }

//         const amount = invoice.value * 100; // Convert to paise (cents)

//         const options = {
//             amount,
//             currency: "INR",
//             receipt: `invoice_${invoiceId}`,
//             payment_capture: 1,
//         };

//         const order = await razorpay.orders.create(options);

//         if (!order || !order.id) {
//             return NextResponse.json({ error: "Failed to create order with Razorpay" }, { status: 500 });
//         }

//         return NextResponse.json({ order });
//     } catch (error) {
//         console.error("Error creating order:", error);
//         return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//     }
// }


// import Razorpay from "razorpay";
// import { NextResponse } from "next/server";
// import { eq } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// // Named export for POST method
// export async function POST(req) {
//     try {
//         const body = await req.json();
//         const { invoiceId } = body;

//         if (!invoiceId) {
//             return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
//         }

//         const invoiceIdNumber = Number(invoiceId);
//         if (isNaN(invoiceIdNumber)) {
//             return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
//         }

//         // Initialize Razorpay
//         const razorpay = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_KEY_SECRET,
//         });

//         // Fetch the invoice amount from the database
//         const [invoice] = await database
//             .select({ value: Invoices11.value })
//             .from(Invoices11)
//             .where(eq(Invoices11.id, invoiceIdNumber));

//         if (!invoice) {
//             return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//         }

//         const amount = Number(invoice.value) * 100; // Convert to paise (cents)
//         console.log("Invoice amount:", amount);

//         const options = {
//             amount,
//             currency: "INR",
//             receipt: `invoice_${invoiceId}`,
//             payment_capture: 1,
//         };

//         try {
//             const order = await razorpay.orders.create(options);
//             console.log("Razorpay order created:", order);

//             if (!order || !order.id) {
//                 return NextResponse.json({ error: "Failed to create order with Razorpay" }, { status: 500 });
//             }

//             return NextResponse.json({ order });
//         } catch (razorpayError) {
//             console.error("Error from Razorpay API:", razorpayError);
//             return NextResponse.json({ error: "Razorpay API error" }, { status: 500 });
//         }
//     } catch (error) {
//         console.error("Error creating order:", error);
//         return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//     }
// }


// import Razorpay from "razorpay";
// import { NextResponse } from "next/server";
// import { eq } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// export async function POST(req) {
//     try {
//         const body = await req.json();
//         const { invoiceId } = body;

//         if (!invoiceId) {
//             console.log("Invoice ID is missing");
//             return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
//         }

//         const invoiceIdNumber = Number(invoiceId);
//         console.log("Received invoice ID:", invoiceId);
//         console.log("Converted invoice ID to number:", invoiceIdNumber);

//         if (isNaN(invoiceIdNumber)) {
//             return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
//         }

//         const razorpay = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_KEY_SECRET,
//         });

//         // Fetch the invoice amount from the database
//         const [invoice] = await database
//             .select({ value: Invoices11.value })
//             .from(Invoices11)
//             .where(eq(Invoices11.id, invoiceIdNumber));

//         console.log("Database query result:", invoice);

//         if (!invoice) {
//             console.log("Invoice not found in database");
//             return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//         }

//         const amount = Number(invoice.value) * 100;
//         console.log("Invoice amount in paise:", amount);

//         const options = {
//             amount,
//             currency: "INR",
//             receipt: `invoice_${invoiceId}`,
//             payment_capture: 1,
//         };

//         try {
//             const order = await razorpay.orders.create(options);
//             console.log("Razorpay order created:", order);

//             if (!order || !order.id) {
//                 return NextResponse.json({ error: "Failed to create order with Razorpay" }, { status: 500 });
//             }

//             return NextResponse.json({ order });
//         } catch (razorpayError) {
//             console.error("Error from Razorpay API:", razorpayError);
//             return NextResponse.json({ error: "Razorpay API error" }, { status: 500 });
//         }
//     } catch (error) {
//         console.error("Error creating order:", error);
//         return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//     }
// }


import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { database } from "@/database";
import { Invoices11 } from "@/database/schema";

export async function POST(req, { params }) {
    try {
        const { invoiceId } = params;

        // Validate and parse the invoice ID
        const invoiceIdNumber = parseInt(invoiceId, 10);
        if (isNaN(invoiceIdNumber)) {
            return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
        }

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Fetch the invoice amount from the database
        const [invoice] = await database
            .select({ value: Invoices11.value })
            .from(Invoices11)
            .where(eq(Invoices11.id, invoiceIdNumber));

        if (!invoice) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        const amount = Number(invoice.value) * 100;

        const options = {
            amount,
            currency: "INR",
            receipt: `invoice_${invoiceIdNumber}`,
            payment_capture: 1,
        };

        const order = await razorpay.orders.create(options);

        if (!order || !order.id) {
            return NextResponse.json({ error: "Failed to create order with Razorpay" }, { status: 500 });
        }

        return NextResponse.json({ order });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}

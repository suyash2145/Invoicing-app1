// import { NextResponse } from "next/server";
// import { database } from "@/database";
// import { Invoices } from "@/database/schema";
// import { auth } from "@clerk/nextjs/server";
// import { eq, and } from "drizzle-orm";

// export async function PUT(req: Request, { params }: { params: { invoiceId: string } }) {
//     const { userId } = await auth();
//     if (!userId) return new NextResponse("Unauthorized", { status: 401 });

//     const invoiceId = parseInt(params.invoiceId);
//     if (isNaN(invoiceId)) return new NextResponse("Invalid ID", { status: 400 });

//     const { value, description } = await req.json();

//     await database
//         .update(Invoices)
//         .set({ value, description })
//         .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)));

//     return new NextResponse("Invoice Updated", { status: 200 });
// }

// import { NextResponse } from "next/server";
// import { database } from "@/database";
// import { Invoices } from "@/database/schema";
// import { auth } from "@clerk/nextjs/server";
// import { eq, and } from "drizzle-orm";
// // import { useParams } from "next/navigation";

// export async function PUT(req: Request, { params }: { params: { invoiceId: string } }) {
//     const { userId } = await auth();
//     if (!userId) return new NextResponse("Unauthorized", { status: 401 });

//     const invoiceId = parseInt(params.invoiceId);
//     if (isNaN(invoiceId)) return new NextResponse("Invalid ID", { status: 400 });

//     const { name, email, phone, value, description } = await req.json();

//     await database
//         .update(Invoices)
//         .set({ name, email, phone, value, description })
//         .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)));

//     return new NextResponse("Invoice Updated", { status: 200 });
// }


// import { NextResponse } from "next/server";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";
// import { auth } from "@clerk/nextjs/server";
// import { eq, and } from "drizzle-orm";
// import Razorpay from "razorpay";
// import { desc } from "drizzle-orm";

// export async function PUT(req: Request, context: any) {
//     try {
//         const { userId } = await auth();
//         console.log("Authenticated User ID:", userId);
//         if (!userId) return new NextResponse("Unauthorized", { status: 401 });

//         // Unwrap params correctly
//         const params = await context.params; 
//         const invoiceId = parseInt(params.invoiceId);
//         console.log("Received Invoice ID:", invoiceId);
//         if (isNaN(invoiceId)) return new NextResponse("Invalid ID", { status: 400 });

//         const { name, email, phone, value, description } = await req.json();

//         // Check if invoice exists
//         const existingInvoice = await database
//             .select()
//             .from(Invoices11)
//             .where(and(eq(Invoices11.id, invoiceId), eq(Invoices11.userId, userId)));

//         if (!existingInvoice.length) {
//             return new NextResponse("Invoice not found or not authorized", { status: 404 });
//         }

//         // Update invoice
//         await database
//             .update(Invoices11)
//             .set({ name, email, phone, value, description })
//             .where(and(eq(Invoices11.id, invoiceId), eq(Invoices11.userId, userId)));

//         return new NextResponse("Invoice Updated", { status: 200 });
//     } catch (error) {
//         console.error("Database update error:", error);
//         return new NextResponse("Internal Server Error", { status: 500 });
//     }
// }


// import { NextApiRequest, NextApiResponse } from "next";
// import { sql } from 'drizzle-orm';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Check if method is DELETE
//   if (req.method === "DELETE") {
//     try {
//       const { userId } = await auth(); // Get user from Clerk authentication
//       if (!userId) return res.status(401).json({ message: "Unauthorized" });

//       // Get invoiceId from URL query
//       const { invoiceId } = req.query;
//       const parsedInvoiceId = parseInt(invoiceId as string);

//       // Validate invoiceId
//       if (isNaN(parsedInvoiceId)) {
//         return res.status(400).json({ message: "Invalid Invoice ID" });
//       }

//       // SQL delete query
//       const deleteQuery = sql`
//         DELETE FROM invoices
//         WHERE id = ${parsedInvoiceId} AND userId = ${userId}
//       `;
//       const result = await database.execute(deleteQuery);

//       // Check if invoice was deleted
//       if (result.rowCount === 0) {
//         return res.status(404).json({ message: "Invoice not found or not authorized" });
//       }

//       return res.status(200).json({ message: "Invoice deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting invoice:", error);
//       return res.status(500).json({ message: "Failed to delete invoice" });
//     }
//   }

//   // Handle unsupported HTTP methods
//   return res.status(405).json({ message: "Method Not Allowed" });
// }


// // import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { id } = await req.json(); // Get invoice ID
//     if (!id) return NextResponse.json({ error: "Invoice ID required" }, { status: 400 });

//     // Fetch invoice details from your database (Replace with actual DB query)
//     const invoice = {
//       id,
//       amount: 5000, // Replace with actual invoice amount (in INR paise)
//       currency: "INR",
//     };

//     // Create Razorpay Order
//     const res = await fetch("https://api.razorpay.com/v1/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Basic ${Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_SECRET}`).toString("base64")}`,
//       },
//       body: JSON.stringify({
//         amount: invoice.amount * 100, // Convert INR to paisa
//         currency: invoice.currency,
//         receipt: `invoice_${id}`,
//         payment_capture: 1, // Auto-capture payment
//       }),
//     });

//     const order = await res.json();
//     return NextResponse.json({ orderId: order.id, amount: invoice.amount });
//   } catch (error) {
//     console.error("Error creating payment:", error);
//     return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
//   }
// }


// payment api

//   export async function createRazorpayOrder(req: Request) {
//   try {
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_SECRET!,
//     });

//     const options = {
//       amount: 50000, // Amount in paisa (₹500 = 50000 paisa)
//       currency: "INR",
//       receipt: "order_rcptid_11",
//       payment_capture: 1,
//     };

//     const order = await razorpay.orders.create(options);

//     return NextResponse.json({
//       order_id: order.id,
//       currency: order.currency,
//       amount: order.amount,
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: error.message },
//       { status: error.statusCode || 500 }
//     );
//   }
// }



// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";
// import { eq } from "drizzle-orm";

// export async function POST(req: Request) {
//   try {
//     const { id } = await req.json();
//     if (!id) return NextResponse.json({ error: "Invoice ID required" }, { status: 400 });

//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
//       return NextResponse.json({ error: "Razorpay API keys missing" }, { status: 500 });
//     }

//     const invoice = await database
//       .select({ value: Invoices11.value })
//       .from(Invoices11)
//       .where(eq(Invoices11.id, id));

//     if (!invoice.length) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

//     const amount = invoice[0].value;
//     if (!amount || amount <= 0) return NextResponse.json({ error: "Invalid invoice amount" }, { status: 400 });

//     // ✅ Log environment variables to verify they are loaded
//     console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
//     console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET);

//     // ✅ Initialize Razorpay
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_SECRET!,
//     });

//     console.log(`Creating Razorpay Order: Invoice ID ${id}, Amount: ${amount * 100}`);

//     // ✅ Try-Catch for Razorpay Order Creation
//     let order;
//     try {
//       order = await razorpay.orders.create({
//         amount: amount * 100, // Convert to paisa
//         currency: "INR",
//         receipt: `invoice_${id}`,
//         payment_capture: 1, // Auto-capture
//       });
//     } catch (razorpayError) {
//       console.error("Razorpay Order Creation Error:", razorpayError);
//       return NextResponse.json({ error: "Razorpay order creation failed", details: razorpayError }, { status: 500 });
//     }

//     console.log("Razorpay Order Response:", order);

//     if (!order || !order.id) {
//       console.error("Order creation failed:", order);
//       return NextResponse.json({ error: "Failed to get order ID from Razorpay" }, { status: 500 });
//     }

//     return NextResponse.json({ orderId: order.id, amount });
//   } catch (error: any) {
//     console.error("Error in payment process:", error);
//     return NextResponse.json({ error: error.message || "Payment creation failed" }, { status: 500 });
//   }
// }

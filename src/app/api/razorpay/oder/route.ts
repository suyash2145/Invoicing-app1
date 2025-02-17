
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     console.log("🔹 Received API call to create Razorpay order");

//     const { amount } = await req.json();
//     console.log("✅ Received amount:", amount);

//     if (!amount) {
//       console.error("❌ Error: Amount is missing in request");
//       return NextResponse.json({ error: "Amount is required" }, { status: 400 });
//     }

//     const auth = Buffer.from(
//       `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
//     ).toString("base64");

//     const response = await fetch("https://api.razorpay.com/v1/orders", {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${auth}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         amount: amount * 100, // Convert to paise
//         currency: "INR",
//         receipt: "test_receipt",
//       }),
//     });

//     const data = await response.json();
//     console.log("🔹 Razorpay API Response:", data);

//     if (!response.ok) {
//       console.error("❌ Razorpay API Error:", data);
//       return NextResponse.json({ error: data }, { status: response.status });
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("🔥 Internal Server Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { amount } = body;

//     if (!amount) {
//       return NextResponse.json({ error: "Amount is required" }, { status: 400 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const options = {
//       amount: amount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     return NextResponse.json(order);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";



//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });


//     export async function POST(req: NextRequest) {
//         try {
//           const { amount } = await req.json();
      
//           if (!amount) {
//             return NextResponse.json({ error: "Amount is required" }, { status: 400 });
//           }
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     });

//     return NextResponse.json({orderId: order.id}, { status:200 });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//   }
// }
// export async function GET() {
//     return NextResponse.json({ message: "Use POST method" }, { status: 405 });
//   }
  

// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

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

//     // Initialize Razorpay instance
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_SECRET!,
//     });

//     // Create Razorpay Order
//     const order = await razorpay.orders.create({
//       amount: invoice.amount, // Amount in paise
//       currency: invoice.currency,
//       receipt: `invoice_${id}`,
//       payment_capture: 1, // Auto-capture payment
//     });

//     return NextResponse.json({ orderId: order.id, amount: invoice.amount });
//   } catch (error) {
//     console.error("Error creating payment:", error);
//     return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";
// import { eq } from "drizzle-orm";

// export async function POST(req: Request) {
//   try {
//     const { id } = await req.json(); // Get invoice ID
//     if (!id) {
//       return NextResponse.json({ error: "Invoice ID required" }, { status: 400 });
//     }

//     // Ensure environment variables are set
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
//       return NextResponse.json({ error: "Razorpay API keys missing" }, { status: 500 });
//     }

//     // Fetch invoice details from the database
//     const invoice = await database
//       .select({ value: Invoices11.value })
//       .from(Invoices11)
//       .where(eq(Invoices11.id, id));

//     if (!invoice.length) {
//       return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//     }

//     const amount = invoice[0].value; // Get amount from DB
//     if (!amount || amount <= 0) {
//       return NextResponse.json({ error: "Invalid invoice amount" }, { status: 400 });
//     }

//     // Initialize Razorpay instance
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_SECRET!,
      
//     });
//     console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
// console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET);


//     // Log API request for debugging
//     console.log(`Creating Razorpay Order for Invoice ID: ${id}, Amount: ${amount * 100}`);

//     // Create Razorpay Order
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Convert INR to paisa
//       currency: "INR",
//       receipt: `invoice_${id}`,
//       payment_capture: 1, // Auto-capture payment
//     });

//     console.log("Razorpay Order Response:", order);

//     if (!order || !order.id) {
//       console.error("Failed to create order in Razorpay:", order);
//       return NextResponse.json({ error: "Razorpay order creation failed" }, { status: 500 });
//     }

//     return NextResponse.json({ orderId: order.id, amount });
//   } catch (error: any) {
//     console.error("Error creating payment:", error);
//     return NextResponse.json({ error: error.message || "Payment creation failed" }, { status: 500 });
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
//     if (!id) {
//       return NextResponse.json({ error: "Invoice ID required" }, { status: 400 });
//     }

//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       return NextResponse.json({ error: "Razorpay API keys missing" }, { status: 500 });
//     }

//     console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
//     console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

//     // Fetch invoice details
//     const invoice = await database
//       .select({ value: Invoices11.value })
//       .from(Invoices11)
//       .where(eq(Invoices11.id, id));

//     if (!invoice.length) {
//       return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//     }

//     const amount = invoice[0].value;
//     if (!amount || amount <= 0) {
//       return NextResponse.json({ error: "Invalid invoice amount" }, { status: 400 });
//     }

//     // Initialize Razorpay
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     console.log(`Creating Razorpay Order for Invoice ID: ${id}, Amount: ${amount * 100}`);

//     // Create order with error handling
//     try {
//       const order = await razorpay.orders.create({
//         amount: amount * 100,
//         currency: "INR",
//         receipt: `invoice_${id}`,
//         payment_capture: 1,
//       });

//       console.log("✅ Razorpay Order Response:", order);

//       if (!order || !order.id) {
//         throw new Error("Razorpay order creation failed");
//       }

//       return NextResponse.json({ orderId: order.id, amount });

//     } catch (razorpayError: any) {
//       console.error("🔥 Razorpay API Error:", razorpayError);
//       return NextResponse.json({ error: razorpayError.message || "Payment creation failed" }, { status: 500 });
//     }

//   } catch (error: any) {
//     console.error("❌ Error creating payment:", error);
//     return NextResponse.json({ error: error.message || "Payment creation failed" }, { status: 500 });
//   }
// }

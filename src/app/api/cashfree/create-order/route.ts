// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { invoiceId, amount } = await req.json();

//     if (!invoiceId || !amount) {
//       return NextResponse.json({ error: "Missing invoiceId or amount" }, { status: 400 });
//     }

//     const appId = process.env.CASHFREE_APP_ID;
//     const secretKey = process.env.CASHFREE_SECRET_KEY;
//     const env = process.env.CASHFREE_ENV === "production" ? "api" : "sandbox";

//     if (!appId || !secretKey) {
//       return NextResponse.json({ error: "Missing Cashfree credentials" }, { status: 500 });
//     }

//     console.log("🔹 Sending request to Cashfree...");

//     const response = await fetch(`https://${env}.cashfree.com/pg/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-client-id": appId,
//         "x-client-secret": secretKey,
//         "x-api-version": "2022-09-01",
//       },
//       body: JSON.stringify({
//         order_id: `INV-${invoiceId}`,
//         order_amount: amount,
//         order_currency: "INR",
//         customer_details: {
//           customer_id: `CUST-${invoiceId}`,
//           customer_email: "customer@example.com",
//           customer_phone: "9999999999",
//         },
//         order_meta: {
//           return_url: `http://localhost:3000/payment-success?order_id={order_id}`,
//           notify_url: "http://yourserver.com/api/cashfree/webhook",
//         },
//       }),
//     });

//     const data = await response.json();
//     console.log("✅ Cashfree Response:", data);

//     if (!response.ok) {
//       console.error("❌ Cashfree Error:", data);
//       return NextResponse.json({ error: data.message || "Failed to create order" }, { status: response.status });
//     }

//     return NextResponse.json({ paymentLink: data.payment_link });
//   } catch (error) {
//     console.error("🚨 Cashfree API Error:", error);
//     return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import { database } from "@/database"; // Ensure this is the correct path
// import { Invoices11, Customers } from "@/database"; // If these are directly exported, you can import them like this

// const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
// const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
// const CASHFREE_ENV = "sandbox"; // Change to "prod" for production

// if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
//   throw new Error("❌ Cashfree API keys are missing! Check your environment variables.");
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { invoiceId } = await request.json();

//     // Fetch invoice details
//     const invoice = await Invoices11.filter({ id: invoiceId }).getFirst();
//     if (!invoice) {
//       return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//     }

//     if (invoice.status === "paid") {
//       return NextResponse.json({ error: "Invoice already paid" }, { status: 400 });
//     }

//     // Fetch customer details
//     const customer = await database.Customers.filter({ id: invoice.customerId }).getFirst();
//     if (!customer) {
//       return NextResponse.json({ error: "Customer not found" }, { status: 404 });
//     }

//     // Prepare payment payload
//     const paymentPayload = {
//       customer_details: {
//         customer_id: customer.id,
//         customer_name: customer.name,
//         customer_email: customer.email,
//         customer_phone: customer.phone,
//       },
//       order_id: `INV-${invoice.id}`,
//       order_amount: invoice.value,
//       order_currency: "INR",
//       order_note: `Payment for Invoice ${invoice.id}`,
//       return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?order_id={order_id}&order_token={order_token}`,
//     };

//     // Create Cashfree Payment Order
//     const response = await fetch(`https://${CASHFREE_ENV}.cashfree.com/pg/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-version": "2022-09-01",
//         "x-client-id": CASHFREE_APP_ID,
//         "x-client-secret": CASHFREE_SECRET_KEY,
//       },
//       body: JSON.stringify(paymentPayload),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       return NextResponse.json({ error: "Failed to create payment order", details: errorData }, { status: response.status });
//     }

//     const data = await response.json();
//     return NextResponse.json({ paymentLink: data.payment_link }, { status: 200 });
//   } catch (error: any) {
//     console.error("❌ Error creating Cashfree payment:", error);
//     return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { database, Invoices11, Customers } from "@/database"; // Ensure this matches your project structure

// const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
// const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
// const CASHFREE_ENV = "sandbox"; // Change to "prod" for production

// if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
//   throw new Error("❌ Cashfree API keys are missing! Check your environment variables.");
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { invoiceId } = await request.json();

//     // Fetch invoice details correctly
//     const invoice = await Invoices11.select({
//       where: { id: invoiceId }, // Ensure `id` matches your database schema
//     });

//     if (!invoice) {
//       return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//     }

//     if (invoice.status === "paid") {
//       return NextResponse.json({ error: "Invoice already paid" }, { status: 400 });
//     }

//     // Fetch customer details correctly
//     const customer = await database.Customers.findFirst({
//       where: { id: invoice.customerId },
//     });

//     if (!customer) {
//       return NextResponse.json({ error: "Customer not found" }, { status: 404 });
//     }

//     // Prepare payment payload
//     const paymentPayload = {
//       customer_details: {
//         customer_id: customer.id,
//         customer_name: customer.name,
//         customer_email: customer.email,
//         customer_phone: customer.phone,
//       },
//       order_id: `INV-${invoice.id}`,
//       order_amount: invoice.value,
//       order_currency: "INR",
//       order_note: `Payment for Invoice ${invoice.id}`,
//       return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?order_id={order_id}&order_token={order_token}`,
//     };

//     // Create Cashfree Payment Order
//     const response = await fetch(`https://${CASHFREE_ENV}.cashfree.com/pg/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-version": "2022-09-01",
//         "x-client-id": CASHFREE_APP_ID,
//         "x-client-secret": CASHFREE_SECRET_KEY,
//       },
//       body: JSON.stringify(paymentPayload),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       return NextResponse.json({ error: "Failed to create payment order", details: errorData }, { status: response.status });
//     }

//     const data = await response.json();
//     return NextResponse.json({ paymentLink: data.payment_link }, { status: 200 });
//   } catch (error: any) {
//     console.error("❌ Error creating Cashfree payment:", error);
//     return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import { database } from "@/database";
// import { Invoices11, Customers } from "@/database";
// import { eq } from "drizzle-orm"; // Import eq for filtering

// const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
// const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
// const CASHFREE_ENV = "sandbox"; // Change to "prod" for production

// if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
//   throw new Error("❌ Cashfree API keys are missing! Check your .env.local file.");
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { invoiceId } = await request.json();

//     // ✅ Fetch Invoice Details
//     const invoice = await database
//       .select()
//       .from(Invoices11)
//       .where(eq(Invoices11.id, invoiceId)) // Fix: Use eq for filtering
//       .then(rows => rows[0]);

//     if (!invoice) {
//       return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//     }

//     if (invoice.status === "paid") {
//       return NextResponse.json({ error: "Invoice already paid" }, { status: 400 });
//     }

//     // ✅ Fetch Customer Details
//     const customer = await database
//       .select()
//       .from(Customers)
//       .where(eq(Customers.id, invoice.customerId)) // Fix: Correct eq usage
//       .then(rows => rows[0]);

//     if (!customer) {
//       return NextResponse.json({ error: "Customer not found" }, { status: 404 });
//     }

//     console.log("🔹 Creating Cashfree order...");

//     // ✅ Prepare Payment Payload
//     const paymentPayload = {
//       customer_details: {
//         customer_id: customer.id.toString(),
//         customer_name: customer.name,
//         customer_email: customer.email,
//         customer_phone: customer.phone,
//       },
//       order_id: `INV-${invoice.id}`,
//       order_amount: invoice.value,
//       order_currency: "INR",
//       order_note: `Payment for Invoice ${invoice.id}`,
//       return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?order_id={order_id}&order_token={order_token}`,
//     };

//     // ✅ Call Cashfree API
//     const response = await fetch(`https://${CASHFREE_ENV}.cashfree.com/pg/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-version": "2022-09-01",
//         "x-client-id": CASHFREE_APP_ID!,
//         "x-client-secret": CASHFREE_SECRET_KEY!,
//       },
//       body: JSON.stringify(paymentPayload),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("❌ Cashfree API Error:", errorData);
//       return NextResponse.json({ error: "Failed to create payment order", details: errorData }, { status: response.status });
//     }

//     const data = await response.json();
//     console.log("✅ Cashfree order created:", data);

//     return NextResponse.json({ paymentLink: data.payment_link }, { status: 200 });
//   } catch (error: any) {
//     console.error("❌ Error creating Cashfree payment:", error);
//     return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import { database } from "@/database";
// import { Invoices11, Customers } from "@/database";
// import { eq } from "drizzle-orm"; // Import eq for filtering

// // ✅ Ensure environment variables exist before execution
// const { CASHFREE_APP_ID, CASHFREE_SECRET_KEY, NEXT_PUBLIC_BASE_URL } = process.env;
// const CASHFREE_ENV = "sandbox"; // Change to "prod" for production

// if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
//   throw new Error("❌ Cashfree API keys are missing! Check your .env.local file.");
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { invoiceId } = await request.json();
//     if (!invoiceId) {
//       return NextResponse.json({ error: "Missing invoiceId" }, { status: 400 });
//     }

//     // ✅ Fetch Invoice Details
//     const invoice = await database
//       .select()
//       .from(Invoices11)
//       .where(eq(Invoices11.id, invoiceId))
//       .then(rows => rows[0]); // ✅ Corrected `.get()` issue

//     if (!invoice) {
//       return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//     }

//     if (invoice.status === "paid") {
//       return NextResponse.json({ error: "Invoice already paid" }, { status: 400 });
//     }

//     // ✅ Fetch Customer Details
//     const customer = await database
//       .select()
//       .from(Customers)
//       .where(eq(Customers.id, invoice.customerId))
//       .then(rows => rows[0]); // ✅ Corrected `.get()` issue

//     if (!customer) {
//       return NextResponse.json({ error: "Customer not found" }, { status: 404 });
//     }

//     console.log("🔹 Creating Cashfree order...");

//     // ✅ Prepare Payment Payload
//     const paymentPayload = {
//       customer_details: {
//         customer_id: customer.id.toString(),
//         customer_name: customer.name,
//         customer_email: customer.email,
//         customer_phone: customer.phone,
//       },
//       order_id: `INV-${invoice.id}`,
//       order_amount: Number(invoice.value), // Ensure correct number format
//       order_currency: "INR",
//       order_note: `Payment for Invoice ${invoice.id}`,
//       return_url: `${NEXT_PUBLIC_BASE_URL}/payment-success?order_id={order_id}&order_token={order_token}`,
//     };

//     // ✅ Call Cashfree API
//     const response = await fetch(`https://${CASHFREE_ENV}.cashfree.com/pg/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-version": "2022-09-01",
//         "x-client-id": CASHFREE_APP_ID ?? "", // ✅ Fix: Ensure values exist
//         "x-client-secret": CASHFREE_SECRET_KEY ?? "", // ✅ Fix: Ensure values exist
//       },
//       body: JSON.stringify(paymentPayload),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error("❌ Cashfree API Error:", errorData);
//       return NextResponse.json({ error: "Failed to create payment order", details: errorData }, { status: response.status });
//     }

//     const data = await response.json();
//     if (!data.payment_link) {
//       return NextResponse.json({ error: "Invalid payment response from Cashfree" }, { status: 500 });
//     }

//     console.log("✅ Cashfree order created:", data);

//     return NextResponse.json({ paymentLink: data.payment_link }, { status: 200 });
//   } catch (error: any) {
//     console.error("❌ Error creating Cashfree payment:", error);
//     return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
//   }
// }



// import { NextRequest, NextResponse } from "next/server";
// import { database } from "@/database";
// import { Invoices11, Customers } from "@/database";
// import { eq } from "drizzle-orm"; // Import eq for filtering

// const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
// const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
// const CASHFREE_ENV = "sandbox"; // Change to "prod" for production

// if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
//   throw new Error("❌ Cashfree API keys are missing! Check your .env.local file.");
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { invoiceId } = await request.json();
//     console.log("📝 Received invoiceId:", invoiceId);
//     const orderId = `INV-${invoice.id}-${Date.now()}`;

//     // ✅ Fetch Invoice Details
//     const invoice = await database
//       .select()
//       .from(Invoices11)
//       .where(eq(Invoices11.id, invoiceId))
//       .then(rows => rows[0]);

//     if (!invoice) {
//       console.error("❌ Invoice not found");
//       return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//     }

//     if (invoice.status === "paid") {
//       console.warn("⚠️ Invoice already paid");
//       return NextResponse.json({ error: "Invoice already paid" }, { status: 400 });
//     }

//     // ✅ Fetch Customer Details
//     const customer = await database
//       .select()
//       .from(Customers)
//       .where(eq(Customers.id, invoice.customerId))
//       .then(rows => rows[0]);

//     if (!customer) {
//       console.error("❌ Customer not found");
//       return NextResponse.json({ error: "Customer not found" }, { status: 404 });
//     }

//     console.log("🔹 Creating Cashfree order...");

//     // ✅ Prepare Payment Payload
//     const paymentPayload = {
//       customer_details: {
//         customer_id: customer.id.toString(),
//         customer_name: customer.name,
//         customer_email: customer.email,
//         customer_phone: customer.phone,
//       },
//       order_id: orderId`,
//       order_amount: Number(invoice.value), // Ensure it's a valid number
//       order_currency: "INR",
//       order_note: `Payment for Invoice ${invoice.id}`,
//       return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?order_id={order_id}&order_token={order_token}`,
//     };

//     console.log("🔹 Payment Payload:", JSON.stringify(paymentPayload, null, 2));

//     // ✅ Call Cashfree API
//     const response = await fetch(`https://${CASHFREE_ENV}.cashfree.com/pg/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-version": "2022-09-01",
//         "x-client-id": CASHFREE_APP_ID!,
//         "x-client-secret": CASHFREE_SECRET_KEY!,
//       },
//       body: JSON.stringify(paymentPayload),
//     });

//     console.log("🔹 Cashfree API Response Status:", response.status);

//     const data = await response.json();
//     console.log("🔹 Cashfree API Response:", JSON.stringify(data, null, 2));

//     if (!response.ok) {
//       console.error("❌ Cashfree API Error:", data);
//       return NextResponse.json({ error: "Failed to create payment order", details: data }, { status: response.status });
//     }

//     console.log("✅ Cashfree order created:", data);
//     return NextResponse.json({ paymentLink: data.payment_link }, { status: 200 });

//   } catch (error: any) {
//     console.error("❌ Error creating Cashfree payment:", error);
//     return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import { database } from "@/database";
// import { Invoices11, Customers } from "@/database";
// import { eq } from "drizzle-orm"; // Import eq for filtering

// const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
// const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
// const CASHFREE_ENV = "sandbox"; // Change to "prod" for production

// if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
//   throw new Error("❌ Cashfree API keys are missing! Check your .env.local file.");
// }

// export async function POST(request: NextRequest) {
//   try {
//     const { invoiceId } = await request.json();
//     console.log("📝 Received invoiceId:", invoiceId);

//     // ✅ Fetch Invoice Details
//     const invoice = await database
//       .select()
//       .from(Invoices11)
//       .where(eq(Invoices11.id, invoiceId))
//       .then(rows => rows[0]);

//     if (!invoice) {
//       console.error("❌ Invoice not found");
//       return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//     }

//     if (invoice.status === "paid") {
//       console.warn("⚠️ Invoice already paid");
//       return NextResponse.json({ error: "Invoice already paid" }, { status: 400 });
//     }

//     // ✅ Fetch Customer Details
//     const customer = await database
//       .select()
//       .from(Customers)
//       .where(eq(Customers.id, invoice.customerId))
//       .then(rows => rows[0]);

//     if (!customer) {
//       console.error("❌ Customer not found");
//       return NextResponse.json({ error: "Customer not found" }, { status: 404 });
//     }

//     console.log("🔹 Creating Cashfree order...");

//     // ✅ Ensure order_id is unique
//     const orderId = `INV-${invoice.id}-${Date.now()}`;

//     // ✅ Prepare Payment Payload
//     const paymentPayload = {
//       customer_details: {
//         customer_id: customer.id.toString(),
//         customer_name: customer.name,
//         customer_email: customer.email,
//         customer_phone: customer.phone,
//       },
//       order_id: orderId, // ✅ Fixed syntax
//       order_amount: Number(invoice.value), // ✅ Ensure it's a valid number
//       order_currency: "INR",
//       order_note: `Payment for Invoice ${invoice.id}`,
//       return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?order_id={order_id}&order_token={order_token}`,
//     };

//     console.log("🔹 Payment Payload:", JSON.stringify(paymentPayload, null, 2));

//     // ✅ Call Cashfree API
//     const response = await fetch(`https://${CASHFREE_ENV}.cashfree.com/pg/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-version": "2022-09-01",
//         "x-client-id": CASHFREE_APP_ID!,
//         "x-client-secret": CASHFREE_SECRET_KEY!,
//       },
//       body: JSON.stringify(paymentPayload),
//     });

//     console.log("🔹 Cashfree API Response Status:", response.status);

//     const data = await response.json();
//     console.log("🔹 Cashfree API Response:", JSON.stringify(data, null, 2));

//     if (!response.ok) {
//       console.error("❌ Cashfree API Error:", data);
//       return NextResponse.json({ error: "Failed to create payment order", details: data }, { status: response.status });
//     }

//     console.log("✅ Cashfree order created:", data);
//     return NextResponse.json({ paymentLink: data.payment_link }, { status: 200 });

//   } catch (error: any) {
//     console.error("❌ Error creating Cashfree payment:", error);
//     return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import { database } from "@/database";
// import { Invoices11, Customers } from "@/database";
// import { eq } from "drizzle-orm";

// const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID!;
// const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY!;
// const CASHFREE_ENV = "sandbox"; // Change to "prod" for production

// export async function POST(request: NextRequest) {
//   try {
//     const { invoiceId } = await request.json();
//     console.log("📝 Received invoiceId:", invoiceId);

//     // ✅ Fetch Invoice Details
//     const invoice = await database
//       .select()
//       .from(Invoices11)
//       .where(eq(Invoices11.id, invoiceId))
//       .then(rows => rows[0]);

//     if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

//     if (invoice.status === "paid") return NextResponse.json({ error: "Invoice already paid" }, { status: 400 });

//     // ✅ Fetch Customer Details
//     const customer = await database
//       .select()
//       .from(Customers)
//       .where(eq(Customers.id, invoice.customerId))
//       .then(rows => rows[0]);

//     if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 });

//     console.log("🔹 Creating Cashfree order...");

//     // ✅ Generate a Unique Order ID
//     const orderId = `INV-${invoice.id}-${Date.now()}`;

//     // ✅ Prepare Payment Payload
//     const paymentPayload = {
//       customer_details: {
//         customer_id: customer.id.toString(),
//         customer_name: customer.name,
//         customer_email: customer.email,
//         customer_phone: customer.phone,
//       },
//       order_id: orderId,
//       order_amount: Number(invoice.value),
//       order_currency: "INR",
//       order_note: `Payment for Invoice ${invoice.id}`,
//       return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?order_id={order_id}&order_token={order_token}`,
//     };

//     console.log("🔹 Payment Payload:", JSON.stringify(paymentPayload, null, 2));

//     // ✅ Call Cashfree API
//     const response = await fetch(`https://${CASHFREE_ENV}.cashfree.com/pg/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-version": "2022-09-01",
//         "x-client-id": CASHFREE_APP_ID,
//         "x-client-secret": CASHFREE_SECRET_KEY,
//       },
//       body: JSON.stringify(paymentPayload),
//     });

//     console.log("🔹 Cashfree API Response Status:", response.status);

//     const data = await response.json();
//     console.log("🔹 Cashfree API Response:", JSON.stringify(data, null, 2));

//     if (!response.ok) {
//       console.error("❌ Cashfree API Error:", data);
//       return NextResponse.json({ error: "Failed to create payment order", details: data }, { status: response.status });
//     }

//     console.log("✅ Cashfree order created:", data);
//     return NextResponse.json({ paymentLink: data.payment_link }, { status: 200 });

//   } catch (error: any) {
//     console.error("❌ Error creating Cashfree payment:", error);
//     return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
//   }
// }



// import { NextRequest, NextResponse } from "next/server";
// import { database } from "@/database";
// import { Invoices11, Customers } from "@/database";
// import { eq } from "drizzle-orm";

// const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID!;
// const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY!;
// const CASHFREE_ENV = "sandbox"; // Change to "prod" for production

// export async function POST(request: NextRequest) {
//   try {
//     const { invoiceId } = await request.json();
//     console.log("📝 Received invoiceId:", invoiceId);

//     // ✅ Fetch Invoice Details
//     const invoice = await database
//       .select()
//       .from(Invoices11)
//       .where(eq(Invoices11.id, invoiceId))
//       .then(rows => rows[0]);

//     if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

//     if (invoice.status === "paid") return NextResponse.json({ error: "Invoice already paid" }, { status: 400 });

//     // ✅ Fetch Customer Details
//     const customer = await database
//       .select()
//       .from(Customers)
//       .where(eq(Customers.id, invoice.customerId))
//       .then(rows => rows[0]);

//     if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 });

//     console.log("🔹 Creating Cashfree order...");

//     // ✅ Generate a Unique Order ID
//     const orderId = `INV-${invoice.id}-${Date.now()}`;

//     // ✅ Prepare Payment Payload
//     const paymentPayload = {
//       customer_details: {
//         customer_id: customer.id.toString(),
//         customer_name: customer.name,
//         customer_email: customer.email,
//         customer_phone: customer.phone,
//       },
//       order_id: orderId,
//       order_amount: Number(invoice.value),
//       order_currency: "INR",
//       order_note: `Payment for Invoice ${invoice.id}`,
//       return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?order_id=${orderId}`, // Fix: No curly braces
//     };

//     console.log("🔹 Payment Payload:", JSON.stringify(paymentPayload, null, 2));

//     // ✅ Call Cashfree API
//     const response = await fetch(`https://${CASHFREE_ENV}.cashfree.com/pg/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-version": "2022-09-01",
//         "x-client-id": CASHFREE_APP_ID,
//         "x-client-secret": CASHFREE_SECRET_KEY,
//       },
//       body: JSON.stringify(paymentPayload),
//     });

//     console.log("🔹 Cashfree API Response Status:", response.status);

//     const data = await response.json();
//     console.log("🔹 Cashfree API Response:", JSON.stringify(data, null, 2));

//     // ✅ Ensure `payment_link` exists
//     if (!response.ok || !data.payment_link) {
//       console.error("❌ Cashfree API Error:", data);
//       return NextResponse.json({ error: "Failed to create payment order", details: data }, { status: response.status });
//     }

//     console.log("✅ Cashfree order created:", data);
//     return NextResponse.json({ paymentLink: data.payment_link }, { status: 200 });

//   } catch (error: any) {
//     console.error("❌ Error creating Cashfree payment:", error);
//     return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { database } from "@/database";
import { Invoices11, Customers } from "@/database";
import { eq } from "drizzle-orm";

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID!;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY!;
const CASHFREE_ENV = process.env.NODE_ENV === "production" ? "api.cashfree.com" : "sandbox.cashfree.com"; // ✅ Dynamic Environment

export async function POST(request: NextRequest) {
  try {
    const { invoiceId } = await request.json();
    console.log("📝 Received invoiceId:", invoiceId);

    // ✅ Fetch Invoice Details
    const invoice = await database
      .select()
      .from(Invoices11)
      .where(eq(Invoices11.id, invoiceId))
      .then(rows => rows[0]);

    if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

    if (invoice.status === "paid") return NextResponse.json({ error: "Invoice already paid" }, { status: 400 });

    // ✅ Fetch Customer Details
    const customer = await database
      .select()
      .from(Customers)
      .where(eq(Customers.id, invoice.customerId))
      .then(rows => rows[0]);

    if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 });

    console.log("🔹 Creating Cashfree order...");

    // ✅ Generate a Unique Order ID
    const orderId = `INV-${invoice.id}-${Date.now()}`;

    // ✅ Prepare Payment Payload
    const paymentPayload = {
      customer_details: {
        customer_id: customer.id.toString(),
        customer_name: customer.name,
        customer_email: customer.email,
        customer_phone: customer.phone,
      },
      order_id: orderId,
      order_amount: Number(invoice.value),
      order_currency: "INR",
      order_note: `Payment for Invoice ${invoice.id}`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?order_id=${orderId}`,
    };

    console.log("🔹 Payment Payload:", JSON.stringify(paymentPayload, null, 2));

    // ✅ Call Cashfree API
    const response = await fetch(`https://${CASHFREE_ENV}/pg/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2022-09-01",
        "x-client-id": CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
      },
      body: JSON.stringify(paymentPayload),
    });

    console.log("🔹 Cashfree API Response Status:", response.status);

    const data = await response.json();
    console.log("🔹 Cashfree API Response:", JSON.stringify(data, null, 2));

    // ✅ Ensure `payment_link` exists
    if (!response.ok || !data.payment_link) {
      console.error("❌ Cashfree API Error:", data);
      return NextResponse.json({ error: "Failed to create payment order", details: data }, { status: response.status });
    }

    console.log("✅ Cashfree order created:", data);
    return NextResponse.json({ paymentLink: data.payment_link }, { status: 200 });

  } catch (error: any) {
    console.error("❌ Error creating Cashfree payment:", error);
    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}

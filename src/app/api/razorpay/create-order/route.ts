// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//   throw new Error("Razorpay keys are missing from environment variables.");
// }

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     // Check if the amount is provided
//     if (!body.amount || isNaN(body.amount) || body.amount <= 0) {
//       return NextResponse.json({ error: "Invalid payment amount" }, { status: 400 });
//     }

//     // Create the Razorpay order
//     const order = await razorpay.orders.create({
//       amount: body.amount * 100, // Convert rupees to paise
//       currency: "INR",
//       receipt: `receipt_${Math.random().toString(36).substring(7)}`,
//     });

//     // Return JSON response
//     return NextResponse.json({ orderId: order.id, success: true }, { status: 200 });

//   } catch (error: any) {
//     console.error("Error creating Razorpay order:", error);
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { invoiceId, amount } = await req.json();

//     if (!invoiceId || !amount) {
//       return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `invoice_${invoiceId}`,
//     });

//     console.log("Razorpay Order Created:", order);

//     return NextResponse.json({
//       orderId: order.id,
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     });
//   } catch (error) {
//     console.error("Razorpay Order Error:", error);
//     return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { invoiceId, amount } = await req.json();

//     if (!invoiceId || !amount) {
//       return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
//     }

//     console.log("Invoice ID:", invoiceId, "Amount in rupees:", amount, "Amount in paise:", amount * 100);

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `invoice_${invoiceId}`,
//     });

//     console.log("Razorpay Order Created:", order);

//     return NextResponse.json({
//       orderId: order.id,
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Ensure this exists in .env
//     });
//   } catch (error: any) {
//     console.error("Razorpay Order Error:", error);

//     return NextResponse.json(
//       { error: error.message || "Failed to create Razorpay order" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { invoiceId, amount } = await req.json();

//     if (!invoiceId || !amount) {
//       return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
//     }

//     console.log("🔹 Creating Razorpay order for Invoice ID:", invoiceId, "Amount:", amount);

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     console.log("🔹 Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
//     console.log("🔹 Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET ? "********" : "NOT SET");

//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `invoice_${invoiceId}`,
//     });

//     console.log("✅ Razorpay Order Created Successfully:", order);

//     return NextResponse.json({
//       orderId: order.id,
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     });
//   } catch (error: any) {
//     console.error("❌ Razorpay Order Error:", error);

//     return NextResponse.json(
//       { error: error?.message || "Failed to create Razorpay order" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { invoiceId, amount } = await req.json();

//     if (!invoiceId || !amount) {
//       console.log("❌ Missing invoiceId or amount");
//       return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
//     }

//     console.log("🔹 Invoice ID:", invoiceId, "Amount:", amount, "Paise:", amount * 100);

//     // Log Razorpay keys to ensure they're loaded
//     console.log("🔹 RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
//     console.log("🔹 RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "********" : "NOT SET");

//     // Ensure keys are not undefined
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error("❌ Razorpay API keys are missing!");
//       return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Convert rupees to paise
//       currency: "INR",
//       receipt: `invoice_${invoiceId}`,
//     });

//     console.log("✅ Razorpay Order Created Successfully:", order);

//     return NextResponse.json({
//       orderId: order.id,
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     });
//   } catch (error: any) {
//     console.error("❌ Razorpay Order Error:", error);
//     return NextResponse.json({ error: error?.message || "Failed to create Razorpay order" }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { invoiceId, amount } = await req.json();

//     if (!invoiceId || !amount) {
//       console.log("❌ Missing invoiceId or amount");
//       return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
//     }

//     console.log("🔹 Invoice ID:", invoiceId, "Amount (as received):", amount);

//     // Log Razorpay keys to ensure they're loaded
//     console.log("🔹 RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
//     console.log("🔹 RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "********" : "NOT SET");

//     // Ensure keys are not undefined
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error("❌ Razorpay API keys are missing!");
//       return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const order = await razorpay.orders.create({
//       amount: amount, // Removed conversion to paise
//       currency: "INR",
//       receipt: `invoice_${invoiceId}`,
//     });

//     console.log("✅ Razorpay Order Created Successfully:", order);

//     return NextResponse.json({
//       orderId: order.id,
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     });
//   } catch (error: any) {
//     console.error("❌ Razorpay Order Error:", error);
//     return NextResponse.json({ error: error?.message || "Failed to create Razorpay order" }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { invoiceId, amount } = await req.json();

//     if (!invoiceId || !amount) {
//       console.error("❌ Missing invoiceId or amount");
//       return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
//     }

//     console.log("🔹 Invoice ID:", invoiceId, "Amount:", amount);

//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error("❌ Razorpay API keys are missing!");
//       return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `invoice_${invoiceId}`,
//     });

//     console.log("✅ Razorpay Order Created:", JSON.stringify(order, null, 2));

//     if (!order || !order.id) {
//       throw new Error("Failed to create Razorpay order");
//     }

//     return NextResponse.json({
//       orderId: order.id,
//       amount: order.amount,
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     });
//   } catch (error: any) {
//     console.error("❌ Razorpay Order Error:", error);
//     return NextResponse.json({ error: error?.message || "Failed to create Razorpay order" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { invoiceId, amount } = await req.json();

//     if (!invoiceId || !amount) {
//       console.error("❌ Missing invoiceId or amount");
//       return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
//     }

//     console.log("🔹 Invoice ID:", invoiceId, "Amount (paise):", amount);

//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error("❌ Razorpay API keys are missing!");
//       return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const order = await razorpay.orders.create({
//       amount: amount, // ✅ Use amount as received (already in paise)
//       currency: "INR",
//       receipt: `invoice_${invoiceId}`,
//     });

//     console.log("✅ Razorpay Order Created:", JSON.stringify(order, null, 2));

//     if (!order || !order.id) {
//       throw new Error("Failed to create Razorpay order");
//     }

//     return NextResponse.json({
//       orderId: order.id,
//       amount: order.amount, // Amount in paise
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     });
//   } catch (error: any) {
//     console.error("❌ Razorpay Order Error:", error);
//     return NextResponse.json({ error: error?.message || "Failed to create Razorpay order" }, { status: 500 });
//   }
// }


// export async function POST(req: Request) {
//     try {
//       const { invoiceId, amount } = await req.json();
  
//       if (!invoiceId || !amount) {
//         console.error("❌ Missing invoiceId or amount");
//         return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
//       }
  
//       console.log("🔹 Invoice ID:", invoiceId, "Amount (rupees):", amount);
  
//       if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//         console.error("❌ Razorpay API keys are missing!");
//         return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
//       }
  
//       const razorpay = new Razorpay({
//         key_id: process.env.RAZORPAY_KEY_ID!,
//         key_secret: process.env.RAZORPAY_KEY_SECRET!,
//       });
  
//       const amountInPaise = amount * 100; // ✅ Convert rupees to paise
  
//       const order = await razorpay.orders.create({
//         amount: amountInPaise, // Razorpay expects amount in paise
//         currency: "INR",
//         receipt: `invoice_${invoiceId}`,
//       });
  
//       console.log("✅ Razorpay Order Created:", JSON.stringify(order, null, 2));
  
//       if (!order || !order.id) {
//         throw new Error("Failed to create Razorpay order");
//       }
  
//       return NextResponse.json({
//         orderId: order.id,
//         amount: order.amount, // Amount in paise
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       });
//     } catch (error: any) {
//       console.error("❌ Razorpay Order Error:", error);
//       return NextResponse.json({ error: error?.message || "Failed to create Razorpay order" }, { status: 500 });
//     }
//   }
  

// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { invoiceId, amount } = await req.json();

//     if (!invoiceId || !amount) {
//       console.error("❌ Missing invoiceId or amount");
//       return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
//     }

//     console.log("🔹 Invoice ID:", invoiceId, "Amount (Rs):", amount);

//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error("❌ Razorpay API keys are missing!");
//       return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const amountInPaise = amount; // ✅ Convert to paise here (only once)
//     console.log("💰 Final Amount in Paise:", amountInPaise);

//     const order = await razorpay.orders.create({
//       amount: amountInPaise, // ✅ Use amountInPaise (converted from rupees)
//       currency: "INR",
//       receipt: `invoice_${invoiceId}`,
//     });

//     console.log("✅ Razorpay Order Created:", JSON.stringify(order, null, 2));

//     if (!order || !order.id) {
//       throw new Error("Failed to create Razorpay order");
//     }

//     return NextResponse.json({
//       orderId: order.id,
//       amount: order.amount, // Amount in paise
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     });
//   } catch (error: any) {
//     console.error("❌ Razorpay Order Error:", error);
//     return NextResponse.json({ error: error?.message || "Failed to create Razorpay order" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { invoiceId, amount } = await req.json();
//     console.log("🔹 Received Invoice ID:", invoiceId, "Amount (Rs):", amount);

//     if (!invoiceId || !amount) {
//       console.error("❌ Missing invoiceId or amount");
//       return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
//     }

//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error("❌ Razorpay API keys are missing!");
//       return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const amountInPaise = amount * 100;
//     console.log("💰 Final Amount in Paise:", amountInPaise);

//     const order = await razorpay.orders.create({
//       amount: amountInPaise,
//       currency: "INR",
//       receipt: `invoice_${invoiceId}`,
//     });

//     console.log("✅ Razorpay Order Created:", order);

//     if (!order || !order.id) {
//       throw new Error("❌ Failed to create Razorpay order");
//     }

//     return NextResponse.json({
//       orderId: order.id,
//       amount: order.amount,
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     });
//   } catch (error: any) {
//     console.error("❌ Razorpay Order Error:", error);

//     return NextResponse.json(
//       { error: error.message || "Failed to create Razorpay order" },
//       { status: 500 }
//     );
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: NextRequest) {
//   try {
//     console.log("📢 API Called: /api/razorpay/create-order");

//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       throw new Error("❌ Missing Razorpay API keys! Check .env.local");
//     }

//     const { invoiceId, amount } = await req.json();

//     if (!invoiceId || !amount) {
//       return NextResponse.json({ error: "Missing invoiceId or amount" }, { status: 400 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Convert rupees to paise
//       currency: "INR",
//       receipt: `invoice_${invoiceId}`,
//     });

//     console.log("✅ Razorpay Order Created:", order);

//     return NextResponse.json({
//       orderId: order.id,
//       amount: order.amount,
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     }, { status: 200 });
//   } catch (error: any) {
//     console.error("❌ API Error:", error.message);
//     return NextResponse.json({ error: error.message || "Error creating order" }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: NextRequest) {  
//   try {
//     console.log("📢 API Called: /api/razorpay/create-order");

//     // ✅ Check if API keys are available
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       throw new Error("❌ Missing Razorpay API keys! Check .env.local");
//     }

//     const { invoiceId, amount } = await req.json();

//     // ✅ Ensure valid invoiceId & amount
//     if (!invoiceId || !amount || isNaN(amount)) {
//       console.error("❌ Missing invoiceId or amount");
//       return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 });
//     }

//     console.log("🔹 Invoice ID:", invoiceId, "Amount (paise):", amount);

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const order = await razorpay.orders.create({
//       amount: amount, // ✅ Amount should already be in paise
//       currency: "INR",
//       receipt: `invoice_${invoiceId}`,
//     });

//     console.log("✅ Razorpay Order Created:", order);

//     if (!order || !order.id) {
//       throw new Error("❌ Failed to create Razorpay order");
//     }

//     return NextResponse.json({
//       orderId: order.id,
//       amount: order.amount, // Amount in paise
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//     });
//   } catch (error: any) {
//     console.error("❌ Razorpay Order Error:", error.message);
//     return NextResponse.json({ error: error.message || "Failed to create Razorpay order" }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: NextRequest) {
//   try {
//     console.log("📢 API Called: /api/razorpay/create-order");

//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       throw new Error("❌ Missing Razorpay API keys! Check .env.local");
//     }

//     const { invoiceId, amount } = await req.json(); // Read from request body

//     if (!invoiceId || !amount) {
//       return NextResponse.json({ error: "Missing invoiceId or amount" }, { status: 400 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const order = await razorpay.orders.create({
//       amount, // Amount in paise (100 INR = 10000 paise)
//       currency: "INR",
//       receipt: `receipt_${invoiceId}`,
//     });

//     console.log("✅ Razorpay Order Created:", order);

//     return NextResponse.json({
//       orderId: order.id,
//       amount: order.amount,
//       key: process.env.RAZORPAY_KEY_ID,
//     }, { status: 200 });

//   } catch (error: any) {
//     console.error("❌ API Error:", error.message);
//     return NextResponse.json({ error: error.message || "Error creating order" }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: NextRequest) {
//   try {
//     console.log("📢 API Called: /api/razorpay/create-order");

//     // ✅ Ensure Razorpay API Keys exist
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error("❌ Missing Razorpay API Keys! Check .env.local");
//       return NextResponse.json({ error: "Missing Razorpay API keys" }, { status: 500 });
//     }

//     // ✅ Parse Request Body
//     const body = await req.json();
//     const { invoiceId, amount } = body;

//     // ✅ Validate Inputs
//     if (!invoiceId || !amount || isNaN(amount) || amount <= 0) {
//       console.error("❌ Invalid Request Data:", body);
//       return NextResponse.json({ error: "Invalid invoiceId or amount" }, { status: 400 });
//     }

//     console.log(`🧾 Creating order for Invoice ${invoiceId}, Amount: ₹${amount / 100}`);

//     // ✅ Create Razorpay Order
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const order = await razorpay.orders.create({
//       amount, // 💰 Amount in paise
//       currency: "INR",
//       receipt: `receipt_${invoiceId}`,
//     });

//     console.log("✅ Razorpay Order Created:", order);

//     return NextResponse.json({
//       orderId: order.id,
//       amount: order.amount,
//       key: process.env.RAZORPAY_KEY_ID, // Send API key to frontend
//     }, { status: 200 });

//   } catch (error: any) {
//     console.error("❌ API Error:", error.message);
//     return NextResponse.json({ error: error.message || "Error creating order" }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: NextRequest) {
//   try {
//     console.log("📢 API Called: /api/razorpay/create-order");

//     // ✅ Ensure Razorpay API Keys exist
//     if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//       console.error("❌ Missing Razorpay API Keys! Check .env.local");
//       return NextResponse.json({ error: "Missing Razorpay API keys" }, { status: 500 });
//     }

//     console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
//     console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);


//     // ✅ Parse Request Body
//     const body = await req.json();
//     const { invoiceId, amount } = body;

//     // ✅ Validate Inputs
//     if (!invoiceId || !amount || isNaN(amount) || amount <= 0) {
//       console.error("❌ Invalid Request Data:", body);
//       return NextResponse.json({ error: "Invalid invoiceId or amount" }, { status: 400 });
//     }

//     console.log(`🧾 Creating order for Invoice ${invoiceId}, Amount: ₹${amount / 100}`);

//     // ✅ Initialize Razorpay
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     // ✅ Create Razorpay Order
//     const order = await razorpay.orders.create({
//       amount, // 💰 Amount in paise
//       currency: "INR",
//       receipt: `receipt_${invoiceId}`,
//     });

//     console.log("✅ Razorpay Order Created:", order);

//     return NextResponse.json({
//       orderId: order.id,
//       amount: order.amount,
//       key: process.env.RAZORPAY_KEY_ID, // Send API key to frontend
//     }, { status: 200 });

//   } catch (error: any) {
//     console.error("❌ API Error:", error);
//     return NextResponse.json({ error: error.message || "Error creating order" }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
// console.log("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET ? "Loaded" : "Missing");

// // Ensure API keys exist
// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//   throw new Error("Razorpay API keys are missing! Check environment variables.");
// }

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(request: NextRequest) {
//   try {
//     const { amount } = await request.json();
//     console.log("Received amount:", amount);

//     if (!amount || isNaN(amount) || amount <= 0) {
//       return NextResponse.json({ error: "Invalid payment amount" }, { status: 400 });
//     }

//     // Create Razorpay order
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Convert rupees to paise
//       currency: "INR",
//       receipt: "receipt_" + Math.random().toString(36).substring(7),
//     });

//     console.log("Razorpay Order Created:", order);
//     return NextResponse.json({ orderId: order.id }, { status: 200 });

//   } catch (error: any) {
//     console.error("Error creating Razorpay order:", error);

//     if (error.statusCode === 401) {
//       return NextResponse.json({ error: "Authentication failed. Check API keys." }, { status: 401 });
//     }

//     return NextResponse.json({ error: "Error creating Razorpay order" }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//   throw new Error("Razorpay API keys are missing! Check .env file.");
// }

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(request: NextRequest) {
//   try {
//     const { amount } = await request.json();
//     console.log("Received amount:", amount);

//     if (!amount || isNaN(amount) || amount <= 0) {
//       return NextResponse.json({ error: "Invalid payment amount" }, { status: 400 });
//     }

//     // Create Razorpay Order
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Razorpay requires amount in paise
//       currency: "INR",
//       receipt: `receipt_${Math.random().toString(36).substring(7)}`,
//     });

//     console.log("Razorpay Order Created:", order);
//     return NextResponse.json({ orderId: order.id }, { status: 200 });

//   } catch (error: any) {
//     console.error("Error creating Razorpay order:", error);

//     if (error.statusCode === 401) {
//       return NextResponse.json({ error: "Authentication failed. Check API keys." }, { status: 401 });
//     }

//     return NextResponse.json({ error: "Error creating Razorpay order" }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//   throw new Error("❌ Razorpay API keys are missing! Check your .env file.");
// }

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function POST(request: NextRequest) {
//   try {
//     const { amount } = await request.json();
//     console.log("📢 Received amount:", amount);

//     // Validate amount
//     if (!amount || isNaN(amount) || amount <= 0) {
//       return NextResponse.json({ error: "❌ Invalid payment amount" }, { status: 400 });
//     }

//     console.log("🔧 Creating Razorpay Order...");

//     // Create Razorpay Order
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Razorpay requires amount in paise
//       currency: "INR",
//       receipt: `receipt_${Math.random().toString(36).substring(7)}`,
//     });

//     console.log("✅ Razorpay Order Created:", order);

//     return NextResponse.json({ orderId: order.id, order }, { status: 200 });

//   } catch (error: any) {
//     console.error("❌ Error creating Razorpay order:", error);

//     if (error.statusCode === 401) {
//       return NextResponse.json({ error: "🔴 Authentication failed. Check API keys." }, { status: 401 });
//     }

//     return NextResponse.json({ error: "⚠️ Error creating Razorpay order", details: error.message }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const keyId = process.env.RAZORPAY_KEY_ID;
// const keySecret = process.env.RAZORPAY_KEY_SECRET;

// // Check if Razorpay credentials are available
// if (!keyId || !keySecret) {
//   throw new Error("❌ Razorpay API keys are missing! Check your .env.local file.");
// }

// // Initialize Razorpay instance
// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });

// export async function POST(request: NextRequest) {
//   try {
//     // Parse request body
//     const { amount } = await request.json();
//     console.log("📢 Received amount:", amount);

//     // Validate amount
//     if (!amount || isNaN(amount) || amount <= 0) {
//       return NextResponse.json({ error: "❌ Invalid payment amount" }, { status: 400 });
//     }

//     console.log("🔧 Creating Razorpay Order...");

//     // Create Razorpay Order
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `receipt_${Math.random().toString(36).substring(7)}`,
//     });

//     console.log("✅ Razorpay Order Created:", order);

//     return NextResponse.json({ orderId: order.id, order }, { status: 200 });

//   } catch (error: any) {
//     console.error("❌ Error creating Razorpay order:", error);

//     // Handle Authentication Error (401)
//     if (error.statusCode === 401) {
//       return NextResponse.json({ error: "🔴 Authentication failed. Check API keys." }, { status: 401 });
//     }

//     // Handle General Errors
//     return NextResponse.json({ error: "⚠️ Error creating Razorpay order", details: error.message }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

// Ensure API keys are available
if (!keyId || !keySecret) {
  throw new Error("❌ Razorpay API keys are missing! Check your .env.local file.");
}

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();
    console.log("📢 Received amount:", amount);

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "❌ Invalid payment amount" }, { status: 400 });
    }

    console.log("🔧 Testing Razorpay API authentication...");

    // ✅ Test API Authentication
    const authTestResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "GET",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
      },
    });

    if (!authTestResponse.ok) {
      console.error("🔴 Razorpay authentication failed:", authTestResponse.status);
      return NextResponse.json(
        { error: "🔴 Authentication failed. Check API keys." },
        { status: 401 }
      );
    }

    console.log("✅ Razorpay authentication successful!");

    console.log("🔧 Creating Razorpay Order...");

    // ✅ Create Razorpay Order
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Math.random().toString(36).substring(7)}`,
    });

    console.log("✅ Razorpay Order Created:", order);

    return NextResponse.json({ orderId: order.id, order }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Error creating Razorpay order:", error);

    if (error.statusCode === 401) {
      return NextResponse.json(
        { error: "🔴 Authentication failed. Check API keys." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "⚠️ Error creating Razorpay order", details: error.message },
      { status: 500 }
    );
  }
}

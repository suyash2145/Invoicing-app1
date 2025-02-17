// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: Request) {
//   try {
//     const { amount } = await req.json();

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_SECRET!,
//     });

//     const options = {
//       amount: amount * 100, // Convert Rs to paisa
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     return NextResponse.json(order);
//   } catch (error) {
//     console.error("Razorpay Order Error:", error);
//     return NextResponse.json({ error: "Error creating order" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { amount } = await req.json();

//     // Create order request to Razorpay
//     const razorpayOrderResponse = await fetch("https://api.razorpay.com/v1/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Basic ${btoa(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_SECRET}`)}`,
//       },
//       body: JSON.stringify({
//         amount: amount * 100, // Convert to paise
//         currency: "INR",
//         payment_capture: 1,
//       }),
//     });

//     if (!razorpayOrderResponse.ok) {
//       console.error("Failed to create Razorpay order:", await razorpayOrderResponse.text());
//       return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
//     }

//     const order = await razorpayOrderResponse.json();
//     return NextResponse.json(order);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { amount } = await req.json();

//     if (!amount) {
//       return NextResponse.json({ error: "Amount is required" }, { status: 400 });
//     }

//     const auth = Buffer.from(
//       `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
//     ).toString("base64");

//     const order = await fetch("https://api.razorpay.com/v1/orders", {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${auth}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         amount: amount * 100, // Amount in paise
//         currency: "INR",
//         receipt: `receipt_${Date.now()}`,
//       }),
//     }).then((res) => res.json());

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { amount, name, description } = await req.json();

//     if (!amount) {
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
//         receipt: "razorUser@gmail.com",
//       }),
//     });

//     const data = await response.json();
    
//     if (response.ok) {
//       return NextResponse.json({
//         success: true,
//         msg: "Order Created",
//         order_id: data.id,
//         amount: data.amount,
//         key_id: process.env.RAZORPAY_KEY_ID,
//         product_name: name,
//         description: description,
//         contact: "8567345632",
//         name: "Sandeep Sharma",
//         email: "sandeep@gmail.com",
//       });
//     } else {
//       return NextResponse.json({ success: false, msg: "Something went wrong!", error: data }, { status: 400 });
//     }

//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     return NextResponse.json({ success: false, msg: "Internal Server Error" }, { status: 500 });
//   }
// }

// import Razorpay from "razorpay";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { amount, customerId, customerName } = await req.json();

//     if (!amount || !customerId) {
//       return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const options = {
//       amount: amount * 100, // Convert to paisa
//       currency: "INR",
//       receipt: `invoice_${customerId}`,
//       payment_capture: 1,
//     };

//     const order = await razorpay.orders.create(options);

//     return NextResponse.json({
//       success: true,
//       order,
//       customerName,
//       amount,
//     });
//   } catch (error: any) {
//     console.error("Razorpay Order Error:", error);
//     return NextResponse.json({
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error occurred",
//     }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const { amount } = await req.json();
//     console.log("Received amount:", amount);

//     if (!amount) {
//       console.error("Missing amount in request");
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
//     console.log("Razorpay API Response:", data);

//     if (response.ok) {
//       return NextResponse.json(data);
//     } else {
//       console.error("Error from Razorpay:", data);
//       return NextResponse.json({ error: data }, { status: response.status });
//     }
//   } catch (error) {
//     console.error("Internal Server Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

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
//     const { amount } = await req.json();
//     if (!amount) {
//       return NextResponse.json({ error: "Amount is required" }, { status: 400 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     const options = {
//       amount: amount * 100, // Convert to paisa
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     return NextResponse.json({ success: true, order });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//   }
// }


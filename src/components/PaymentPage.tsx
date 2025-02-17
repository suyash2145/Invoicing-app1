// // "use client";
// import { useState } from "react";

// const PaymentPage = ({ invoiceId }: { invoiceId: number; amount: number }) => {
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async () => {
//     setLoading(true);

//     try {
//       const res = await fetch("/api/payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id: invoiceId }),
//       });

//       const data = await res.json();
//       if (!data.orderId) throw new Error("Payment initialization failed");

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use env variable
//         amount: data.amount * 100,
//         currency: "INR",
//         name: "Your Business Name",
//         description: "Invoice Payment",
//         order_id: data.orderId,
//         handler: async (response: any) => {
//           console.log("Payment successful", response);
//           // TODO: Call API to verify & update invoice status
//         },
//         prefill: {
//           email: "user@example.com", 
//           contact: "9876543210", 
//         },
//         theme: { color: "#3399cc" },
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment Error:", error);
//     }

//     setLoading(false);
//   };

//   return (
//     <button onClick={handlePayment} disabled={loading}>
//       {loading ? "Processing..." : "Make Payment"}
//     </button>
//   );
// };

// export default PaymentPage;

// "use client";

// import { useState, useEffect } from "react";

// const PaymentPage = ({ invoiceId, amount }: { invoiceId: number; amount: number }) => {
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async () => {
//     try {
//       setLoading(true);

//       // Step 1: Fetch Order from Backend
//       const response = await fetch("/api/razorpay/order", {
//         method: "POST",
//         body: JSON.stringify({ amount }),
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!response.ok) throw new Error("Failed to create Razorpay order");

//       const order = await response.json();

//       // Step 2: Ensure Razorpay is Loaded
//       if (typeof window === "undefined" || !(window as any).Razorpay) {
//         console.error("Razorpay SDK not loaded.");
//         setLoading(false);
//         return;
//       }

//       // Step 3: Initialize Razorpay Checkout
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public key from .env.local
//         amount: order.amount,
//         currency: "INR",
//         name: "Your Business Name",
//         description: `Payment for Invoice ${invoiceId}`,
//         order_id: order.id,
//         handler: function (response: any) {
//           alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
//           // Call backend to mark invoice as paid
//         },
//         prefill: {
//           name: "Customer Name",
//           email: "customer@example.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment Error:", error);
//       alert("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button 
//       onClick={handlePayment} 
//       disabled={loading} 
//       className="bg-green-700 text-white p-3 rounded-md"
//     >
//       {loading ? "Processing..." : "Make Payment"}
//     </button>
//   );
// };

// export default PaymentPage;


// "use client";

// import { useState } from "react";

// const PaymentPage = ({ invoiceId, amount }: { invoiceId: number; amount: number }) => {
//   const [loading, setLoading] = useState(false);
  
  
// const handlePayment = async () => {
//     try {
//       setLoading(true);
  
//       const response = await fetch("/api/razorpay/order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount, name: "Test Product", description: "Testing Razorpay" }),
//       });
  
//       const order = await response.json();
  
//       if (!order.success) {
//         throw new Error(order.msg || "Failed to create order");
//       }
  
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
//         amount: order.amount,
//         currency: "INR",
//         name: "Your Business Name",
//         description: order.description,
//         order_id: order.order_id,
//         handler: function (response: any) {
//           alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
//         },
//         prefill: {
//           name: order.name,
//           email: order.email,
//           contact: order.contact,
//         },
//         theme: { color: "#3399cc" },
//       };
  
//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment Error:", error);
//       alert("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
//   return (
//     <button 
//       onClick={handlePayment} 
//       disabled={loading} 
//       className="bg-green-700 text-white p-3 rounded-md"
//     >
//       {loading ? "Processing..." : "Make Payment"}
//     </button>
//   );
// };

// export default PaymentPage;

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// const PaymentPage = ({ invoiceId, amount, customerName }: any) => {
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async () => {
//     setLoading(true);
//     try {
//         const response = await fetch("/api/razorpay/order", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ amount }),
//           });
//         //   const data = await response.json();
//         //   console.log("API Response:", data);
        
//       const data = await response.json();
//       console.log("API Response:", data);
//       if (!data.success) {
//         alert("Failed to create Razorpay order.");
//         return;
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//         amount: data.amount * 100,
//         currency: "INR",
//         name: "My Invoice App",
//         description: `Invoice Payment - ${customerName}`,
//         order_id: data.order.id,
//         handler: function (response: any) {
//           alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//           // Handle payment success (e.g., update DB)
//         },
//         prefill: {
//           name: customerName,
//           email: "customer@example.com",
//           contact: "9876543210",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const razor = new (window as any).Razorpay(options);
//       razor.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button className="bg-green-700" onClick={handlePayment} disabled={loading}>
//       {loading ? "Processing..." : "Pay with Razorpay"}
//     </Button>
//   );
// };

// export default PaymentPage;


// import { NextResponse } from "next/server";
// import Razorpay from "razorpay";
// import { useState } from "react";

// // export async function POST(req: Request) {
//     const PaymentPage = async ({ invoiceId, amount, customerName }: any) => {
//         const [loading, setLoading] = useState(false);
//   try {
//     console.log("🔹 API `/api/create-order` was called");

//     const { amount } = await req.json();
//     console.log("Received amount:", amount);

//     if (!amount) {
//       return NextResponse.json({ success: false, message: "Amount is required" }, { status: 400 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID!,
//       key_secret: process.env.RAZORPAY_KEY_SECRET!,
//     });

//     console.log("🔹 Creating order in Razorpay...");
    
//     const options = {
//       amount: amount * 100, // Convert to paisa
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     console.log("✅ Order created successfully:", order);

//     return NextResponse.json(order);
//   } catch (error: any) {
//     console.error("❌ Razorpay Order Error:", error);
//     return NextResponse.json({ success: false, message: "Failed to create Razorpay order" }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     console.log("Request body:", body);

//     const { amount } = body;
//     if (!amount) {
//       return NextResponse.json({ error: "Amount is required" }, { status: 400 });
//     }

//     console.log("Received amount:", amount);

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
//     console.log("Order created:", order);

//     return NextResponse.json(order);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//   }
// }


// "use client";

// import { useState } from "react";

// const PaymentPage = ({ invoiceId, amount }: { invoiceId: number; amount: number }) => {
//   const [loading, setLoading] = useState(false);

//   const payNow = async () => {
//     try {
//       setLoading(true);

//       // Step 1: Call the backend API to create an order
//       const response = await fetch("/api/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount, currency: "INR", receipt: `invoice_${invoiceId}` }),
//       });

//       if (!response.ok) throw new Error("Failed to create Razorpay order");

//       const order = await response.json();

//       // Step 2: Check if Razorpay is available
//       if (typeof window === "undefined" || !(window as any).Razorpay) {
//         console.error("Razorpay SDK not loaded.");
//         setLoading(false);
//         return;
//       }

//       // Step 3: Open Razorpay Checkout
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!, // Public key from .env.local
//         amount: order.amount,
//         currency: "INR",
//         name: "Your Business Name",
//         description: `Payment for Invoice ${invoiceId}`,
//         order_id: order.id,
//         handler: function (response: any) {
//           alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
//           // You can update your database here to mark the invoice as paid
//         },
//         prefill: {
//           name: "Customer Name",
//           email: "customer@example.com",
//           contact: "9999999999",
//         },
//         theme: { color: "#3399cc" },
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment Error:", error);
//       alert("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold mb-4">Invoice Payment</h1>
//       <p className="mb-2">Invoice ID: {invoiceId}</p>
//       <p className="mb-4">Amount: ₹{amount}</p>
//       <button 
//         onClick={payNow} 
//         disabled={loading} 
//         className="bg-green-700 text-white p-3 rounded-md"
//       >
//         {loading ? "Processing..." : "Make Payment"}
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;

// "use client";

// import { useState } from "react";
// import Script from "next/script";
// import React from "react";

// declare global {
//     interface Window {
//         Razorpay: any;
//     }
// }

// const PaymentPage = ({ invoiceId, amount }: { invoiceId: number; amount: number }) => {
//   const [loading, setLoading] = useState(false);

//   const payNow = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch("/api/razorpay-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount }),
//       });

//       const data = await response.json();
//       if (!data.success) throw new Error("Failed to create Razorpay order");

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
//         amount: data.order.amount,
//         currency: "INR",
//         name: "Your Business Name",
//         description: `Payment for Invoice ${invoiceId}`,
//         order_id: data.order.id,
//         handler: function (response: any) {
//           alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
//         },
//         prefill: {
//           name: "Customer Name",
//           email: "customer@example.com",
//           contact: "9999999999",
//         },
//         theme: { color: "#3399cc" },
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Payment Error:", error);
//       alert("Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold mb-4">Invoice Payment</h1>
//       <p className="mb-2">Invoice ID: {invoiceId}</p>
//       <p className="mb-4">Amount: ₹{amount}</p>
//       <button 
//         onClick={payNow} 
//         disabled={loading} 
//         className="bg-green-700 text-white p-3 rounded-md"
//       >
//         {loading ? "Processing..." : "Make Payment"}
//       </button>
//     </div>
//   );
// };

// export default PaymentPage;


"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export default function InvoicePayment({ invoiceId }: { invoiceId: number }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: invoiceId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Invoice Payment",
        description: `Invoice #${invoiceId}`,
        order_id: data.orderId,
        handler: function (response: any) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          window.location.reload();
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      alert(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePayment} disabled={loading} className="flex gap-2 font-semibold bg-green-700">
      <CreditCard className="w-5 h-auto" />
      {loading ? "Processing..." : "Invoice Payment"}
    </Button>
  );
}

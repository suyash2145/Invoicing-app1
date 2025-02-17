// // "use client";

// // import { useRouter } from "next/navigation";
// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";

// // export default function PaymentPage({ params }) {
// //   const { invoiceId } = params;
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(false);

// //   async function handlePayment() {
// //     setLoading(true);
// //     try {
// //       const response = await fetch("/api/create-payment", {
// //         method: "POST",
// //         body: JSON.stringify({ id: invoiceId }),
// //         headers: { "Content-Type": "application/json" },
// //       });

// //       const { orderId, amount } = await response.json();

// //       const options = {
// //         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Add in .env file
// //         amount: amount * 100,
// //         currency: "INR",
// //         name: "Your Business",
// //         description: `Payment for Invoice ${invoiceId}`,
// //         order_id: orderId,
// //         handler: function (response) {
// //           alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
// //           router.push(`/invoices/${invoiceId}`);
// //         },
// //         prefill: {
// //           name: "Customer Name",
// //           email: "customer@example.com",
// //           contact: "9999999999",
// //         },
// //         theme: { color: "#3399cc" },
// //       };

// //       const rzp = new window.Razorpay(options);
// //       rzp.open();
// //     } catch (error) {
// //       console.error("Payment Error:", error);
// //       alert("Payment failed. Please try again.");
// //     }
// //     setLoading(false);
// //   }

// //   return (
// //     <main className="w-full h-full">
// //       <h1 className="text-3xl font-semibold">Payment for Invoice {invoiceId}</h1>
// //       <Button className="mt-4" onClick={handlePayment} disabled={loading}>
// //         {loading ? "Processing..." : "Pay Now"}
// //       </Button>
// //     </main>
// //   );
// // }


"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  const { invoiceId } = useParams(); // Get the invoice ID from URL params
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  async function handlePayment() {
    
    if (!razorpayLoaded) {
      alert("Razorpay SDK not loaded. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        body: JSON.stringify({ id: invoiceId }),
        headers: { "Content-Type": "application/json" },
      });

      const { orderId, amount } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Add in .env file
        amount: amount * 100,
        currency: "INR",
        name: "Your Business",
        description: `Payment for Invoice ${invoiceId}`,
        order_id: orderId,
        handler: function (response: { razorpay_payment_id: string }) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          router.push(`/invoices/${invoiceId}`);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      // const rzp = new window.Razorpay(options);
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
    setLoading(false);
  }

  return (
    <main className="w-full h-full">
      <h1 className="text-3xl font-semibold">Payment for Invoice {invoiceId}</h1>
      <Button className="mt-4" onClick={handlePayment} disabled={loading || !razorpayLoaded}>
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </main>
  );
}


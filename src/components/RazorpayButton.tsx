// // components/RazorpayButton.tsx
// 'use client';

// export default function RazorpayButton({
//   amount,
//   invoiceId,
//   description,
// }: {
//   amount: number;
//   invoiceId: number;
//   description: string;
// }) {
//   const handlePayment = async () => {
//     const res = await fetch('/api/create-payment', {
//       method: 'POST',
//       body: JSON.stringify({
//         amount,
//         invoiceId,
//         description,
//       }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     const { id: orderId, key } = await res.json();

//     const options = {
//       key,
//       amount,
//       currency: 'INR',
//       name: 'Invoice Payment',
//       description,
//       order_id: orderId,
//       handler: async function () {
//         await fetch('/api/update-payment', {
//           method: 'POST',
//           body: JSON.stringify({ invoiceId, status: 'paid' }),
//           headers: { 'Content-Type': 'application/json' },
//         });
//         alert('Payment successful! Invoice marked as paid.');
//         window.location.reload(); // Refresh page
//       },
//       theme: { color: '#3399cc' },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <button
//       onClick={handlePayment}
//       className="bg-green-700 text-white px-4 py-2 rounded"
//     >
//       Pay with Razorpay
//     </button>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Script from "next/script";

interface RazorpayButtonProps {
  amount: number;
  invoiceId: number;
  description: string;
}

export default function RazorpayButton({
  amount,
  invoiceId,
  description,
}: RazorpayButtonProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = async () => {
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, invoiceId, description }),
      });

      if (!res.ok) throw new Error("Failed to create payment link");

      const { id: orderId, key } = await res.json();

      const options = {
        key,
        amount,
        currency: "INR",
        name: "Invoice Payment",
        description,
        order_id: orderId,
        handler: async function () {
          await fetch("/api/update-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ invoiceId, status: "paid" }),
          });
          alert("Payment successful! Invoice marked as paid.");
          router.refresh();
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <>
      <button
        onClick={handlePayment}
        className="bg-green-700 text-white px-4 py-2 rounded"
      >
        Pay with Razorpay
      </button>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
    </>
  );
}

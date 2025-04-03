// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function PaymentSuccess() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const id = searchParams.get("id");
//   const [message, setMessage] = useState("Marking invoice as paid...");

//   useEffect(() => {
//     async function markAsPaid() {
//       if (!id) {
//         setMessage("⚠️ Something went wrong. Invoice ID not found.");
//         return;
//       }

//       try {
//         const res = await fetch("/api/invoices/mark-paid", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ id }),
//         });

//         if (res.ok) {
//           setMessage("✅ Payment successful! Invoice marked as paid.");
//           setTimeout(() => {
//             router.push(`/invoices/${id}/payment`);
//           }, 3000);
//         } else {
//           setMessage("⚠️ Failed to update invoice. Please contact support.");
//         }
//       } catch (error: unknown) {
//         console.error("Payment API Error:", error);
//         setMessage("⚠️ Network error. Try again later.");
//       }
//     }

//     markAsPaid();
//   }, [id, router]);

//   return (
//     <div className="p-4 text-center">
//       <h1 className={`text-2xl font-bold ${message.includes("⚠️") ? "text-red-600" : "text-green-600"}`}>
//         {message.includes("⚠️") ? "Error" : "Payment Successful!"}
//       </h1>
//       <p>{message}</p>
//       {!message.includes("⚠️") && <p className="text-sm text-gray-500">Redirecting to invoice...</p>}
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function PaymentSuccess() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const id = searchParams.get("id");
//   const [message, setMessage] = useState("Marking invoice as paid...");

//   useEffect(() => {
//     async function markAsPaid() {
//       if (!id) {
//         setMessage("⚠️ Something went wrong. Invoice ID not found.");
//         return;
//       }

//       try {
//         const res = await fetch("/api/invoices/mark-paid", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ id }),
//         });

//         if (res.ok) {
//           setMessage("✅ Payment successful! Invoice marked as paid.");
//           setTimeout(() => {
//             router.push(`/invoices/${id}/payment`);
//           }, 3000);
//         } else {
//           setMessage("⚠️ Failed to update invoice. Please contact support.");
//         }
//       } catch (error) {
//         console.error("Payment API Error:", error);
//         setMessage("⚠️ Network error. Try again later.");
//       }
//     }

//     markAsPaid();
//   }, [id, router]);

//   return (
//     <div className="p-4 text-center">
//       <h1 className={`text-2xl font-bold ${message.includes("⚠️") ? "text-red-600" : "text-green-600"}`}>
//         {message.includes("⚠️") ? "Error" : "Payment Successful!"}
//       </h1>
//       <p>{message}</p>
//       {!message.includes("⚠️") && <p className="text-sm text-gray-500">Redirecting to invoice...</p>}
//     </div>
//   );
// }


"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [message, setMessage] = useState("Marking invoice as paid...");

  useEffect(() => {
    async function markAsPaid() {
      if (!id) {
        setMessage("⚠️ Something went wrong. Invoice ID not found.");
        return;
      }

      try {
        const res = await fetch("/api/invoices/mark-paid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (res.ok) {
          setMessage("✅ Payment successful! Invoice marked as paid.");
          setTimeout(() => {
            router.push(`/invoices/${id}/payment`);
          }, 3000);
        } else {
          setMessage("⚠️ Failed to update invoice. Please contact support.");
        }
      } catch (error) {
        console.error("Payment API Error:", error);
        setMessage("⚠️ Network error. Try again later.");
      }
    }

    markAsPaid();
  }, [id, router]);

  return (
    <div className="p-4 text-center">
      <h1 className={`text-2xl font-bold ${message.includes("⚠️") ? "text-red-600" : "text-green-600"}`}>
        {message.includes("⚠️") ? "Error" : "Payment Successful!"}
      </h1>
      <p>{message}</p>
      {!message.includes("⚠️") && <p className="text-sm text-gray-500">Redirecting to invoice...</p>}
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

// export default function PaymentSuccess() {
//     return (
//       <div className="p-4 text-center">
//         <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
//         <p>Your invoice has been marked as paid.</p>
//       </div>
//     );
//   }
  

// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// export default function PaymentSuccess() {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   const [message, setMessage] = useState("Marking invoice as paid...");

//   useEffect(() => {
//     async function markAsPaid() {
//       if (!id) {
//         setMessage("Invoice ID not found.");
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
//         } else {
//           setMessage("⚠️ Failed to update invoice. Please contact support.");
//         }
//       } catch (error) {
//         setMessage("⚠️ Network error. Try again later.");
//       }
//     }

//     markAsPaid();
//   }, [id]);

//   return (
//     <div className="p-4 text-center">
//       <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
//       <p>{message}</p>
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
//         setMessage("Invoice ID not found.");
//         return;
//       } else {

//       }

//       try {
//         const res = await fetch("/api/invoices/mark-paid", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ id }),
//         });

//         if (res.ok) {
//           setMessage("✅ Payment successful! Invoice marked as paid.");
          
//           // Redirect to dashboard after 3 seconds
//           setTimeout(() => {
//             router.push("/dashboard");
//           }, 3000);
//         } else {
//           setMessage("⚠️ Failed to update invoice. Please contact support.");
//         }
//       } catch (error) {
//         setMessage("⚠️ Network error. Try again later.");
//       }
//     }

//     markAsPaid();
//   }, [id, router]);

//   return (
//     <div className="p-4 text-center">
//       <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
//       <p>{message}</p>
//       <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [message, setMessage] = useState("Marking invoice as paid...");
  const [error, setError] = useState(false); // Track if there's an error

  useEffect(() => {
    async function markAsPaid() {
      if (!id) {
        setMessage("⚠️ Something went wrong. Invoice ID not found.");
        setError(true); // Set error state to true
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
          
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            // router.push("/dashboard");
            router.push(`/invoices/${id}/payment`);
          }, 3000);
        } else {
          setMessage("⚠️ Failed to update invoice. Please contact support.");
          setError(true);
        }
      } catch (error) {
        setMessage("⚠️ Network error. Try again later.");
        setError(true);
      }
    }

    markAsPaid();
  }, [id, router]);

  return (
    <div className="p-4 text-center">
      <h1 className={`text-2xl font-bold ${error ? "text-red-600" : "text-green-600"}`}>
        {error ? "Error" : "Payment Successful!"}
      </h1>
      <p>{message}</p>
      {!error && <p className="text-sm text-gray-500">Redirecting to invoice...</p>}
    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function PaymentSuccess() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const id = searchParams.get("id");
//   const session_id = searchParams.get("session_id"); // ✅ Get session_id

//   const [message, setMessage] = useState("Marking invoice as paid...");
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     async function markAsPaid() {
//       if (!id || !session_id) { // ✅ Ensure session_id is present
//         setMessage("⚠️ Invalid access! Payment verification failed.");
//         setError(true);
//         return;
//       }

//       try {
//         const res = await fetch("/api/invoices/mark-paid", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ id, session_id }), // ✅ Send session_id
//         });

//         if (res.ok) {
//           setMessage("✅ Payment successful! Invoice marked as paid.");
//           setTimeout(() => router.push("/dashboard"), 3000);
//         } else {
//           const data = await res.json();
//           setMessage(`⚠️ ${data.error}`);
//           setError(true);
//         }
//       } catch (error) {
//         setMessage("⚠️ Network error. Try again later.");
//         setError(true);
//       }
//     }

//     markAsPaid();
//   }, [id, session_id, router]);

//   return (
//     <div className="p-4 text-center">
//       <h1 className={`text-2xl font-bold ${error ? "text-red-600" : "text-green-600"}`}>
//         {error ? "Error" : "Payment Successful!"}
//       </h1>
//       <p>{message}</p>
//       {!error && <p className="text-sm text-gray-500">Redirecting to dashboard...</p>}
//     </div>
//   );
// }


"use client"; // Marking as a Client Component

// import { Button } from "@/components/ui/button";

// async function handlePayment(invoiceId) {
//     console.log("Initiating payment for Invoice ID:", invoiceId); // Debugging log

//     try {
//         const response = await fetch(`/api/create-order`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ invoiceId }),
//         });

//         const data = await response.json();
//         console.log("API response:", data); // Debugging log

//         if (!data.order) {
//             alert("Failed to create order");
//             return;
//         }

//         const options = {
//             key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//             amount: data.order.amount,
//             currency: "INR",
//             name: "Invoice Payment",
//             description: "Payment for Invoice",
//             order_id: data.order.id,
//             handler: async function (response) {
//                 console.log("Payment successful, response:", response); // Debugging log
//                 await fetch(`/api/payment-success`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         invoiceId,
//                         paymentId: response.razorpay_payment_id,
//                         orderId: response.razorpay_order_id,
//                         signature: response.razorpay_signature,
//                     }),
//                 });
//                 alert("Payment successful!");
//             },
//             prefill: {
//                 name: "John Doe",
//                 email: "johndoe@example.com",
//             },
//             theme: {
//                 color: "#3399cc",
//             },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();
//     } catch (error) {
//         console.error("Payment error:", error);
//         alert("Something went wrong during the payment process.");
//     }
// }

// export default function PayButton({ invoiceId }) {
//     console.log("Rendering PayButton with Invoice ID:", invoiceId); // Debugging log

//     return (
//         <Button
//             className="flex gap-2 font-semibold bg-green-700"
//             onClick={() => handlePayment(invoiceId)}
//         >
//             Pay Now
//         </Button>
//     );
// }

import { useEffect } from "react";

function PaymentButton({ orderId }) {
    useEffect(() => {
        // Dynamically load the Razorpay script
        const loadRazorpay = () => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => {
                console.log("Razorpay script loaded");
            };
            script.onerror = () => {
                console.error("Failed to load Razorpay script");
            };
            document.body.appendChild(script);
        };

        if (!window.Razorpay) {
            loadRazorpay();
        }
    }, []);

    const handlePayment = async () => {
        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded");
            return;
        }

        try {
            const response = await fetch("/api/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ invoiceId: orderId }),
            });

            const data = await response.json();
            if (!data.order) {
                alert("Order creation failed");
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                name: "My Invoice App",
                description: "Invoice Payment",
                order_id: data.order.id,
                handler: function (response) {
                    alert(`Payment successful: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const razorpayInstance = new window.Razorpay(options);
            razorpayInstance.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Payment initiation failed");
        }
    };

    return (
        <button onClick={handlePayment} className="btn btn-primary">
            Pay Now
        </button>
    );
}

export default PaymentButton;

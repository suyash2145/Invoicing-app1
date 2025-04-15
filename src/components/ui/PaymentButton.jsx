
"use client"; // Marking as a Client Component

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

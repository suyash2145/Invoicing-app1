
"use client";
import { useEffect, useState } from "react";

function PayButton({ invoiceId }) {
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false); // ✅ New state

    useEffect(() => {
        const loadScript = () => {
            return new Promise((resolve) => {
                if (window.Razorpay) {
                    resolve(true);
                    return;
                }

                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

        loadScript().then((loaded) => {
            if (!loaded) {
                alert("Failed to load Razorpay SDK. Please try again later.");
            } else {
                console.log("✅ Razorpay SDK loaded.");
            }
        });

        // Fetch invoice details
        const fetchInvoiceDetails = async () => {
            if (!invoiceId) return;

            try {
                const response = await fetch(`/api/get-invoice?invoiceId=${invoiceId}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to fetch invoice details");
                }

                setInvoiceData(data);
                setLoading(false);
            } catch (error) {
                console.error("❌ Error fetching invoice:", error);
                alert("Could not fetch invoice details. Please try again.");
                setLoading(false);
            }
        };

        fetchInvoiceDetails();
    }, [invoiceId]);

    const handlePayment = async () => {
        if (!invoiceId || !invoiceData) {
            alert("Invoice details are missing. Cannot proceed.");
            return;
        }

        try {
            const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
            if (!razorpayKey) {
                alert("Razorpay key is missing in environment variables.");
                return;
            }

            console.log("🔁 Creating order for invoice:", invoiceId);

            const response = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ invoiceId, amount: invoiceData.value }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.error("❌ Order creation failed:", data?.error || "Unknown error");
                alert(`Error: ${data?.error || "Something went wrong"}`);
                return;
            }

            const { id: order_id, amount, currency } = data.order;

            const options = {
                key: razorpayKey,
                amount: amount / 100, // ✅ Convert to INR
                currency,
                order_id,
                name: "My Invoice App",
                description: `Payment for invoice #${invoiceId}`,
                handler: async function (response) {
                    console.log("✅ Payment successful!", response);
                    alert("Payment successful!");

                    setIsUpdating(true); // ✅ Show "Updating..." message

                    await fetch("/api/payment-success", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            invoiceId,
                            paymentId: response.razorpay_payment_id,
                            orderId: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                        }),
                    });

                    // ✅ Delay refresh for better UX
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                },
                prefill: {
                    name: invoiceData.name || "John Doe",
                    email: invoiceData.email || "johndoe@example.com",
                    contact: invoiceData.contact || "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("❌ Payment initiation error:", error);
            alert("Something went wrong while initiating payment.");
        }
    };

    return (
        <button
            onClick={handlePayment}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 rounded-lg shadow-md"
            disabled={loading || isUpdating}
        >
            {loading ? "Loading..." : isUpdating ? "Updating..." : "Pay Now"}
        </button>
    );
}

export default PayButton;

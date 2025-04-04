// "use client"; // Marking as a Client Component

// import { Button } from "@/components/ui/button";

// async function handlePayment(invoiceId) {
//     const response = await fetch(`/api/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ invoiceId }),
//     });

//     const { order } = await response.json();
    
//     if (!order) {
//         alert("Failed to create order");
//         return;
//     }

//     const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: "INR",
//         name: "Invoice Payment",
//         description: "Payment for Invoice",
//         order_id: order.id,
//         handler: async function (response) {
//             await fetch(`/api/payment-success`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     invoiceId,
//                     paymentId: response.razorpay_payment_id,
//                     orderId: response.razorpay_order_id,
//                     signature: response.razorpay_signature,
//                 }),
//             });
//             alert("Payment successful!");
//         },
//         prefill: {
//             name: "John Doe",
//             email: "johndoe@example.com",
//         },
//         theme: {
//             color: "#3399cc",
//         },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
// }

// export default function PayButton({ invoiceId }) {
//     return (
//         <Button className="flex gap-2 font-semibold bg-green-700" onClick={() => handlePayment(invoiceId)}>
//             Pay Now
//         </Button>
//     );
// }


// "use client"; // Marking as a Client Component

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

// "use client"
// import { useEffect } from "react";

// function PayButton({ orderId }) {
//     useEffect(() => {
//         // Dynamically load the Razorpay script
//         const loadRazorpay = () => {
//             const script = document.createElement("script");
//             script.src = "https://checkout.razorpay.com/v1/checkout.js";
//             script.async = true;
//             script.onload = () => {
//                 console.log("Razorpay script loaded");
//             };
//             script.onerror = () => {
//                 console.error("Failed to load Razorpay script");
//             };
//             document.body.appendChild(script);
//         };

//         if (!window.Razorpay) {
//             loadRazorpay();
//         }
//     }, []);

//     const handlePayment = async () => {
//         if (!window.Razorpay) {
//             alert("Razorpay SDK not loaded");
//             return;
//         }

//         try {
//             const response = await fetch("/api/create-order", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ invoiceId: orderId }),
//             });

//             const data = await response.json();
//             if (!data.order) {
//                 alert("Order creation failed");
//                 return;
//             }

//             const options = {
//                 key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//                 amount: data.order.amount,
//                 currency: data.order.currency,
//                 name: "My Invoice App",
//                 description: "Invoice Payment",
//                 order_id: data.order.id,
//                 handler: function (response) {
//                     alert(`Payment successful: ${response.razorpay_payment_id}`);
//                 },
//                 prefill: {
//                     name: "John Doe",
//                     email: "johndoe@example.com",
//                     contact: "9999999999",
//                 },
//                 theme: {
//                     color: "#3399cc",
//                 },
//             };

//             const razorpayInstance = new window.Razorpay(options);
//             razorpayInstance.open();
//         } catch (error) {
//             console.error("Payment error:", error);
//             alert("Payment initiation failed");
//         }
//     };

//     return (
//         <button onClick={handlePayment} className="btn btn-primary">
//             Pay Now
//         </button>
//     );
// }

// export default PayButton;


// "use client";
// import { useEffect } from "react";

// function PayButton({ orderId }) {
//     // Load the Razorpay script when the component mounts
//     useEffect(() => {
//         const loadRazorpay = () => {
//             return new Promise((resolve, reject) => {
//                 // Check if Razorpay script is already loaded
//                 if (window.Razorpay) {
//                     resolve();
//                     return;
//                 }

//                 const script = document.createElement("script");
//                 script.src = "https://checkout.razorpay.com/v1/checkout.js";
//                 script.async = true;
//                 script.onload = () => {
//                     console.log("Razorpay script loaded");
//                     resolve();
//                 };
//                 script.onerror = () => {
//                     console.error("Failed to load Razorpay script");
//                     reject("Script load error");
//                 };
//                 document.body.appendChild(script);
//             });
//         };

//         loadRazorpay().catch((err) => console.error("Error loading Razorpay:", err));
//     }, []);

//     // Handle payment process
//     const handlePayment = async () => {
//         try {
//             // Check if Razorpay script is loaded
//             if (!window.Razorpay) {
//                 alert("Razorpay SDK not loaded. Please try again.");
//                 return;
//             }

//             // Call your backend API to create an order
//             const response = await fetch(`/api/invoices/${orderId}/create-order`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ invoiceId: orderId }),
//             });

//             const data = await response.json();
//             if (!data.order) {
//                 alert("Order creation failed");
//                 return;
//             }

//             // Payment options
//             const options = {
//                 key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//                 amount: data.order.amount,
//                 currency: data.order.currency,
//                 name: "My Invoice App",
//                 description: "Invoice Payment",
//                 order_id: data.order.id,
//                 handler: function (response) {
//                     alert(`Payment successful: ${response.razorpay_payment_id}`);
//                 },
//                 prefill: {
//                     name: "John Doe",
//                     email: "johndoe@example.com",
//                     contact: "9999999999",
//                 },
//                 theme: {
//                     color: "#3399cc",
//                 },
//             };

//             // Open the Razorpay payment gateway
//             const razorpayInstance = new window.Razorpay(options);
//             razorpayInstance.open();
//         } catch (error) {
//             console.error("Payment error:", error);
//             alert("Payment initiation failed");
//         }
//     };

//     return (
//         <button onClick={handlePayment} className="btn btn-primary">
//             Pay Now
//         </button>
//     );
// }

// export default PayButton;


"use client";
// import { useEffect } from "react";

// function PayButton({ orderId }) {
//     useEffect(() => {
//         const loadRazorpay = () => {
//             return new Promise((resolve, reject) => {
//                 if (window.Razorpay) {
//                     resolve();
//                     return;
//                 }

//                 const script = document.createElement("script");
//                 script.src = "https://checkout.razorpay.com/v1/checkout.js";
//                 script.async = true;
//                 script.onload = () => resolve();
//                 script.onerror = () => reject("Script load error");
//                 document.body.appendChild(script);
//             });
//         };

//         loadRazorpay().catch((err) => console.error("Error loading Razorpay:", err));
//     }, []);

//     const handlePayment = async () => {
//         try {
//             if (!window.Razorpay) {
//                 alert("Razorpay SDK not loaded. Please try again.");
//                 return;
//             }

//             const response = await fetch(`/api/create-order?invoiceId=${invoiceId}` , {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//             });

//             const data = await response.json();
//             if (!response.ok) {
//                 console.error("Order creation failed:", data.error);
//                 alert("Order creation failed");
//                 return;
//             }

//             const options = {
//                 key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//                 amount: data.order.amount,
//                 currency: data.order.currency,
//                 name: "My Invoice App",
//                 description: "Invoice Payment",
//                 order_id: data.order.id,
//                 handler: function (response) {
//                     alert(`Payment successful: ${response.razorpay_payment_id}`);
//                 },
//                 prefill: {
//                     name: "John Doe",
//                     email: "johndoe@example.com",
//                     contact: "9999999999",
//                 },
//                 theme: { color: "#3399cc" },
//             };

//             const razorpayInstance = new window.Razorpay(options);
//             razorpayInstance.open();
//         } catch (error) {
//             console.error("Payment error:", error);
//             alert("Payment initiation failed");
//         }
//     };

//     return (
//         <button onClick={handlePayment} className="btn btn-primary">
//             Pay Now
//         </button>
//     );
// }

// // export default PayButton;
// import { useEffect } from "react";

// function PayButton({ invoiceId }) {
//     // Load Razorpay script dynamically
//     useEffect(() => {
//         const loadScript = () => {
//             return new Promise((resolve) => {
//                 if (window.Razorpay) {
//                     resolve(true);
//                     return;
//                 }

//                 const script = document.createElement("script");
//                 script.src = "https://checkout.razorpay.com/v1/checkout.js";
//                 script.onload = () => resolve(true);
//                 script.onerror = () => resolve(false);
//                 document.body.appendChild(script);
//             });
//         };

//         loadScript().then((loaded) => {
//             if (!loaded) {
//                 alert("Failed to load Razorpay SDK. Please try again later.");
//             } else {
//                 console.log("Razorpay SDK loaded successfully.");
//             }
//         });
//     }, []);

//     const handlePayment = async () => {
//         try {
//             // Verify if the Razorpay key is loaded properly
//             const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
//             console.log("Razorpay Key:", razorpayKey);

//             if (!razorpayKey) {
//                 alert("Razorpay key is not configured. Please check your environment variables.");
//                 return;
//             }

//             // Fetch the order from your server
//             const response = await fetch(`/api/create-order?invoiceId=${invoiceId}`, {
//                 method: "POST",
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 console.error("Order creation failed:", data.error);
//                 alert(`Error: ${data.error}`);
//                 return;
//             }

//             console.log("Order created successfully:", data.order);

//             const { id: order_id, amount, currency } = data.order;

//             const options = {
//                 key: razorpayKey,
//                 amount,
//                 currency,
//                 order_id,
//                 handler: function (response) {
//                     alert("Payment successful!");
//                     console.log("Payment ID:", response.razorpay_payment_id);
//                     console.log("Order ID:", response.razorpay_order_id);
//                     console.log("Signature:", response.razorpay_signature);
//                 },
//                 prefill: {
//                     name: "John Doe",
//                     email: "johndoe@example.com",
//                     contact: "9999999999",
//                 },
//                 theme: {
//                     color: "#3399cc",
//                 },
//             };

//             const razorpay = new window.Razorpay(options);
//             razorpay.open();
//         } catch (error) {
//             console.error("Error initiating payment:", error);
//             alert("Failed to initiate payment. Please try again.");
//         }
//     };

//     return (
//         <button onClick={handlePayment} className="bg-green-700 text-white px-4 py-2 rounded">
//             Pay Now
//         </button>
//     );
// }

// export default PayButton;
"use client";
import { useEffect } from "react";

function PayButton({ invoiceId }) {
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
    }, []);

    const handlePayment = async () => {
        if (!invoiceId) {
            alert("Invoice ID is missing. Cannot proceed.");
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
                body: JSON.stringify({ invoiceId }),
            });

            let data;
            try {
                data = await response.json();
            } catch (err) {
                console.error("❌ Failed to parse response JSON:", err);
                alert("Server returned an invalid response. Please try again.");
                return;
            }

            if (!response.ok) {
                console.error("❌ Order creation failed:", data?.error || "Unknown error");
                alert(`Error: ${data?.error || "Something went wrong"}`);
                return;
            }

            const { id: order_id, amount, currency } = data.order;

            const options = {
                key: razorpayKey,
                amount,
                currency,
                order_id,
                name: "My Invoice App",
                description: `Payment for invoice #${invoiceId}`,
                handler: async function (response) {
                    console.log("✅ Payment successful!", response);
                    alert("Payment successful!");

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
        >
            Pay Now
        </button>
    );
}

export default PayButton;

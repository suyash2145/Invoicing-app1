
"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dailog"; // Fix typo from "dailog" to "dialog"
import { eq, and, isNull } from "drizzle-orm";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Customers, Invoices11 } from "@/database/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

import DashboardBtn from "@/components/Dashboardbtn";
import Container from "@/components/Container";

import { Button } from "@/components/ui/button";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { deleteInvoiceAction, updateStatusAction } from "@/app/actions";
import { Bomb, ChevronDown, CreditCard, Ellipsis, SquareCheckBig } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { database } from "@/database";
import { notFound, redirect, useParams} from "next/navigation";
import { createStaticWorker } from "next/dist/build";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { CreditCard, SquareCheckBig } from "lucide-react";
// import { Button } from "@/components/ui/button";

"use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { CreditCard, SquareCheckBig } from "lucide-react";
// import { Button } from "@/components/ui/button";

export default function InvoicePage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = parseInt(params.invoiceId as string);

  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch invoice data from API
  useEffect(() => {
    if (isNaN(invoiceId)) {
      router.push("/404"); // Redirect to 404 if ID is invalid
      return;
    }

    async function fetchInvoice() {
      try {
        const response = await fetch(`/api/invoices/${invoiceId}`);
        const data = await response.json();

        console.log("Fetched Invoice:", data); // Debugging

        if (!data || !data.id) {
          router.push("/404");
          return;
        }

        setInvoice(data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      }
    }

    fetchInvoice();
  }, [invoiceId, router]);
async function handlePayment() {
    // if (!invoice || !razorpayLoaded) return;
    setLoading(true);
  
    try {
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId: invoice.id, amount: invoice.value }),
      });
  
      const data = await response.json();
      console.log("Razorpay API Response:", data); // Debugging step
  
      if (!data.orderId || !data.key) throw new Error("Invalid Razorpay response");
  
      const options = {
        key: data.key,
        amount: invoice.value * 100, // Convert to paise
        currency: "INR",
        name: "Your Company Name",
        description: invoice.description,
        order_id: data.orderId,
        handler: async function (response: any) {
          console.log("Payment Success:", response);
        },
        prefill: {
          name: invoice.Customer?.name,
        },
      };
  
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  }
  

  // Ensure invoice is loaded before rendering
  if (!invoice) {
    return <p className="text-center text-lg">Loading invoice...</p>;
  }

  return (
    <main className="w-full h-full">
      <div>
        <h1 className="text-3xl font-semibold">
          Invoice {invoice.id} <span className="badge">{invoice.status || "Unknown"}</span>
        </h1>

        <p className="text-3xl mb-3">Rs {invoice.value ? invoice.value.toFixed(2) : "0.00"}</p>

        {invoice.status === "open" && (
          <Button className="bg-green-700" onClick={handlePayment} disabled={loading}>
            <CreditCard className="w-5 h-auto" />
            {loading ? "Processing..." : "Pay Invoice"}
          </Button>
        )}

        {invoice.status === "paid" && (
          <p className="flex gap-2 items-center text-xl font-bold">
            <SquareCheckBig className="w-8 h-auto bg-green-500 rounded-full text-white p-1" />
            Invoice Paid
          </p>
        )}
      </div>
    </main>
  );
}








//   import PaymentPage from "@/components/PaymentPage"; // Import the component
// import { useRouter } from "next/navigation";



// const PaymentWrapper = () => {
//   const router = useRouter();
//   // const invoiceId = router.query.invoiceId;
//   const params = useParams();
//   const invoiceId = params.invoiceId; 
//   if (!invoiceId) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Make Payment for Invoice #{invoiceId}</h2>
//       <PaymentPage invoiceId={parseInt(invoiceId as string)} />
//     </div>
//   );
// };


// export default PaymentWrapper;





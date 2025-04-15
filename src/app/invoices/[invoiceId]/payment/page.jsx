
import { eq } from "drizzle-orm";
import { Customers, Invoices11 } from "@/database/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { createPayment, updateStatusAction } from "@/app/actions";
import { CreditCard, SquareCheckBig } from "lucide-react";
import { database } from "@/database";
import { notFound } from "next/navigation";
import ViewPDFButton from "@/components/ViewPDFButton";
import  PayButton  from "@/components/PayButton";
import ChatBox from "@/components/ChatBox"


async function initiateRazorpay(invoiceId, amount) {
    try {
        const response = await fetch(`/api/create-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ invoiceId, amount }),
        });

        const { order } = await response.json();

        if (!order) {
            alert("Failed to create order");
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: "INR",
            name: "Invoice Payment",
            description: "Payment for Invoice",
            order_id: order.id,
            handler: async function (response) {
                await fetch(`/api/payment-success`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        invoiceId,
                        paymentId: response.razorpay_payment_id,
                        orderId: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                    }),
                });
                alert("Payment successful!");
            },
            prefill: {
                name: "Customer",
                email: "customer@example.com",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error("Payment error:", error);
        alert("Something went wrong during the payment process.");
    }
}

export default async function InvoicePage({ params, searchParams }) {
    const invoiceId = parseInt(params.invoiceId);
    const status = searchParams?.status || "undefined";

    if (isNaN(invoiceId) || invoiceId <= 0) {
        notFound();
    }

    const isSuccess = status === "success";

    if (isSuccess) {
        const formData = new FormData();
        formData.append("id", String(invoiceId));
        formData.append("status", "paid");
        await updateStatusAction(formData);
    }

    const [result] = await database.select({
        id: Invoices11.id,
        status: Invoices11.status,
        createTs: Invoices11.createTs,
        description: Invoices11.description,
        value: Invoices11.value,
        name: Customers.name
    })
    .from(Invoices11)
    .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
    .where(eq(Invoices11.id, invoiceId))
    .limit(1);

    if (!result) {
        notFound();
    }

    const invoice = {
        ...result,
        Customer: {
            name: result.name
        }
    };


    return (


        <main className="w-full min-h-screen bg-gray-50 py-10 px-4">
  <Container>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Side - Invoice Info */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold flex flex-wrap items-center gap-4">
            Invoice {invoice.id}
            <Badge className={cn(
              "rounded-full capitalize",
              invoice.status === "open" && "bg-blue-500",
              invoice.status === "paid" && "bg-green-600",
              invoice.status === "void" && "bg-zinc-600",
              invoice.status === "uncollectible" && "bg-red-600"
            )}>
              {invoice.status}
            </Badge>
          </h1>
        </div>

        <p className="text-2xl font-bold mb-3 text-gray-800">
          Rs {(invoice.value / 100).toFixed(2)}
        </p>
        <p className="text-md text-gray-600 mb-6">{invoice.description}</p>
      </div>

      {/* Right Side - Actions */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-2">Manage Invoice</h2>
        {invoice.status === "open" && (
          <PayButton invoiceId={invoice.id} />
        )}
        {invoice.status === "paid" && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-green-600 font-medium text-lg">
              <SquareCheckBig className="w-6 h-6 bg-green-500 rounded-full text-white p-1" />
              Invoice Paid
            </p>
            <ViewPDFButton invoiceId={String(invoice.id)} />
          </div>
        
          
        )}
      </div>
    </div>

    <div>
      {/* <ChatBox />  */}
      <ChatBox invoiceId={invoiceId} />
    </div>
    


    {/* Billing Details */}
    <div className="mt-10">
      <h2 className="text-lg font-bold mb-4">Billing details</h2>
      <ul className="grid gap-2 text-sm text-gray-700">
        <li className="flex flex-col sm:flex-row sm:gap-4">
          <strong className="w-32">Invoice ID:</strong>
          <span>{invoice.id}</span>
        </li>
        <li className="flex flex-col sm:flex-row sm:gap-4">
          <strong className="w-32">Invoice Date:</strong>
          <span>{new Date(invoice.createTs).toLocaleDateString("en-US")}</span>
        </li>
        <li className="flex flex-col sm:flex-row sm:gap-4">
          <strong className="w-32">Billing Name:</strong>
          <span>{invoice.Customer.name}</span>
        </li>
      </ul>
    </div>
  </Container>
</main>
    );
}


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
import { createPayment, deleteInvoiceAction, updateStatusAction } from "@/app/actions";
import { Bomb, ChevronDown, CreditCard, Ellipsis, SquareCheckBig } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { database } from "@/database";
import { notFound} from "next/navigation";
import Invoice from "../invoice";
import { createStaticWorker } from "next/dist/build";
import ViewPDFButton from "@/components/ViewPDFButton";




interface InvoicePageProps {
  params: { invoiceId: string;}
  searchParams?: { status?: string;}
}

 export default async function InvoicePage({ params, searchParams }: InvoicePageProps) {
   const invoiceId = parseInt(params.invoiceId);
   const status = searchParams?.status || "undefined";
 

  console.log("searchParams.status:", status); // Debugging

  const isSuccess = status === "success";
  const isCanceled = status === "canceled";


   console.log('isSuccess', isSuccess)
   console.log('isCanceled', isCanceled)
  
if (isNaN(invoiceId)) {
  throw new Error("Invalid Invoice ID");
}

if (  isSuccess ) {
  const formData = new FormData();
  
  formData.append('id', String(invoiceId))
  formData.append('status', 'paid')
  await updateStatusAction(formData);

  // redirect(`/invoices/${invoiceId}`);
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
     .where(eq(Invoices11.id, invoiceId),)
     .limit(1);
     console.log('result', result)
     

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
    <main className="w-full h-full">
      <Container className="mt-12">
          <div className="grid grid-cols-2">
          <div>
        <div className="flex justify-between mb-8">
          <h1 className="flex items-center gap-4 text-3xl font-semibold">
            Invoice {invoice.id}
            <Badge
              className={cn(
                "rounded-full capitalize",
                invoice.status === "open" && "bg-blue-500",
                invoice.status === "paid" && "bg-green-600",
                invoice.status === "void" && "bg-zinc-600",
                invoice.status === "uncollectible" && "bg-red-600"
              )}
            >
              {invoice.status}
            </Badge>
          </h1>
        </div>

        <p className="text-3xl mb-3">Rs { (invoice.value / 100).toFixed(2) }</p>
        <p className="text-lg mb-8">{invoice.description}</p>
        </div>
             
        
        <div>
          <h2 className="text-xl font-bold mb-4">Manage Invoice</h2>
          {invoice.status === 'open' && (
          <form action={createPayment}>
              <input type="hidden" name="id" value={invoice.id} />
              <Button className="flex gap-2 font-semibold bg-green-700">
                  <CreditCard className="w-5 h-auto" />
                  Invoice Payment
              </Button>
          </form>
          )} 

          {invoice.status === 'paid' && (
            <div className="flex justify-between items-center">
           <p className="flex gap-2 items-center text-xl font-bold">
              <SquareCheckBig className="w-8 h-auto bg-green-500 rounded-full text-white p-1"/>
              Invoice Paid
           </p>
           
            {/* ✅ Use the client component here */}
    {/* <ViewPDFButton invoiceId={invoice.id} />
     */}
     <ViewPDFButton invoiceId={String(invoice.id)} />

           </div>
          )}



        </div>
        </div> 

        
        <h2 className="font-bold text-lg mb-4">Billing details</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="w-28 flex-shrink-0 font-medium text-sm">Invoice ID</strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="w-28 flex-shrink-0 font-medium text-sm">Invoice Date</strong>
            <span>{new Date(invoice.createTs).toLocaleDateString("en-US")}</span>
          </li>

{/* <li className="flex gap-4">
  <strong className="w-28 flex-shrink-0 font-medium text-sm">
    Invoice Date
  </strong>
  <span>{new Date(invoice.createTs).toISOString().split("T")[0]}</span>
</li> */}




          <li className="flex gap-4">
            <strong className="w-28 flex-shrink-0 font-medium text-sm">Billing Name</strong>
            <span>{invoice.Customer.name}</span>
          </li>
        </ul>
      </Container>
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





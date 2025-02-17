
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dailog"
// import { eq, and, isNull} from 'drizzle-orm'

// import { useOptimistic } from "react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
//   } from "@/components/ui/dropdown-menu"

// import { Customers, Invoices11 } from '@/database/schema';
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import DeleteButton from "@/components/DeleteButton";

// import DashboardBtn from "@/components/Dashboardbtn";
// import Container from "@/components/Container";

// import { Button } from "@/components/ui/button";
// import { AVAILABLE_STATUSES } from "@/data/invoices";
// import { updateStatusAction, deleteInvoiceAction } from "@/app/actions";
// import { Bomb, ChevronDown, Ellipsis } from "lucide-react";
// import { auth } from "@clerk/nextjs/server";
// import { database } from "@/database";
// import { notFound } from "next/navigation";
// import Invoice from "../invoice";

// export default async function InvoicePage( { params }: { params: { invoiceId: string; } }){
//        const { userId, orgId } = await auth();
   
//         if ( !userId ) return;
   
//        const invoiceId = parseInt(params.invoiceId)  
       
//        // parseInt('asdf');
//        if ( isNaN( invoiceId )) {
//            throw new Error('Invalid Invoice ID');
//        }
   
//       let result;
   
//        if ( orgId ) {
           
//        [result] = await database
//        .select()
//        .from(Invoices11)
//        .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
//        .where(
//            and(
//            eq(Invoices11.id, invoiceId),
//            eq(Invoices11.OrganizationId, orgId),
//            )
//        )
//        .limit(1);
//        console.log('result', result)
//        }else{
           
//        [result] = await database
//        .select()
//        .from(Invoices11)
//        .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
//        .where(
//            and(
//            eq(Invoices11.id, invoiceId),
//            eq(Invoices11.userId, userId),
//            isNull(Invoices11.OrganizationId)
//            )
//        )
//        .limit(1);
       
//        console.log('result', result)
   
//        }
   
//        if ( !result ) {
//            notFound();
//        }
   
//         const invoice = {
//            ...result.invoices11,
//            customer: result.customers
//         }
   
//        // console.log('result', result);
   
//        async function handleDelete() {
//            "use server"; // Ensures this runs on the server
//            await database.delete(Invoices11).where(eq(Invoices11.id, invoiceId));
//            // console.log("Invoice deleted:", invoiceId);
//            // redirect("/dashboard"); 
//            console.log("Invoice deleted:", invoiceId);
//          }
   
//     //  return <Invoice invoice={invoice}/>
//         }
   
   

//   return (
//       <main className="w-full h-full">
//         <Container>
//             <div className="flex justify-between mb-8">
//         <h1 className="flex items-center gap-4 text-3xl font-semibold">
//             Invoice { invoice.id }
//             <Badge className={cn(
//                 // "rounded-full capitalize",
//                 // CurrenStatus === 'open' && 'bg-blue-500',
//                 // currentStatus === 'paid' && 'bg-green-600',
//                 // currentStatus === 'void' && 'bg-zinc-600',
//                 // currentStatus === 'uncollectible' && 'bg-red-600',
//                 "rounded-full capitalize",
//                 invoice.status === 'open' && 'bg-blue-500',
//                 invoice.status === 'paid' && 'bg-green-600',
//                 invoices.status === 'void' && 'bg-zinc-600',
//                 invoices.status === 'uncollectible' && 'bg-red-600',
//             )}>
//           { currentStatus }
//         </Badge>
//         </h1>
        
//         </div>

//         <p className="text-3xl mb-3">
//         Rs { (invoice.value / 100).toFixed(2) }
//         </p>

//         <p className="text-lg mb-8">
//           { invoice.description }
//         </p>
//         <h2 className="font-bold text-lg mb-4">
//             Billing details
//         </h2>

//         <ul className="grid gap-2">
//             <li className="flex gap-4">
//                 <strong className="lock w-28 flex-shrink-0 font-medium text-sm">Invoice ID</strong>
//                 <span>
//                     { invoice.id }
//                 </span>
//             </li>
//             <li className="flex gap-4">
//                 <strong className="lock w-28 flex-shrink-0 font-medium text-sm">Invoice Date</strong>
//                 <span>
//                 { new Date(invoice.createTs).toLocaleDateString()}
//                 </span>
//             </li>
//             <li className="flex gap-4">
//                 <strong className="lock w-28 flex-shrink-0 font-medium text-sm">Billing Name</strong>
//                 <span>
//                     { invoice.customer.name}
//                 </span>
//             </li>
//             <li className="flex gap-4">
//                 <strong className="lock w-28 flex-shrink-0 font-medium text-sm">Phone no</strong>
//                 <span>{invoice.phone}</span>
//             </li>
//             <li className="flex gap-4">
//                 <strong className="lock w-28 flex-shrink-0 font-medium text-sm">Billing Email</strong>
//                 <span>
//                     {invoice.customer.email}
//                 </span>
//             </li>
//         </ul>

//         </Container>
         

//             </main>            
//   );
// }


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
// import PaymentPage from "@/components/PaymentPage";
// import PaymentPage from "@/components/PaymentPage";
// import PaymentPage from "@/components/PaymentPage";


// interface InvoicePageProps {
//   params: { invoiceId: string; }
//   searchParams: { status: string; }
// }
//   export default async function InvoicePage({ params }: InvoicePageProps) {

//     const invoiceId = parseInt(params.invoiceId);

//     const isSuccess = await searchParams.status === 'success';
//     const isCanceled = await searchParams.status === 'canceled';

//     console.log('isSuccess', isSuccess)
//     console.log('isCanceled', isCanceled)

//     if (isNaN(invoiceId)) {
//       throw new Error("Invalid Invoice ID");
//     }


// interface InvoicePageProps {
// params: { invoiceId: string; };
// searchParams: { status: string; };
// }

// export default async function InvoicePage({ params, searchParams }: InvoicePageProps) {
// const invoiceId = parseInt(params.invoiceId);

// // const status = await searchParams.get('status');
// // Access query parameters directly from `searchParams`
// const isSuccess = searchParams.status === 'success';
// const isCanceled = searchParams.status === 'canceled';

// // console.log('status:', status);
// console.log('isSuccess:', isSuccess); // Check if status is success
// console.log('isCanceled:', isCanceled); // Check if status is canceled


interface InvoicePageProps {
  params: { invoiceId: string;}
  searchParams: { status: string;}
}

 export default async function InvoicePage({ params, searchParams }: InvoicePageProps) {
   const invoiceId = await parseInt(params.invoiceId);

   const isSuccess = searchParams.status === 'success';
   const isCanceled = searchParams.status === 'canceled';
  
   console.log('searchParams.status:', searchParams.status);

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
      <Container>
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

{/* {invoice.status === "open" && (
// <PaymentPage invoiceId={invoice.id} amount={invoice.value / 100} />
<PaymentPage invoiceId={invoice.id} amount={invoice.value / 100} />
)}  */}

{/* {invoice.status === "open" && (
<PaymentPage invoiceId={invoice.id} amount={invoice.value / 100} />
)} */}

          {invoice.status === 'paid' && (
           <p className="flex gap-2 items-center text-xl font-bold">
              <SquareCheckBig className="w-8 h-auto bg-green-500 rounded-full text-white p-1"/>
              Invoice Paid
           </p>

          )}
        </div>
        </div> 



 
       {/* <div>
          <h2 className="text-xl font-bold mb-4">Manage Invoice</h2>

      
          {invoice.status === "open" && (
            <PaymentPage invoiceId={invoice.id} amount={invoice.value / 100} />
          )}

      
          {invoice.status === "paid" && (
            <p className="flex gap-2 items-center text-xl font-bold">
              <SquareCheckBig className="w-8 h-auto bg-green-500 rounded-full text-white p-1" />
              Invoice Paid
            </p>
          )}
        </div>
      </div>  */}


        
        
        
        
        <h2 className="font-bold text-lg mb-4">Billing details</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="w-28 flex-shrink-0 font-medium text-sm">Invoice ID</strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="w-28 flex-shrink-0 font-medium text-sm">Invoice Date</strong>
            <span>{new Date(invoice.createTs).toLocaleDateString()}</span>
          </li>
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





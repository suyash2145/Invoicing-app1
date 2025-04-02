"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dailog"

import { useOptimistic } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { Customers, Invoices11 } from '@/database/schema';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import DashboardBtn from "@/components/Dashboardbtn";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { updateStatusAction, deleteInvoiceAction } from "@/app/actions";
import { Bomb, ChevronDown, CreditCard, Ellipsis, Mail, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";


interface InvoiceProps {
    invoice: typeof Invoices11.$inferSelect & {
        customer: typeof Customers.$inferSelect
    }
}
export default function InvoicePage( { invoice }: InvoiceProps) {
   const [currentStatus, setCurrentStatus] = useOptimistic(
    invoice.status, 
    (state,newStatus) => 
   {
    return String(newStatus);
   }
   )
   
   const router = useRouter();
    async function hamdleOnUpdateStatus(formData: FormData){
        const originalStatus = currentStatus;
        setCurrentStatus(formData.get('status'))
        try{
        await updateStatusAction(formData);
        router.refresh();
        } catch(error) {
            console.error("Error updating status:", error);
            setCurrentStatus(originalStatus);
        }
    }


    const handleSendEmail = async () => {
        if (!invoice.customer.email || !invoice.id) {
            alert("Invoice email or ID is missing.");
            return;
        }
    
        const confirmed = confirm(`Send invoice email to ${invoice.customer.email}?`);
        if (!confirmed) return;
    
        try {
            const response = await fetch("/api/send-invoice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: invoice.customer.email, invoiceId: invoice.id }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("Mail sent successfully! ✅");
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("An error occurred while sending email:", error);
            alert("An error occurred. Please try again.");
        }
    };
    
  return (
      <main className="w-full h-full">
        <Container className="mt-12">
            <div className="flex justify-between mb-8">
        <h1 className="flex items-center gap-4 text-3xl font-semibold">
            Invoice { invoice.id }
            <Badge className={cn(
                "rounded-full capitalize",
                currentStatus === 'open' && 'bg-blue-500',
                currentStatus === 'paid' && 'bg-green-600',
                currentStatus === 'void' && 'bg-zinc-600',
                currentStatus === 'uncollectible' && 'bg-red-600',
            )}>
          { currentStatus }
        </Badge>
        </h1>
            <DashboardBtn />
        
                        <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="flex items-center gap-2" variant="outline">
                        Change Status
                              <ChevronDown className="w-4 h-auto"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {AVAILABLE_STATUSES.map(status => {
                        return(
                            <DropdownMenuItem key={status.id}>
                                <form action={hamdleOnUpdateStatus}>
                                    <input type="hidden" name="id" value={invoice.id} />
                                    <input type="hidden" name="status" value={status.id} />
                               <button> { status.label } </button>
                                </form>
                                </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuContent>
                </DropdownMenu>

              
                <Dialog>

                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="flex items-center gap-2" variant="outline">
                        <span className="sr-only">More Options</span>
                        <Ellipsis className="w-4 h-auto"/>
                              <ChevronDown className="w-4 h-auto"/>
                    </Button>
                </DropdownMenuTrigger>
         
                <DropdownMenuContent>

                   {/* edit invoice */}

                       {/* Edit Invoice Option */}
    <DropdownMenuItem asChild>
        <Link
            href={{
                pathname: `/invoices/${invoice.id}/edit`,
                query: {
                    name: invoice.name,
                    email: invoice.email,
                    phone: invoice.phone,
                    value: invoice.value / 100, // Convert from cents to Rs
                    description: invoice.description,
                },
            }}
            className="flex items-center gap-2 w-full hover:bg-gray-100 cursor-pointer"
        >
            <Pencil className="w-4 h-auto"/>
            Edit Invoice
        </Link>
    </DropdownMenuItem>


    {/* <DropdownMenuItem asChild>

    <div onClick={() => handleSendEmail()}>

        <Mail className="w-4 h-auto" />
        Send Email
    </div>
</DropdownMenuItem> */}

{invoice.status !== "paid" && (
  <DropdownMenuItem asChild>
    <div onClick={() => handleSendEmail()} className="flex items-center gap-2 w-full hover:bg-gray-100 cursor-pointer">
      <Mail className="w-4 h-auto" />
      Send Email
    </div>
  </DropdownMenuItem>
)}



   <DropdownMenuItem >
                 <Link href={`/invoices/${invoice.id}/payment`}className="flex items-center gap-2 "> 
                <CreditCard className="w-4 h-auto"/>
                Payment
                </Link>
             </DropdownMenuItem>




                    
                 <DropdownMenuItem >
                 <DialogTrigger asChild>
                 <button className="flex items-center gap-2"> 
                <Bomb className="w-4 h-auto"/>
                Delete Invoice
                </button>
                 </DialogTrigger>
             </DropdownMenuItem>                              
                </DropdownMenuContent>
                </DropdownMenu>
  
  <DialogContent className="bg-white">
    <DialogHeader>
      <DialogTitle className="text-2xl">Delete Invoice?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your invoice
        and remove your data from our servers.
      </DialogDescription>
      <DialogFooter>
      <form className="flex justify-center w-full" action={deleteInvoiceAction}>
      <input type="hidden" name="id" value={invoice.id} />
      <Button variant="destructive" className="flex items-center gap-2"> 
                <Bomb className="w-4 h-auto"/>
                Delete Invoice
                </Button>
      </form>
      </DialogFooter>
    </DialogHeader>
  </DialogContent>
</Dialog>

        
        </div>

        <p className="text-3xl mb-3">
        Rs { (invoice.value / 100).toFixed(2) }
        </p>

        <p className="text-lg mb-8">
          { invoice.description }
        </p>
        <h2 className="font-bold text-lg mb-4">
            Billing details
        </h2>

        <ul className="grid gap-2">
            <li className="flex gap-4">
                <strong className="lock w-28 flex-shrink-0 font-medium text-sm">Invoice ID</strong>
                <span>
                    { invoice.id }
                </span>
            </li>
            <li className="flex gap-4">
                <strong className="lock w-28 flex-shrink-0 font-medium text-sm">Invoice Date</strong>
                <span>
                { new Date(invoice.createTs).toLocaleDateString("en-US")}
                </span>
            </li>
            <li className="flex gap-4">
                <strong className="lock w-28 flex-shrink-0 font-medium text-sm">Billing Name</strong>
                <span>
                    { invoice.customer.name}
                </span>
            </li>
            <li className="flex gap-4">
                <strong className="lock w-28 flex-shrink-0 font-medium text-sm">Phone no</strong>
                <span>{invoice.phone}</span>
            </li>
            <li className="flex gap-4">
                <strong className="lock w-28 flex-shrink-0 font-medium text-sm">Billing Email</strong>
                <span>
                    {invoice.customer.email}
                </span>
            </li>
        </ul>

        </Container>
         
            </main>            
  );
}



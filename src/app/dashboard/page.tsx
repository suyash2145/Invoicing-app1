import { CirclePlus } from 'lucide-react';
import { auth } from '@clerk/nextjs/server'; 

import { database } from '@/database';
import { Customers, Invoices11 } from '@/database/schema';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { eq, and, isNull } from 'drizzle-orm';


export default async function Home() {
  const { userId, orgId } = await auth();

  if (!userId)
    return;


let results;

  if ( orgId ) {
    
   results = await database.select()
  .from(Invoices11)
  // .where(eq(Invoices11.OrganizationId, orgId))
  .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
  .where(eq(Invoices11.OrganizationId, orgId))
  // .orderBy(Invoices11.id);
  console.log('results', results)
  }else{
    results = await database.select()
    .from(Invoices11)
    // .where(eq(Invoices11.userId, userId))
    .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
    .where(
      and(
      eq(Invoices11.userId, userId),
      isNull(Invoices11.OrganizationId)
    )
    )
    // .orderBy(Invoices11.id);
    console.log('results', results)

  }

  // const results = await database.select()
  // .from(Invoices11)
  // .where(eq(Invoices11.userId, userId))
  // .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
  // .orderBy(Invoices11.id);
  // console.log('results', results)

  const invoices = results?.map(({ invoices11, customers}) => {
   return{
    ...invoices11,
    customer: customers
   }
  })

  return (
    
      <main className="h-full">
           <Container>
            <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-semibold">
            Invoices
        </h1>
        <p>
            <Button className="inline-flex gap-2" variant="link" asChild>
                <Link href="/invoices/new">
                <CirclePlus className="h-4 w-4" />
                Create Invoice
                </Link>
            </Button>
        </p>
        </div>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
             <TableRow>
      <TableHead className="w-[100px] p-4">
        Date
        </TableHead>
      <TableHead className="p-4">
        Customer
        </TableHead>
      <TableHead className="p-4">
        Email
        </TableHead>
        <TableHead className="p-4">
        Phone No
        </TableHead>
      <TableHead className="text-center">
        Status
        </TableHead>
      <TableHead className="text-right">
        Value
        </TableHead>
              </TableRow>
            </TableHeader>
       <TableBody>
        {invoices.map(result => {
          return (
            <TableRow key={result.id}>
      <TableCell className="font-medium text-left p-0">
        <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
  
        { new Date(result.createTs).toLocaleDateString()}
        </Link>
        </TableCell>
      <TableCell className="text-left p-0">
        <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
        { result.customer.name}
        </Link>
        </TableCell>
      <TableCell className="text-left p-0">
        <Link className="block p-4" href={`/invoices/${result.id}`}>
            { result.customer.email}
        </Link>
        </TableCell>
        <TableCell className="text-left p-0">
        <Link className="block p-4" href={`/invoices/${result.id}`}>
            { result.customer.phone}
        </Link>
        </TableCell>
      <TableCell className="text-center p-0">
      <Link className="block p-4" href={`/invoices/${result.id}`}>
      <Badge className={cn(
                      "rounded-full capitalize",
                      result.status === 'open' && 'bg-blue-500',
                      result.status === 'paid' && 'bg-green-600',
                      result.status === 'void' && 'bg-zinc-600',
                      result.status === 'uncollectible' && 'bg-red-600',
                  )}>
                { result.status }
              </Badge>
        </Link>
        </TableCell>
      <TableCell className="text-right p-0">
        <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
        Rs { (result.value / 100).toFixed(2) }
        </Link>
        
        </TableCell>
        </TableRow>
          )
        })}
       </TableBody>
           </Table>
           </Container>
            </main>
            
  );
}

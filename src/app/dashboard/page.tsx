import { CirclePlus } from 'lucide-react';

import { database } from '@/database';
import { Invoices } from '@/database/schema';

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
import Link from 'next/link';
import { cn } from '@/lib/utils';


export default async function Home() {
  const results = await database.select().from(Invoices);
  console.log('results', results)
  return (
    
      <main className="flex flex-col justify-center h-full text-center gap-6 max-w-5xl mx-auto my-12">
            <div className="flex justify-between">
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
        {results.map(result => {
          return (
            <TableRow key={result.id}>
      <TableCell className="font-medium text-left p-0">
        <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
  
        { new Date(result.createTs).toLocaleDateString()}
        </Link>
        </TableCell>
      <TableCell className="text-left p-0">
        <Link href={`/invoices/${result.id}`} className="block p-4 font-semibold">
        Suraj Kumar
        </Link>
        </TableCell>
      <TableCell className="text-left p-0">
        <Link className="block p-4" href={`/invoices/${result.id}`}>
            Surajk2332@gmail.com
        </Link>
        </TableCell>
        <TableCell className="text-left p-0">
        <Link className="block p-4" href={`/invoices/${result.id}`}>
            9080706050
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

            </main>
            
  );
}

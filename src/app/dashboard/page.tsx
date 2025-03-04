
import { CirclePlus, Files } from 'lucide-react';
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
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { eq, and, isNull } from 'drizzle-orm';

export default async function Home() {
  const { userId, orgId } = await auth();
  if (!userId) return;
  
  let results;
  if (orgId) {
    results = await database.select()
      .from(Invoices11)
      .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
      .where(eq(Invoices11.OrganizationId, orgId));
  } else {
    results = await database.select()
      .from(Invoices11)
      .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
      .where(and(eq(Invoices11.userId, userId), isNull(Invoices11.OrganizationId)));
  }

  const invoices = results?.map(({ invoices11, customers }) => ({
    ...invoices11,
    customer: customers
  }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white py-12 px-6">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Invoices</h1>
         
          <div className="flex items-center gap-4">

          <Link href="/Summary">
    <Button className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-transform transform hover:scale-105">
      <Files className="h-5 w-5"/>
      View Summary
    </Button>
  </Link>

          <Button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-transform transform hover:scale-105" asChild>
            <Link href="/invoices/new">
              <CirclePlus className="h-5 w-5" />
              Create Invoice
            </Link>
          </Button>
        </div>
        </div>

        
        <div className="overflow-hidden bg-white bg-opacity-10 backdrop-blur-md shadow-xl rounded-lg p-6">
          <Table className="w-full text-white">
            <TableCaption className="text-gray-300">A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow className="border-b border-gray-700 text-gray-300">
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone No</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(result => (
                <TableRow key={result.id} className="hover:bg-white hover:bg-opacity-20 transition duration-300">
                  <TableCell>
                    <Link href={`/invoices/${result.id}`} className="text-blue-300 hover:underline">
                      {new Date(result.createTs).toLocaleDateString()}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/invoices/${result.id}`} className="text-blue-300 hover:underline">
                      {result.customer.name}
                    </Link>
                  </TableCell>
                  <TableCell>{result.customer.email}</TableCell>
                  <TableCell>{result.customer.phone}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={cn(
                      "rounded-full capitalize px-3 py-1 text-sm font-medium",
                      result.status === 'open' && 'bg-blue-500',
                      result.status === 'paid' && 'bg-green-500',
                      result.status === 'void' && 'bg-gray-600',
                      result.status === 'uncollectible' && 'bg-red-500',
                    )}>
                      {result.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    Rs {(result.value / 100).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </main>
  );
}


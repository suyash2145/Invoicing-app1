// import { auth } from "@clerk/nextjs/server";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";
// import { eq, and, isNull } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const { userId, orgId } = await auth();
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   let results;
//   if (orgId) {
//     results = await database.select()
//       .from(Invoices11)
//       .where(eq(Invoices11.OrganizationId, orgId));
//   } else {
//     results = await database.select()
//       .from(Invoices11)
//       .where(and(eq(Invoices11.userId, userId), isNull(Invoices11.OrganizationId)));
//   }

//   const totalInvoices = results.length;
//   const totalPaidAmount = results
//     .filter(invoice => invoice.status === "paid")
//     .reduce((sum, invoice) => sum + invoice.value, 0);
//   const remainingAmount = results
//     .filter(invoice => invoice.status !== "paid")
//     .reduce((sum, invoice) => sum + invoice.value, 0);

//   return NextResponse.json({ totalInvoices, totalPaidAmount, remainingAmount });
// }


import { auth } from "@clerk/nextjs/server";
import { database } from "@/database";
import { Invoices11 } from "@/database/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId, orgId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let results;
  if (orgId) {
    results = await database.select()
      .from(Invoices11)
      .where(eq(Invoices11.OrganizationId, orgId));
  } else {
    results = await database.select()
      .from(Invoices11)
      .where(and(eq(Invoices11.userId, userId), isNull(Invoices11.OrganizationId)));
  }

  const totalInvoices = results.length;
  const totalPaidAmount = results
    .filter(invoice => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.value, 0);
  const remainingAmount = results
    .filter(invoice => invoice.status !== "paid")
    .reduce((sum, invoice) => sum + invoice.value, 0);

  return NextResponse.json({ totalInvoices, totalPaidAmount, remainingAmount });
}

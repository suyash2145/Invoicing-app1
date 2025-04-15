
import { auth } from "@clerk/nextjs/server";
import { database } from "@/database";
import { Invoices11 } from "@/database/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const authData = await auth();
    const userId = authData.userId;
    const orgId = authData.orgId;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Fetch invoices based on Organization or User
    let results;
    if (orgId) {
      results = await database
        .select()
        .from(Invoices11)
        .where(eq(Invoices11.OrganizationId, orgId));
    } else {
      results = await database
        .select()
        .from(Invoices11)
        .where(and(eq(Invoices11.userId, userId), isNull(Invoices11.OrganizationId)));
    }

    const totalInvoices = results.length;

    // ✅ Total Amount (sum of all invoices)
    const totalAmount = results.reduce((sum, invoice) => sum + invoice.value, 0);

    // ✅ Categorize invoice status counts and amounts in one pass
    const statusCounts = {
      paid: 0,
      unpaid: 0,
      uncollectible: 0,
      void: 0,
    };

    let totalPaidAmount = 0;
    let totalUncollectibleAmount = 0;
    let totalVoidAmount = 0;
    let remainingAmount = 0;

    for (const invoice of results) {
      switch (invoice.status) {
        case "paid":
          statusCounts.paid++;
          totalPaidAmount += invoice.value;
          break;
        case "uncollectible":
          statusCounts.uncollectible++;
          totalUncollectibleAmount += invoice.value;
          break;
        case "void":
          statusCounts.void++;
          totalVoidAmount += invoice.value;
          break;
        default:
          statusCounts.unpaid++;
          remainingAmount += invoice.value;
      }
    }

    return NextResponse.json({
      totalInvoices,
      totalAmount,
      totalPaidAmount,
      remainingAmount,
      totalUncollectibleAmount,
      totalVoidAmount,

      // ✅ Bar graph data
      invoiceBreakdown: [
        { name: "Paid", count: statusCounts.paid },
        { name: "Unpaid", count: statusCounts.unpaid },
        { name: "Uncollectible", count: statusCounts.uncollectible },
        { name: "Void", count: statusCounts.void },
      ],
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

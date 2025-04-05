// // import { auth } from "@clerk/nextjs/server";
// // import { database } from "@/database";
// // import { Invoices11 } from "@/database/schema";
// // import { eq, and, isNull } from "drizzle-orm";
// // import { NextResponse } from "next/server";

// // export async function GET() {
// //   const { userId, orgId } = await auth();
// //   if (!userId) {
// //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //   }

// //   let results;
// //   if (orgId) {
// //     results = await database.select()
// //       .from(Invoices11)
// //       .where(eq(Invoices11.OrganizationId, orgId));
// //   } else {
// //     results = await database.select()
// //       .from(Invoices11)
// //       .where(and(eq(Invoices11.userId, userId), isNull(Invoices11.OrganizationId)));
// //   }

// //   const totalInvoices = results.length;
// //   const totalPaidAmount = results
// //     .filter(invoice => invoice.status === "paid")
// //     .reduce((sum, invoice) => sum + invoice.value, 0);
// //   const remainingAmount = results
// //     .filter(invoice => invoice.status !== "paid")
// //     .reduce((sum, invoice) => sum + invoice.value, 0);

// //   return NextResponse.json({ totalInvoices, totalPaidAmount, remainingAmount });
// // }


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

// import { auth } from "@clerk/nextjs/server";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";
// import { eq, and, isNull } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const authData = await auth();
//     const userId = authData.userId;
//     const orgId = authData.orgId;

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     let results;
//     if (orgId) {
//       results = await database
//         .select()
//         .from(Invoices11)
//         .where(eq(Invoices11.OrganizationId, orgId));
//     } else {
//       results = await database
//         .select()
//         .from(Invoices11)
//         .where(and(eq(Invoices11.userId, userId), isNull(Invoices11.OrganizationId)));
//     }

//     const totalInvoices = results.length;
//     const totalPaidAmount = results
//       .filter((invoice) => invoice.status === "paid")
//       .reduce((sum, invoice) => sum + invoice.value, 0);
//     const remainingAmount = results
//       .filter((invoice) => invoice.status !== "paid")
//       .reduce((sum, invoice) => sum + invoice.value, 0);

//     return NextResponse.json({ totalInvoices, totalPaidAmount, remainingAmount });
//   } catch (error) {
//     console.error("Error fetching invoices:", error);
//     return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
//   }
// }


// import { auth } from "@clerk/nextjs/server";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";
// import { eq, and, isNull } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const authData = await auth();
//     const userId = authData.userId;
//     const orgId = authData.orgId;

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ Fetch invoices based on Organization or User
//     let results;
//     if (orgId) {
//       results = await database
//         .select()
//         .from(Invoices11)
//         .where(eq(Invoices11.OrganizationId, orgId));
//     } else {
//       results = await database
//         .select()
//         .from(Invoices11)
//         .where(and(eq(Invoices11.userId, userId), isNull(Invoices11.OrganizationId)));
//     }

//     const totalInvoices = results.length;
    
//     // ✅ Total Paid Amount (status === "paid")
//     const totalPaidAmount = results
//       .filter((invoice) => invoice.status === "paid")
//       .reduce((sum, invoice) => sum + invoice.value, 0);

//     // ✅ Total Remaining Amount (status !== "paid")
//     const remainingAmount = results
//       .filter((invoice) => invoice.status !== "paid" && invoice.status !== "uncollectible")
//       .reduce((sum, invoice) => sum + invoice.value, 0);

//     // ✅ Total Uncollectible Amount (status === "uncollectible")
//     const totalUncollectibleAmount = results
//       .filter((invoice) => invoice.status === "uncollectible")
//       .reduce((sum, invoice) => sum + invoice.value, 0);

//     return NextResponse.json({ 
//       totalInvoices, 
//       totalPaidAmount, 
//       remainingAmount, 
//       totalUncollectibleAmount // ✅ Added in response
//     });

//   } catch (error) {
//     console.error("Error fetching invoices:", error);
//     return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
//   }
// }


// import { auth } from "@clerk/nextjs/server";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";
// import { eq, and, isNull } from "drizzle-orm";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const authData = await auth();
//     const userId = authData.userId;
//     const orgId = authData.orgId;

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ Fetch invoices based on Organization or User
//     let results;
//     if (orgId) {
//       results = await database
//         .select()
//         .from(Invoices11)
//         .where(eq(Invoices11.OrganizationId, orgId));
//     } else {
//       results = await database
//         .select()
//         .from(Invoices11)
//         .where(and(eq(Invoices11.userId, userId), isNull(Invoices11.OrganizationId)));
//     }

//     const totalInvoices = results.length;

//     // ✅ Total Amount (sum of all invoices)
//     const totalAmount = results.reduce((sum, invoice) => sum + invoice.value, 0);

//     // ✅ Total Paid Amount (status === "paid")
//     const totalPaidAmount = results
//       .filter((invoice) => invoice.status === "paid")
//       .reduce((sum, invoice) => sum + invoice.value, 0);

//     // ✅ Total Remaining Amount (status !== "paid" and !== "uncollectible")
//     const remainingAmount = results
//       .filter((invoice) => invoice.status !== "paid" && invoice.status !== "uncollectible")
//       .reduce((sum, invoice) => sum + invoice.value, 0);

//     // ✅ Total Uncollectible Amount (status === "uncollectible")
//     const totalUncollectibleAmount = results
//       .filter((invoice) => invoice.status === "uncollectible")
//       .reduce((sum, invoice) => sum + invoice.value, 0);

//     return NextResponse.json({ 
//       totalInvoices, 
//       totalAmount, // ✅ Added total amount 
//       totalPaidAmount, 
//       remainingAmount, 
//       totalUncollectibleAmount 
//     });

//   } catch (error) {
//     console.error("Error fetching invoices:", error);
//     return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
//   }
// }



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

    // ✅ Total Paid Amount
    const totalPaidAmount = results
      .filter((invoice) => invoice.status === "paid")
      .reduce((sum, invoice) => sum + invoice.value, 0);

    // ✅ Remaining (open + other non-paid + non-uncollectible + non-void)
    const remainingAmount = results
      .filter(
        (invoice) =>
          invoice.status !== "paid" &&
          invoice.status !== "uncollectible" &&
          invoice.status !== "void"
      )
      .reduce((sum, invoice) => sum + invoice.value, 0);

    // ✅ Uncollectible
    const totalUncollectibleAmount = results
      .filter((invoice) => invoice.status === "uncollectible")
      .reduce((sum, invoice) => sum + invoice.value, 0);

    // ✅ Refund / Void
    const totalVoidAmount = results
      .filter((invoice) => invoice.status === "void")
      .reduce((sum, invoice) => sum + invoice.value, 0);

    return NextResponse.json({
      totalInvoices,
      totalAmount,
      totalPaidAmount,
      remainingAmount,
      totalUncollectibleAmount,
      totalVoidAmount, // ✅ Refund
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

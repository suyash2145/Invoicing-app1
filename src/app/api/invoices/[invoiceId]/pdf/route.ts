import { NextResponse } from "next/server";
import { database, Invoices11 } from "@/database";
import { eq } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const invoiceId = parseInt(id);

    if (isNaN(invoiceId)) {
      return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
    }

    console.log("Fetching Invoice with ID:", invoiceId);

    // Fetch invoice with customer details directly from Invoices11
    const invoice = await database
      .select()
      .from(Invoices11)
      .where(eq(Invoices11.id, invoiceId))
      .execute();

    if (!invoice || invoice.length === 0) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(invoice[0]); // Return first matching invoice
  } catch (error: unknown) {
    console.error("Error fetching invoice:", error);
    return NextResponse.json({ error: "Failed to fetch invoice" }, { status: 500 });
  }
}







// import { NextResponse } from "next/server";
// import { database, Invoices11 } from "@/database";
// import { eq } from "drizzle-orm";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const { id } = params;

//     if (!id) {
//       return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
//     }

//     const invoice = await database
//   .select({
//     id: Invoices11.id,
//     name: Invoices11.name,
//     email: Invoices11.email,
//     value: Invoices11.value,
//     phone: Invoices11.phone,
//     description: Invoices11.description // Ensure this is selected
//   })
//   .from(Invoices11)
//   .where(eq(Invoices11.id, parseInt(id)))
//   .execute();

//     // Log the fetched data to debug
//     console.log("Fetched Invoice:", invoice);

//     if (!invoice || invoice.length === 0) {
//       return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//     }

//     return NextResponse.json(invoice[0]); // Return the first matching invoice
//   } catch (error) {
//     console.error("Error fetching invoice:", error);
//     return NextResponse.json({ error: "Failed to fetch invoice" }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";
// import { database, Invoices11 } from "@/database";
// import { eq } from "drizzle-orm";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const { id } = params;

//     // Validate ID
//     const invoiceId = parseInt(id);
//     if (isNaN(invoiceId)) {
//       return NextResponse.json({ error: "Invalid Invoice ID" }, { status: 400 });
//     }

//     // Fetch invoice details
//     const invoice = await database
//       .select({
//         id: Invoices11.id,
//         name: Invoices11.name,
//         email: Invoices11.email,
//         value: Invoices11.value,
//         phone: Invoices11.phone,
//         description: Invoices11.description, // Ensure this is selected
//       })
//       .from(Invoices11)
//       .where(eq(Invoices11.id, Number(invoiceId)))
//       .execute();

//     console.log("Fetched Invoice:", invoice); // Debugging

//     // Check if invoice exists
//     if (!invoice || invoice.length === 0) {
//       return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//     }

//     return NextResponse.json(invoice[0]); // Return the first matching invoice
//   } catch (error: unknown) {
//     console.error("Error fetching invoice:", error);

//     let errorMessage = "Failed to fetch invoice";
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }

//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }



// import { NextResponse } from "next/server";
// import { database, Invoices11 } from "@/database";
// import { eq } from "drizzle-orm";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const { id } = params;

//     if (!id) {
//       return NextResponse.json({ error: "Invoice ID is required" }, { status: 400 });
//     }

//     // Fetch invoice from database
//     const invoice = await database
//       .select({
//         id: Invoices11.id,
//         value: Invoices11.value,
//         description: Invoices11.description,
//         name: Invoices11.name,
//         email: Invoices11.email,
//         contact: Invoices11.phone, // Ensure this field exists in your database
//       })
//       .from(Invoices11)
//       .where(eq(Invoices11.id, Number(id)))
//       .execute();

//     console.log("Fetched Invoice:", invoice);

//     if (!invoice || invoice.length === 0) {
//       return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
//     }

//     // Transform response to match expected structure
//     const responseData = {
//       id: invoice[0].id,
//       value: invoice[0].value,
//       description: invoice[0].description,
//       customer: {
//         name: invoice[0].name ?? null,
//         email: invoice[0].email ?? null,
//         contact: invoice[0].contact ?? null, // Include this if available
//       },
//     };

//     return NextResponse.json(responseData);
//   } catch (error) {
//     console.error("Error fetching invoice:", error);
//     return NextResponse.json({ error: "Failed to fetch invoice" }, { status: 500 });
//   }
// }

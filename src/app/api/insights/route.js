// import { NextResponse } from "next/server";
// // import { format, addDays, isPast, differenceInDays } from "date-fns";
// // import { eq, and, ne, count, min, max, desc } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// export async function POST(req) {
//   try {
//     const { question } = await req.json();

//     const invoices = await database.select().from(Invoices11);

//     const total = invoices.length;
//     const paid = invoices.filter(i => i.status === "paid").length;
//     const unpaid = invoices.filter(i => i.status === "unpaid").length;
//     const voided = invoices.filter(i => i.status === "void").length;
//     const uncollectible = invoices.filter(i => i.status === "uncollectible").length;

//     const values = invoices.map(i => i.value);
//     const minValue = Math.min(...values);
//     const maxValue = Math.max(...values);

//     const nameCountMap = {};
//     for (const i of invoices) {
//       nameCountMap[i.name] = (nameCountMap[i.name] || 0) + 1;
//     }

//     const sortedNames = Object.entries(nameCountMap).sort((a, b) => b[1] - a[1]);
//     const mostInvoices = sortedNames[0];
//     const leastInvoices = sortedNames[sortedNames.length - 1];

//     const lowerQ = question.toLowerCase();
//     let reply = "";

//     if (lowerQ.includes("total")) {
//       reply = `📊 Total invoices: ${total}`;
//     } else if (lowerQ.includes("paid")) {
//       reply = `✅ Paid invoices: ${paid}`;
//     } else if (lowerQ.includes("unpaid")) {
//       reply = `🕗 Unpaid invoices: ${unpaid}`;
//     } else if (lowerQ.includes("void")) {
//       reply = `🚫 Voided invoices: ${voided}`;
//     } else if (lowerQ.includes("uncollectible")) {
//       reply = `❌ Uncollectible invoices: ${uncollectible}`;
//     } else if (lowerQ.includes("min") || lowerQ.includes("minimum")) {
//       reply = `🔻 Minimum invoice value: ₹${(minValue / 100).toFixed(2)}`;
//     } else if (lowerQ.includes("max") || lowerQ.includes("maximum")) {
//       reply = `🔺 Maximum invoice value: ₹${(maxValue / 100).toFixed(2)}`;
//     } else if (lowerQ.includes("most") || lowerQ.includes("highest")) {
//       reply = `🏆 Most invoices: ${mostInvoices[0]} with ${mostInvoices[1]} invoice(s)`;
//     } else if (lowerQ.includes("least") || lowerQ.includes("lowest")) {
//       reply = `📉 Least invoices: ${leastInvoices[0]} with ${leastInvoices[1]} invoice(s)`;
//     } else if (lowerQ.includes("how many") && lowerQ.includes("invoices")) {
//       const name = lowerQ.split("how many invoices does ")[1]?.split(" ")[0];
//       const found = Object.entries(nameCountMap).find(([n]) => n.toLowerCase() === name);
//       reply = found ? `${found[0]} has ${found[1]} invoice(s)` : `No data for that name.`;
//     } else {
//       reply = `Hi! 👋 I can help with:
// - Total, paid, unpaid, void, and uncollectible invoice counts
// - Min and max invoice values
// - Who has most/least invoices
// - Invoice count for a name
// Try asking things like "How many unpaid invoices?" or "What's the maximum amount?"`;
//     }

//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("Dashboard chat error:", error);
//     return NextResponse.json({ reply: "💥 Error getting dashboard insights." });
//   }
// }

// import { NextResponse } from "next/server";
// // import { format, addDays, isPast, differenceInDays } from "date-fns";
// // import { eq, and, ne, count, min, max, desc } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// // export async function POST(req) {
// //   try {
// //     const { question } = await req.json();

// //     const invoices = await database.select().from(Invoices11);

// //     const total = invoices.length;
// //     const paid = invoices.filter(i => i.status === "paid").length;
// //     const unpaid = invoices.filter(i => i.status === "unpaid").length;
// //     const voided = invoices.filter(i => i.status === "void").length;
// //     const uncollectible = invoices.filter(i => i.status === "uncollectible").length;

// //     const values = invoices.map(i => i.value);
// //     const minValue = Math.min(...values);
// //     const maxValue = Math.max(...values);

// //     const nameCountMap = {};
// //     for (const i of invoices) {
// //       nameCountMap[i.name] = (nameCountMap[i.name] || 0) + 1;
// //     }

// //     const sortedNames = Object.entries(nameCountMap).sort((a, b) => b[1] - a[1]);
// //     const mostInvoices = sortedNames[0];
// //     const leastInvoices = sortedNames[sortedNames.length - 1];

// //     const lowerQ = question.toLowerCase();
// //     let reply = "";

// //     if (lowerQ.includes("total")) {
// //       reply = `📊 Total invoices: ${total}`;
// //     } else if (lowerQ.includes("paid")) {
// //       reply = `✅ Paid invoices: ${paid}`;
// //     } else if (lowerQ.includes("unpaid")) {
// //       reply = `🕗 Unpaid invoices: ${unpaid}`;
// //     } else if (lowerQ.includes("void")) {
// //       reply = `🚫 Voided invoices: ${voided}`;
// //     } else if (lowerQ.includes("uncollectible")) {
// //       reply = `❌ Uncollectible invoices: ${uncollectible}`;
// //     } else if (lowerQ.includes("min") || lowerQ.includes("minimum")) {
// //       reply = `🔻 Minimum invoice value: ₹${(minValue / 100).toFixed(2)}`;
// //     } else if (lowerQ.includes("max") || lowerQ.includes("maximum")) {
// //       reply = `🔺 Maximum invoice value: ₹${(maxValue / 100).toFixed(2)}`;
// //     } else if (lowerQ.includes("most") || lowerQ.includes("highest")) {
// //       reply = `🏆 Most invoices: ${mostInvoices[0]} with ${mostInvoices[1]} invoice(s)`;
// //     } else if (lowerQ.includes("least") || lowerQ.includes("lowest")) {
// //       reply = `📉 Least invoices: ${leastInvoices[0]} with ${leastInvoices[1]} invoice(s)`;
// //     } else if (lowerQ.includes("how many") && lowerQ.includes("invoices")) {
// //       const name = lowerQ.split("how many invoices does ")[1]?.split(" ")[0];
// //       const found = Object.entries(nameCountMap).find(([n]) => n.toLowerCase() === name);
// //       reply = found ? `${found[0]} has ${found[1]} invoice(s)` : `No data for that name.`;
// //     } else {
// //       reply = `Hi! 👋 I can help with:
// // - Total, paid, unpaid, void, and uncollectible invoice counts
// // - Min and max invoice values
// // - Who has most/least invoices
// // - Invoice count for a name
// // Try asking things like "How many unpaid invoices?" or "What's the maximum amount?"`;
// //     }

// //     return NextResponse.json({ reply });
// //   } catch (error) {
// //     console.error("Dashboard chat error:", error);
// //     return NextResponse.json({ reply: "💥 Error getting dashboard insights." });
// //   }
// // }

// export async function POST(req) {
//     try {
//       const { question, OrganizationId } = await req.json();
  
//       if (!OrganizationId) {
//         return NextResponse.json({ reply: "❗ Missing OrganizationId." });
//       }
  
//       const invoices = await database
//         .select()
//         .from(Invoices11)
//         .where(eq(Invoices11.OrganizationId, OrganizationId)); // <-- filter by org
  
//       if (!invoices.length) {
//         return NextResponse.json({ reply: "📭 No invoices found for this organization." });
//       }
  
//       const total = invoices.length;
//       const paid = invoices.filter(i => i.status === "paid").length;
//       const unpaid = invoices.filter(i => i.status === "unpaid").length;
//       const voided = invoices.filter(i => i.status === "void").length;
//       const uncollectible = invoices.filter(i => i.status === "uncollectible").length;
  
//       const values = invoices.map(i => i.value);
//       const minValue = Math.min(...values);
//       const maxValue = Math.max(...values);
  
//       const nameCountMap = {};
//       for (const i of invoices) {
//         nameCountMap[i.name] = (nameCountMap[i.name] || 0) + 1;
//       }
  
//       const sortedNames = Object.entries(nameCountMap).sort((a, b) => b[1] - a[1]);
//       const mostInvoices = sortedNames[0];
//       const leastInvoices = sortedNames[sortedNames.length - 1];
  
//       const lowerQ = question.toLowerCase();
//       let reply = "";
  
//       if (lowerQ.includes("total")) {
//         reply = `📊 Total invoices: ${total}`;
//       } else if (lowerQ.includes("paid")) {
//         reply = `✅ Paid invoices: ${paid}`;
//       } else if (lowerQ.includes("unpaid")) {
//         reply = `🕗 Unpaid invoices: ${unpaid}`;
//       } else if (lowerQ.includes("void")) {
//         reply = `🚫 Voided invoices: ${voided}`;
//       } else if (lowerQ.includes("uncollectible")) {
//         reply = `❌ Uncollectible invoices: ${uncollectible}`;
//       } else if (lowerQ.includes("min") || lowerQ.includes("minimum")) {
//         reply = `🔻 Minimum invoice value: ₹${(minValue / 100).toFixed(2)}`;
//       } else if (lowerQ.includes("max") || lowerQ.includes("maximum")) {
//         reply = `🔺 Maximum invoice value: ₹${(maxValue / 100).toFixed(2)}`;
//       } else if (lowerQ.includes("most") || lowerQ.includes("highest")) {
//         reply = `🏆 Most invoices: ${mostInvoices[0]} with ${mostInvoices[1]} invoice(s)`;
//       } else if (lowerQ.includes("least") || lowerQ.includes("lowest")) {
//         reply = `📉 Least invoices: ${leastInvoices[0]} with ${leastInvoices[1]} invoice(s)`;
//       } else if (lowerQ.includes("how many") && lowerQ.includes("invoices")) {
//         const name = lowerQ.split("how many invoices does ")[1]?.split(" ")[0];
//         const found = Object.entries(nameCountMap).find(([n]) => n.toLowerCase() === name);
//         reply = found ? `${found[0]} has ${found[1]} invoice(s)` : `No data for that name.`;
//       } else {
//         reply = `Hi! 👋 I can help with:
//   - Total, paid, unpaid, void, and uncollectible invoice counts
//   - Min and max invoice values
//   - Who has most/least invoices
//   - Invoice count for a name
//   Try asking things like "How many unpaid invoices?" or "What's the maximum amount?"`;
//       }
  
//       return NextResponse.json({ reply });
//     } catch (error) {
//       console.error("Dashboard chat error:", error);
//       return NextResponse.json({ reply: "💥 Error getting dashboard insights." });
//     }
//   }
  

import { NextResponse } from "next/server";
import { database } from "@/database";
import { Invoices11 } from "@/database/schema";
import { eq } from "drizzle-orm"; // Ensure you import `eq` for filtering

export async function POST(req) {
  try {
    const body = await req.json();
    const { question, OrganizationId } = body;

    if (!OrganizationId) {
      return NextResponse.json({ reply: "❗ Missing OrganizationId." });
    }

    const invoices = await database
      .select()
      .from(Invoices11)
      .where(eq(Invoices11.OrganizationId, OrganizationId));

    if (!invoices.length) {
      return NextResponse.json({ reply: "📭 No invoices found for this organization." });
    }

    const total = invoices.length;
    const paid = invoices.filter(i => i.status === "paid").length;
    const open = invoices.filter(i => i.status === "open").length;
    const voided = invoices.filter(i => i.status === "void").length;
    const uncollectible = invoices.filter(i => i.status === "uncollectible").length;

    const values = invoices.map(i => i.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const nameCountMap = {};
    for (const i of invoices) {
      nameCountMap[i.name] = (nameCountMap[i.name] || 0) + 1;
    }

    const sortedNames = Object.entries(nameCountMap).sort((a, b) => b[1] - a[1]);
    const mostInvoices = sortedNames[0];
    const leastInvoices = sortedNames[sortedNames.length - 1];

    const lowerQ = question.toLowerCase();
    let reply = "";

    if (lowerQ.includes("total")) {
      reply = `📊 Total invoices: ${total}`;
    } else if (lowerQ.includes("paid")) {
      reply = `✅ Paid invoices: ${paid}`;
    } else if (lowerQ.includes("unpay")) {
      reply = `🕗 Unpaid invoices: ${open}`;
    } else if (lowerQ.includes("void")) {
      reply = `🚫 Voided invoices: ${voided}`;
    } else if (lowerQ.includes("uncollectible")) {
      reply = `❌ Uncollectible invoices: ${uncollectible}`;
    } else if (lowerQ.includes("min") || lowerQ.includes("minimum")) {
      reply = `🔻 Minimum invoice value: ₹${(minValue / 100).toFixed(2)}`;
    } else if (lowerQ.includes("max") || lowerQ.includes("maximum")) {
      reply = `🔺 Maximum invoice value: ₹${(maxValue / 100).toFixed(2)}`;
    } else if (lowerQ.includes("most") || lowerQ.includes("highest")) {
      reply = `🏆 Most invoices: ${mostInvoices[0]} with ${mostInvoices[1]} invoice(s)`;
    } else if (lowerQ.includes("least") || lowerQ.includes("lowest")) {
      reply = `📉 Least invoices: ${leastInvoices[0]} with ${leastInvoices[1]} invoice(s)`;
    } else if (lowerQ.includes("how many") && lowerQ.includes("invoices")) {
      const parts = lowerQ.split("how many invoices for ");
    //   const name = parts[1]?.split(" ")[0];
    const name = parts[1]?.trim().toLowerCase();

    //   const found = Object.entries(nameCountMap).find(([n]) => n.toLowerCase() === name);
    const found = Object.entries(nameCountMap).find(
        ([n]) => n.toLowerCase() === name
      );
        
    reply = found ? `${found[0]} has ${found[1]} invoice(s)` : `No data for that name.`;
    } else {
      reply = `Hi! 👋 I can help with:
- Total, paid, unpaid, void, and uncollectible invoice counts
- Min and max invoice values
- Who has most/least invoices
- Invoice count for a name
Try asking things like "How many unpaid invoices?" or "What's the maximum amount?"`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Dashboard chat error:", error);
    return NextResponse.json({ reply: "💥 Error getting dashboard insights." });
  }
}

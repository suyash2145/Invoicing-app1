// // import { NextResponse } from "next/server";
// // import OpenAI from "openai";
// // import { database } from "@/database"; // your Xata client

// // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // export async function POST(req) {
// //   const { question } = await req.json();

// //   // Extract invoice ID from the question using regex
// //   const idMatch = question.match(/INV\d+/i); // matches patterns like "INV123"
// //   const invoiceId = idMatch ? idMatch[0].toUpperCase() : null;

// //   let context = "No invoice ID found in the question.";
// //   let invoice;

// //   if (invoiceId) {
// //     invoice = await database
// //       .select()
// //       .from("Invoices11")
// //       .where({ id: invoiceId })
// //       .getFirst();

// //     if (invoice) {
// //       context = `Invoice ${invoice.id} is due on ${invoice.dueDate} for ₹${invoice.value / 100}`;
// //     } else {
// //       context = `Invoice with ID ${invoiceId} was not found.`;
// //     }
// //   }

// //   const chat = await openai.chat.completions.create({
// //     model: "gpt-4",
// //     messages: [
// //       { role: "system", content: "You are a helpful invoice assistant." },
// //       { role: "user", content: `The user asked: "${question}". ${context}` },
// //     ],
// //   });

// //   return NextResponse.json({ reply: chat.choices[0].message.content });
// // }
// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import { database } from "@/database"; // your Xata client

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function POST(req) {
//   try {
//     const { question } = await req.json();

//     if (!question) {
//       return NextResponse.json({ reply: "No question provided." }, { status: 400 });
//     }

//     // Extract invoice ID from the question using regex
//     const idMatch = question.match(/INV\d+/i);
//     const invoiceId = idMatch ? idMatch[0].toUpperCase() : null;

//     let context = "No invoice ID found in the question.";
//     let invoice;

//     if (invoiceId) {
//       try {
//         invoice = await database
//           .select()
//           .from("Invoices11")
//           .where({ id: invoiceId })
//           .getFirst();

//         if (invoice) {
//           context = `Invoice ${invoice.id} is due on ${invoice.dueDate} for ₹${invoice.value / 100}`;
//         } else {
//           context = `Invoice with ID ${invoiceId} was not found.`;
//         }
//       } catch (dbErr) {
//         console.error("Database error:", dbErr);
//         context = `There was an error while fetching invoice ${invoiceId}.`;
//       }
//     }

//     const chat = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         { role: "system", content: "You are a helpful invoice assistant." },
//         { role: "user", content: `The user asked: "${question}". ${context}` },
//       ],
//     });

//     const reply = chat.choices?.[0]?.message?.content || "No response from AI.";

//     return NextResponse.json({ reply });
//   } catch (err) {
//     console.error("Chat route error:", err);
//     return NextResponse.json(
//       { reply: "Something went wrong processing your request." },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from 'next/server';

// export async function POST(req) {
//   const { question } = await req.json();

//   const response = await fetch('https://api.openai.com/v1/chat/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         { role: 'system', content: 'You are a helpful assistant.' },
//         { role: 'user', content: question },
//       ],
//     }),
//   });

//   const data = await response.json();
//   const reply = data.choices?.[0]?.message?.content || "Something went wrong.";
//   return NextResponse.json({ reply });
// }


// import { NextResponse } from "next/server";
// import { format, addDays } from "date-fns";
// import { database } from "@/database";
// // import { Invoices11 } from "../../../database/schema";
// import { Invoices11 } from "@/database/schema"; // ✅ correct path if that's where your model is

// import { desc } from "drizzle-orm";

// export async function POST(req) {
//   const { question } = await req.json();

//   const [invoice] = await database
//     .select()
//     .from(Invoices11)
//     .orderBy(desc(Invoices11.createTs))
//     .limit(1);

//   if (!invoice) {
//     return NextResponse.json({ reply: "No invoice found." });
//   }

//   const today = new Date();
//   const dueDate = addDays(new Date(invoice.createTs), 28);

//   let reply = "Sorry, I couldn't understand the question.";

//   const lower = question.toLowerCase();

//   if (lower.includes("due date")) {
//     reply = `Your due date is ${format(dueDate, "MMMM d, yyyy")}.`;
//   } else if (lower.includes("invoice id")) {
//     reply = `Your invoice ID is ${invoice.id}.`;
//   } else if (lower.includes("value")) {
//     reply = `Your invoice value is ₹${invoice.value}.`;
//   } else if (lower.includes("name")) {
//     reply = `The invoice is under the name ${invoice.name}.`;
//   } else if (lower.includes("today")) {
//     reply = `Today's date is ${format(today, "MMMM d, yyyy")}.`;
//   }

//   return NextResponse.json({ reply });
// }


// import { NextResponse } from "next/server";
// import { format, addDays } from "date-fns";
// import { eq } from "drizzle-orm"; // ✅ import this
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// export async function POST(req) {
//   const { question, invoiceId } = await req.json();

//   if (!invoiceId) {
//     return NextResponse.json({ reply: "Invoice ID is required." });
//   }

//   const [invoice] = await database
//     .select()
//     .from(Invoices11)
//     .where(eq(Invoices11.id, invoiceId)); // fetch specific invoice

//   if (!invoice) {
//     return NextResponse.json({ reply: "No invoice found for that ID." });
//   }

//   const today = new Date();
//   const invoiceDate = new Date(invoice.createTs); // ✅ Ensure it's a Date object
//   const dueDate = addDays(invoiceDate, 28);

//   let reply = "Sorry, I couldn't understand the question.";
//   const lower = question.toLowerCase();


//   if (lower.includes("due date")) {
//     reply = `Your due date is ${format(dueDate, "MMMM d, yyyy")}.`;
//   } else if (lower.includes("invoice date")) {
//     reply = `Your invoice was created on ${format(invoiceDate, "MMMM d, yyyy")}.`;
//   } else if (lower.includes("invoice id")) {
//     reply = `Your invoice ID is ${invoice.id}.`;
//   } else if (lower.includes("value")) {
//     reply = `Your invoice value is ₹${invoice.value}.`;
//   } else if (lower.includes("name")) {
//     reply = `The invoice is under the name ${invoice.name}.`;
//   } else if (lower.includes("today")) {
//     reply = `Today's date is ${format(today, "MMMM d, yyyy")}.`;
//   }

//   return NextResponse.json({ reply });
// }


// import { NextResponse } from "next/server";
// import { format, addDays, isPast } from "date-fns";
// import { eq } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";
// import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req) {
//   const { question, invoiceId } = await req.json();

//   if (!invoiceId) {
//     return NextResponse.json({ reply: "Invoice ID is required." });
//   }

//   const [invoice] = await database
//     .select()
//     .from(Invoices11)
//     .where(eq(Invoices11.id, invoiceId));

//   if (!invoice) {
//     return NextResponse.json({ reply: "No invoice found for that ID." });
//   }

//   const invoiceDate = new Date(invoice.createTs);
//   const dueDate = addDays(invoiceDate, 28);
//   const isOverdue = isPast(dueDate) && invoice.status !== "paid";

//   // Prepare a summary context for GPT
//   const context = `
//   Invoice Summary:
//   - ID: ${invoice.id}
//   - Name: ${invoice.name}
//   - Value: ₹${invoice.value}
//   - Created on: ${format(invoiceDate, "MMMM d, yyyy")}
//   - Due on: ${format(dueDate, "MMMM d, yyyy")}
//   - Status: ${invoice.status}
//   ${isOverdue ? "- ⚠️ This invoice is overdue.\n" : ""}
//   `;

//   // Ask GPT for a smart response
//   const completion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       { role: "system", content: "You're a helpful assistant answering questions about invoices." },
//       { role: "user", content: `Here is the invoice info:\n${context}\n\nUser question: ${question}` },
//     ],
//   });

//   const reply = completion.choices[0].message.content;

//   return NextResponse.json({ reply });
// }


// import { NextResponse } from "next/server";
// import { format, addDays, isPast } from "date-fns";
// import { eq } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";
// import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export async function POST(req) {
//   try {
//     const { question, invoiceId } = await req.json();

//     if (!invoiceId) {
//       return NextResponse.json({ reply: "Invoice ID is required." });
//     }

//     const [invoice] = await database
//       .select()
//       .from(Invoices11)
//       .where(eq(Invoices11.id, invoiceId));

//     if (!invoice) {
//       return NextResponse.json({ reply: "No invoice found for that ID." });
//     }

//     const invoiceDate = new Date(invoice.createTs);
//     const dueDate = addDays(invoiceDate, 28);
//     const isOverdue = isPast(dueDate) && invoice.status !== "paid";

//     const context = `
// Invoice Summary:
// - ID: ${invoice.id}
// - Customer Name: ${invoice.name}
// - Value: ₹${invoice.value}
// - Created on: ${format(invoiceDate, "MMMM d, yyyy")}
// - Due on: ${format(dueDate, "MMMM d, yyyy")}
// - Status: ${invoice.status}
// ${isOverdue ? "⚠️ This invoice is overdue." : ""}
//     `.trim();

//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You're a helpful assistant that answers questions about invoice details, payment status, and due dates.",
//         },
//         {
//           role: "user",
//           content: `Here is the invoice info:\n${context}\n\nUser question: ${question}`,
//         },
//       ],
//     });

//     const reply = completion.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("Chat API error:", error);
//     return NextResponse.json({ reply: "An unexpected error occurred. Please try again later." });
//   }
// }


// import { NextResponse } from "next/server";
// import { format, addDays, isPast } from "date-fns";
// import { eq } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
// const TOGETHER_API_BASE = process.env.TOGETHER_API_BASE || "https://api.together.xyz/v1";
// const TOGETHER_MODEL = process.env.TOGETHER_MODEL || "mistralai/Mixtral-8x7B-Instruct-v0.1";

// export async function POST(req) {
//   try {
//     const { question, invoiceId } = await req.json();

//     if (!invoiceId) {
//       return NextResponse.json({ reply: "Invoice ID is required." });
//     }

//     const [invoice] = await database
//       .select()
//       .from(Invoices11)
//       .where(eq(Invoices11.id, invoiceId));

//     if (!invoice) {
//       return NextResponse.json({ reply: "No invoice found for that ID." });
//     }

//     const invoiceDate = new Date(invoice.createTs);
//     const dueDate = addDays(invoiceDate, 28);
//     const isOverdue = isPast(dueDate) && invoice.status !== "paid";

//     const context = `
// Invoice Summary:
// - ID: ${invoice.id}
// - Customer Name: ${invoice.name}
// - Value: ₹${invoice.value}
// - Created on: ${format(invoiceDate, "MMMM d, yyyy")}
// - Due on: ${format(dueDate, "MMMM d, yyyy")}
// - Status: ${invoice.status}
// ${isOverdue ? "⚠️ This invoice is overdue." : ""}
//     `.trim();

//     const response = await fetch(`${TOGETHER_API_BASE}/chat/completions`, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${TOGETHER_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: TOGETHER_MODEL,
//         messages: [
//           {
//             role: "system",
//             content: "You're a helpful assistant that answers questions about invoice details, payment status, and due dates.",
//           },
//           {
//             role: "user",
//             content: `Here is the invoice info:\n${context}\n\nUser question: ${question}`,
//           },
//         ],
//       }),
//     });

//     const result = await response.json();
//     const reply = result?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("Together.ai error:", error);
//     return NextResponse.json({ reply: "An error occurred while talking to the AI." });
//   }
// }

// import { NextResponse } from "next/server";
// import { format, addDays, isPast, differenceInDays } from "date-fns";
// import { eq } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
// const TOGETHER_API_BASE = process.env.TOGETHER_API_BASE || "https://api.together.xyz/v1";
// const TOGETHER_MODEL = process.env.TOGETHER_MODEL || "mistralai/Mixtral-8x7B-Instruct-v0.1";

// export async function POST(req) {
//   try {
//     const { question, invoiceId } = await req.json();

//     if (!invoiceId) {
//       return NextResponse.json({ reply: "❗ Invoice ID is required." });
//     }

//     const [invoice] = await database
//       .select()
//       .from(Invoices11)
//       .where(eq(Invoices11.id, invoiceId));

//     if (!invoice) {
//       return NextResponse.json({ reply: "🚫 No invoice found for that ID." });
//     }

//     const invoiceDate = new Date(invoice.createTs);
//     const dueDate = addDays(invoiceDate, 28);
//     const now = new Date();
//     const overdueDays = differenceInDays(now, dueDate);
//     const isOverdue = isPast(dueDate) && invoice.status !== "paid";

//     let statusNote = "";
//     if (isOverdue) {
//       if (overdueDays > 14 && invoice.status !== "uncollectible") {
//         // mark invoice as uncollectible
//         await database
//           .update(Invoices11)
//           .set({ status: "uncollectible" })
//           .where(eq(Invoices11.id, invoiceId));
//         invoice.status = "uncollectible";
//         statusNote = "⚠️ This invoice is overdue and now marked as *uncollectible*.";
//       } else {
//         statusNote = "⚠️ This invoice is overdue.";
//       }
//     }

//     const context = `
// Invoice Summary:
// - ID: ${invoice.id}
// - Customer Name: ${invoice.name}
// - Value: ₹${invoice.value}/100
// - Created on: ${format(invoiceDate, "MMMM d, yyyy")}
// - Due on: ${format(dueDate, "MMMM d, yyyy")}
// - Status: ${invoice.status}
// ${statusNote}
//     `.trim();

//     const response = await fetch(`${TOGETHER_API_BASE}/chat/completions`, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${TOGETHER_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: TOGETHER_MODEL,
//         messages: [
//           {
//             role: "system",
//             content: "You're a helpful assistant that answers questions about invoice details, payment status, and due dates.",
//           },
//           {
//             role: "user",
//             content: `Here is the invoice info:\n${context}\n\nUser question: ${question}`,
//           },
//         ],
//       }),
//     });

//     const result = await response.json();
//     const reply = result?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("Together.ai error:", error);
//     return NextResponse.json({ reply: "💥 An error occurred while talking to the AI." });
//   }
// }


// import { NextResponse } from "next/server";
// import { format, addDays, isPast, differenceInDays } from "date-fns";
// import { eq, and, ne } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
// const TOGETHER_API_BASE = process.env.TOGETHER_API_BASE || "https://api.together.xyz/v1";
// const TOGETHER_MODEL = process.env.TOGETHER_MODEL || "mistralai/Mixtral-8x7B-Instruct-v0.1";

// export async function POST(req) {
//   try {
//     const { question, invoiceId } = await req.json();

//     if (!invoiceId) {
//       return NextResponse.json({ reply: "❗ Invoice ID is required." });
//     }

//     const [invoice] = await database
//       .select()
//       .from(Invoices11)
//       .where(eq(Invoices11.id, invoiceId));

//     if (!invoice) {
//       return NextResponse.json({ reply: "🚫 No invoice found for that ID." });
//     }

//     const invoiceDate = new Date(invoice.createTs);
//     const dueDate = addDays(invoiceDate, 28);
//     const now = new Date();
//     const overdueDays = differenceInDays(now, dueDate);
//     const isOverdue = isPast(dueDate) && invoice.status !== "paid";

//     if (isOverdue && overdueDays > 14 && invoice.status !== "uncollectible") {
//       // mark invoice as uncollectible
//       await database
//         .update(Invoices11)
//         .set({ status: "uncollectible" })
//         .where(eq(Invoices11.id, invoiceId));
//       invoice.status = "uncollectible";
//     }

//     // Fetch other invoices from this customer
//     const allInvoices = await database
//       .select()
//       .from(Invoices11)
//       .where(and(eq(Invoices11.name, invoice.name), ne(Invoices11.id, invoiceId)));

//     const unpaidInvoices = allInvoices.filter(inv => inv.status !== "paid");
//     const unpaidCount = unpaidInvoices.length;

//     let score = "";
//     if (unpaidCount === 0) score = `Perfect (0 invoice(s) yet to pay)`;
//     else if (unpaidCount === 1) score = "Excellent";
//     else if (unpaidCount === 2) score = "Good";
//     else if (unpaidCount === 3) score = "Bad";
//     else score = "Worst";

//       if (invoice.status==="paid") {
//     return NextResponse.json({ reply: "" });
//   }
//     // Lowercased question for checks
//     const lowerQ = question.toLowerCase();

//     let reply = "";

//     if (lowerQ.includes("score")) {
//     //   reply = `🧮 User Score: ${score}`;
//     reply = `🧮 User Score: ${score} (${unpaidCount} invoice${unpaidCount === 1 ? "" : "s"} yet to pay)`;

//     } else if (lowerQ.includes("id")) {
//       reply = `🆔 Invoice ID: ${invoice.id}`;
//     } else if (lowerQ.includes("status")) {
//       reply = `📌 Status: ${invoice.status}`;
//     } else if (lowerQ.includes("name")) {
//       reply = `👤 Customer Name: ${invoice.name}`;
//     } else if (lowerQ.includes("value") || lowerQ.includes("amount") || lowerQ.includes("price")) {
//     //   reply = `💰 Value: ₹${invoice.value}`/100;
//     reply = `💰 Value: ₹${(invoice.value / 100).toFixed(2)}`;

//     } else if (lowerQ.includes("due") || lowerQ.includes("date")) {
//       reply = `🗓 Created on: ${format(invoiceDate, "MMMM d, yyyy")}\n🗓 Due on: ${format(dueDate, "MMMM d, yyyy")}`;
//     } else if (lowerQ.includes("all") || lowerQ.includes("everything") || lowerQ.includes("show")) {
//       reply = `
// 🧾 Invoice Summary:
// - ID: ${invoice.id}
// - Customer Name: ${invoice.name}
// - Value: ₹${(invoice.value / 100).toFixed(2)}

// - Created on: ${format(invoiceDate, "MMMM d, yyyy")}
// - Due on: ${format(dueDate, "MMMM d, yyyy")}
// - Status: ${invoice.status}
// - Score: ${score}
//       `.trim();
//     } else {
//       // Send to Together AI for general questions
//       const context = `
// Invoice Summary:
// - ID: ${invoice.id}
// - Customer Name: ${invoice.name}
// - Value: ₹${(invoice.value / 100).toFixed(2)}

// - Created on: ${format(invoiceDate, "MMMM d, yyyy")}
// - Due on: ${format(dueDate, "MMMM d, yyyy")}
// - Status: ${invoice.status}
// - Score: ${score}
//       `.trim();

//       const response = await fetch(`${TOGETHER_API_BASE}/chat/completions`, {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${TOGETHER_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: TOGETHER_MODEL,
//           messages: [
//             {
//               role: "system",
//               content: "You're a helpful assistant that answers questions about invoice details, payment status, and due dates.",
//             },
//             {
//               role: "user",
//               content: `Here is the invoice info:\n${context}\n\nUser question: ${question}`,
//             },
//           ],
//         }),
//       });

//       const result = await response.json();
//       reply = result?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
//     }

//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("Together.ai error:", error);
//     return NextResponse.json({ reply: "💥 An error occurred while processing your request." });
//   }
// }



// import { NextResponse } from "next/server";
// import { format, addDays, isPast, differenceInDays } from "date-fns";
// import { eq, and, ne } from "drizzle-orm";
// import { database } from "@/database";
// import { Invoices11 } from "@/database/schema";

// const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
// const TOGETHER_API_BASE = process.env.TOGETHER_API_BASE || "https://api.together.xyz/v1";
// const TOGETHER_MODEL = process.env.TOGETHER_MODEL || "mistralai/Mixtral-8x7B-Instruct-v0.1";

// export async function POST(req) {
//   try {
//     const { question, invoiceId } = await req.json();

//     if (!invoiceId) {
//       return NextResponse.json({ reply: "❗ Invoice ID is required." });
//     }

//     const [invoice] = await database
//       .select()
//       .from(Invoices11)
//       .where(eq(Invoices11.id, invoiceId));

//     if (!invoice) {
//       return NextResponse.json({ reply: "🚫 No invoice found for that ID." });
//     }

//     const invoiceDate = new Date(invoice.createTs);
//     const dueDate = addDays(invoiceDate, 28);
//     const now = new Date();
//     const overdueDays = differenceInDays(now, dueDate);
//     const isOverdue = isPast(dueDate) && invoice.status !== "paid";

//     if (isOverdue && overdueDays > 14 && invoice.status !== "uncollectible") {
//       // mark invoice as uncollectible
//       await database
//         .update(Invoices11)
//         .set({ status: "uncollectible" })
//         .where(eq(Invoices11.id, invoiceId));
//       invoice.status = "uncollectible";
//     }

//     // Fetch other invoices from this customer
//     const allInvoices = await database
//       .select()
//       .from(Invoices11)
//       .where(and(eq(Invoices11.name, invoice.name), ne(Invoices11.id, invoiceId)));

//     const unpaidInvoices = allInvoices.filter(inv => inv.status !== "paid");
//     const unpaidCount = unpaidInvoices.length;

//     let score = "";
//     if (unpaidCount === 0) score = `Perfect (0 invoice(s) yet to pay)`;
//     else if (unpaidCount === 1) score = "Excellent";
//     else if (unpaidCount === 2) score = "Good";
//     else if (unpaidCount === 3) score = "Bad";
//     else score = "Worst";

//     const lowerQ = question.toLowerCase();
//     let reply = "";

//     if (lowerQ.includes("score")) {
//       reply = `🧮 User Score: ${score} (${unpaidCount} invoice${unpaidCount === 1 ? "" : "s"} yet to pay)`;
//     } else if (lowerQ.includes("id")) {
//       reply = `🆔 Invoice ID: ${invoice.id}`;
//     } else if (lowerQ.includes("status")) {
//       reply = `📌 Status: ${invoice.status}`;
//     } else if (lowerQ.includes("name")) {
//       reply = `👤 Customer Name: ${invoice.name}`;
//     } else if (lowerQ.includes("value") || lowerQ.includes("amount") || lowerQ.includes("price")) {
//       reply = `💰 Value: ₹${(invoice.value / 100).toFixed(2)}`;
//     } else if (lowerQ.includes("due") || lowerQ.includes("date")) {
//       if (invoice.status === "paid") {
//         reply = "✅ Invoice is already paid. No due date applicable.";
//       } else {
//         reply = `🗓 Created on: ${format(invoiceDate, "MMMM d, yyyy")}\n🗓 Due on: ${format(dueDate, "MMMM d, yyyy")}`;
//       }
//     } else if (lowerQ.includes("all") || lowerQ.includes("everything") || lowerQ.includes("show")) {
//       reply = `
// 🧾 Invoice Summary:
// - ID: ${invoice.id}
// - Customer Name: ${invoice.name}
// - Value: ₹${(invoice.value / 100).toFixed(2)}

// - Created on: ${format(invoiceDate, "MMMM d, yyyy")}
// - Due on: ${format(dueDate, "MMMM d, yyyy")}
// - Status: ${invoice.status}
// - Score: ${score}
//       `.trim();
//     } else {
//       // Send to Together AI for general questions
//       const context = `
// Invoice Summary:
// - ID: ${invoice.id}
// - Customer Name: ${invoice.name}
// - Value: ₹${(invoice.value / 100).toFixed(2)}

// - Created on: ${format(invoiceDate, "MMMM d, yyyy")}
// - Due on: ${format(dueDate, "MMMM d, yyyy")}
// - Status: ${invoice.status}
// - Score: ${score}
//       `.trim();

//       const response = await fetch(`${TOGETHER_API_BASE}/chat/completions`, {
//         method: "POST",
//         headers: {
//           "Authorization": `Bearer ${TOGETHER_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           model: TOGETHER_MODEL,
//           messages: [
//             {
//               role: "system",
//               content: "You're a helpful assistant that answers questions about invoice details, payment status, and due dates.",
//             },
//             {
//               role: "user",
//               content: `Here is the invoice info:\n${context}\n\nUser question: ${question}`,
//             },
//           ],
//         }),
//       });

//       const result = await response.json();
//       reply = result?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
//     }

//     return NextResponse.json({ reply });
//   } catch (error) {
//     console.error("Together.ai error:", error);
//     return NextResponse.json({ reply: "💥 An error occurred while processing your request." });
//   }
// }


import { NextResponse } from "next/server";
import { format, addDays, isPast, differenceInDays } from "date-fns";
import { eq, and, ne } from "drizzle-orm";
import { database } from "@/database";
import { Invoices11 } from "@/database/schema";

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
const TOGETHER_API_BASE = process.env.TOGETHER_API_BASE || "https://api.together.xyz/v1";
const TOGETHER_MODEL = process.env.TOGETHER_MODEL || "mistralai/Mixtral-8x7B-Instruct-v0.1";

export async function POST(req) {
  try {
    const { question, invoiceId } = await req.json();

    if (!invoiceId) {
      return NextResponse.json({ reply: "❗ Invoice ID is required." });
    }

    const [invoice] = await database
      .select()
      .from(Invoices11)
      .where(eq(Invoices11.id, invoiceId));

    if (!invoice) {
      return NextResponse.json({ reply: "🚫 No invoice found for that ID." });
    }

    const invoiceDate = new Date(invoice.createTs);
    const dueDate = addDays(invoiceDate, 28);
    const now = new Date();
    const overdueDays = differenceInDays(now, dueDate);
    const isOverdue = isPast(dueDate) && invoice.status !== "paid";

    if (isOverdue && overdueDays > 14 && invoice.status !== "uncollectible") {
      await database
        .update(Invoices11)
        .set({ status: "uncollectible" })
        .where(eq(Invoices11.id, invoiceId));
      invoice.status = "uncollectible";
    }

    const allInvoices = await database
      .select()
      .from(Invoices11)
      .where(and(eq(Invoices11.name, invoice.name), ne(Invoices11.id, invoiceId)));

    const unpaidInvoices = allInvoices.filter(inv => inv.status !== "paid");
    const unpaidCount = unpaidInvoices.length;

    let score = "";
    if (unpaidCount === 0) score = `Perfect (0 invoice(s) yet to pay)`;
    else if (unpaidCount === 1) score = "Excellent";
    else if (unpaidCount === 2) score = "Good";
    else if (unpaidCount === 3) score = "Bad";
    else score = "Worst";

    const lowerQ = question.toLowerCase();
    let reply = "";

    if (lowerQ.includes("score")) {
      reply = `🧮 User Score: ${score} (${unpaidCount} invoice${unpaidCount === 1 ? "" : "s"} yet to pay)`;
    } else if (lowerQ.includes("id")) {
      reply = `🆔 Invoice ID: ${invoice.id}`;
    } else if (lowerQ.includes("status")) {
      reply = `📌 Status: ${invoice.status}`;
    } else if (lowerQ.includes("name")) {
      reply = `👤 Customer Name: ${invoice.name}`;
    } else if (lowerQ.includes("value") || lowerQ.includes("amount") || lowerQ.includes("price")) {
      reply = `💰 Value: ₹${(invoice.value / 100).toFixed(2)}`;
    } else if (lowerQ.includes("today") || lowerQ.includes("current date")) {
      reply = `📅 Today's date is ${format(now, "MMMM d, yyyy")}`;
    } else if (lowerQ.includes("time") || lowerQ.includes("what time")) {
      reply = `⏰ Current time is ${format(now, "hh:mm a")}`;
    } else if (lowerQ.includes("due") || lowerQ.includes("date")) {
      if (invoice.status === "paid") {
        reply = "✅ Invoice is already paid. No due date applicable.";
      } else {
        reply = `🗓 Created on: ${format(invoiceDate, "MMMM d, yyyy")}\n🗓 Due on: ${format(dueDate, "MMMM d, yyyy")}`;
      }
    } else if (lowerQ.includes("all") || lowerQ.includes("everything") || lowerQ.includes("show")) {
      reply = `
🧾 Invoice Summary:
- ID: ${invoice.id}
- Customer Name: ${invoice.name}
- Value: ₹${(invoice.value / 100).toFixed(2)}

- Created on: ${format(invoiceDate, "MMMM d, yyyy")}
- Due on: ${format(dueDate, "MMMM d, yyyy")}
- Status: ${invoice.status}
- Score: ${score}
      `.trim();
    } else {
      const context = `
Invoice Summary:
- ID: ${invoice.id}
- Customer Name: ${invoice.name}
- Value: ₹${(invoice.value / 100).toFixed(2)}

- Created on: ${format(invoiceDate, "MMMM d, yyyy")}
- Due on: ${format(dueDate, "MMMM d, yyyy")}
- Status: ${invoice.status}
- Score: ${score}
      `.trim();

      const response = await fetch(`${TOGETHER_API_BASE}/chat/completions`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: TOGETHER_MODEL,
          messages: [
            {
              role: "system",
              content: "You're a helpful assistant that answers questions about invoice details, payment status, and due dates.",
            },
            {
              role: "user",
              content: `Here is the invoice info:\n${context}\n\nUser question: ${question}`,
            },
          ],
        }),
      });

      const result = await response.json();
      reply = result?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Together.ai error:", error);
    return NextResponse.json({ reply: "💥 An error occurred while processing your request." });
  }
}

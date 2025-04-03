// import { notFound } from "next/navigation";
// import { eq, and, isNull } from "drizzle-orm";
// import { auth } from "@clerk/nextjs/server";

// import { database } from '@/database';
// import { Customers, Invoices11 } from '@/database/schema';
// import Invoice from "./invoice";

// export default async function InvoicePage({ params }: { params: { invoiceId: string } }) {
//     const { userId, orgId } = await auth();

//     if (!userId) return;

//     const invoiceId = parseInt(params.invoiceId);

//     if (isNaN(invoiceId)) {
//         throw new Error('Invalid Invoice ID');
//     }

//     let result;

//     if (orgId) {
//         [result] = await database
//             .select()
//             .from(Invoices11)
//             .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
//             .where(
//                 and(
//                     eq(Invoices11.id, invoiceId),
//                     eq(Invoices11.OrganizationId, orgId),
//                 )
//             )
//             .limit(1);
//     } else {
//         [result] = await database
//             .select()
//             .from(Invoices11)
//             .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
//             .where(
//                 and(
//                     eq(Invoices11.id, invoiceId),
//                     eq(Invoices11.userId, userId),
//                     isNull(Invoices11.OrganizationId)
//                 )
//             )
//             .limit(1);
//     }

//     if (!result) {
//         notFound();
//     }

//     const invoice = {
//         ...result.invoices11,
//         customer: result.customers
//     };

//     return (
//         <div>
//             <Invoice invoice={invoice} />
//         </div>
//     );
// }


import { notFound } from "next/navigation";
import { eq, and, isNull } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import { database } from '@/database';
import { Customers, Invoices11 } from '@/database/schema';
import Invoice from "./invoice";

export default async function InvoicePage({ params }) {
    const { userId, orgId } = await auth();

    if (!userId) return;

    const invoiceId = parseInt(params.invoiceId);

    if (isNaN(invoiceId)) {
        throw new Error('Invalid Invoice ID');
    }

    let result;

    if (orgId) {
        [result] = await database
            .select()
            .from(Invoices11)
            .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
            .where(
                and(
                    eq(Invoices11.id, invoiceId),
                    eq(Invoices11.OrganizationId, orgId),
                )
            )
            .limit(1);
    } else {
        [result] = await database
            .select()
            .from(Invoices11)
            .innerJoin(Customers, eq(Invoices11.customerId, Customers.id))
            .where(
                and(
                    eq(Invoices11.id, invoiceId),
                    eq(Invoices11.userId, userId),
                    isNull(Invoices11.OrganizationId)
                )
            )
            .limit(1);
    }

    if (!result) {
        notFound();
    }

    const invoice = {
        ...result.invoices11,
        customer: result.customers
    };

    return (
        <div>
            <Invoice invoice={invoice} />
        </div>
    );
}

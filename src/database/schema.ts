import { sql } from "drizzle-orm";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { pgTable, pgEnum, timestamp, integer, text } from "drizzle-orm/pg-core";

export type Status = (typeof AVAILABLE_STATUSES)[number]["id"];

const statuses = AVAILABLE_STATUSES.map(({ id }) => id) as Status[];

export const statusEnum = pgEnum("status", statuses as [Status, ...Status[]]);

export const Invoices11 = pgTable('invoices11', {
  id: integer('id').primaryKey().notNull().default(sql`nextval('invoices11_id_seq')`), 
  createTs: timestamp('createTs').defaultNow().notNull(),
  value: integer('value').notNull(),
  phone: text('phone').notNull(),
  description: text('description').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  userId: text('userId').notNull(),
  OrganizationId: text('OrganizationId'),
  customerId: integer('customerId').notNull().references(() => Customers.id) ,
  status: statusEnum('status').notNull(),
  // razorpay_order_id: text('razorpay_order_id'), 
  // userId: text('userId').notNull()
});

export const Customers = pgTable('customers', {
  // id: serial('id').primaryKey().notNull(),  
  id: integer('id').primaryKey().notNull().default(sql`nextval('customers_id_seq')`), 
  createTs: timestamp('createTs').defaultNow().notNull(),
  phone: text('phone').notNull(),
  description: text('description').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  userId: text('userId').notNull(),
  OrganizationId: text('OrganizationId')
});

// export const Refund = pgTable('refund', {
//   id: integer('id').primaryKey().notNull(), 
//   createTs: timestamp('createTs').defaultNow().notNull(),
//   order_id: text('order_id'),  // Reference the invoice/order
//   value: integer('amount').notNull(),   // Refund amount
//   status: statusEnum('status').notNull(), // Use the existing status enum
//   userId: text('userId').notNull(),
// });

 




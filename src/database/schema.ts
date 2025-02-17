
// import { sql } from "drizzle-orm";
// import { serial } from "drizzle-orm/pg-core";
// import { AVAILABLE_STATUSES } from "@/data/invoices";
// import { pgTable, pgEnum, timestamp, integer, text } from "drizzle-orm/pg-core";

// type status = typeof AVAILABLE_STATUSES[number]["id"];

// const statuses = AVAILABLE_STATUSES.map(({ id }) => id) as Array<Status>;

// // Enum definition for status
// export const statusEnum = pgEnum('status', statuses as [Status, ...Array<Status>])


import { sql } from "drizzle-orm";
import { serial } from "drizzle-orm/pg-core";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { pgTable, pgEnum, timestamp, integer, text } from "drizzle-orm/pg-core";

// Define TypeScript type based on AVAILABLE_STATUSES
export type Status = (typeof AVAILABLE_STATUSES)[number]["id"];

// Extract status values from AVAILABLE_STATUSES
const statuses = AVAILABLE_STATUSES.map(({ id }) => id) as Status[];

// Ensure at least one status is present in the array to satisfy TypeScript constraints
export const statusEnum = pgEnum("status", statuses as [Status, ...Status[]]);


// Table definition for invoices
export const Invoices11 = pgTable('invoices11', {
  // id: serial('id').primaryKey().notNull(),  
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


 




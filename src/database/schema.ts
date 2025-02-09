// import { sql } from "drizzle-orm";
// import { serial } from "drizzle-orm/pg-core";
// import { pgTable, pgEnum, uuid, timestamp, integer, text } from "drizzle-orm/pg-core";

// export const statusEnum = pgEnum('status', ['open', 'paid', 'void', 'uncollectible']);

// export const Invoices = pgTable('invoices', {
//   id: uuid('id').defaultRandom().primaryKey().notNull(),
//   // id: serial('id').primaryKey().notNull(),

//   createTs: timestamp('createTs').defaultNow().notNull(),
//   value: integer('value').notNull(),
//   description: text('description').notNull(),
//   status: statusEnum('status').notNull(),
// });

import { sql } from "drizzle-orm";
import { serial } from "drizzle-orm/pg-core";
import { pgTable, pgEnum, timestamp, integer, text } from "drizzle-orm/pg-core";

// Enum definition for status
export const statusEnum = pgEnum('status', ['open', 'paid', 'void', 'uncollectible']);

// Table definition for invoices
export const Invoices = pgTable('invoices', {
  id: serial('id').primaryKey().notNull(),  // Using serial for auto-increment
  createTs: timestamp('createTs').defaultNow().notNull(),
  value: integer('value').notNull(),
  description: text('description').notNull(),
  status: statusEnum('status').notNull(),
});



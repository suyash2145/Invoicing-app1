CREATE TABLE "invoices11" (
	"id" serial PRIMARY KEY NOT NULL,
	"createTs" timestamp DEFAULT now() NOT NULL,
	"value" integer NOT NULL,
	"phone" text NOT NULL,
	"description" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"userId" text NOT NULL,
	"customerId" integer NOT NULL,
	"status" "status" NOT NULL
);
--> statement-breakpoint
DROP TABLE "invoices" CASCADE;--> statement-breakpoint
ALTER TABLE "invoices11" ADD CONSTRAINT "invoices11_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
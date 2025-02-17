ALTER TABLE "customers" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "id" SET DEFAULT nextval('invoices_id');--> statement-breakpoint
ALTER TABLE "invoices11" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "invoices11" ALTER COLUMN "id" SET DEFAULT nextval('invoices_id');
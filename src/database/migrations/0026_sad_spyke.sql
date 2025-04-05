CREATE TABLE "refund" (
	"id" integer PRIMARY KEY NOT NULL,
	"createTs" timestamp DEFAULT now() NOT NULL,
	"order_id" text,
	"amount" integer NOT NULL,
	"status" "status" NOT NULL,
	"userId" text NOT NULL
);

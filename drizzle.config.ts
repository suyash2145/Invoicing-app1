import { defineConfig } from "drizzle-kit";
import * as dotenv from 'dotenv';

dotenv.config({
    path: './.env.local'
})

if (typeof process.env.XATA_DATABASE_URL !== 'string') {
    throw new Error('please set your XATA_DATABASE_URL')
}
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema.ts",
  out: "./src/database/migrations",
  dbCredentials: {
    url: process.env.XATA_DATABASE_URL
  }
});


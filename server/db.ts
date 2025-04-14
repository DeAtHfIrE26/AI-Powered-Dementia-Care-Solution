import { Pool, neonConfig } from '@neondatabase/serverless';
import * as schema from "@shared/schema";
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";

// Load environment variables from .env file
dotenv.config();

neonConfig.webSocketConstructor = ws;

// For debugging - useful to see what's happening
console.log('Environment:', process.env.NODE_ENV);
console.log('Database URL exists:', !!process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });

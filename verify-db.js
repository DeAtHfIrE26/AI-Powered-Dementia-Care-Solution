#!/usr/bin/env node

/**
 * This script verifies database connection
 */

import dotenv from 'dotenv';
import pkg from 'pg';
import { fileURLToPath } from 'url';

const { Pool } = pkg;

// Load environment variables
dotenv.config();

export async function checkDatabaseConnection() {
  console.log('🗄️ Checking database connection...');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set');
    return false;
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Test the connection
    const client = await pool.connect();
    
    try {
      // Check if tables exist
      const tablesResult = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);
      
      const tables = tablesResult.rows.map(row => row.table_name);
      
      if (tables.length === 0) {
        console.error('❌ No tables found in the database. Please run "npm run db:push" to create tables.');
        return false;
      }
      
      // Check for specific required tables
      const requiredTables = ['users', 'contact_submissions'];
      const missingTables = requiredTables.filter(table => !tables.includes(table));
      
      if (missingTables.length > 0) {
        console.error(`❌ Missing required tables: ${missingTables.join(', ')}. Please run "npm run db:push" to create them.`);
        return false;
      }
      
      console.log('✅ Database connection successful');
      console.log(`📊 Found ${tables.length} tables: ${tables.join(', ')}`);
      return true;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  } finally {
    await pool.end();
  }
}

// Allow direct execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  checkDatabaseConnection()
    .then(success => {
      if (!success) {
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      process.exit(1);
    });
} 
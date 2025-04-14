#!/usr/bin/env node

/**
 * This script verifies that the project setup is complete and working
 */

import { spawn } from 'child_process';
import fs from 'fs';
import { checkDatabaseConnection } from './verify-db.js';

async function checkEnvironmentVariables() {
  console.log('📋 Checking environment variables...');
  
  if (!fs.existsSync('.env')) {
    console.error('❌ .env file not found. Please run "npm run setup" first.');
    return false;
  }
  
  const envContent = fs.readFileSync('.env', 'utf8');
  const missingVars = [];
  
  if (!envContent.includes('DATABASE_URL=')) {
    missingVars.push('DATABASE_URL');
  }
  
  if (missingVars.length > 0) {
    console.error(`❌ Missing environment variables: ${missingVars.join(', ')}`);
    return false;
  }
  
  console.log('✅ Environment variables are set correctly');
  return true;
}

async function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: options.silent ? 'ignore' : 'inherit',
      shell: true,
      ...options
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

async function checkBuildProcess() {
  console.log('🔨 Checking build process...');
  const buildSuccess = await runCommand('npm', ['run', 'build'], { silent: true });
  
  if (buildSuccess) {
    console.log('✅ Build process completed successfully');
    return true;
  } else {
    console.error('❌ Build process failed. Please check for errors.');
    return false;
  }
}

async function verifySetup() {
  console.log('🔍 Verifying project setup...\n');
  
  // Check for dependencies
  console.log('📦 Checking dependencies...');
  if (!fs.existsSync('node_modules')) {
    console.error('❌ Dependencies not installed. Please run "npm install" first.');
    return;
  }
  console.log('✅ Dependencies are installed');
  
  // Check environment variables
  const envOk = await checkEnvironmentVariables();
  if (!envOk) return;
  
  // Check database connection
  try {
    const dbOk = await checkDatabaseConnection();
    if (!dbOk) return;
  } catch (error) {
    console.error('❌ Database connection check failed:', error.message);
    return;
  }
  
  // Check build process
  const buildOk = await checkBuildProcess();
  if (!buildOk) return;
  
  console.log('\n🎉 Verification complete! Your project is set up correctly and ready to use.');
  console.log('\nCommands to run:');
  console.log('  npm run dev    - Start the development server');
  console.log('  npm run build  - Build the application for production');
  console.log('  npm start      - Start the production server');
}

verifySetup().catch((error) => {
  console.error('Verification failed:', error);
  process.exit(1);
}); 
#!/usr/bin/env node

/**
 * This script helps with the initial setup of the MERN Stack project
 */

import { spawn } from 'child_process';
import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command "${command} ${args.join(' ')}" failed with code ${code}`));
      }
    });
  });
}

async function setupEnv() {
  console.log('\n📝 Setting up environment variables...');

  if (fs.existsSync('.env')) {
    console.log('Found existing .env file. Skipping environment setup.');
    return;
  }

  const dbUrl = await prompt('Enter your DATABASE_URL (NeonDB connection string): ');
  const sendgridKey = await prompt('Enter your SENDGRID_API_KEY (leave empty for development only): ');

  const envContents = `# Database configuration
DATABASE_URL=${dbUrl}

# Email configuration
SENDGRID_API_KEY=${sendgridKey}

# For development
NODE_ENV=development
`;

  fs.writeFileSync('.env', envContents);
  console.log('✅ .env file created successfully');
}

async function initializeDatabase() {
  console.log('\n💾 Initializing database...');
  try {
    await runCommand('npm', ['run', 'db:push']);
    console.log('✅ Database schema pushed successfully');
  } catch (error) {
    console.error('❌ Failed to initialize database:', error.message);
    console.log('Please check your DATABASE_URL in the .env file and try again.');
  }
}

async function main() {
  console.log('🚀 Starting MERN Stack setup...');

  // Install dependencies
  console.log('\n📦 Installing dependencies...');
  try {
    await runCommand('npm', ['install']);
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }

  // Setup environment
  await setupEnv();

  // Initialize database
  await initializeDatabase();

  console.log('\n🎉 Setup completed successfully!');
  console.log('\nCommands you can run:');
  console.log('  npm run dev    - Start the development server');
  console.log('  npm run build  - Build the application for production');
  console.log('  npm start      - Start the production server');

  rl.close();
}

main().catch((error) => {
  console.error('Setup failed:', error);
  process.exit(1);
}); 
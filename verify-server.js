#!/usr/bin/env node

/**
 * A simple script to verify server is running
 */

import fetch from 'node-fetch';

const MAX_RETRIES = 10;
const RETRY_INTERVAL = 1000; // 1 second

async function checkServer(retries = 0) {
  try {
    console.log(`Attempt ${retries + 1}/${MAX_RETRIES}: Checking if server is running...`);
    const response = await fetch('http://localhost:5000');
    
    if (response.ok) {
      console.log('✅ Server is running!');
      return true;
    } else {
      console.log(`Server responded with status: ${response.status}`);
      
      if (retries < MAX_RETRIES - 1) {
        console.log(`Retrying in ${RETRY_INTERVAL/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
        return checkServer(retries + 1);
      } else {
        console.error('❌ Maximum retries reached. Server may not be running properly.');
        return false;
      }
    }
  } catch (error) {
    console.log(`Error connecting to server: ${error.message}`);
    
    if (retries < MAX_RETRIES - 1) {
      console.log(`Retrying in ${RETRY_INTERVAL/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      return checkServer(retries + 1);
    } else {
      console.error('❌ Maximum retries reached. Server is not running.');
      console.log('\nMake sure the server is started with:');
      console.log('  npm run dev');
      return false;
    }
  }
}

checkServer()
  .then(isRunning => {
    if (!isRunning) {
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  }); 
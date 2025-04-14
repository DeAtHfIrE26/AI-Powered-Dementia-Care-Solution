#!/usr/bin/env node

/**
 * A simple script to verify API connectivity
 */

import fetch from 'node-fetch';

async function checkApi() {
  try {
    console.log('Checking API connectivity...');
    const apiUrl = 'http://localhost:5000/api/contact';
    
    // Test data
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'healthcare_professional',
      message: 'This is a test message',
      joinWaitlist: true
    };
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ API is accessible and working!');
      console.log('Response:', JSON.stringify(data, null, 2));
    } else {
      console.error('❌ API returned an error:');
      console.error('Status:', response.status);
      console.error('Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('❌ Failed to connect to API:');
    console.error(error.message);
    console.log('\nMake sure the development server is running with:');
    console.log('  npm run dev');
    process.exit(1);
  }
}

checkApi().catch(console.error); 
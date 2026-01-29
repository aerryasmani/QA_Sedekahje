// tests/TestSuite/api.spec.js
const { test, expect } = require('@playwright/test');

test.describe('API Tests', () => {
  
  test('GET request - fetch data', async ({ request }) => {
    const response = await request.get('https://api.example.com/users');
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toBeTruthy();
  });

  test('POST request - create resource', async ({ request }) => {
    const response = await request.post('https://api.example.com/users', {
      data: {
        name: 'Test User',
        email: 'test@example.com'
      }
    });
    
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data.name).toBe('Test User');
  });

});
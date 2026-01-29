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

// Authentication with headers
test('API with auth token', async ({ request }) => {
  const response = await request.get('/protected-endpoint', {
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN_HERE'
    }
  });
  expect(response.ok()).toBeTruthy();
});

// Testing error responses
test('Handle 404 error', async ({ request }) => {
  const response = await request.get('/non-existent');
  expect(response.status()).toBe(404);
});

// Response time testing
test('API performance', async ({ request }) => {
  const start = Date.now();
  await request.get('/endpoint');
  const duration = Date.now() - start;
  
  expect(duration).toBeLessThan(2000); // under 2 seconds
});
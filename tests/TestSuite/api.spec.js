/**
 * API Automation Tests for GetDoa Random Endpoint
 * 
 * Test Coverage:
 * - Single random Doa retrieval
 * - Batch random Doa retrieval (count parameter)
 * - Category filtering
 * - Error handling (invalid parameters)
 * - Response schema validation
 * - Performance testing
 * - Data integrity validation
 */

const { test, expect } = require('@playwright/test');
const {
  DoaAPIHelper,
  TestDataGenerator,
  PerformanceHelper,
} = require('./api');

test.describe('GetDoa Random API - Basic Functionality', () => {
  let apiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new DoaAPIHelper(request);
  });

  test('should retrieve a single random Doa successfully', async () => {
    const response = await apiHelper.getRandomDoa();

    // Validate HTTP status
    expect(response.status).toBe(200);
    
    // Validate headers
    apiHelper.validateHeaders(response.headers);
    
    // Validate response structure
    apiHelper.validateSingleDoaResponse(response.body);
    
    // Validate content quality
    apiHelper.validateDoaContent(response.body.data);

    // Log for debugging (optional)
    console.log('Retrieved Doa:', response.body.data.slug);
  });

  test('should return different Doa on multiple calls (randomness check)', async () => {
    const slugs = new Set();
    const iterations = 5;

    for (let i = 0; i < iterations; i++) {
      const response = await apiHelper.getRandomDoa();
      expect(response.status).toBe(200);
      slugs.add(response.body.data.slug);
    }

    // With a large dataset, we should get at least 2 different Doa in 5 calls
    // This validates the randomness is working
    expect(slugs.size).toBeGreaterThan(1);
  });

  test('should retrieve random Doa with valid response time', async () => {
    const result = await PerformanceHelper.measureResponseTime(
      () => apiHelper.getRandomDoa()
    );

    expect(result.status).toBe(200);
    PerformanceHelper.validateResponseTime(result.responseTime, 3000);
    
    console.log(`Response time: ${result.responseTime}ms`);
  });
});

test.describe('GetDoa Random API - Batch Retrieval (Count Parameter)', () => {
  let apiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new DoaAPIHelper(request);
  });

  TestDataGenerator.getValidCountValues().forEach(count => {
    test(`should retrieve ${count} random Doa(s) when count=${count}`, async () => {
      const response = await apiHelper.getRandomDoa({ count });

      expect(response.status).toBe(200);
      apiHelper.validateHeaders(response.headers);
      
      if (count === 1) {
        // Single item should return as single object
        apiHelper.validateSingleDoaResponse(response.body);
      } else {
        // Multiple items should return as array
        apiHelper.validateBatchDoaResponse(response.body, count);
        
        // Validate uniqueness - no duplicate Doa
        apiHelper.validateUniqueness(response.body.data);
      }
    });
  });

  test('should return batch with count metadata', async () => {
    const count = 5;
    const response = await apiHelper.getRandomDoa({ count });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('count', count);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.length).toBe(count);
  });
});

test.describe('GetDoa Random API - Category Filtering', () => {
  let apiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new DoaAPIHelper(request);
  });

  test('should retrieve random Doa from specific category', async () => {
    const category = 'Forgiveness';
    const response = await apiHelper.getRandomDoa({ category });

    expect(response.status).toBe(200);
    apiHelper.validateSingleDoaResponse(response.body);
    
    // Validate the returned Doa belongs to the requested category
    apiHelper.validateCategory(response.body.data, category);
  });

  test('should retrieve batch of Doa from specific category', async () => {
    const category = 'Morning Supplication';
    const count = 3;
    const response = await apiHelper.getRandomDoa({ category, count });

    expect(response.status).toBe(200);
    apiHelper.validateBatchDoaResponse(response.body, count);
    
    // Validate all items belong to the requested category
    response.body.data.forEach(doa => {
      apiHelper.validateCategory(doa, category);
    });
  });

  test('should include category in response metadata', async () => {
    const category = 'Repentance';
    const count = 2;
    const response = await apiHelper.getRandomDoa({ category, count });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('category', category);
  });
});

test.describe('GetDoa Random API - Error Handling', () => {
  let apiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new DoaAPIHelper(request);
  });

  TestDataGenerator.getInvalidCountValues().forEach(({ count, description }) => {
    test(`should return 400 error for invalid count: ${description}`, async () => {
      const response = await apiHelper.getRandomDoa({ count });

      expect(response.status).toBe(400);
      apiHelper.validateErrorResponse(response.body);
      expect(response.body.error).toContain('Invalid count parameter');
    });
  });

  test('should handle non-existent category gracefully', async () => {
    const response = await apiHelper.getRandomDoa({ 
      category: 'NonExistentCategoryXYZ123' 
    });

    // API should either return 404 or no results
    if (response.status === 404) {
      apiHelper.validateErrorResponse(response.body);
      expect(response.body.error).toContain('No DOA found');
    } else if (response.status === 200) {
      // Some APIs might return empty results instead of 404
      expect(response.body.data).toBeNull();
    }
  });

  test('should handle malformed parameters', async () => {
    const response = await apiHelper.getRandomDoa({ 
      count: 'invalid',
      category: '' 
    });

    expect(response.status).toBe(400);
    apiHelper.validateErrorResponse(response.body);
  });
});

test.describe('GetDoa Random API - Data Integrity', () => {
  let apiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new DoaAPIHelper(request);
  });

  test('should have all required fields populated', async () => {
    const response = await apiHelper.getRandomDoa();

    expect(response.status).toBe(200);
    const doa = response.body.data;

    // Verify critical fields are not empty
    expect(doa.name_my.length).toBeGreaterThan(0);
    expect(doa.name_en.length).toBeGreaterThan(0);
    expect(doa.content.length).toBeGreaterThan(0);
    expect(doa.meaning_my.length).toBeGreaterThan(0);
    expect(doa.meaning_en.length).toBeGreaterThan(0);
    expect(doa.slug.length).toBeGreaterThan(0);
  });

  test('should have valid category structure', async () => {
    const response = await apiHelper.getRandomDoa();

    expect(response.status).toBe(200);
    const doa = response.body.data;

    // Category names should be array with at least one category
    expect(Array.isArray(doa.category_names)).toBe(true);
    expect(doa.category_names.length).toBeGreaterThan(0);
    
    // Each category should be a non-empty string
    doa.category_names.forEach(category => {
      expect(typeof category).toBe('string');
      expect(category.length).toBeGreaterThan(0);
    });
  });

  test('should have consistent bilingual content', async () => {
    const response = await apiHelper.getRandomDoa();

    expect(response.status).toBe(200);
    const doa = response.body.data;

    // Both languages should have content
    expect(doa.name_my).toBeTruthy();
    expect(doa.name_en).toBeTruthy();
    expect(doa.meaning_my).toBeTruthy();
    expect(doa.meaning_en).toBeTruthy();
  });

  test('should have valid slug format', async () => {
    const response = await apiHelper.getRandomDoa();

    expect(response.status).toBe(200);
    const doa = response.body.data;

    // Slug should be URL-friendly (lowercase, hyphens, no spaces)
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    expect(slugPattern.test(doa.slug)).toBe(true);
  });

  test('should maintain data consistency across multiple requests', async () => {
    const slugs = new Map();
    
    // Fetch 10 random Doa
    for (let i = 0; i < 10; i++) {
      const response = await apiHelper.getRandomDoa();
      expect(response.status).toBe(200);
      
      const doa = response.body.data;
      
      // Store first occurrence
      if (!slugs.has(doa.slug)) {
        slugs.set(doa.slug, doa);
      } else {
        // If we get the same Doa, verify content is identical
        const originalDoa = slugs.get(doa.slug);
        expect(doa.content).toBe(originalDoa.content);
        expect(doa.name_my).toBe(originalDoa.name_my);
        expect(doa.name_en).toBe(originalDoa.name_en);
      }
    }
  });
});

test.describe('GetDoa Random API - Edge Cases', () => {
  let apiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new DoaAPIHelper(request);
  });

  test('should handle empty query parameters', async () => {
    const response = await apiHelper.getRandomDoa({});

    expect(response.status).toBe(200);
    apiHelper.validateSingleDoaResponse(response.body);
  });

  test('should handle case-insensitive category names', async () => {
    const category = 'forgiveness';
    const response = await apiHelper.getRandomDoa({ category });

    // API should handle case-insensitively or return appropriate error
    expect([200, 404]).toContain(response.status);
  });

  test('should handle concurrent requests', async () => {
    const requests = Array.from({ length: 5 }, () => 
      apiHelper.getRandomDoa()
    );

    const responses = await Promise.all(requests);

    responses.forEach(response => {
      expect(response.status).toBe(200);
      apiHelper.validateSingleDoaResponse(response.body);
    });
  });
});

test.describe('GetDoa Random API - Performance', () => {
  let apiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new DoaAPIHelper(request);
  });

  test('should handle batch requests efficiently', async () => {
    const result = await PerformanceHelper.measureResponseTime(
      () => apiHelper.getRandomDoa({ count: 10 })
    );

    expect(result.status).toBe(200);
    
    // Batch of 10 should not take significantly longer than single request
    PerformanceHelper.validateResponseTime(result.responseTime, 5000);
    
    console.log(`Batch response time: ${result.responseTime}ms`);
  });

  test('should maintain performance with category filter', async () => {
    const result = await PerformanceHelper.measureResponseTime(
      () => apiHelper.getRandomDoa({ category: 'Forgiveness', count: 5 })
    );

    expect(result.status).toBe(200);
    PerformanceHelper.validateResponseTime(result.responseTime, 5000);
  });
});
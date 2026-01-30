/**
 * API Helper for GetDoa API Testing
 * Contains reusable functions, validation schemas, and utilities for API automation
 */

const { expect } = require('@playwright/test');

/**
 * Base configuration for API requests
 */
const API_CONFIG = {
  baseURL: 'https://getdoa.com',
  timeout: 30000,
  retries: 2,
};

/**
 * API endpoints
 */
const ENDPOINTS = {
  randomDoa: '/api/doa/random',
};

/**
 * Expected response schema for a single Doa object
 */
const DOA_SCHEMA = {
  name_my: 'string',
  name_en: 'string',
  content: 'string',
  reference_my: 'string',
  reference_en: 'string',
  meaning_my: 'string',
  meaning_en: 'string',
  category_names: 'array',
  slug: 'string',
  description_my: 'string',
  description_en: 'string',
  context_my: 'string',
  context_en: 'string',
};

/**
 * API Helper Class
 */
class DoaAPIHelper {
  constructor(request) {
    this.request = request;
    this.baseURL = API_CONFIG.baseURL;
  }

  /**
   * Make GET request to random Doa endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} Response object
   */
  async getRandomDoa(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${this.baseURL}${ENDPOINTS.randomDoa}${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.request.get(url, {
      timeout: API_CONFIG.timeout,
    });

    return {
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      body: await response.json().catch(() => null),
      response: response,
    };
  }

  /**
   * Validate response structure and data types
   * @param {Object} data - Response data to validate
   * @param {Object} schema - Expected schema
   */
  validateSchema(data, schema = DOA_SCHEMA) {
    Object.keys(schema).forEach(key => {
      expect(data).toHaveProperty(key);
      
      const expectedType = schema[key];
      const actualValue = data[key];

      switch (expectedType) {
        case 'string':
          expect(typeof actualValue).toBe('string');
          break;
        case 'number':
          expect(typeof actualValue).toBe('number');
          break;
        case 'array':
          expect(Array.isArray(actualValue)).toBeTruthy();
          break;
        case 'object':
          expect(typeof actualValue).toBe('object');
          expect(actualValue).not.toBeNull();
          break;
        default:
          throw new Error(`Unknown type: ${expectedType}`);
      }
    });
  }

  /**
   * Validate single Doa response structure
   * @param {Object} responseBody - API response body
   */
  validateSingleDoaResponse(responseBody) {
    expect(responseBody).toHaveProperty('data');
    expect(typeof responseBody.data).toBe('object');
    this.validateSchema(responseBody.data);
  }

  /**
   * Validate batch Doa response structure
   * @param {Object} responseBody - API response body
   * @param {number} expectedCount - Expected number of items
   */
  validateBatchDoaResponse(responseBody, expectedCount) {
    expect(responseBody).toHaveProperty('data');
    expect(responseBody).toHaveProperty('count');
    expect(Array.isArray(responseBody.data)).toBeTruthy();
    expect(responseBody.data.length).toBe(expectedCount);
    expect(responseBody.count).toBe(expectedCount);

    // Validate each item in the array
    responseBody.data.forEach(doa => {
      this.validateSchema(doa);
    });
  }

  /**
   * Validate error response structure
   * @param {Object} responseBody - API response body
   */
  validateErrorResponse(responseBody) {
    expect(responseBody).toHaveProperty('error');
    expect(typeof responseBody.error).toBe('string');
    expect(responseBody.error.length).toBeGreaterThan(0);
  }

  /**
   * Validate content is not empty
   * @param {Object} doa - Doa object
   */
  validateDoaContent(doa) {
    // Critical fields should not be empty
    expect(doa.name_my).toBeTruthy();
    expect(doa.name_en).toBeTruthy();
    expect(doa.content).toBeTruthy();
    expect(doa.meaning_my).toBeTruthy();
    expect(doa.meaning_en).toBeTruthy();
    expect(doa.slug).toBeTruthy();
    
    // Category names should be an array with at least one item
    expect(doa.category_names.length).toBeGreaterThan(0);
    doa.category_names.forEach(category => {
      expect(typeof category).toBe('string');
      expect(category.length).toBeGreaterThan(0);
    });
  }

  /**
   * Validate response headers
   * @param {Object} headers - Response headers
   */
  validateHeaders(headers) {
    expect(headers['content-type']).toContain('application/json');
  }

  /**
   * Validate category filter works correctly
   * @param {Object} doa - Doa object
   * @param {string} expectedCategory - Expected category name
   */
  validateCategory(doa, expectedCategory) {
    const hasCategory = doa.category_names.some(
      category => category.toLowerCase() === expectedCategory.toLowerCase()
    );
    expect(hasCategory).toBeTruthy();
  }

  /**
   * Validate all items in batch are unique
   * @param {Array} doaList - Array of Doa objects
   */
  validateUniqueness(doaList) {
    const slugs = doaList.map(doa => doa.slug);
    const uniqueSlugs = [...new Set(slugs)];
    expect(slugs.length).toBe(uniqueSlugs.length);
  }

  /**
   * Log API response for debugging
   * @param {Object} response - API response
   * @param {string} testName - Name of the test
   */
  logResponse(response, testName) {
    console.log(`\n=== ${testName} ===`);
    console.log(`Status: ${response.status}`);
    console.log(`Headers:`, response.headers);
    console.log(`Body:`, JSON.stringify(response.body, null, 2));
  }
}

/**
 * Test data generators
 */
class TestDataGenerator {
  /**
   * Get valid test categories
   */
  static getValidCategories() {
    return [
      'Morning Supplication',
      'Evening Supplication',
      'Forgiveness',
      'Repentance',
    ];
  }

  /**
   * Get invalid test parameters
   */
  static getInvalidCountValues() {
    return [
      { count: 0, description: 'zero' },
      { count: -1, description: 'negative' },
      { count: 11, description: 'greater than max (10)' },
      { count: 'abc', description: 'non-numeric string' },
      { count: 1.5, description: 'decimal number' },
    ];
  }

  /**
   * Get valid count values
   */
  static getValidCountValues() {
    return [1, 2, 5, 10];
  }
}

/**
 * Performance measurement utilities
 */
class PerformanceHelper {
  /**
   * Measure response time
   * @param {Function} apiCall - API call function
   * @returns {Promise<Object>} Response with timing information
   */
  static async measureResponseTime(apiCall) {
    const startTime = Date.now();
    const response = await apiCall();
    const endTime = Date.now();
    const duration = endTime - startTime;

    return {
      ...response,
      responseTime: duration,
    };
  }

  /**
   * Validate response time is within acceptable range
   * @param {number} responseTime - Response time in milliseconds
   * @param {number} maxTime - Maximum acceptable time in milliseconds
   */
  static validateResponseTime(responseTime, maxTime = 3000) {
    expect(responseTime).toBeLessThan(maxTime);
  }
}

module.exports = {
  API_CONFIG,
  ENDPOINTS,
  DOA_SCHEMA,
  DoaAPIHelper,
  TestDataGenerator,
  PerformanceHelper,
};
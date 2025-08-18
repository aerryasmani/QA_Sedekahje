import { test, expect } from '@playwright/test';

test('Go to homepage', async ({ page }) => {
  await page.goto('/'); // no need to repeat baseURL
  await expect(page).toHaveTitle(/Sedekah Je/); 
});

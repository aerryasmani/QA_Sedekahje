import { test, expect } from '@playwright/test';

test('Homepage is Present', async ({ page }) => {
  await page.goto('/'); // no need to repeat baseURL
  await expect(page).toHaveTitle(/Sedekah Je/); 
});

test('Sedekahje Logo is Present', async ({ page }) => {
  await page.goto('/'); // 
  
  // locate the image (by alt text, id, or class)
  const logo = page.locator('img[alt="Logo"]');

  // check it's present in the DOM
  await expect(logo).toHaveCount(1);

  // check it's visible to the user
  await expect(logo).toBeVisible();

});
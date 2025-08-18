import { test, expect } from '@playwright/test';

test.describe('Homepage Component', () => {
    test('Homepage is Present', async ({ page }) => {
    await page.goto('/'); // baseURL is already set
    await expect(page).toHaveTitle(/Sedekah Je/); 
  });

  test('Sedekahje Logo is Visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000); // wait 2 seconds
    const logo = page.locator('img[alt="Masjid"][width="100"][height="100"]');
    await expect(logo).toBeVisible();
  });

});

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

  test('Sedekahje Header and Subheader are present', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000); // wait 2 seconds
    await expect(page.getByText('Senarai QR masjid, surau, dan institusi.')).toBeVisible();
  });

  test('Sedekahjer Institute Button are Present', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000); // wait 2 seconds
    
  });

});

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

  test('Sedekahjer Institutes Button are Present', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000); // wait 2 seconds
    
 // Define categories to test
  const categories = [
    { name: 'Masjid', iconAlt: 'Masjid' },
    { name: 'Surau', iconAlt: 'Surau' },
    { name: 'Lain-lain', iconAlt: 'Lain-lain' }
  ];

  for (const { name, iconAlt } of categories) {
    const button = page.locator(`button:has-text("${name}")`);
    const icon = page.locator(`img[alt="${iconAlt}"][width="24"][height="24"]`);

    await expect(button, `${name} button should be visible`).toBeVisible();
    await expect(icon, `${name} icon should be visible`).toBeVisible();
  }

  });

});

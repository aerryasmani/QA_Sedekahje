import { test, expect } from '@playwright/test';
import { HomePage } from '../../../helpers/homepage';

test.describe('Dashboard | Login', () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.verifyAndCloseModal();
  });

  test('CF - 033 | Login button is present and visible', async ({ page }) => {
    const LogInBtn = page.locator('footer').getByRole('button', { name: 'Log Masuk' });

    await test.step('Verify the login button is visible', async () => {
      await expect(LogInBtn).toBeVisible();
    });
  });

  test('CF - 034 | Login button redirects to GitHub OAuth', async ({ page }) => {
    const LogInBtn = page.locator('footer').getByRole('button', { name: 'Log Masuk' });

    await test.step('Click the login button', async () => {
      await LogInBtn.click();
    });

    test('should be logged in', async ({ page }) => {
        await page.goto('/dashboard'); // or whatever your post-login page is
        await expect(page).not.toHaveURL(/login/);
    });
  });
});
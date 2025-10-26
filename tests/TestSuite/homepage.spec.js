import { test, expect } from '@playwright/test';

const BaseURL = 'https://sedekah.je/';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

//------- Helper Function for URL ------//

async function VerifyPageTitle (page) {
  await expect(page).toHaveTitle(PageTitle);
}

async function VerifyLogoVisibility (page) {

const LogoLocator = page.locator('img[alt="Masjid"]');

// ✅ Check visibility
await expect(LogoLocator).toBeVisible({ timeout: 10000 });

// ✅ Check attributes
await expect(LogoLocator).toHaveAttribute('alt', 'Masjid');
await expect(LogoLocator).toHaveAttribute('src', '/masjid.svg');
await expect(LogoLocator).toHaveAttribute('width', '100');
await expect(LogoLocator).toHaveAttribute('height', '100');
await expect(LogoLocator).toHaveAttribute('loading', 'lazy');


}

// Setup
test.beforeEach(async ({ page }) => {
  await page.goto(BaseURL);
});


//------- Test Cases ------//

test('CF-001 | Homepage | Title displays correctly on page load', async ({ page }) => {
  await VerifyPageTitle(page);
});


test('CF-002 | Homepage | Should display logo correctly on page load', async ({ page }) => {
  await VerifyLogoVisibility(page);

});
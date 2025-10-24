import { test, expect } from '@playwright/test';

const BaseURL = 'https://sedekah.je/';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

//------- Helper Function for URL ------//

async function VerifyPageTitle (page) {
  await expect(page).toHaveTitle(PageTitle);
}

// Setup
test.beforeEach(async ({ page }) => {
  await page.goto(BaseURL);
});


//------- Test Cases ------//

test('CF-001 | Homepage displays correct title', async ({ page }) => {
  await VerifyPageTitle(page);
});
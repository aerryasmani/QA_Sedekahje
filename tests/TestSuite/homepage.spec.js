import { test, expect } from '@playwright/test';  
import { HomePage } from '../../helpers/homepage'; 

const baseURL = 'https://sedekah.je/';

test.beforeEach(async ({ page, browserName }) => {
  const homePage = new HomePage(page); 
  
  // Add retry logic for Firefox network issues
  try {
    await homePage.navigate();
    await homePage.verifyAndCloseModal();
  } catch (error) {
    if (browserName === 'firefox' && (error.message.includes('NS_ERROR_UNKNOWN_HOST') || error.message.includes('Network'))) {
      console.log(`Firefox network issue detected, retrying navigation for ${browserName}...`);
      await page.waitForTimeout(2000); // Wait 2 seconds before retry
      await homePage.navigate();
      await homePage.verifyAndCloseModal();
    } else {
      throw error;
    }
  }
});

test.setTimeout(300000);

test.describe('Homepage Tests', () => {
  test('CF-002 | Homepage | Title displays correctly on page load', async ({ page }) => {
    const homePage = new HomePage(page);  
    await homePage.verifyPageTitle();
  });

  test('CF-003 | Homepage | Should display logo correctly on page load', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.verifyLogo();
  });

  test('CF-004 | Homepage | Mode toggle display correctly on page load', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.toggleTheme();
  });

  test('CF-005 | Homepage | Institution Buttons display and function correctly', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.verifyOrganizationButtons();
  });

  test('CF-006 | Homepage | Dropdown display correctly on page load', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.verifyDropdown();
  });

  test('CF-007 | Homepage | Searchbar display correctly on page load', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.searchForPlace('Masjid Taman Pulai Indah');
    await homePage.verifySearchResult('Masjid Taman Pulai Indah');
  });
});  
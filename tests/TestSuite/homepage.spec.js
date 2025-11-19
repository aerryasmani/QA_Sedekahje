import { test, expect } from '@playwright/test';
import {VerifyModalPopup,VerifyPageTitle,VerifyLogoVisibility,VerifyToogleButton,VerifyOrgButton,VerifyDropdown,DropdownFunctionality,VerifySearchbar,VerifySearchbar_Result,} from '../../helpers/homepage';
import {VerifySurauButton,VerifyCard_Result,VerifyCard_PetaButton,VerifyFooter_BrandSection,VerifyFooter_Socmedia} from '../../helpers/SurauCardDetail';


const BaseURL = 'https://sedekah.je/';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

// Setup
test.beforeEach(async ({ page }) => {
  await page.goto(BaseURL);
  await VerifyModalPopup(page);
});


//------- Test Cases ------//
test.setTimeout(300000);

/*test('CF-001 | Pop up | Notification Modal is present and visible', async ({ page }) => {
  await VerifyModalPopup(page);
});*/


test('CF-002 | Homepage | Title displays correctly on page load', async ({ page }) => {
  await VerifyPageTitle(page);
});

test('CF-003 | Homepage | Should display logo correctly on page load', async ({ page }) => {
  await VerifyLogoVisibility(page);
});


test('CF-004 | Homepage | Mode toogle display correctly on page load', async ({ page }) => {
  await VerifyToogleButton(page);
});

test('CF-005 | Homepage | Institution Buttons display and function correctly on page load', async ({ page }) => {
  await VerifyOrgButton(page);
});


test('CF-006 | Homepage | Dropdown display correctly on page load', async ({ page }) => {
  await VerifyDropdown(page);
  await DropdownFunctionality(page)

});

test('CF-007 | Homepage | Searchbar display correctly on page load', async ({ page }) => {
  await VerifySearchbar(page);
  await VerifySearchbar_Result(page);
});

test('CF-008 | Homepage | Surau button display and working correctly on page load', async ({ page }) => {
  await VerifySurauButton(page);
  await VerifyCard_Result(page);
});

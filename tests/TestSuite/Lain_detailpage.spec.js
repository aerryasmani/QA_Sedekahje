import { test, expect } from '@playwright/test';
import {VerifyModalPopup,VerifyPageTitle,VerifyLogoVisibility,VerifyToogleButton,VerifyOrgButton,VerifyDropdown,DropdownFunctionality,VerifySearchbar,VerifySearchbar_Result,} from '../../helpers/homepage';
import {VerifySurauButton,VerifyCard_Result,VerifyCard_PetaButton,VerifyFooter} from '../../helpers/SurauCardDetail';
import {VerifyLainButton} from '../../helpers/LainCardDetail';

const BaseURL = 'https://sedekah.je/';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

// Setup
test.beforeEach(async ({ page }) => {
  await page.goto(BaseURL);
  await VerifyModalPopup(page);
});

test('CF-01 | Lain Detail Page | Title displays correctly on page load', async ({ page }) => {
  await VerifyPageTitle(page);
});
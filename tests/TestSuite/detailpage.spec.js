import { test, expect } from '@playwright/test';
import {VerifySurauButton,VerifyCard_Result} from '../helpers/CardDetail';
import {VerifyModalPopup,VerifyPageTitle,VerifyLogoVisibility,VerifyToogleButton,VerifyOrgButton,VerifyDropdown,DropdownFunctionality,VerifySearchbar,VerifySearchbar_Result} from '../helpers/homepage';

const BaseURL = 'https://sedekah.je/';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

// Setup
test.beforeEach(async ({ page }) => {
  await page.goto(BaseURL);
  await VerifyModalPopup(page);
});


test('CF - 011 | Detail Page | Card Detail Page Is Present', async ({page}) =>{
 await VerifySurauButton(page);
 await VerifyCard_Result(page);

});

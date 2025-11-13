import { test, expect } from '@playwright/test';
import {VerifySurauButton,VerifyCard_Result,VerifyCard_PetaButton,VerifyPetaButton_Result} from '../../helpers/CardDetail';
import {VerifyModalPopup,VerifyPageTitle,VerifyLogoVisibility,VerifyToogleButton,VerifyOrgButton,VerifyDropdown,DropdownFunctionality,VerifySearchbar,VerifySearchbar_Result} from '../../helpers/homepage';

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

test ('CF - 012 | Detail Page | Peta buttonpxn is present and visible',async({page}) => {
  await VerifySurauButton(page);
  await VerifyCard_Result(page);
  await VerifyCard_PetaButton(page);
  await VerifyPetaButton_Result(page);
});

test ('CF - 013| Detail Page| Hadis Section is present',async ({page}) => {
  await VerifySurauButton(page);
  await VerifyCard_Result(page);
  await VerifyCard_PetaButton(page);
  

});
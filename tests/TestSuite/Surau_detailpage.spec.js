import { test, expect } from '@playwright/test';
import {VerifySurauButton,VerifyCard_Result,VerifyCard_PetaButton,VerifyPetaButton_Result,VerifyCard_GetDoa,VerifyFooter_BrandSection,VerifyFooter_Socmedia,VerifySurau_Flow,VerifyFooter_RujukanLinks} from '../../helpers/SurauCardDetail';
import {VerifyModalPopup,VerifyPageTitle,VerifyLogoVisibility,VerifyToogleButton,VerifyOrgButton,VerifyDropdown,DropdownFunctionality,VerifySearchbar,VerifySearchbar_Result} from '../../helpers/homepage';

const BaseURL = 'https://sedekah.je/';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

// Setup
test.beforeEach(async ({ page }) => {
  await page.goto(BaseURL);
  await VerifyModalPopup(page);
});

test('CF - 011 | Surau Detail Page | Card Detail Page Is Present', async ({page}) =>{
 await VerifySurauButton(page);
 await VerifyCard_Result(page);
});

test ('CF - 012 | Surau Detail Page | Peta buttonpxn is present and visible',async({page}) => {
  await VerifySurauButton(page);
  await VerifyCard_Result(page);
  await VerifyCard_PetaButton(page);
  await VerifyPetaButton_Result(page);
});

test ('CF - 013| Surau Detail Page| Doa Section is present',async ({page}) => {
  await VerifySurauButton(page);
  await VerifyCard_Result(page);
  await VerifyCard_PetaButton(page);
  await VerifyCard_GetDoa(page);

});

test ('CF - 014| Surau Detail Page| Footer Section is present',async ({page}) => {
  await VerifySurauButton(page);
  await VerifyCard_Result(page);
  await VerifyCard_PetaButton(page);
  await VerifyFooter_BrandSection(page);
  await VerifyFooter_Socmedia (page);
});


test('CF - 014b | Footer Social Media is present', async ({page}) => {
  await VerifySurau_Flow(page);
  await VerifyFooter_Socmedia(page);
});

test('CF - 014c | Footer Rujukan Links are present', async ({page}) => {
  await VerifySurau_Flow(page);
  await VerifyFooter_RujukanLinks(page);
});
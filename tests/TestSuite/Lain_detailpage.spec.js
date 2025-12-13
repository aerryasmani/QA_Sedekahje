import { test, expect } from '@playwright/test';
import {VerifyModalPopup,VerifyPageTitle,VerifyLogoVisibility,VerifyToogleButton,VerifyOrgButton,VerifyDropdown,DropdownFunctionality,VerifySearchbar,VerifySearchbar_Result,} from '../../helpers/homepage';
import {VerifySurauButton,VerifyCard_Result,VerifyCard_PetaButton,VerifyFooter_BrandSection,VerifyFooter_Socmedia,VerifyCard_GetDoa} from '../../helpers/SurauCardDetail';
import {VerifyLainButton,VerifyLainCard_Result,VerifyCardLain_PetaButton} from '../../helpers/LainCardDetail';

const BaseURL = 'https://sedekah.je/';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

// Setup
test.beforeEach(async ({ page }) => {
  await page.goto(BaseURL);
  await VerifyModalPopup(page);
});

test('CF-018 | Lain Detail Page |  Lain-lain button is present and visible', async ({ page }) => {
  await VerifyLainButton(page);
  await VerifyLainCard_Result(page);
  await VerifyCardLain_PetaButton(page);
});

test('CF-019 | Lain Detail Page | Lain Detail Card is present and visible', async ({ page }) => {
  await VerifyLainButton(page);
  await VerifyLainCard_Result(page);
  await VerifyCardLain_PetaButton(page);
});

test('CF-020 | Lain Detail Page | Peta button is present and visible in the detail page', async ({ page }) => {
  await VerifyLainButton(page);
  await VerifyLainCard_Result(page);
  await VerifyCardLain_PetaButton(page);
});

test ('CF - 021 | Lain Detail Page | Doa Section is present',async ({page}) => {
  await VerifySurauButton(page);
  await VerifyCard_Result(page);
  await VerifyCard_PetaButton(page);
  await VerifyCard_GetDoa(page);

});

test ('CF - 022 | Lain Detail Page | Footer Section is present',async ({page}) => {
  await VerifySurauButton(page);
  await VerifyCard_Result(page);
  await VerifyCard_PetaButton(page);
  await VerifyFooter_BrandSection(page);
  await VerifyFooter_Socmedia (page);
});

test('CF - 023 | Footer Social Media is present', async ({page}) => {
  await VerifySurau_Flow(page);
  await VerifyFooter_Socmedia(page);
});

test('CF - 024 | Footer Rujukan Links are present', async ({page}) => {
  await VerifySurau_Flow(page);
  await VerifyFooter_RujukanLinks(page);
});

test('CF - 025 | Footer Project Komuniti Links are present', async ({page}) => {
  await VerifySurau_Flow(page);
  await VerifyFooter_ProjectKomuniti(page);
});
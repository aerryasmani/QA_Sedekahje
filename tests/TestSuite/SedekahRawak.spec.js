import { test, expect } from '@playwright/test';
import { VerifyModalPopup } from '../../helpers/homepage'; // Removed unused imports from homepage
import {
  VerifySurauButton,
  VerifyCard_Result,
  VerifyCard_PetaButton,
  VerifyFooter_BrandSection,
  VerifyFooter_Socmedia,
  VerifyCard_GetDoa,
  VerifyFooter_RujukanLinks,
  VerifyFooter_ProjectKomuniti,
} from '../../helpers/SurauCardDetail';
import {
  VerifyLainButton,
  VerifyLainCard_Result,
  LainCard_Expand,
  VerifyCardLain_PetaButton,
} from '../../helpers/LainCardDetail';
import{
RawakButton,
RawakButton_functionality,
RawakButton_2,
} from '../../helpers/SedekahRawak';

const BaseURL = 'https://sedekah.je/';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

// Setup
test.beforeEach(async ({ page }) => {
  await page.goto(BaseURL);
  await VerifyModalPopup(page);
});

test.describe('Randomizer features', () => {
  test('CF-025 | Randomizer Detail Page| Verify the Sedekah Rawak Button is present and visible', async ({ page }) => {
    await RawakButton(page);
  });

  test('CF-026 | Randomizer Detail Page | Verify the Randomizer button functionality', async ({ page }) => {
    await RawakButton(page);
    await RawakButton_functionality(page);
  });

  test('CF-027 | Randomizer Detail Page | Verify the Second Randomizer button functionality', async ({ page }) => {
    await RawakButton(page);
    await RawakButton_functionality(page);
    await RawakButton_2(page);
  });
});

test.describe('GetDoa Section', () => {
  test('CF-028 | Randomizer Page| Verify GetDoa Sections are Present', async ({ page }) => {
    await RawakButton_functionality(page);
    await VerifyCard_GetDoa(page);
  });
});

test.describe('Randomizer Footer', () => {
  test('CF-029 | Randomizer Page| Verify Footer Sections are Present', async ({ page }) => {
    await RawakButton_functionality(page);
    await VerifyFooter_BrandSection(page);
  });

  test('CF-030 | Randomizer Page| Verify Footer Social Media column are Present and visible', async ({ page }) => {
    await RawakButton_functionality(page);
    await VerifyFooter_Socmedia(page);
  });

  test('CF-031 | Randomizer | Verify Footer Runjukan column are Present and visible', async ({ page }) => {
    await RawakButton_functionality(page);
    await VerifyFooter_RujukanLinks(page);
  });

  test('CF-032 | Randomizer | Verify the Second Randomizer button functionality', async ({ page }) => {
    await RawakButton(page);
    await RawakButton_functionality(page);
    await VerifyFooter_ProjectKomuniti(page);
  });
});


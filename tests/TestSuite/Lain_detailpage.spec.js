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

const BaseURL = 'https://sedekah.je/';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

// Shared setup for all tests
test.beforeEach(async ({ page }) => {
  await page.goto(BaseURL);
  await VerifyModalPopup(page);
});

// Group Lain Detail Page related tests
test.describe('Lain Detail Page Tests', () => {
  test('CF-018 | Lain Detail Page | Lain-lain button is present and visible', async ({ page }) => {
    await VerifyLainButton(page);
    await VerifyLainCard_Result(page);
  });

  test('CF-019 | Lain Detail Page | Lain Detail Card is present and visible', async ({ page }) => {
    await test.step('Verify Lain-lain button is visible and accepts input', async () => {
      await VerifyLainButton(page);
    });

    await test.step('Card Filtered and Expand', async () => {
      await VerifyLainCard_Result(page);
    });

    await test.step('Button is present', async () => {
      await VerifyCardLain_PetaButton(page);
    });
  });

  test('CF-020 | Lain Detail Page | Peta button is present and visible in the detail page', async ({ page }) => {
    await VerifyLainButton(page);
    await VerifyLainCard_Result(page);
    await VerifyCardLain_PetaButton(page);
  });

  test('CF-021 | Verify Doa Section is present in Lain Detail Page', async ({ page }) => {
    await test.step('Navigate to Lain-lain section', async () => {
      await VerifyLainButton(page);
    });

    await test.step('Verify card results are filtered and visible', async () => {
      await VerifyLainCard_Result(page);
    });

    await test.step('Expand the Lain card', async () => {
      await LainCard_Expand(page);
    });
    
    await test.step('Verify Doa section is present', async () => {
      await VerifyCard_GetDoa(page);
    });
  });
});

// Group Footer related tests
test.describe('Lain Lain Footer Section', () => {
  test('CF-022 | Footer Social Media is present', async ({ page }) => {
    await test.step('Verify Lain-lain button is visible and accepts input', async () => {
      await VerifyLainButton(page);
    });

    await test.step('Verify card is filtered according to lain-lain button', async () => {
      await VerifyLainCard_Result(page);
      await LainCard_Expand(page);
    });

    await test.step('Verify Footer Sections are Present', async () => {
      await VerifyFooter_BrandSection(page);
      await VerifyFooter_Socmedia(page); // Fixed space in call
    });
  });

  test('CF-023 | Footer Rujukan Link is present', async ({ page }) => {
    await test.step('Verify Lain-lain button is visible and accepts input', async () => {
      await VerifyLainButton(page);
    });

    await test.step('Verify card is filtered according to lain-lain button', async () => {
      await VerifyLainCard_Result(page);
      await LainCard_Expand(page);
    });

    await test.step('Verify Footer Sections are Present', async () => {
      await VerifyFooter_RujukanLinks(page);
    });
  });

  test('CF-024 | Footer Project Komuniti is present', async ({ page }) => {
    await test.step('Verify Lain-lain button is visible and accepts input', async () => {
      await VerifyLainButton(page);
    });

    await test.step('Verify card is filtered according to lain-lain button', async () => {
      await VerifyLainCard_Result(page);
      await LainCard_Expand(page);
    });

    await test.step('Verify Project Komuniti Sections are Present', async () => {
      await VerifyFooter_ProjectKomuniti(page); // Fixed double semicolon
    });
  });
});
import { test } from '@playwright/test';
import { HomePage } from '../../helpers/homepage'; 
import { LainCardDetailPage } from '../../helpers/LainCardDetail';
import { SurauCardDetailPage } from '../../helpers/SurauCardDetail';

const baseURL = 'https://sedekah.je/';

// Shared setup for all tests
test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.verifyAndCloseModal();
});

test.setTimeout(300000);

// Group Lain Detail Page related tests
test.describe('Lain Detail Page Tests', () => {
  
  test('CF-018 | Lain Detail Page | Lain-lain button is present and visible', async ({ page }) => {
    const lainPage = new LainCardDetailPage(page);
    await lainPage.navigateToLainSection();
  });

  test('CF-019 | Lain Detail Page | Lain Detail Card is present and visible', async ({ page }) => {
    const lainPage = new LainCardDetailPage(page);

    await test.step('Verify Lain-lain button is visible and accepts input', async () => {
      await lainPage.clickLainButton();
    });

    await test.step('Card Filtered and Expand', async () => {
      await lainPage.verifyLainCardResult();
    });

    await test.step('Button is present', async () => {
      await lainPage.verifyAndClickPetaButton();
    });
  });

  test('CF-020 | Lain Detail Page | Peta button is present and visible in the detail page', async ({ page }) => {
    const lainPage = new LainCardDetailPage(page);
    await lainPage.navigateAndVerifyPeta();
  });

  test('CF-021 | Verify Doa Section is present in Lain Detail Page', async ({ page }) => {
    const lainPage = new LainCardDetailPage(page);
    const surauPage = new SurauCardDetailPage(page); 

    await test.step('Navigate to Lain-lain section', async () => {
      await lainPage.clickLainButton();
    });

    await test.step('Verify card results are filtered and visible', async () => {
      await lainPage.verifyLainCardResult();
    });

    await test.step('Expand the Lain card', async () => {
      await lainPage.expandLainCard();
    });
    
    await test.step('Verify Doa section is present', async () => {
      await surauPage.verifyCardGetDoa(); 
    });
  });
});

// Group Footer related tests
test.describe('Lain Lain Footer Section', () => {
  
  test('CF-022 | Footer Social Media is present', async ({ page }) => {
    const lainPage = new LainCardDetailPage(page);
    const surauPage = new SurauCardDetailPage(page);

    await test.step('Verify Lain-lain button is visible and accepts input', async () => {
      await lainPage.clickLainButton();
    });

    await test.step('Verify card is filtered according to lain-lain button', async () => {
      await lainPage.verifyLainCardResult();
      await lainPage.expandLainCard();
    });

    await test.step('Verify Footer Sections are Present', async () => {
      await surauPage.verifyFooterBrandSection(); 
      await surauPage.verifyFooterSocmedia();      
    });
  });

  test('CF-023 | Footer Rujukan Link is present', async ({ page }) => {
    const lainPage = new LainCardDetailPage(page);
    const surauPage = new SurauCardDetailPage(page); 

    await test.step('Verify Lain-lain button is visible and accepts input', async () => {
      await lainPage.clickLainButton();
    });

    await test.step('Verify card is filtered according to lain-lain button', async () => {
      await lainPage.verifyLainCardResult();
      await lainPage.expandLainCard();
    });

    await test.step('Verify Footer Sections are Present', async () => {
      await surauPage.verifyFooterRujukanLinks(); 
    });
  });

  test('CF-024 | Footer Project Komuniti is present', async ({ page }) => {
    const lainPage = new LainCardDetailPage(page);
    const surauPage = new SurauCardDetailPage(page);

    await test.step('Verify Lain-lain button is visible and accepts input', async () => {
      await lainPage.clickLainButton();
    });

    await test.step('Verify card is filtered according to lain-lain button', async () => {
      await lainPage.verifyLainCardResult();
      await lainPage.expandLainCard();
    });

    await test.step('Verify Project Komuniti Sections are Present', async () => {
      await surauPage.verifyFooterProjectKomuniti(); 
    });
  });
});
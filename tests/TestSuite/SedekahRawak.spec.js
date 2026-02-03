import { test } from '@playwright/test';
import { HomePage } from '../../helpers/homepage';
import { SedekahRawak } from '../../helpers/SedekahRawak';
import { SurauCardDetailPage } from '../../helpers/SurauCardDetail';

const baseURL = 'https://sedekah.je/';

// Setup
test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.verifyAndCloseModal();
});

test.setTimeout(300000);

test.describe('Randomizer Features', () => {
  
  test('CF-025 | Randomizer Detail Page | Verify the Sedekah Rawak Button is present and visible', async ({ page }) => {
    const rawakPage = new SedekahRawak(page);
    await rawakPage.verifySedekahRawakButton();
  });

  test('CF-026 | Randomizer Detail Page | Verify the Randomizer button functionality', async ({ page }) => {
    const rawakPage = new SedekahRawak(page);
    await rawakPage.navigateToRandomizer();
  });

  test('CF-027 | Randomizer Detail Page | Verify the Second Randomizer button functionality', async ({ page }) => {
    const rawakPage = new SedekahRawak(page);
    await rawakPage.openAndTestRandomizer();
  });
});

test.describe('GetDoa Section', () => {
  
  test('CF-028 | Randomizer Page | Verify GetDoa Sections are Present', async ({ page }) => {
    const rawakPage = new SedekahRawak(page);
    const surauPage = new SurauCardDetailPage(page);
    
    await test.step('Navigate to randomizer', async () => {
      await rawakPage.clickSedekahRawakButton();
    });

    await test.step('Verify GetDoa section is present', async () => {
      await surauPage.verifyCardGetDoa();
    });
  });
});

test.describe('Randomizer Footer', () => {
  
  test('CF-029 | Randomizer Page | Verify Footer Sections are Present', async ({ page }) => {
    const rawakPage = new SedekahRawak(page);
    const surauPage = new SurauCardDetailPage(page);
    
    await test.step('Navigate to randomizer', async () => {
      await rawakPage.clickSedekahRawakButton();
    });

    await test.step('Verify footer brand section', async () => {
      await surauPage.verifyFooterBrandSection();
    });
  });

  test('CF-030 | Randomizer Page | Verify Footer Social Media column are Present and visible', async ({ page }) => {
    const rawakPage = new SedekahRawak(page);
    const surauPage = new SurauCardDetailPage(page);
    
    await test.step('Navigate to randomizer', async () => {
      await rawakPage.clickSedekahRawakButton();
    });

    await test.step('Verify footer social media section', async () => {
      await surauPage.verifyFooterSocmedia();
    });
  });

  test('CF-031 | Randomizer | Verify Footer Rujukan column are Present and visible', async ({ page }) => {
    const rawakPage = new SedekahRawak(page);
    const surauPage = new SurauCardDetailPage(page);
    
    await test.step('Navigate to randomizer', async () => {
      await rawakPage.clickSedekahRawakButton();
    });

    await test.step('Verify footer rujukan links', async () => {
      await surauPage.verifyFooterRujukanLinks();
    });
  });

  test('CF-032 | Randomizer | Verify Footer Project Komuniti section is present', async ({ page }) => {
    const rawakPage = new SedekahRawak(page);
    const surauPage = new SurauCardDetailPage(page);
    
    await test.step('Navigate to randomizer', async () => {
      await rawakPage.clickSedekahRawakButton();
    });

    await test.step('Verify footer project komuniti section', async () => {
      await surauPage.verifyFooterProjectKomuniti();
    });
  });
});
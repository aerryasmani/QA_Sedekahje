import { test } from '@playwright/test';
import { HomePage } from '../../helpers/homepage'; 
import { SurauCardDetailPage } from '../../helpers/SurauCardDetail';

const baseURL = 'https://sedekah.je/';

// Setup
test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.verifyAndCloseModal(); 
});

test.describe('Surau Detail Page Test', () => {
  test('CF - 011 | Surau Detail Page | Card Detail Page Is Present', async ({ page }) => {
    const surauPage = new SurauCardDetailPage(page);

    await test.step('Verify the Surau Button functionality', async () => {
      await surauPage.verifySurauButton();
    });
    
    await test.step('Verify the Surau detail page is present', async () => {
      await surauPage.verifyCardResult();
    });
  });

  test('CF - 012 | Surau Detail Page | Peta button is present and visible', async ({ page }) => {
    const surauPage = new SurauCardDetailPage(page);
    
    await test.step('Verify the Surau Button functionality', async () => {
      await surauPage.verifySurauButton();
    });
    
    await test.step('Verify the Surau Detail Page Is Present & Visible', async () => {
      await surauPage.verifyCardResult();
    });

    await test.step('Verify the Surau Button is present and functional', async () => {
      await surauPage.verifyCardPetaButton();
    });

    await test.step('Verify the Peta Button is present and functional', async () => {
      await surauPage.verifyPetaButtonResult();
    });
  });

  test('CF - 013| Surau Detail Page| Doa Section is present', async ({ page }) => {
    const surauPage = new SurauCardDetailPage(page);
    
    await test.step('Verify the Surau Button functionality', async () => {
      await surauPage.verifySurauButton();
    });
    
    await test.step('Verify the Surau Detail Page Is Present & Visible', async () => {
      await surauPage.verifyCardResult();
    });

    await test.step('Verify the Surau Detail Page Click', async () => {
      await surauPage.surauCardExpand();
    });

    await test.step('Verify the GetDoa Section is present', async () => {
      await surauPage.verifyCardGetDoa();
    });
  });
});

test.describe('Surau Detail Page Footer Test', () => {
  test('CF - 014| Surau Detail Page| Footer Section is present', async ({ page }) => {
    const surauPage = new SurauCardDetailPage(page);
    
    await test.step('Verify the Surau Button functionality', async () => {
      await surauPage.verifySurauButton();
    });
    
    await test.step('Verify the Surau Detail Page Is Present & Visible', async () => {
      await surauPage.verifyCardResult();
      await surauPage.surauCardExpand();
    });

    await test.step('Verify the Brand Section is present', async () => {
      await surauPage.verifyFooterBrandSection();
    });
  });

  test('CF - 015 | Footer Social Media is present', async ({ page }) => {
    const surauPage = new SurauCardDetailPage(page);
    
    await test.step('Verify the Surau Button functionality', async () => {
      await surauPage.verifySurauButton();
    });
    
    await test.step('Verify the Surau Detail Page Is Present & Visible', async () => {
      await surauPage.verifyCardResult();
      await surauPage.surauCardExpand();
    });

    await test.step('Verify the Brand Section is present', async () => {
      await surauPage.verifyFooterBrandSection();
    });

    await test.step('Verify the Social Media Section is present', async () => {
      await surauPage.verifyFooterSocmedia();
    });
  });

  test('CF - 016| Footer Rujukan Links are present', async ({ page }) => {
    const surauPage = new SurauCardDetailPage(page);
    
    await test.step('Verify the Surau Button functionality', async () => {
      await surauPage.verifySurauButton();
    });
    
    await test.step('Verify the Surau Detail Page Is Present & Visible', async () => {
      await surauPage.verifyCardResult();
      await surauPage.surauCardExpand();
    });

    await test.step('Verify the Brand Section is present', async () => {
      await surauPage.verifyFooterBrandSection();
    });

    await test.step('Verify the Social Media Section is present', async () => {
      await surauPage.verifyFooterSocmedia();
    });

    await test.step('Verify the Rujukan Links are present', async () => {
      await surauPage.verifyFooterRujukanLinks();
    });
  });

  test('CF - 017 | Footer Project Komuniti Links are present', async ({ page }) => {
    const surauPage = new SurauCardDetailPage(page);
    
    await test.step('Verify the Surau Button functionality', async () => {
      await surauPage.verifySurauButton();
    });
    
    await test.step('Verify the Surau Detail Page Is Present & Visible', async () => {
      await surauPage.verifyCardResult();
      await surauPage.surauCardExpand();
    });

    await test.step('Verify the Brand Section is present', async () => {
      await surauPage.verifyFooterBrandSection();
    });

    await test.step('Verify the Social Media Section is present', async () => {
      await surauPage.verifyFooterSocmedia();
    });

    await test.step('Verify the Rujukan Links are present', async () => {
      await surauPage.verifyFooterRujukanLinks();
    });

    await test.step('Verify the Project Komuniti Links are present', async () => {
      await surauPage.verifyFooterProjectKomuniti();
    });
  });
});
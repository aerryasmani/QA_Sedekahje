import { test, expect } from '@playwright/test';
import {VerifySurauButton,VerifyCard_Result,VerifyCard_PetaButton,VerifyPetaButton_Result,VerifyCard_GetDoa,VerifyFooter_BrandSection,VerifyFooter_Socmedia,VerifySurau_Flow,VerifyFooter_RujukanLinks,VerifyFooter_ProjectKomuniti, SurauCard_Expand} from '../../helpers/SurauCardDetail';
import {VerifyModalPopup,VerifyPageTitle,VerifyLogoVisibility,VerifyToogleButton,VerifyOrgButton,VerifyDropdown,DropdownFunctionality,VerifySearchbar,VerifySearchbar_Result} from '../../helpers/homepage';

const BaseURL = 'https://sedekah.je/';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

// Setup
test.beforeEach(async ({ page }) => {
  await page.goto(BaseURL);
  await VerifyModalPopup(page);
});

// Refactor
test.describe('Surau Detail Page Test', () => {
  test('CF - 011 | Surau Detail Page | Card Detail Page Is Present', async ({page}) =>{

    await test.step('Verify the Surau Button functionality', async () => {
      await VerifySurauButton(page);
    });
    
    await test.step('Verify the Surau detail page is present', async () => {
      await VerifyCard_Result(page);
    });

  });

  test('CF - 012 | Surau Detail Page | Peta button is present and visible',async({page}) => {
    
    await test.step('Verify the Surau Button functionality', async () => {
      await VerifySurauButton(page);
    });
    
    await test.step('Verify the Surau Detail Page Is Present & Visible', async () => {
      await VerifyCard_Result(page);
    });

    await test.step('Verify the Surau Button is present and functional', async () => {
      await VerifyCard_PetaButton(page);
    });

    await test.step('Verify the Peta Button is present and functional', async () => {
      await VerifyPetaButton_Result(page);
    });

  });

  test('CF - 013| Surau Detail Page| Doa Section is present',async ({page}) => {
     await test.step('Verify the Surau Button functionality', async () => {
      await VerifySurauButton(page);
    });
    
    await test.step('Verify the Surau Detail Page Is Present & Visible', async () => {
      await VerifyCard_Result(page);
    });

    await test.step('Verify the Surau Detail Page Click', async () => {
      await SurauCard_Expand(page);
    });

    await test.step('Verify the GetDoa Section is present', async () => {
      await VerifyCard_GetDoa(page);
    });

  });

});

test.describe('Surau Detail Page Footer Test',()=>{
 test('CF - 014| Surau Detail Page| Footer Section is present',async ({page}) => {
    
    await test.step('Verify the Surau Button functionality', async () => {
      await VerifySurauButton(page);
    });
    
    await test.step('Verify the Surau Detail Page Is Present & Visible', async () => {
      await VerifyCard_Result(page);
      await SurauCard_Expand(page);
    });

    await test.step('Verify the Brand Section is present', async () => {
      await VerifyFooter_BrandSection(page);
    });
  
  });

  test('CF - 015 | Footer Social Media is present', async ({page}) => {
    await test.step('Verify the Surau Button functionality', async () => {
      await VerifySurauButton(page);
    });
    
    await test.step('Verify the Surau Detail Page Is Present & Visible', async () => {
      await VerifyCard_Result(page);
      await SurauCard_Expand(page);
    });

    await test.step('Verify the Brand Section is present', async () => {
      await VerifyFooter_BrandSection(page);
    });

    await test.step('Verify the Social Media Section is present', async () => {
      await VerifyFooter_Socmedia (page);
    });

  });

  test('CF - 016| Footer Rujukan Links are present', async ({page}) => {
    await test.step('Verify the Surau Button functionality', async () => {
      await VerifySurauButton(page);
    });
    
    await test.step('Verify the Surau Detail Page Is Present & Visible', async () => {
      await VerifyCard_Result(page);
      await SurauCard_Expand(page);
    });

    await test.step('Verify the Brand Section is present', async () => {
      await VerifyFooter_BrandSection(page);
    });

    await test.step('Verify the Social Media Section is present', async () => {
      await VerifyFooter_Socmedia (page);
    });

    await test.step('Verify the Social Media Section is present', async () => {
      await VerifyFooter_RujukanLinks(page);
    });

  });

  test('CF - 017 | Footer Project Komuniti Links are present', async ({page}) => {
    
    await test.step('Verify the Surau Button functionality', async () => {
      await VerifySurauButton(page);
    });
    
    await test.step('Verify the Surau Detail Page Is Present & Visible', async () => {
      await VerifyCard_Result(page);
      await SurauCard_Expand(page);
    });

    await test.step('Verify the Brand Section is present', async () => {
      await VerifyFooter_BrandSection(page);
    });

    await test.step('Verify the Social Media Section is present', async () => {
      await VerifyFooter_Socmedia (page);
    });

    await test.step('Verify the Social Media Section is present', async () => {
      await VerifyFooter_RujukanLinks(page);
    });

    await test.step('Verify the Social Media Section is present', async () => {
      await VerifyFooter_ProjectKomuniti(page);
    });
  });


});
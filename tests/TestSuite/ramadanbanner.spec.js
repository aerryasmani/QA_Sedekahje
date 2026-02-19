import { test, expect } from '@playwright/test';
import {VerifyModalPopup} from '../../helpers/homepage';
import {VerifyRamadanBanner} from '../../helpers/ramadanbanner';


const BaseURL = 'https://sedekah.je/';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

// Setup
test.beforeEach(async ({ page }) => {
  await page.goto(BaseURL);
  await VerifyModalPopup(page);
});

test.describe('Ramadan Banner 2026', () => {
  
    test('RTC-01: Banner is visible during Ramadhan month', async ({ page }) => {
        await VerifyRamadanBanner(page);
    });

    test('RTC-02: Banner countdown timer is visible', async ({ page }) => {
        
    });

    test('RTC-03: View QR button is present in the banner', async ({ page }) => {

    });

    test('RTC-04: The x share button is visible and functional', async ({ page }) => {

    });


});
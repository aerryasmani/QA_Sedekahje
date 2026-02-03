import { expect } from '@playwright/test';

export class LainCardDetailPage {
  constructor(page) {
    this.page = page;
    
    // Define all locators
    this.lainButton = page.getByRole('button', { name: 'Lain-lain' });
    this.filterResultText = page.getByText('Jumlah Hasil Tapisan');
    this.firstResultCard = page.locator('div.rounded-lg.bg-card').first();
    this.cardLogo = this.firstResultCard.getByRole('img', { name: 'category logo' });
    this.cardTitle = this.firstResultCard.locator('h3.text-lg.font-semibold');
    this.cardExpand = page.locator(".grid > div").first();
    this.petaButton = page.getByRole('button', { name: 'Peta' });
    
    // Constants
    this.expectedCardTitle = 'AJK Tanah Kubur Peradong';
    this.expectedLocation = 'Kota Bharu, Kelantan';
    this.pageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';
  }

  /**
   * Verifies the Lain-lain button is visible and clicks it
   */
  async clickLainButton() {
    await expect(this.lainButton).toBeVisible();
    await this.lainButton.click();
    await expect(this.filterResultText).toBeVisible();
  }

  /**
   * Verifies the Lain card result is displayed with all expected elements
   */
  async verifyLainCardResult() {
    // Verify card is visible
    await expect(this.firstResultCard).toBeVisible();

    // Verify card logo
    await expect(this.cardLogo).toBeVisible();

    // Verify card title
    await expect(this.page.getByText(this.expectedCardTitle)).toBeVisible();

    // Scroll to see action buttons
    await this.page.mouse.wheel(0, 1000);

    // Verify Download button
    const downloadButton = this.firstResultCard.locator('button', { 
      has: this.page.locator('svg.lucide-download') 
    });
    await expect(downloadButton).toBeVisible();

    // Verify Share button
    const shareButton = this.firstResultCard.locator('button', { 
      has: this.page.locator('svg.lucide-share2') 
    });
    await expect(shareButton).toBeVisible();
  }

  /**
   * Expands the Lain card by clicking on the title
   */
  async expandLainCard() {
    await expect(this.cardTitle).toHaveText(this.expectedCardTitle);
    await this.cardTitle.click();
  }

  /**
   * Verifies the Peta button in the expanded card and clicks it
   */
  async verifyAndClickPetaButton() {
    // Verify card title is visible
    await expect(this.page.getByText(this.expectedCardTitle)).toBeVisible();
    
    // Click to expand card
    await this.cardExpand.click();
    
    // Verify expanded card content
    await expect(this.page.getByText(new RegExp(this.expectedCardTitle, 'i'))).toBeVisible();
    await expect(this.page.getByText(new RegExp(this.expectedLocation, 'i'))).toBeVisible();
    
    // Click card again (if needed for your app's behavior)
    await this.firstResultCard.click();

    // Verify full card text
    const expectedFullText = `${this.expectedCardTitle}${this.expectedLocation}Kongsi`;
    await expect(this.firstResultCard).toHaveText(expectedFullText);

    // Verify and click Peta button
    await expect(this.petaButton).toBeVisible();
    await this.petaButton.click();
  }

  /**
   * Complete flow: Click Lain button and verify card result
   */
  async navigateToLainSection() {
    await this.clickLainButton();
    await this.verifyLainCardResult();
  }

  /**
   * Complete flow: Navigate to Lain section and expand card
   */
  async navigateAndExpandCard() {
    await this.clickLainButton();
    await this.verifyLainCardResult();
    await this.expandLainCard();
  }

  /**
   * Complete flow: Navigate, expand, and interact with Peta button
   */
  async navigateAndVerifyPeta() {
    await this.clickLainButton();
    await this.verifyLainCardResult();
    await this.verifyAndClickPetaButton();
  }
}
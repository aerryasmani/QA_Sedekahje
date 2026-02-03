import { expect } from '@playwright/test';

export class SedekahRawak {
  constructor(page) {
    this.page = page;
    
    // Define all locators
    this.sedekahRawakButton = page.getByRole('button', { name: 'Sedekah Rawak' });
    this.janaQRButton = page.getByRole('button', { name: '🎲 Jana QR Secara Rawak' });
    this.qrCodeIcon = page.locator('svg.lucide.lucide-qr-code');
    this.qrTitle = page.locator('h3.text-xl.font-semibold.mb-2.text-center');
    
    // Constants
    this.rawakTextPlaceholder = 'Klik butang untuk menjana kod QR rawak.';
    this.pageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';
  }

  async verifySedekahRawakButton() {
    await expect(this.sedekahRawakButton).toBeVisible();
  }


  async clickSedekahRawakButton() {
    await expect(this.sedekahRawakButton).toBeVisible();
    await this.sedekahRawakButton.click();
    await expect(this.page.getByText(this.rawakTextPlaceholder)).toBeVisible();
    await expect(this.qrCodeIcon).toBeVisible();
  }

  async verifyJanaQRButtonFunctionality() {
    await expect(this.janaQRButton).toBeVisible();
    
    // Click and get initial QR title
    await this.janaQRButton.click();
    const initialName = await this.qrTitle.innerText();

    // Click again and verify QR changed
    await this.janaQRButton.click();
    await this.page.waitForTimeout(1000);

    const newName = await this.qrTitle.innerText();
    expect(newName).not.toBe(initialName);
  }

  async navigateToRandomizer() {
    await this.verifySedekahRawakButton();
    await this.clickSedekahRawakButton();
  }

  async openAndTestRandomizer() {
    await this.clickSedekahRawakButton();
    await this.verifyJanaQRButtonFunctionality();
  }
}
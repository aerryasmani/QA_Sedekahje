import { expect } from '@playwright/test'; 

export class HomePage { 
  constructor(page) {
    this.page = page;
    
    // Define all locators
    this.modalDialog = page.locator('div[role="dialog"]');
    this.modalTitle = this.modalDialog.locator('h2');
    this.modalCloseButton = page.getByRole('button', {name: 'Faham, Terima Kasih!'});
    this.logo = page.getByRole('img', { name: 'Masjid' }).first();
    this.toggleThemeButton = page.getByRole('button', {name: 'Toggle theme'});
    this.searchbar = page.locator('input[type="search"][placeholder*="Cari masjid"]');
    this.dropdownButton = page.getByRole('combobox');
    
    // Constants
    this.baseURL = 'https://sedekah.je/';
    this.pageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';
  }

  // Navigation methods
  async navigate() {
    await this.page.goto(this.baseURL);
  }

  // Modal methods
  async verifyAndCloseModal() {
    await this.page.waitForSelector('div[role="dialog"]', { state: 'attached', timeout: 10000 });
    await expect(this.modalDialog).toBeVisible({ timeout: 10000 });
    await expect(this.modalTitle).toHaveText('Berita Gembira!');
    
    const modalContent = [
      'Selamat datang ke SedekahJe. Kini anda boleh menyumbang QR kod!',
      'Kami dengan sukacitanya mengumumkan bahawa anda kini boleh log masuk untuk menyumbang QR kod ke dalam direktori SedekahJe.',
      'Dengan menyumbang, anda membantu masyarakat Malaysia untuk mencari dan menggunakan QR kod derma dengan lebih mudah.',
      'Mulakan sumbangan anda hari ini dan bantu kami mengembangkan direktori QR kod yang lebih komprehensif untuk semua!'
    ];

    await expect(this.page.locator('div[role="dialog"] p')).toHaveCount(4);
    
    for (const text of modalContent) {
      await expect(this.page.getByText(text)).toBeVisible();
    }

    await expect(this.modalCloseButton).toBeVisible();
    await this.modalCloseButton.click();
    await expect(this.modalDialog).toBeHidden({ timeout: 10000 });
  }

  // Verification methods
  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(this.pageTitle);
  }

  async verifyLogo() {
    await expect(this.logo).toBeVisible();
    await expect(this.logo).toHaveAttribute('alt', 'Masjid');
    await expect(this.logo).toHaveAttribute('src', '/masjid.svg');
    await expect(this.logo).toHaveAttribute('width', '100');
    await expect(this.logo).toHaveAttribute('height', '100');
    await expect(this.logo).toHaveAttribute('loading', 'lazy');
  }

  async toggleTheme() {
    await expect(this.toggleThemeButton).toBeVisible();
    await this.toggleThemeButton.click({ force: true });
    await expect(this.toggleThemeButton.locator('.lucide-moon')).toHaveClass(/dark:size-\[1\.2rem\]/);
    await this.toggleThemeButton.click({ force: true });
  }

  async filterByOrganization(orgType) {
    const button = this.page.getByRole('button', {name: orgType});
    await expect(button).toBeVisible();
    await button.click();
    await expect(this.page.getByText('Jumlah hasil tapisan')).toBeVisible();
    await this.page.waitForTimeout(5000);
  }

  async verifyOrganizationButtons() {
    const buttonLabels = ['Masjid', 'Surau', 'Lain-lain'];
    
    for (const label of buttonLabels) {
      const btn = this.page.getByRole('button', {name: label});
      await expect(btn).toBeVisible();
    }

    for (const label of buttonLabels) {
      await this.filterByOrganization(label);
    }
  }

  async verifyDropdown() {
    await expect(this.dropdownButton).toBeVisible({ timeout: 10000 });
    await expect(this.dropdownButton).toContainText('Semua Negeri');
    await this.dropdownButton.click();

    const states = [
      'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang',
      'Perak', 'Perlis', 'Pulau Pinang', 'Sabah', 'Sarawak', 'Selangor', 
      'Terengganu', 'W.P. Kuala Lumpur', 'W.P. Labuan', 'W.P. Putrajaya'
    ];

    for (const state of states) {
      const option = this.page.getByText(state, { exact: true });
      await option.scrollIntoViewIfNeeded();
      await expect(option).toBeVisible({ timeout: 120000 });
    }
  }

  async filterByState(stateName) {
    const option = this.page.getByText(stateName, { exact: true });
    await option.scrollIntoViewIfNeeded();
    await option.click();
    await this.page.waitForTimeout(1000);
    await expect(this.page.getByText('Jumlah Hasil Tapisan')).toBeVisible({ timeout: 10000 });
  }

  async searchForPlace(placeName) {
    await expect(this.searchbar).toBeVisible();
    await expect(this.searchbar).toHaveAttribute('placeholder', 'Cari masjid/surau/institusi...');
    await this.searchbar.click();
    await this.searchbar.fill(placeName);
    await expect(this.searchbar).toHaveValue(placeName);
  }

  async verifySearchResult(placeName) {
    const resultCard = this.page.locator('.rounded-lg.bg-card.text-card-foreground');
    await expect(resultCard).toBeVisible();
    await expect(this.page.getByText(placeName)).toBeVisible();
  }
}
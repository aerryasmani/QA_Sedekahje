import { expect } from '@playwright/test';

export class SurauCardDetailPage {
  constructor(page) {
    this.page = page;
    
    // Define all locators
    this.surauButton = page.getByRole('button', { name: 'Surau' });
    this.filterResultText = page.getByText('Jumlah Hasil Tapisan');
    this.resultCardSurau = page.locator('div.rounded-lg.bg-card').first();
    this.cardLogo = this.resultCardSurau.getByRole('img', { name: 'category logo' });
    this.downloadButton = this.resultCardSurau.locator('button', { has: page.locator('svg.lucide-download') });
    this.shareButton = this.resultCardSurau.locator('button', { has: page.locator('svg.lucide-share2') });
    this.petaButton = page.getByRole('button', { name: 'Peta' });
    this.mapContainer = page.locator('div.leaflet-container');
    
    // Constants
    this.pageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle(this.pageTitle);
  }

  async verifySurauButton() {
    await expect(this.surauButton).toBeVisible();
    await this.surauButton.click();
    await expect(this.filterResultText).toBeVisible();
  }

  async verifyCardResult() {
    await expect(this.resultCardSurau).toBeVisible();
    await expect(this.cardLogo).toBeVisible();
    await expect(this.page.getByText('AJK Surau Darul Istiqamah')).toBeVisible();
    await this.page.mouse.wheel(0, 1000);
    await expect(this.downloadButton).toBeVisible();
    await expect(this.shareButton).toBeVisible();
  }

  async surauCardExpand() {
    const cardTitle = this.resultCardSurau.locator('h3.text-lg.font-semibold');
    await expect(this.page.getByText('AJK Surau Darul Istiqamah')).toBeVisible();
    await cardTitle.click();
  }

  async verifyCardPetaButton() {
    const cardExpand = this.page.locator(".grid > div").first();
    await expect(this.page.getByText('AJK Surau Darul Istiqamah')).toBeVisible();
    await cardExpand.click();
    await expect(this.page.getByText(/AJK Surau Darul Istiqamah/i)).toBeVisible();
    await expect(this.page.getByText(/Kuching, Sarawak/i)).toBeVisible();
    await this.resultCardSurau.click();
    await expect(this.resultCardSurau).toHaveText('AJK Surau Darul IstiqamahKuching, SarawakKongsi');
    await expect(this.petaButton).toBeVisible();
    await this.petaButton.click();
  }


  async verifyPetaButtonResult() {
    await expect(this.mapContainer).toBeVisible({ timeout: 10000 });
  }

  async verifyCardGetDoa() {
    const getDoaCard = this.page.getByText('Doa Harian');
    await expect(getDoaCard).toBeVisible();
    await expect(this.page.getByText('Doa untuk dibaca setiap hari')).toBeVisible();
    await getDoaCard.click();

    const getDoaStructure = this.page.locator('.font-arabic');
    await expect(getDoaStructure).toBeVisible();

    const getDoaHadisTitle = this.page.locator('h3.text-sm.font-semibold.leading-relaxed');
    await expect(getDoaHadisTitle).toBeVisible();
    await expect(getDoaHadisTitle).not.toBeEmpty();

    const getDoaHadisDescription = this.page.locator('p', { hasText: 'Maksud:' });
    await expect(getDoaHadisDescription).toBeVisible();
    await expect(getDoaHadisDescription).not.toBeEmpty();

    await expect(this.page.getByText('Dikuasakan oleh')).toBeVisible();

    const getDoaLink = this.page.getByRole('link', { name: 'GetDoa' }).first();
    await expect(getDoaLink).toBeVisible();
    await expect(getDoaLink).toHaveAttribute('href', 'https://getdoa.com');
    await expect(getDoaLink).toHaveAttribute('target', '_blank');

    const externalIcon = getDoaLink.locator('svg.lucide-external-link');
    await expect(externalIcon).toBeVisible();
  }

  async verifyFooterBrandSection() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const imgIcon = this.page.locator('img[alt="Logo Masjid SedekahJe"]');
    await expect(imgIcon).toBeVisible();

    const imgheader = this.page.getByRole('heading', { name: 'sedekah.je' });
    await expect(imgheader).toBeVisible();

    const imgsubheader = this.page.locator('p', { hasText: 'QR Directory' });
    await expect(imgsubheader).toBeVisible();

    const modalContentLocator = [
      'Senarai QR masjid, surau, dan institusi yang dikumpulkan oleh netizen untuk memudahkan sedekah dan sumbangan.',
    ];

    for (const text of modalContentLocator) {
      await expect(this.page.getByText(text)).toBeVisible();
    }
  }

  async verifyFooterSocmedia() {
    const socMedX = this.page.locator('a[href="https://x.com/sedekahje"]');
    const socMedGithub = this.page.getByRole('link', { name: 'GitHub' });

    await expect(socMedX).toBeVisible();
    await expect(socMedX).toHaveAttribute('target', '_blank');
    await expect(socMedX).toHaveAttribute('rel', 'noreferrer');

    await expect(socMedGithub).toBeVisible();
    await expect(socMedGithub).toHaveAttribute('href', 'https://github.com/khrnchn/sedekah-je');
    await expect(socMedGithub).toHaveAttribute('target', '_blank');
    await expect(socMedGithub).toHaveAttribute('rel', 'noreferrer');
  }

  async verifySurauFlow() {
    await this.verifySurauButton();
    await this.verifyCardResult();
    await this.verifyCardPetaButton();
    await this.verifyCardGetDoa();
  }

  async verifyFooterRujukanLinks() {
    const rujukanLinks = [
      { name: 'Sumber Kod', href: 'https://github.com/khrnchn/sedekah-je' },
      { name: 'Data Trafik', href: 'https://analytics.farhanhelmy.com/share/qqGVUCdO8JGBoSk5/sedekah.je' },
      { name: 'Logo', href: 'https://www.flaticon.com/free-icons/holy' },
    ];

    const footerText = this.page.getByRole('heading', { name: /^(Rujukan|Doa)$/i });
    await expect(footerText).toBeVisible();

    for (const rujukan of rujukanLinks) {
      const link = this.page.getByRole('link', { name: rujukan.name }).first();
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', rujukan.href);
      await expect(link).toHaveAttribute('target', '_blank');
    }
  }

  async verifyFooterProjectKomuniti() {
    const komunitiLinks = [
      { name: 'Cari Fatwa', href: 'https://carifatwa.com?ref=sedekah.je' },
      { name: 'GetDoa', href: 'https://getdoa.com' },
      { name: 'Kelas Mengaji Online', href: 'https://kelasmengaji.online?ref=sedekah.je' },
      { name: 'Saham Akhirat', href: 'https://sahamakhirat.org?ref=sedekah.je' },
      { name: 'Belasungkawa', href: 'https://belasungkawa.my?ref=sedekah.je' },
      { name: 'Quran Manzil', href: 'https://quran-manzil.com?ref=sedekah.je' },
      { name: 'Quran Sunnah AI', href: 'https://quran-sunnah-ai.com?ref=sedekah.je' },
      { name: 'Meem', href: 'https://usemeem.com?ref=sedekah.je' },
      { name: 'duaa.my', href: 'https://duaa.my?ref=sedekah.je' },
      { name: 'SemakHadis.com', href: 'https://semakhadis.com?ref=sedekah.je' },
      { name: 'CariTadika.my', href: 'https://caritadika.my?ref=sedekah.je' },
      { name: 'e-Masjid.my', href: 'https://e-masjid.my?ref=sedekah.je' },
    ];

    const footerText = this.page.getByRole('heading', { name: 'Projek Komuniti' }).nth(1);
    await expect(footerText).toBeVisible();

    for (const komuniti of komunitiLinks) {
      const link = this.page.getByRole('link', { name: komuniti.name }).first();
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', komuniti.href);
      await expect(link).toHaveAttribute('target', '_blank');
    }
  }
}
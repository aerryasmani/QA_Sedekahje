import { test, expect } from '@playwright/test';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';



export async function VerifyPageTitle (page) {
  await expect(page).toHaveTitle(PageTitle);
}

export async function VerifySurauButton(page){
 const btnSurau = page.getByRole('button', { name: 'Surau' })
 await expect(btnSurau).toBeVisible();
 await btnSurau.click()

 const filterResultText = page.getByText('Jumlah Hasil Tapisan');
 await expect(filterResultText).toBeVisible();
}

export async function VerifyCard_Result(page){
 const resultCard_Surau = page.locator('div.rounded-lg.bg-card').first();
 await expect(resultCard_Surau).toBeVisible();

 const cardLogo = resultCard_Surau.getByRole('img', { name: 'category logo' });
 await expect(cardLogo).toBeVisible();

 const cardTitle = resultCard_Surau.locator('h3.text-lg.font-semibold');
 await expect(page.getByText('AJK Surau Darul Istiqamah')).toBeVisible();

 await page.mouse.wheel(0, 1000);

 const DownloadButton = resultCard_Surau.locator('button', { has: page.locator('svg.lucide-download') });
 await expect(DownloadButton).toBeVisible();

 const ShareButton = resultCard_Surau.locator('button', { has: page.locator('svg.lucide-share2') });
 await expect(ShareButton).toBeVisible();

}

export async function VerifyCard_PetaButton(page){
  const resultCard_Surau = page.locator('div.rounded-lg.bg-card').first();
  //const cardTitle = resultCard_Surau.locator('h3.text-lg.font-semibold');
  const CardExpand= page.locator(".grid > div").first()
  
  await expect(page.getByText('AJK Surau Darul Istiqamah')).toBeVisible();
  // Target the outermost div with all card styling
  await CardExpand.click(page);
  await page.getByText('AJK Surau Darul IstiqamahKuching, SarawakKongsi').click();

  await expect(resultCard_Surau).toHaveText('AJK Surau Darul IstiqamahKuching, SarawakKongsi')

  const PetaButton = page.getByRole('button',{name:'Peta'});
  await expect(PetaButton).toBeVisible();
  await PetaButton.click();
}

export async function VerifyPetaButton_Result(page){
  const PetaButton = page.getByRole('button',{name:'Peta'});
  await expect(PetaButton).toBeVisible();
  await PetaButton.click();

  const mapContainer = page.locator('div.leaflet-container');
  await expect(mapContainer).toBeVisible({ timeout: 10000 });
}

export async function VerifyCard_GetDoa(page) {
  
  //Check the GetDoa title
  const GetDoa_Card = page.getByText(('Doa Harian'))
  await expect(GetDoa_Card).toBeVisible(page);
  await page.getByText('Doa untuk dibaca setiap hari')
  await GetDoa_Card.click();

  //Check the doa structure
  const GetDoa_Structure = page.locator('.font-arabic');
  await expect(GetDoa_Structure).toBeVisible(page);

  const GetDoa_HadisTitle = page.locator('h3.text-sm.font-semibold.leading-relaxed');
  await expect(GetDoa_HadisTitle).toBeVisible();
  await expect(GetDoa_HadisTitle).not.toBeEmpty();
  
  /*const GetDoa_HadisAuthor = page.locator('p.italic', { hasText: 'Riwayat' });
  await expect(GetDoa_HadisAuthor).toBeVisible();
  await expect(GetDoa_HadisAuthor).not.toBeEmpty();*/

  const GetDoa_HadisDescription = page.locator('p', { hasText: 'Maksud:' });
  await expect(GetDoa_HadisDescription).toBeVisible();
  await expect(GetDoa_HadisDescription).not.toBeEmpty();

  await expect (page.getByText('Dikuasakan oleh')).toBeVisible();
  
  // Check link
  const getDoaLink = page.getByRole('link', { name: 'GetDoa' }).first();
  await expect(getDoaLink).toBeVisible();
  await expect(getDoaLink).toHaveAttribute('href', 'https://getdoa.com');
  await expect(getDoaLink).toHaveAttribute('target', '_blank');
  
  // Check external link icon exists
  const externalIcon = getDoaLink.locator('svg.lucide-external-link');
  await expect(externalIcon).toBeVisible();

}

export async function VerifyFooter(page) {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  const imgIcon = page.locator('img[alt="Logo Masjid SedekahJe"]');
  await expect (imgIcon).toBeVisible(page);

  const imgheader = page.getByRole('heading', { name: 'sedekah.je' });
  await expect (imgheader).toBeVisible(page);

  const imgsubheader = page.locator('p', { hasText: 'QR Directory' });
  await expect (imgsubheader).toBeVisible(page);



}
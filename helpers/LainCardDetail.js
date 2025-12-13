import { test, expect } from '@playwright/test';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

export async function VerifyLainButton(page){
 const btnLain = page.getByRole('button', { name: 'Lain-lain' })
 await expect(btnLain).toBeVisible();
 await btnLain.click()

 const filterResultText = page.getByText('Jumlah Hasil Tapisan');
 await expect(filterResultText).toBeVisible();
}

export async function VerifyLainCard_Result(page){
 const resultCard_Lain = page.locator('div.rounded-lg.bg-card').first();
 await expect(resultCard_Lain).toBeVisible();

 const cardLogo = resultCard_Lain.getByRole('img', { name: 'category logo' });
 await expect(cardLogo).toBeVisible();

 const cardTitle = resultCard_Lain.locator('h3.text-lg.font-semibold');
 await expect(page.getByText('AJK Tanah Kubur Peradong')).toBeVisible();

 await page.mouse.wheel(0, 1000);

 const DownloadButton = resultCard_Lain.locator('button', { has: page.locator('svg.lucide-download') });
 await expect(DownloadButton).toBeVisible();

 const ShareButton = resultCard_Lain.locator('button', { has: page.locator('svg.lucide-share2') });
 await expect(ShareButton).toBeVisible();
}

export async function LainCard_Expand(page) {
  const resultCard_Lain = page.locator('div.rounded-lg.bg-card').first();

  const cardTitle = resultCard_Lain.locator('h3.text-lg.font-semibold');
  await expect(cardTitle).toHaveText('AJK Tanah Kubur Peradong'); 

  await cardTitle.click();
}

export async function VerifyCardLain_PetaButton(page){
  const resultCard_Surau = page.locator('div.rounded-lg.bg-card').first();
  //const cardTitle = resultCard_Surau.locator('h3.text-lg.font-semibold');
  const CardExpand= page.locator(".grid > div").first()
  
  await expect(page.getByText('AJK Tanah Kubur Peradong')).toBeVisible();
  // Target the outermost div with all card styling
  await CardExpand.click(page);
  await expect(page.getByText(/AJK Tanah Kubur Peradong/i)).toBeVisible();
  await expect(page.getByText(/Kota Bharu, Kelantan/i)).toBeVisible();
  await resultCard_Surau.click();

  await expect(resultCard_Surau).toHaveText('AJK Tanah Kubur PeradongKota Bharu, KelantanKongsi')

  const PetaButton = page.getByRole('button',{name:'Peta'});
  await expect(PetaButton).toBeVisible();
  await PetaButton.click();
}
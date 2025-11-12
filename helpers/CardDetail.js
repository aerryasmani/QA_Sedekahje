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
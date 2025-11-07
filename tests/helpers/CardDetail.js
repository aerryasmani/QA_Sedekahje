import { expect } from '@playwright/test';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

export async function VerifyModalPopup (page) {
  const ModalDialogLocator = page.locator('div[role="dialog"]');
  await page.waitForSelector('div[role="dialog"]', { state: 'attached', timeout: 10000 });
  await expect(page.locator('div[role="dialog"]')).toBeVisible();

 
  await expect(ModalDialogLocator).toBeVisible({ timeout: 10000 });

  const ModalTitleText = ModalDialogLocator.locator('h2');
  await expect(ModalTitleText).toHaveText('Berita Gembira!');

  const ModalContentLocator = [
  'Selamat datang ke SedekahJe. Kini anda boleh menyumbang QR kod!',
  'Kami dengan sukacitanya mengumumkan bahawa anda kini boleh log masuk untuk menyumbang QR kod ke dalam direktori SedekahJe.',
  'Dengan menyumbang, anda membantu masyarakat Malaysia untuk mencari dan menggunakan QR kod derma dengan lebih mudah.',
  'Mulakan sumbangan anda hari ini dan bantu kami mengembangkan direktori QR kod yang lebih komprehensif untuk semua!'
  ]

  await expect(page.locator('div[role="dialog"] p')).toHaveCount(4); 

  for (const text of ModalContentLocator) {
    await expect(page.getByText(text)).toBeVisible();
  }

  const Button = page.getByRole('button',{name:'Faham, Terima Kasih!'});
  await expect(Button).toBeVisible();
  await Button.click();

  await expect(ModalDialogLocator).toBeHidden({ timeout: 10000 });

}

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
 const resultCard_Surau = page.locator('div.rounded-lg.bg-card').first();;
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


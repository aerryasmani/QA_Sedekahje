import { test, expect } from '@playwright/test';

const BaseURL = 'https://sedekah.je/';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

//------- Helper Function for URL ------//

async function VerifyModalPopup (page) {
  const ModalDialogLocator = page.locator('div[role="dialog"]');
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

  await expect(ModalDialogLocator).toBeHidden();
}


async function VerifyPageTitle (page) {
  await expect(page).toHaveTitle(PageTitle);
}

async function VerifyLogoVisibility (page) {

const LogoLocator = page.getByRole('img', { name: 'Masjid' }).first();
await expect(LogoLocator).toBeVisible();


// ✅ Check visibility
await expect(LogoLocator).toBeVisible();

// ✅ Check attributes
await expect(LogoLocator).toHaveAttribute('alt', 'Masjid');
await expect(LogoLocator).toHaveAttribute('src', '/masjid.svg');
await expect(LogoLocator).toHaveAttribute('width', '100');
await expect(LogoLocator).toHaveAttribute('height', '100');
await expect(LogoLocator).toHaveAttribute('loading', 'lazy');

}

async function VerifyToogleButton(page){
  const ToogleButton = page.getByRole('button',{name:'Toggle theme'})
  await expect(ToogleButton).toBeVisible();
  await ToogleButton.click({ force: true });
  await expect(ToogleButton.locator('.lucide-moon')).toHaveClass(/dark:size-\[1\.2rem\]/);
  await ToogleButton.click({ force: true });
}

// Setup
test.beforeEach(async ({ page }) => {
  await page.goto(BaseURL);
  await VerifyModalPopup(page);
});


//------- Test Cases ------//
/*
test('CF-001 | Pop up | Notification Modal is present and visible', async ({ page }) => {
  await VerifyModalPopup(page);
});

test('CF-002 | Homepage | Title displays correctly on page load', async ({ page }) => {
  await VerifyPageTitle(page);
});

test('CF-003 | Homepage | Should display logo correctly on page load', async ({ page }) => {
  await VerifyModalPopup(page);
  await VerifyLogoVisibility(page);
});
*/

test('CF-004 | Homepage | Mode toogle display correctly on page load', async ({ page }) => {
  await VerifyToogleButton(page);
});

/*
test('CF-005 | Homepage | Mosque button display correctly on page load', async ({ page }) => {
});

test('CF-006 | Homepage | Surau button display and working correctly on page load', async ({ page }) => {
});

test('CF-007 | Homepage | Institusi button display and working correctly on page load', async ({ page }) => {
});

test('CF-008 | Homepage | Dropdown display correctly on page load', async ({ page }) => {
});

test('CF-009 | Homepage | Searchbar display correctly on page load', async ({ page }) => {
});

test('CF-010 | Homepage | Surau button display and working correctly on page load', async ({ page }) => {
});
*/
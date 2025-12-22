import { expect } from '@playwright/test';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';
const BaseURL = 'https://sedekah.je/';

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

export async function VerifyLogoVisibility (page) {

  const LogoLocator = page.getByRole('img', { name: 'Masjid' }).first();
  await expect(LogoLocator).toBeVisible();

  await expect(LogoLocator).toHaveAttribute('alt', 'Masjid');
  await expect(LogoLocator).toHaveAttribute('src', '/masjid.svg');
  await expect(LogoLocator).toHaveAttribute('width', '100');
  await expect(LogoLocator).toHaveAttribute('height', '100');
  await expect(LogoLocator).toHaveAttribute('loading', 'lazy');
}

export async function VerifyToogleButton(page){
  const ToogleButton = page.getByRole('button',{name:'Toggle theme'})
  await expect(ToogleButton).toBeVisible();
  await ToogleButton.click({ force: true });
  await expect(ToogleButton.locator('.lucide-moon')).toHaveClass(/dark:size-\[1\.2rem\]/);
  await ToogleButton.click({ force: true });
}

export async function VerifyOrgButton(page){
  //const OrgBtn = page.getByRole('button',{Btn_Name});

  //Verify button label is present and visible
  const BtnLabel = ['Masjid','Surau','Lain-lain'];
  for(const label of BtnLabel){
    const btn = page.getByRole('button',{name:label});
    await expect(btn).toBeVisible();
  }

  //Verify button is functional
  for(const ButtonFilter of BtnLabel){
    const btn = page.getByRole('button', { name: ButtonFilter });
    const FilterText = 'Jumlah hasil tapisan';
    const LogoLocator = page.getByRole('img', { name: ButtonFilter }).first();

    await btn.click();
    await expect(page.getByText(FilterText)).toBeVisible();
    await page.waitForTimeout(5000);
    //await page.goto(BaseURL);
  }

}

export async function VerifyDropdown(page){
  //Verify dropdown is present
  const dropdownBtn = page.getByRole('combobox');
  await expect(dropdownBtn).toBeVisible(({ timeout: 10000 }));
  await expect(dropdownBtn).toContainText('Semua Negeri');
  await dropdownBtn.click(page);


  //Verify dropdown label is present and visible
  const dropdownoptions = ['Johor','Kedah','Kelantan','Melaka','Negeri Sembilan','Pahang'
    ,'Perak','Perlis','Pulau Pinang','Sabah','Sarawak','Selangor','Terengganu',
    'W.P. Kuala Lumpur','W.P. Labuan','W.P. Putrajaya'
  ];

  for(const label of dropdownoptions){
    const option = page.getByText(label, { exact: true });

    // Scroll option into view before checking visibility
    await option.scrollIntoViewIfNeeded();  
    await expect(option).toBeVisible({ timeout: 120000 });
  }
}

export async function DropdownFunctionality(page, baseURL){
  const dropdownBtn = page.getByRole('combobox');
  
  const dropdownOptions = [
    'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang',
    'Perak', 'Perlis', 'Pulau Pinang', 'Sabah', 'Sarawak', 'Selangor', 'W.P. Kuala Lumpur', 'W.P. Labuan', 'W.P. Putrajaya'
  ];

  console.log('Testing filtering functionality for each option...');
  
  for(const label of dropdownOptions){
    console.log(`Testing filter for: ${label}`);

    // Scroll down if we reached "Pulau Pinang"
    if (label === 'Terengganu') {
      await page.mouse.wheel(0, 300); // Scroll down 300 pixels
      await page.waitForTimeout(300);
    }
    
    // Click the option
    const option = page.getByText(label, { exact: true });
    await option.scrollIntoViewIfNeeded();
    await option.click();
    
    // Wait for dropdown to close and filtering to apply
    await page.waitForTimeout(1000);
    
    // Check if 'Jumlah Hasil Tapisan' text is present (filtering works)
    const filterResultText = page.getByText('Jumlah Hasil Tapisan');
    await expect(filterResultText).toBeVisible({ timeout: 10000 });

    // Go back to base URL
    await page.goto(BaseURL);
    
       // Open dropdown
    await dropdownBtn.click();

    // Wait for 5 seconds
    await page.waitForTimeout(5000);
    await option.scrollIntoViewIfNeeded();
    

  }
  
  console.log('✓ All filtering tests completed successfully');
}

export async function VerifySearchbar(page){
 const Searchbar = page.locator('input[type="search"][placeholder*="Cari masjid"]');
 await expect(Searchbar).toBeVisible();
 await expect(Searchbar).toHaveAttribute('placeholder', 'Cari masjid/surau/institusi...');

 await Searchbar.click();
 await Searchbar.fill('Masjid Taman Pulai Indah');
 await expect(Searchbar).toHaveValue('Masjid Taman Pulai Indah');
}

export async function VerifySearchbar_Result(page){
 const resultCard = page.locator('.rounded-lg.bg-card.text-card-foreground');
 await expect(resultCard).toBeVisible();
 await expect(page.getByText('Masjid Taman Pulai Indah')).toBeVisible();
}
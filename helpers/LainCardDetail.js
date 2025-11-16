import { test, expect } from '@playwright/test';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';


export async function VerifyLainButton(page){
 const btnLain = page.getByRole('button', { name: 'Surau' })
 await expect(btnLain).toBeVisible();
 await btnLain.click()

 const filterResultText = page.getByText('Jumlah Hasil Tapisan');
 await expect(filterResultText).toBeVisible();
}
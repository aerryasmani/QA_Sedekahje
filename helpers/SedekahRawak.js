import { test, expect } from '@playwright/test';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

export async function RawakButton(page){
    const Button = page.getByRole('button',{name:'Sedekah Rawak'});
    await expect(Button).toBeVisible();
}

export async function RawakButton_functionality(page){
    const Button = page.getByRole('button',{name:'Sedekah Rawak'});
    await expect(Button).toBeVisible();
    await Button.click();
    const qrLocator = page.locator('svg.lucide.lucide-qr-code');
    const RawakTextPlaceholder = 'Klik butang untuk menjana kod QR rawak.';
    await expect(page.getByText(RawakTextPlaceholder)).toBeVisible();
    await expect(qrLocator).toBeVisible();
}

export async function RawakButton_2(page){
    const Button = page.getByRole('button',{name:'🎲 Jana QR Secara Rawak'});
    await expect(Button).toBeVisible();
    await Button.click();
}
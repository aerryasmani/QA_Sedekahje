import { test, expect } from '@playwright/test';
const PageTitle = 'Sedekah Je - Platform Sedekah QR Malaysia';

export async function VerifyRamadanBanner(page) {
    const banner = page.locator('.bg-gradient-to-r.from-emerald-400.to-teal-800');
    await expect(banner).toBeVisible();

    const dayIndicator = page.locator('p.text-sm.font-medium.opacity-90');
    await expect(dayIndicator).toBeVisible();

    const mosqueName = page.locator('p.font-semibold.text-lg');
    await expect(mosqueName).toBeVisible();

    const lihatQRBtn = page.locator('a[href="/ramadhan"]');
    await expect(lihatQRBtn).toBeVisible();

    const kongsiXBtn = page.locator('button[type="button"]:has(span:text("Kongsi ke X"))');
    await expect(kongsiXBtn).toBeVisible();

    const xIcon = page.locator('button svg');
    await expect(xIcon).toBeVisible();
}
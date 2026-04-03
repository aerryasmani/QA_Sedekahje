import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const AUTH_FILE = 'playwright/.auth/user.json';

export default defineConfig({
  reporter: [
    ['line'],
    ['allure-playwright', { outputFolder: './allure-results' }],
    ['html']
  ],

  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  globalSetup: './playwright/.auth/global-setup.js',

  use: {
    trace: 'on-first-retry',
    ...(existsSync(AUTH_FILE) ? { storageState: AUTH_FILE } : {}),
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ],
});
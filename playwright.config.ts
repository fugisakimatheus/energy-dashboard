import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://localhost:3000' 

export default defineConfig({
  testDir: './src/e2e-tests',
  outputDir: 'e2e-results/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  webServer: {
    command: 'npm run build && npm run start',
    url: baseURL,
  },
  use: {
    baseURL,
    trace: 'retry-with-trace',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});

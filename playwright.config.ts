import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'local';

// Load the proper .env file based on NODE_ENV (dev, staging, or prod)
dotenv.config({ path: `env/.env.${env}` });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './reports/test-results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Timeout for single test */
  timeout: 5 * 60 * 1000,
  /* Global timeout on CI set to 2 hours to avoid wasting CI minutes in case tests are stuck. */
  globalTimeout: process.env.CI ? 4 * 60 * 60 * 1000 : 0,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', {outputFolder: './reports/html'}],
    [
      'allure-playwright',
      {
        detail: true,
        resultsDir: './reports/allure',
        suiteTitle: false,
        environmentInfo: {
          ENVIRONMENT: process.env.TEST_ENV,
        },
      },
    ],
    [
      'playwright-ctrf-json-reporter',
      {
        outputDir: './reports/ctrf',
        includeResults: ['pass', 'skipped', 'fail', 'flaky'],
        useDetails: true,
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    //ignore https errors
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    actionTimeout: 45_000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

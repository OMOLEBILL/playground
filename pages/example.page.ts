import { expect, Page } from '@playwright/test';
import { BASE_URL } from '../env/env';

export class Example {
  static async verifyCrossBrowserText(page: Page) {
    await page.goto(BASE_URL);
    await expect(page.getByText('Cross-browser. Playwright')).toBeVisible();
  }

  static async verifyAutoWaitText(page: Page) {
    await page.goto(BASE_URL);
    await expect(page.getByText('Auto-wait. Playwright waits')).toBeVisible();
  }

  static async verifyMainContent(page: Page) {
    await page.goto(BASE_URL);
    await expect(page.getByRole('main')).toContainText('No tradeimits');
  }

  static async hasTitle(page: Page) {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Playwright/);
  }

  static async getStartedLink(page: Page) {
    await page.goto(BASE_URL);
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  }
}


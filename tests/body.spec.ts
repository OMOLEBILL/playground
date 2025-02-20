import { test } from '@playwright/test';
import { Example } from '../pages/example.page';

test.describe('Body suites', () => {
  test('Cross-browser text is visible', { tag: '@body' }, async ({ page }) => {
    await Example.verifyCrossBrowserText(page);
  });

  test('Auto-wait text is visible', { tag: '@body' }, async ({ page }) => {
    await Example.verifyAutoWaitText(page);
  });

  test('Main content contains expected text', { tag: '@body' }, async ({ page }) => {
    await Example.verifyMainContent(page);
  });
});

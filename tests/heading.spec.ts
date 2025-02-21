import { test } from '@playwright/test';
import { Example } from '../pages/example.page';
import * as allure from "allure-js-commons";

test.describe('Heading suites', () => {
  test.beforeEach(async () => {
      await allure.suite("Heading suites");
  });

  test('has title', { tag: '@heading' }, async ({ page }) => {
    await Example.hasTitle(page);
  });

  test('get started link', { tag: '@heading' }, async ({ page }) => {
    await Example.getStartedLink(page);
  });
});
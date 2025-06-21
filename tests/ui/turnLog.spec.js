import { test, expect } from 'playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileUrl = 'file://' + path.resolve(__dirname, '../../index.html');

test('log element updates after move', async ({ page }) => {
  await page.goto(fileUrl);
  const log = page.locator('#turn-log');
  await expect(log).toHaveCount(1);
  await expect(log).toContainText('Battle started');

  const firstBtn = page.locator('#direction-buttons button').first();
  await firstBtn.click();
  await expect(log).toContainText('Player moved');
});

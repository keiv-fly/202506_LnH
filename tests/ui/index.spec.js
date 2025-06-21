import { test, expect } from 'playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileUrl = 'file://' + path.resolve(__dirname, '../../index.html');

test('has game container element', async ({ page }) => {
  await page.goto(fileUrl);
  await expect(page.locator('#game-container')).toHaveCount(1);
});

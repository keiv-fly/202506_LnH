import { defineConfig } from 'playwright/test';

export default defineConfig({
  testDir: '../ui',
  use: {
    headless: true,
  },
});

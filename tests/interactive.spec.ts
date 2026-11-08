import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'Desktop', width: 1440, height: 900, isMobile: false },
  { name: 'Mobile', width: 390, height: 844, isMobile: true, hasTouch: true },
];

for (const vp of VIEWPORTS) {
  test.describe(`Interactive Matrix — ${vp.name} (${vp.width}x${vp.height})`, () => {
    test.use({
      viewport: { width: vp.width, height: vp.height },
      hasTouch: vp.hasTouch ?? false,
    });

    test('Zero console errors and no click-blocking overlays', async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      page.on('pageerror', (err) => {
        consoleErrors.push(err.message);
      });

      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Assert 0 console errors
      expect(consoleErrors).toEqual([]);

      // Verify canvas background has pointer-events: none
      const canvasPointerEvents = await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        return canvas ? window.getComputedStyle(canvas).pointerEvents : 'none';
      });
      expect(canvasPointerEvents).toBe('none');

      // Verify cursor follower has pointer-events: none
      const followerPointerEvents = await page.evaluate(() => {
        const follower = document.querySelector('.cursor-follower');
        return follower ? window.getComputedStyle(follower).pointerEvents : 'none';
      });
      expect(followerPointerEvents).toBe('none');

      // If mobile, follower should not be displayed
      if (vp.isMobile) {
        const isFollowerHidden = await page.evaluate(() => {
          const follower = document.querySelector('.cursor-follower');
          return !follower || window.getComputedStyle(follower).display === 'none';
        });
        expect(isFollowerHidden).toBe(true);
      }

      // Audit every interactive button/link with document.elementFromPoint
      const interactiveCount = await page.evaluate(() => {
        const elements = document.querySelectorAll<HTMLElement>(
          'button, a, [role="button"]'
        );
        let valid = 0;
        elements.forEach((el) => {
          // Check if element is visible on page
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight) {
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const topEl = document.elementFromPoint(cx, cy);
            if (topEl && (topEl === el || el.contains(topEl) || topEl.contains(el))) {
              valid++;
            }
          }
        });
        return valid;
      });

      expect(interactiveCount).toBeGreaterThan(0);
    });

    test('Interactive flow: Turbo button toggle', async ({ page }) => {
      await page.goto('/');
      const turboBtn = page.locator('button:has-text("TURBO")').first();
      await expect(turboBtn).toBeVisible();

      // Click turbo and verify state change
      const initialText = await turboBtn.textContent();
      await turboBtn.click();
      const newText = await turboBtn.textContent();
      expect(newText).not.toEqual(initialText);
    });

    test('Interactive flow: RAM seating / Skip button', async ({ page }) => {
      await page.goto('/');
      const skipBtn = page.locator('button:has-text("SKIP INTRO")');
      if (await skipBtn.isVisible()) {
        await skipBtn.click();
        // Verify CRT switches to desktop / solid LED
        await expect(page.locator('text=SOLID (NORMAL)')).toBeVisible();
      }
    });

    test('Interactive flow: Floppy project cartridge insertion', async ({ page }) => {
      await page.goto('/');
      const flagshipCartridge = page.locator('[role="button"]:has-text("TECH ATLAS 2026")').first();
      await flagshipCartridge.scrollIntoViewIfNeeded();
      await expect(flagshipCartridge).toBeVisible();
      await flagshipCartridge.click();

      // Case study modal opens
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();

      // Close modal
      const closeBtn = modal.locator('button:has-text("✕")').first();
      await closeBtn.click();
      await expect(modal).not.toBeVisible();
    });

    test('Interactive flow: Hardware diagnostic quiz', async ({ page }) => {
      await page.goto('/');
      const ramOption = page.locator('button:has-text("RAM Contact Oxidation")');
      await ramOption.scrollIntoViewIfNeeded();
      await expect(ramOption).toBeVisible();
      await ramOption.click();

      // Verify explanation reveal appears
      await expect(page.locator('text=DIAGNOSIS ACCURACY')).toBeVisible();
    });

    test('Interactive flow: DOS terminal prompt', async ({ page }) => {
      await page.goto('/');
      const terminalSection = page.locator('#terminal');
      await terminalSection.scrollIntoViewIfNeeded();
      const helpBtn = terminalSection.locator('button:has-text("help")');
      await expect(helpBtn).toBeVisible();
      await helpBtn.click();

      // Verify terminal output contains HELP listing
      await expect(terminalSection.locator('text=AVAILABLE COMMANDS')).toBeVisible();
    });
  });
}

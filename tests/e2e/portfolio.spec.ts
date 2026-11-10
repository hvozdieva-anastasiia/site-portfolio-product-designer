import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('shows the three cases and opens a case page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'View selected work' }).click();
  await expect(page).toHaveURL(/#cases$/);
  await expect(page.getByRole('article')).toHaveCount(3);
  await page
    .getByRole('link', { name: 'View project: Yezzz! Retail Telecom Brand' })
    .click();
  await expect(page).toHaveURL(/\/cases\/yezzz$/);
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /grocery perk into a mobile plan/,
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(
    await page.evaluate(() => document.documentElement.clientWidth),
  );
});

test('the Yezzz! case tells the product story in order', async ({ page }) => {
  await page.goto('/cases/yezzz');
  const chapters = [
    'Users saw the offer, but rarely activated it.',
    'Understanding the drop-off before redesigning the flow.',
    'Based on analytics and user interviews, I generated 15 hypotheses.',
    'Seven decisions across the whole journey.',
    'From drop-off to activation, across the full journey.',
    'Shipped, and built to be measured.',
  ];
  const headings = await page
    .getByRole('heading', { level: 2 })
    .allTextContents();
  const order = chapters.map((title) => headings.indexOf(title));
  expect(order.every((index) => index >= 0)).toBe(true);
  expect([...order].sort((a, b) => a - b)).toEqual(order);

  // The funnel numbers from the research are on the page.
  await expect(page.getByText('138,482').first()).toBeVisible();
  await expect(page.getByText('2.35%').first()).toBeVisible();

  // ICE: the top five are marked, the backlog unfolds on demand, and each
  // score is Impact × Confidence × Ease.
  const table = page.getByRole('table', {
    name: 'Hypotheses ranked by ICE score',
  });
  await expect(table.locator('tbody tr')).toHaveCount(8);
  await expect(table.locator('tr[data-selected="true"]')).toHaveCount(5);
  await page.getByRole('button', { name: 'Show all 15' }).click();
  await expect(table.locator('tbody tr')).toHaveCount(15);
  const rows = await table
    .locator('tbody tr')
    .evaluateAll((trs) =>
      trs.map((tr) =>
        [...tr.querySelectorAll('td')]
          .slice(1)
          .map((td) => Number(td.textContent)),
      ),
    );
  for (const [i, c, e, score] of rows) expect(score).toBe(i * c * e);

  // Seven directions, each with its screens, and every screen loads.
  await expect(page.locator('.solution')).toHaveCount(7);
  const images = page.locator('.case-study img');
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
  }

  // Back to all work lands on the cases section of the home page.
  await page.getByRole('link', { name: '← Back to all work' }).click();
  await expect(page).toHaveURL(/\/#cases$/);
  await expect(page.locator('#cases')).toBeInViewport();
});

test('hero greets by name and shows the four-step process', async ({
  page,
}) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /Anastasiia.*right problems/s,
    }),
  ).toBeVisible();
  const steps = page
    .getByRole('list', { name: 'How I work' })
    .getByRole('listitem');
  await expect(steps).toHaveCount(4);
  await expect(steps.first()).toContainText('Ask what the real problem is.');
  await expect(page.locator('.process li[aria-current="step"]')).toHaveCount(1);
});

for (const slug of ['yezzz', 'yo-esim', 'ad-management-app']) {
  test(`${slug} keeps case content readable on phones and tablets`, async ({
    page,
  }) => {
    await page.goto(`/cases/${slug}`);
    await expect(page.locator('#case-title')).toBeVisible();

    for (const width of [320, 390, 430, 768, 1024]) {
      await page.setViewportSize({ width, height: 844 });
      const layout = await page.evaluate(() => {
        const root = document.documentElement;
        const gallery = document.querySelector<HTMLElement>(
          '.case-flow .screen-strip-list',
        )!;
        const ice = document.querySelector<HTMLElement>('.ice');
        return {
          pageFits: root.scrollWidth <= root.clientWidth,
          galleryScrolls: gallery.scrollWidth > gallery.clientWidth,
          tableFits: !ice || ice.scrollWidth <= ice.clientWidth,
        };
      });
      expect(layout, `${width}px`).toEqual({
        pageFits: true,
        galleryScrolls: true,
        tableFits: true,
      });
    }

    await page.setViewportSize({ width: 320, height: 700 });
    const menu = page.getByRole('button', { name: 'Menu' });
    await menu.click();
    const casesLink = page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Cases' });
    await expect(casesLink).toBeFocused();
    await casesLink.press('Escape');
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');

    await page
      .getByRole('navigation', { name: 'More work' })
      .getByRole('link', { name: /Next case/ })
      .click();
    await expect(page).not.toHaveURL(new RegExp(`/cases/${slug}$`));
    await expect(page.locator('#case-title')).toBeVisible();
  });
}

test('the animated character loads in the hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.process-char canvas')).toBeVisible({
    timeout: 20000,
  });
});
test('toolkit groups switch the active desk', async ({ page }) => {
  await page.goto('/');
  const design = page.getByRole('button', { name: 'Design', exact: true });
  await design.click();
  await expect(design).toHaveAttribute('aria-pressed', 'true');
  await expect(
    page.getByRole('button', { name: 'AI', exact: true }),
  ).toHaveAttribute('aria-pressed', 'false');
});

test('reviews show all 13 LinkedIn recommendations and step through them', async ({
  page,
}) => {
  await page.goto('/');
  const reviews = page.locator('#reviews');
  await expect(reviews.locator('figure')).toHaveCount(13);
  await expect(reviews.getByText('1 / 13')).toBeVisible();
  await expect(reviews.getByText('Nick Pavlyuk')).toBeVisible();
  await reviews.getByRole('button', { name: 'Next review' }).click();
  await expect(reviews.getByText('2 / 13')).toBeVisible();
  await expect(reviews.getByText('Kateryna Medushyvska')).toBeVisible();
  await reviews.getByRole('button', { name: 'Previous review' }).click();
  await reviews.getByRole('button', { name: 'Previous review' }).click();
  await expect(reviews.getByText('13 / 13')).toBeVisible();
  await expect(reviews.getByText('Zheng Zhang')).toBeVisible();
});

test('layout adapts to a phone width', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu' });
  await expect(menu).toBeVisible();
  await expect(page.locator('#nav-menu')).toBeHidden();
  await menu.click();
  await expect(
    page.locator('#nav-menu').getByRole('link', { name: 'Cases' }),
  ).toBeVisible();

  const columns = (selector: string) =>
    page
      .locator(selector)
      .first()
      .evaluate(
        (el) => getComputedStyle(el).gridTemplateColumns.split(' ').length,
      );
  expect(await columns('.hero-top')).toBe(1);
  expect(await columns('.process-win')).toBe(1);
  expect(await columns('.case')).toBe(1);
  expect(await columns('.toolkit')).toBe(1);
  expect(await columns('.triple')).toBe(1);

  // The animation boxes must keep a fixed, modest height once Rive is playing.
  await expect(page.locator('.process-char canvas')).toBeVisible({
    timeout: 20000,
  });
  for (const selector of ['.process-char', '.toolkit-stage']) {
    const box = await page.locator(selector).boundingBox();
    expect(box!.height).toBeLessThanOrEqual(420);
  }
  // The reviews slab must stay a sensible height for every recommendation.
  const tallest = await page.evaluate(async () => {
    const next = document.querySelector<HTMLButtonElement>(
      '[aria-label="Next review"]',
    )!;
    const slab = document.querySelector<HTMLElement>('.testimonial')!;
    let max = 0;
    for (let i = 0; i < 13; i += 1) {
      max = Math.max(max, slab.offsetHeight);
      next.click();
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    return max;
  });
  expect(tallest).toBeLessThan(820);

  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(375);
});

test('version 2 fits its first screen into one desktop viewport', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'The one-screen layout is for desktop widths');
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('/v2');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.hero-win-art canvas')).toBeVisible({
    timeout: 20000,
  });
  // The pitch and the whole character sit in one window that ends inside the
  // viewport, and the current step is written under the character.
  const box = await page.locator('.hero-win').boundingBox();
  expect(box!.y + box!.height).toBeLessThanOrEqual(768);
  await expect(page.locator('.hero-win-copy #hero-title')).toBeVisible();
  await expect(page.locator('.process-caption-text')).toContainText(
    'Ask what the real problem is.',
  );
  await expect(page.getByRole('list', { name: 'How I work' })).toBeVisible();
  // The cases appear once, in their own section, not duplicated up here.
  await expect(page.getByRole('article')).toHaveCount(3);
  // Nothing scrolls sideways, even with the wide glows.
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(1366);
  // The menu keeps visitors on version 2.
  await expect(
    page.getByRole('link', { name: 'Articles' }).first(),
  ).toHaveAttribute('href', '/v2#articles');
});
test('passes automated WCAG 2.2 AA checks on version 2', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/v2');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
test('version 3 fills exactly one desktop viewport with a split first screen', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'The one-screen layout is for desktop widths');
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('/v3');
  await expect(
    page.getByRole('heading', { level: 1, name: /right problems to solve/ }),
  ).toBeVisible();
  await expect(page.locator('.hero-figure-art canvas')).toBeVisible({
    timeout: 20000,
  });
  // The hero ends at the bottom edge of the viewport: nothing of the next
  // section shows, and the frame with the character ends inside the hero.
  const hero = await page.locator('.hero-split').boundingBox();
  expect(Math.round(hero!.y + hero!.height)).toBeLessThanOrEqual(769);
  const frame = await page.locator('.hero-figure').boundingBox();
  expect(frame!.y + frame!.height).toBeLessThanOrEqual(768);
  // The whole character is fitted in the frame, above the card.
  const art = await page.locator('.hero-figure-art').boundingBox();
  const card = await page.locator('.hero-figure-card').boundingBox();
  expect(art!.y + art!.height).toBeLessThanOrEqual(card!.y);
  await expect(page.locator('.process-caption-text')).toContainText(
    'Ask what the real problem is.',
  );
  // At most two actions, and the cases appear once, in their own section.
  await expect(page.locator('.hero-split-actions > *')).toHaveCount(2);
  await expect(page.getByRole('article')).toHaveCount(3);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(1366);
  await expect(
    page.getByRole('link', { name: 'Articles' }).first(),
  ).toHaveAttribute('href', '/v3#articles');
});

test('passes automated WCAG 2.2 AA checks on version 3', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/v3');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('theme toggle switches to dark, persists and follows the D key', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  if (!isMobile) {
    await page.keyboard.press('d');
    await expect(html).toHaveAttribute('data-theme', 'light');
  }
});

test('first visit follows the system dark preference', async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: 'dark' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await context.close();
});

test('contact form validates, then opens the mail app on submit', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Get in touch' }).first().click();
  const dialog = page.getByRole('dialog', { name: 'Get in touch' });
  await expect(dialog).toBeVisible();

  await dialog.getByRole('button', { name: 'Send message' }).click();
  await expect(dialog.getByText('Please tell me your name.')).toBeVisible();
  await expect(
    dialog.getByText('Please add an email so I can reply.'),
  ).toBeVisible();

  await dialog.getByLabel('Name').fill('Jane Smith');
  await dialog.getByLabel('Email').fill('jane@company.com');
  await dialog
    .getByLabel('Message')
    .fill('We need help with our onboarding flow.');
  // Without a form endpoint the form hands off to the visitor's email app.
  await dialog.getByRole('button', { name: 'Send message' }).click();
  await expect(dialog.getByRole('status')).toContainText(
    'Your email app should be open',
  );
  await expect(
    dialog.getByRole('link', { name: 'Open email app' }),
  ).toHaveAttribute('href', /^mailto:.*subject=.*Jane%20Smith/);
  await expect(page).toHaveURL('/');

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('C key opens the contact form', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Keyboard shortcuts are for desktop');
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.keyboard.press('c');
  await expect(
    page.getByRole('dialog', { name: 'Get in touch' }),
  ).toBeVisible();
});

test('activates the skip link from the keyboard', async ({
  browserName,
  page,
}) => {
  await page.goto('/');
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await expect(skipLink).toBeAttached();
  if (browserName === 'webkit') {
    // Default WebKit tab navigation can skip links, depending on platform preferences.
    await skipLink.focus();
  } else {
    await page.keyboard.press('Tab');
  }
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
});

test('passes automated WCAG 2.2 AA checks on the home page', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('passes automated WCAG 2.2 AA checks in the dark theme', async ({
  page,
}) => {
  // Reduced motion removes colour transitions, so axe never measures a
  // half-faded colour right after the switch.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('passes automated WCAG 2.2 AA checks on the Yezzz! case study', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/cases/yezzz');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('button', { name: 'Show all 15' }).click();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('passes automated WCAG 2.2 AA checks on a case page', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/cases/yo-esim');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

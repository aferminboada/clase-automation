import { chromium } from '@playwright/test';
import * as fs from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page    = await context.newPage();

  const interactions: any[] = [];

  // ── Captura navegación ──────────────────────
  page.on('framenavigated', (frame) => {
    if (frame === page.mainFrame() && frame.url() !== 'about:blank') {
      interactions.push({ type: 'goto', url: frame.url() });
    }
  });

  // ── Inyecta el grabador en cada carga ───────
  await context.addInitScript(() => {
    (window as any).__rec = [];

    document.addEventListener('click', (e) => {
      const el = e.target as Element;
      (window as any).__rec.push({
        type:     'click',
        id:       el.id || null,
        dataTest: el.getAttribute('data-test') || null,
        role:     el.getAttribute('role')      || null,
        tag:      el.tagName?.toLowerCase()    || null,
        text:     el.textContent?.trim().slice(0, 80) || null,
        name:     (el as HTMLInputElement).name || null,
      });
    }, true);

    document.addEventListener('input', (e) => {
      const el = e.target as HTMLInputElement;
      (window as any).__rec.push({
        type:     'fill',
        id:       el.id   || null,
        dataTest: el.getAttribute('data-test') || null,
        name:     el.name || null,
        value:    el.value,
      });
    }, true);
  });

  await page.goto('https://www.saucedemo.com/');

  console.log('\n Navegador abierto en SauceDemo.');
  console.log(' Interactua con la pagina y cierra el navegador cuando termines.\n');

  // ── Polling cada 500 ms ──────────────────────
  const pollInterval = setInterval(async () => {
    try {
      const batch: any[] = await page.evaluate(() => {
        const items = [...(window as any).__rec];
        (window as any).__rec = [];
        return items;
      });
      if (batch.length > 0) interactions.push(...batch);
    } catch (_) {}
  }, 500);

  // ── Espera a que el navegador se cierre ──────
  await new Promise<void>((resolve) => {
    browser.on('disconnected', () => {
      clearInterval(pollInterval);
      resolve();
    });
  });

  fs.writeFileSync('interactions.json', JSON.stringify(interactions, null, 2));
  console.log(`\n Grabacion finalizada. ${interactions.length} interacciones guardadas en interactions.json`);
})();

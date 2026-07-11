import { Page, Locator } from '@playwright/test';

export class InventoryPage {

  // ── Propiedades ──────────────────────────────
  readonly page:              Page;
  readonly cartBadge:         Locator;
  readonly addBikeLight:      Locator;
  readonly addBackpack:       Locator;
  readonly addBoltTShirt:     Locator;
  readonly addFleeceJacket:   Locator;

  // ── Constructor ──────────────────────────────
  constructor(page: Page) {
    this.page            = page;
    this.cartBadge       = page.locator('[data-test="shopping-cart-badge"]');
    this.addBikeLight    = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.addBackpack     = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.addBoltTShirt   = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.addFleeceJacket = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
  }

  // ── Métodos ──────────────────────────────────

  async irAlCarrito() {
    await this.cartBadge.click();
  }
}

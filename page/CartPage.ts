import { Page, Locator } from '@playwright/test';

export class CartPage {

  // ── Propiedades ──────────────────────────────
  readonly page:               Page;
  readonly removeBikeLight:    Locator;
  readonly removeBoltTShirt:   Locator;
  readonly checkoutButton:     Locator;

  // ── Constructor ──────────────────────────────
  constructor(page: Page) {
    this.page             = page;
    this.removeBikeLight  = page.locator('[data-test="remove-sauce-labs-bike-light"]');
    this.removeBoltTShirt = page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]');
    this.checkoutButton   = page.locator('[data-test="checkout"]');
  }

  // ── Métodos ──────────────────────────────────

  async irAlCheckout() {
    await this.checkoutButton.click();
  }
}

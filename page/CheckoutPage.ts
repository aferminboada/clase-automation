import { Page, Locator } from '@playwright/test';

export class CheckoutPage {

  // ── Propiedades ──────────────────────────────
  readonly page:           Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput:  Locator;
  readonly postalCodeInput:Locator;
  readonly continueButton: Locator;
  readonly finishButton:    Locator;
  readonly backHomeButton:  Locator;
  readonly cancelButton:    Locator;

  // ── Constructor ──────────────────────────────
  constructor(page: Page) {
    this.page            = page;
    this.firstNameInput  = page.locator('[data-test="firstName"]');
    this.lastNameInput   = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton  = page.locator('[data-test="continue"]');
    this.finishButton    = page.locator('[data-test="finish"]');
    this.backHomeButton  = page.locator('[data-test="back-to-products"]');
    this.cancelButton    = page.locator('[data-test="cancel"]');
  }

  // ── Métodos ──────────────────────────────────

  async llenarDatos(nombre: string, apellido: string, codigoPostal: string) {
    await this.firstNameInput.fill(nombre);
    await this.lastNameInput.fill(apellido);
    await this.postalCodeInput.fill(codigoPostal);
    await this.continueButton.click();
  }

  async finalizarOrden() {
    await this.finishButton.click();
  }

  async volverAlInicio() {
    await this.backHomeButton.click();
  }
}

import { Page, Locator } from '@playwright/test';

export class SauceDemoLoginPage {

  // ── Propiedades ──────────────────────────────
  readonly page:          Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton:   Locator;
  readonly errorMessage:  Locator;

  // ── Constructor ──────────────────────────────
  constructor(page: Page) {
    this.page          = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton   = page.locator('[data-test="login-button"]');
    this.errorMessage  = page.locator('[data-test="error"]');
  }

  // ── Métodos ──────────────────────────────────

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(usuario: string, contrasena: string) {
    await this.usernameInput.fill(usuario);
    await this.passwordInput.fill(contrasena);
    await this.loginButton.click();
  }
}

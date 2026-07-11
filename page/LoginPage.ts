import { Page, Locator } from '@playwright/test';
 
export class LoginPage {
 
  // ── Propiedades ──────────────────────────────
  readonly page:          Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton:   Locator;
 
  // ── Constructor ──────────────────────────────
  constructor(page: Page) {
    this.page          = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton   = page.getByRole('button', { name: 'Login' });
  }
 
  // ── Métodos ──────────────────────────────────
 
  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }
 
  async login(usuario: string, contrasena: string) {
    await this.usernameInput.fill(usuario);
    await this.passwordInput.fill(contrasena);
    await this.loginButton.click();
  }
}
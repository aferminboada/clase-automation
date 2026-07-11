import { test, expect } from '@playwright/test';
import { SauceDemoLoginPage } from '../page/SauceDemoLoginPage';

// ─────────────────────────────────────────────
// ACCIONES BÁSICAS
// ─────────────────────────────────────────────

test('01 - fill: escribir usuario y contraseña', async ({ page }) => {
  const loginPage = new SauceDemoLoginPage(page);
  await loginPage.goto();

  await loginPage.usernameInput.fill('standard_user');
  await loginPage.passwordInput.fill('secret_sauce');

  await expect(loginPage.usernameInput).toHaveValue('standard_user');
  await expect(loginPage.passwordInput).toHaveValue('secret_sauce');
});

test('02 - click: hacer clic en el botón Login', async ({ page }) => {
  const loginPage = new SauceDemoLoginPage(page);
  await loginPage.goto();

  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/.*inventory/);
});

test('03 - press: enviar el formulario con Enter', async ({ page }) => {
  const loginPage = new SauceDemoLoginPage(page);
  await loginPage.goto();

  await loginPage.usernameInput.fill('standard_user');
  await loginPage.passwordInput.fill('secret_sauce');
  await loginPage.passwordInput.press('Enter');

  await expect(page).toHaveURL(/.*inventory/);
});

// ─────────────────────────────────────────────
// ASSERTIONS
// ─────────────────────────────────────────────

test('04 - toBeVisible: el formulario está visible', async ({ page }) => {
  const loginPage = new SauceDemoLoginPage(page);
  await loginPage.goto();

  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
});

test('05 - toBeEnabled: el botón Login está habilitado', async ({ page }) => {
  const loginPage = new SauceDemoLoginPage(page);
  await loginPage.goto();

  await expect(loginPage.loginButton).toBeEnabled();
});

test('06 - toHaveURL: redirige a /inventory después del login', async ({ page }) => {
  const loginPage = new SauceDemoLoginPage(page);
  await loginPage.goto();

  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/.*inventory/);
});

test('07 - not.toBeVisible: el error NO aparece en login exitoso', async ({ page }) => {
  const loginPage = new SauceDemoLoginPage(page);
  await loginPage.goto();

  await loginPage.login('standard_user', 'secret_sauce');

  await expect(loginPage.errorMessage).not.toBeVisible();
});

// ─────────────────────────────────────────────
// ESPERAS
// ─────────────────────────────────────────────

test('08 - waitForURL: esperar redirección a /inventory', async ({ page }) => {
  const loginPage = new SauceDemoLoginPage(page);
  await loginPage.goto();

  await loginPage.login('standard_user', 'secret_sauce');

  await page.waitForURL('**/inventory.html');

  await expect(page).toHaveURL(/.*inventory/);
});

// ─────────────────────────────────────────────
// TEST COMPLETO — LOGIN EXITOSO
// ─────────────────────────────────────────────

test('09 - test completo: login exitoso', async ({ page }) => {
  const loginPage = new SauceDemoLoginPage(page);

  // NAVEGACIÓN
  await loginPage.goto();

  // ASSERTIONS iniciales
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.loginButton).toBeEnabled();

  // ACCIONES
  await loginPage.login('standard_user', 'secret_sauce');

  // ESPERA
  await page.waitForURL('**/inventory.html');

  // ASSERTIONS finales
  await expect(page).toHaveURL(/.*inventory/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});

// ─────────────────────────────────────────────
// TEST COMPLETO — LOGIN FALLIDO
// ─────────────────────────────────────────────

test('10 - test completo: login fallido con credenciales incorrectas', async ({ page }) => {
  const loginPage = new SauceDemoLoginPage(page);

  // NAVEGACIÓN
  await loginPage.goto();

  // ACCIONES con credenciales incorrectas
  await loginPage.login('usuario_invalido', 'clave_incorrecta');

  // ASSERTIONS
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  await expect(page).not.toHaveURL(/.*inventory/);
});

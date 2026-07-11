import { test, expect } from '@playwright/test';
import { SauceDemoLoginPage } from '../page/SauceDemoLoginPage';
import { InventoryPage }       from '../page/InventoryPage';
import { CartPage }            from '../page/CartPage';
import { CheckoutPage }        from '../page/CheckoutPage';

test('compra completa: login, agregar productos, checkout y finalizar orden', async ({ page }) => {
  const loginPage    = new SauceDemoLoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage     = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // ── 1. LOGIN ─────────────────────────────────
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await page.waitForURL('**/inventory.html');
  await expect(page).toHaveURL(/.*inventory/);

  // ── 2. AGREGAR 4 PRODUCTOS AL CARRITO ────────
  await inventoryPage.addBikeLight.click();
  await inventoryPage.addBackpack.click();
  await inventoryPage.addBoltTShirt.click();
  await inventoryPage.addFleeceJacket.click();
  await expect(inventoryPage.cartBadge).toHaveText('4');

  // ── 3. IR AL CARRITO ─────────────────────────
  await inventoryPage.irAlCarrito();
  await page.waitForURL('**/cart.html');
  await expect(page).toHaveURL(/.*cart/);

  // ── 4. ELIMINAR 2 PRODUCTOS ──────────────────
  await cartPage.removeBikeLight.click();
  await cartPage.removeBoltTShirt.click();
  await expect(cartPage.removeBikeLight).not.toBeVisible();
  await expect(cartPage.removeBoltTShirt).not.toBeVisible();

  // ── 5. IR AL CHECKOUT ────────────────────────
  await cartPage.irAlCheckout();
  await page.waitForURL('**/checkout-step-one.html');
  await expect(page).toHaveURL(/.*checkout-step-one/);

  // ── 6. LLENAR DATOS DE ENVÍO ─────────────────
  await checkoutPage.llenarDatos('anna', 'fermin', '1428');
  await page.waitForURL('**/checkout-step-two.html');
  await expect(page).toHaveURL(/.*checkout-step-two/);

  // ── 7. FINALIZAR ORDEN ───────────────────────
  await checkoutPage.finalizarOrden();
  await page.waitForURL('**/checkout-complete.html');
  await expect(page).toHaveURL(/.*checkout-complete/);
  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

  // ── 8. VOLVER AL INICIO ──────────────────────
  await checkoutPage.volverAlInicio();
  await page.waitForURL('**/inventory.html');
  await expect(page).toHaveURL(/.*inventory/);
});

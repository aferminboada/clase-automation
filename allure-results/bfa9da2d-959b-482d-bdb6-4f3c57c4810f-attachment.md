# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: testLogin.spec.ts >> 12 - waitFor hidden: esperar que el flash de error desaparezca
- Location: tests\testLogin.spec.ts:129:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('Your username is invalid!') to be hidden
    60 × locator resolved to visible <div id="flash" data-alert="" class="flash error">…</div>

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e4]:
    - text:  Your username is invalid!
    - link "×" [ref=e5] [cursor=pointer]:
      - /url: "#"
  - generic [ref=e6]:
    - link "Fork me on GitHub":
      - /url: https://github.com/tourdedave/the-internet
      - img "Fork me on GitHub" [ref=e7] [cursor=pointer]
    - generic [ref=e9]:
      - heading "Login Page" [level=2] [ref=e10]
      - heading "This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages." [level=4] [ref=e11]:
        - text: This is where you can log into the secure area. Enter
        - emphasis [ref=e12]: tomsmith
        - text: for the username and
        - emphasis [ref=e13]: SuperSecretPassword!
        - text: for the password. If the information is wrong you should see error messages.
      - generic [ref=e14]:
        - generic [ref=e16]:
          - generic [ref=e17] [cursor=pointer]: Username
          - textbox "Username" [ref=e18]
        - generic [ref=e20]:
          - generic [ref=e21] [cursor=pointer]: Password
          - textbox "Password" [ref=e22]
        - button " Login" [ref=e23] [cursor=pointer]:
          - generic [ref=e24]:  Login
  - generic [ref=e26]:
    - separator [ref=e27]
    - generic [ref=e28]:
      - text: Powered by
      - link "Elemental Selenium" [ref=e29] [cursor=pointer]:
        - /url: http://elementalselenium.com/
```

# Test source

```ts
  40  |   const loginPage = new LoginPage(page);
  41  |   await loginPage.goto();
  42  | 
  43  |   await loginPage.login('tomsmith', 'SuperSecretPassword!');
  44  |   await page.waitForURL('**/secure');
  45  | 
  46  |   await page.getByRole('link', { name: 'Logout' }).hover();
  47  | 
  48  |   await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  49  | });
  50  | 
  51  | // ─────────────────────────────────────────────
  52  | // ASSERTIONS
  53  | // ─────────────────────────────────────────────
  54  | 
  55  | test('05 - toBeVisible: el formulario está visible', async ({ page }) => {
  56  |   const loginPage = new LoginPage(page);
  57  |   await loginPage.goto();
  58  | 
  59  |   await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
  60  |   await expect(loginPage.usernameInput).toBeVisible();
  61  |   await expect(loginPage.passwordInput).toBeVisible();
  62  |   await expect(loginPage.loginButton).toBeVisible();
  63  | });
  64  | 
  65  | test('06 - toBeEnabled: el botón Login está habilitado', async ({ page }) => {
  66  |   const loginPage = new LoginPage(page);
  67  |   await loginPage.goto();
  68  | 
  69  |   await expect(loginPage.loginButton).toBeEnabled();
  70  | });
  71  | 
  72  | test('07 - toHaveValue: los inputs tienen el valor correcto', async ({ page }) => {
  73  |   const loginPage = new LoginPage(page);
  74  |   await loginPage.goto();
  75  | 
  76  |   await loginPage.usernameInput.fill('tomsmith');
  77  |   await loginPage.passwordInput.fill('SuperSecretPassword!');
  78  | 
  79  |   await expect(loginPage.usernameInput).toHaveValue('tomsmith');
  80  |   await expect(loginPage.passwordInput).toHaveValue('SuperSecretPassword!');
  81  | });
  82  | 
  83  | test('08 - toHaveURL: redirige a /secure después del login', async ({ page }) => {
  84  |   const loginPage = new LoginPage(page);
  85  |   await loginPage.goto();
  86  | 
  87  |   await loginPage.login('tomsmith', 'SuperSecretPassword!');
  88  | 
  89  |   await expect(page).toHaveURL(/.*secure/);
  90  | });
  91  | 
  92  | test('09 - toHaveText: aparece el mensaje de bienvenida', async ({ page }) => {
  93  |   const loginPage = new LoginPage(page);
  94  |   await loginPage.goto();
  95  | 
  96  |   await loginPage.login('tomsmith', 'SuperSecretPassword!');
  97  | 
  98  |   await expect(
  99  |     page.getByText('You logged into a secure area!')
  100 |   ).toBeVisible();
  101 | });
  102 | 
  103 | test('10 - not.toBeVisible: el error NO aparece en login exitoso', async ({ page }) => {
  104 |   const loginPage = new LoginPage(page);
  105 |   await loginPage.goto();
  106 | 
  107 |   await loginPage.login('tomsmith', 'SuperSecretPassword!');
  108 | 
  109 |   await expect(
  110 |     page.getByText('Your username is invalid!')
  111 |   ).not.toBeVisible();
  112 | });
  113 | 
  114 | // ─────────────────────────────────────────────
  115 | // ESPERAS
  116 | // ─────────────────────────────────────────────
  117 | 
  118 | test('11 - waitForURL: esperar redirección a /secure', async ({ page }) => {
  119 |   const loginPage = new LoginPage(page);
  120 |   await loginPage.goto();
  121 | 
  122 |   await loginPage.login('tomsmith', 'SuperSecretPassword!');
  123 | 
  124 |   await page.waitForURL('**/secure');
  125 | 
  126 |   await expect(page).toHaveURL(/.*secure/);
  127 | });
  128 | 
  129 | test('12 - waitFor hidden: esperar que el flash de error desaparezca', async ({ page }) => {
  130 |   const loginPage = new LoginPage(page);
  131 |   await loginPage.goto();
  132 | 
  133 |   await loginPage.login('usuarioInvalido', 'claveIncorrecta');
  134 | 
  135 |   await expect(
  136 |     page.getByText('Your username is invalid!')
  137 |   ).toBeVisible();
  138 | 
  139 |   await page.getByText('Your username is invalid!')
> 140 |     .waitFor({ state: 'hidden' });
      |      ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  141 | });
  142 | 
  143 | // ─────────────────────────────────────────────
  144 | // TEST COMPLETO — LOGIN EXITOSO
  145 | // ─────────────────────────────────────────────
  146 | 
  147 | test('13 - test completo: login exitoso', async ({ page }) => {
  148 |   const loginPage = new LoginPage(page);
  149 | 
  150 |   // NAVEGACIÓN
  151 |   await loginPage.goto();
  152 | 
  153 |   // ASSERTIONS iniciales
  154 |   await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
  155 |   await expect(loginPage.loginButton).toBeEnabled();
  156 | 
  157 |   // ACCIONES
  158 |   await loginPage.login('tomsmi', 'SuperSecretPassword!');
  159 | 
  160 |   // ESPERA
  161 |   await page.waitForURL('**/secure');
  162 | 
  163 |   // ASSERTIONS finales
  164 |   await expect(page).toHaveURL(/.*secure/);
  165 |   await expect(page.getByText('You logged into a secure area!')).toBeVisible();
  166 |   await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
  167 | });
  168 | 
  169 | // ─────────────────────────────────────────────
  170 | // TEST COMPLETO — LOGIN FALLIDO
  171 | // ─────────────────────────────────────────────
  172 | 
  173 | test('14 - test completo: login fallido con credenciales incorrectas', async ({ page }) => {
  174 |   const loginPage = new LoginPage(page);
  175 | 
  176 |   // NAVEGACIÓN
  177 |   await loginPage.goto();
  178 | 
  179 |   // ACCIONES con credenciales incorrectas
  180 |   await loginPage.login('usuarioInvalido', 'claveIncorrecta');
  181 | 
  182 |   // ASSERTIONS
  183 |   await expect(
  184 |     page.getByText('Your username is invalid!')
  185 |   ).toBeVisible();
  186 | 
  187 |   await expect(page).not.toHaveURL(/.*secure/);
  188 | });
```
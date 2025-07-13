# playwright-e2e-swaglabs
End-to-end UI test automation for SauceDemo (Swag Labs) using Playwright (JS) with Allure reporting. Covers login validation, product catalog, cart operations, and checkout process with data validation and bug tracking.

=============================================================================================================================
# 🧪 Swag Labs E2E Playwright Tests

This repository contains a complete end-to-end (E2E) test suite for the [SauceDemo (Swag Labs)](https://www.saucedemo.com/) website, written using [Playwright_JS](https://playwright.dev/). The suite covers login, product sorting, cart, checkout flow, UI validations, and includes automated bug tracking using `test.fixme()` where relevant.

---

## 📂 Project Structure

├── tests/
│ ├── Swag_Lab_Login_Test.spec.js # Login page tests
│ ├── Swag_Lab_Home_Test.spec.js # Home/inventory page tests
│ ├── Swag_Lab_Cart_Test.spec.js # Cart functionality tests
│ ├── Swag_Lab_CheckOut_Test.spec.js # Checkout process and validation
├── docs/ # Static Allure report (used for GitHub Pages)
├── package.json
├── package-lock.json

yaml
Copy
Edit

---

## 🚀 Features

- ✅ Login validation (valid, invalid, locked-out users)
- ✅ Product sorting (A→Z, Z→A, Price low→high, high→low)
- ✅ UI element checks (buttons, images, labels, etc.)
- ✅ Cart & checkout flow with field validation
- ✅ Bug-related scenarios handled using `test.fixme()`
- ✅ Allure reporting for visual test result analysis

---

## 📊 Live Test Report

🟢 View the generated Allure report here:  
👉 **[View Live Allure Report](https://yazanalmuselli.github.io/playwright-e2e-swaglabs/)**

> This report is automatically hosted from the `/docs` folder via GitHub Pages.

---

## ▶️ How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run all tests
npx playwright test

# 3. Generate Allure report
npx allure generate allure-results --clean -o allure-report

# 4. Open report locally
npx allure open allure-report

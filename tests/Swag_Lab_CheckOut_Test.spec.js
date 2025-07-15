/**
 * @file Swag Labs E2E Test 
 * @description Automated tests for the Swag Labs E2E Testing using Playwright & JS.
 *
 * @author Yazan
 * @created 2025-07-2
 * @tool VSC + Allure Reporter
 */

const { test, expect } = require('@playwright/test');

test.describe("Checkpout Page", () => {
    test.beforeEach("Login, Add product to Cart", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/")
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: 'Login' }).click();
        await page.locator("#add-to-cart-sauce-labs-backpack").click()
        await page.locator(".shopping_cart_link").click()
    })
    //Helper Function
    async function login(page, username, password, postalcode) {
        await page.getByPlaceholder("First Name").fill(username);
        await page.getByPlaceholder("Last Name").fill(password);
        await page.getByPlaceholder("Zip/Postal Code").fill(postalcode);
        await page.getByText("Continue").click()
    }

    //BUG
    test.fixme("User supposed not to be able to checkout while cart is empty", async ({ page }) => {
        await page.locator("[data-test='remove-sauce-labs-backpack']").click()
        await page.locator("[data-test='checkout']").click()
        expect(page.url()).not.toBe("https://www.saucedemo.com/inventory.html")
    })

    test("'Checkout: Your Information' Title and 'cancel' buttong testing", async ({ page }) => {
        await page.locator("[data-test='checkout']").click()
        expect(await page.locator("[data-test='title']").textContent()).toBe("Checkout: Your Information")
        await page.getByText("Cancel").click()
        expect(page.url()).toBe("https://www.saucedemo.com/cart.html")
    })

    test("User Name field can not be left empty", async ({ page }) => {
        await page.locator("[data-test='checkout']").click()
        await login(page, "", "A", "0")
        expect(await page.locator("//h3").textContent()).toBe("Error: First Name is required")
    })

    test("Last Name field can not be left empty", async ({ page }) => {
        await page.locator("[data-test='checkout']").click()
        await login(page, "A", "", "0")
        expect(await page.locator("//h3").textContent()).toBe("Error: Last Name is required")
    })

    test("Postal Code field can not be left empty", async ({ page }) => {
        await page.locator("[data-test='checkout']").click()
        await login(page, "A", "A", "")
        expect(await page.locator("//h3").textContent()).toBe("Error: Postal Code is required")
    })

    //BUG
    test.fixme("Fields Accept Wrong Data", async ({ page }) => {
        await page.locator("[data-test='checkout']").click()
        //Number rather than Name & Number rather than Name & Name rather than Number
        await login(page, "0", "0", "A")
        expect(page.url()).toBe("https://www.saucedemo.com/checkout-step-one.html")
    })

    test("Moving to 'Overview' and check visiblity of Details", async ({ page }) => {
        await page.locator("[data-test='checkout']").click()
        await login(page, "Mad3ar", "Mab3ar", "010101")
        expect(page.url()).toBe("https://www.saucedemo.com/checkout-step-two.html")
        expect(await page.locator("[data-test='title']").textContent()).toBe("Checkout: Overview")

        expect(await page.locator("[data-test='payment-info-label']").isVisible()).toBeTruthy()
        expect(await page.locator("[data-test='payment-info-value']").isVisible()).toBeTruthy()
        expect(await page.locator("[data-test='shipping-info-label']").isVisible()).toBeTruthy()
        expect(await page.locator("[data-test='shipping-info-value']").isVisible()).toBeTruthy()
        expect(await page.locator("[data-test='total-info-label']").isVisible()).toBeTruthy()
        expect(await page.locator("[data-test='subtotal-label']").isVisible()).toBeTruthy()
        expect(await page.locator("[data-test='tax-label']").isVisible()).toBeTruthy()
        expect(await page.locator("[data-test='total-label']").isVisible()).toBeTruthy()
    })

    test("Finishing the Payment process", async ({ page }) => {
        await page.locator("[data-test='checkout']").click()
        await login(page, "Mad3ar", "Mab3ar", "010101")
        await page.getByRole('button', { name: 'finish' }).click()
        await expect(page.locator(".title")).toContainText("Checkout: Complete!")
        expect((page.getByAltText("Pony Express")).isVisible()).toBeTruthy()
        await page.getByRole("button", { name: 'Back Home' }).click()
        expect(page.url()).toBe("https://www.saucedemo.com/inventory.html")
    })
})




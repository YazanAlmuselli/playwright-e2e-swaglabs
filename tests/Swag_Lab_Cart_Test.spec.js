const {test, expect} = require('@playwright/test');

test.describe("Cart Page", () => {
    test.beforeEach("Login first to go to Home page", async ({page}) => {
        await page.goto("https://www.saucedemo.com/")
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: 'Login' }).click();  
    })

    test("Adding Product to Cart", async ({page}) => {
        page.locator(".btn.btn_primary.btn_small.btn_inventory").first().click()
        expect(await page.locator(".shopping_cart_badge").textContent()).toBe("1")
        await page.locator(".shopping_cart_link").click()
        expect(page.url()).toBe("https://www.saucedemo.com/cart.html")
        expect(await page.locator(".inventory_item_name").textContent()).toBe("Sauce Labs Backpack")
    })

    test("Removing Product from Cart", async ({page}) => {
        await page.locator("#add-to-cart-sauce-labs-backpack").click()
        await page.locator("#add-to-cart-sauce-labs-bike-light").click()
        await page.locator(".shopping_cart_link").click()
        await page.locator("[data-test='remove-sauce-labs-backpack']").click()
        expect(await page.locator(".shopping_cart_badge").textContent()).toBe("1")
    })

    test("Text Appearance and continue shopping button test", async ({page}) => {
        await page.locator(".shopping_cart_link").click()
        expect(await page.locator("[data-test='title']").textContent()).toBe("Your Cart")
        expect(await page.locator("[data-test='cart-quantity-label']").textContent()).toBe("QTY")
        expect(await page.locator("[data-test='cart-desc-label']").textContent()).toBe("Description")
        await page.locator("[data-test='continue-shopping']").click()
        expect(page.url()).toBe("https://www.saucedemo.com/inventory.html")
    })
})
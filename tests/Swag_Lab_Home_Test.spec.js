/**
 * @file Swag Labs E2E Test 
 * @description Automated tests for the Swag Labs E2E Testing using Playwright & JS.
 *
 * @author Yazan
 * @created 2025-07-2
 * @tool VSC + Allure Reporter
 */

const { test, expect } = require('@playwright/test');

test.describe("Home Page", () => {
    test.beforeEach("Login first to go to Home page", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/")
        await page.getByPlaceholder("Username").fill("standard_user");
        await page.getByPlaceholder("Password").fill("secret_sauce");
        await page.getByRole("button", { name: 'Login' }).click();
    })

    test("Products Viewd As A -> Z By Default", async ({ page }) => {
        await expect(page.locator(".inventory_item_name").first()).toBeVisible()
        const items = await page.locator(".inventory_item_name").allTextContents();
        const Products = ["Sauce Labs Backpack", "Sauce Labs Bike Light",
            "Sauce Labs Bolt T-Shirt", "Sauce Labs Fleece Jacket",
            "Sauce Labs Onesie", "Test.allTheThings() T-Shirt (Red)"]
        expect(items).toEqual(Products)
    })

    test("Products Viewd As Z -> A By Default", async ({ page }) => {
        await page.locator(".product_sort_container").selectOption('za')
        await expect(page.locator(".inventory_item_name").first()).toBeVisible()
        const items = await page.locator(".inventory_item_name").allTextContents();

        const Products = ["Test.allTheThings() T-Shirt (Red)", "Sauce Labs Onesie",
            "Sauce Labs Fleece Jacket", "Sauce Labs Bolt T-Shirt",
            "Sauce Labs Bike Light", "Sauce Labs Backpack"]

        expect(items).toEqual(Products)
    })

    test("Products Viewd As Low to High Price By Default", async ({ page }) => {
        await page.locator(".product_sort_container").selectOption('lohi')
        await expect(page.locator(".inventory_item_name").first()).toBeVisible()
        const items = await page.locator(".inventory_item_name").allTextContents();

        const Products = ["Sauce Labs Onesie", "Sauce Labs Bike Light",
            "Sauce Labs Bolt T-Shirt", "Test.allTheThings() T-Shirt (Red)",
            "Sauce Labs Backpack", "Sauce Labs Fleece Jacket"]

        expect(items).toEqual(Products)
    })

    test("Products Viewd As High to Low Price By Default", async ({ page }) => {
        await page.locator(".product_sort_container").selectOption('hilo')
        await expect(page.locator(".inventory_item_name").first()).toBeVisible()
        const items = await page.locator(".inventory_item_name").allTextContents();

        const Products = ["Sauce Labs Fleece Jacket", "Sauce Labs Backpack",
            "Sauce Labs Bolt T-Shirt", "Test.allTheThings() T-Shirt (Red)",
            "Sauce Labs Bike Light", "Sauce Labs Onesie"]

        expect(items).toEqual(Products)
    })

    test("6 Buttons are Displayed", async ({ page }) => {
        const Buttons = page.locator(".btn.btn_primary.btn_small.btn_inventory")
        const Buttons_Count = await Buttons.count()
        expect(Buttons_Count).toBe(6)
    })

    test("6 Descriptions are Displayed", async ({ page }) => {
        const Descriptions = page.locator(".inventory_list .inventory_item_desc")
        const Descriptions_Count = await Descriptions.count()
        expect(Descriptions_Count).toBe(6)
    })

    test("6 Prices are Displayed", async ({ page }) => {
        const Prices = page.locator(".inventory_list .inventory_item_price")
        const Prices_Count = await Prices.count()
        expect(Prices_Count).toBe(6)
    })

    test("6 Photos are Displayed", async ({ page }) => {
        const Photos = page.locator("//img[@class = 'inventory_item_img']")
        const Photos_Count = await Photos.count()
        expect(Photos_Count).toBe(6)
    })

    test("6 Names are Displayed", async ({ page }) => {
        const Names = page.locator(".inventory_item_name")
        const Names_Count = await Names.count()
        expect(Names_Count).toBe(6)
    })

    test("App logo & Cart logo & 'Product' are Displayed", async ({ page }) => {
        await expect(page.locator(".app_logo")).toBeVisible()
        expect(await page.locator(".app_logo").textContent()).toBe("Swag Labs")
        await expect(page.locator("#shopping_cart_container")).toBeVisible()
        expect(await page.locator(".title").textContent()).toBe("Products")
    })

    test("Side Bar Buttons 'All Items' and 'Reset App State' Testing", async ({ page }) => {
        const URL1 = page.url()
        await page.getByRole('button', { name: 'Open Menu' }).click()
        await page.locator("#inventory_sidebar_link").click()
        const URL2 = page.url()
        expect(URL1).toEqual(URL2)
        await page.locator("#reset_sidebar_link").click()
        const URL3 = page.url()
        expect(URL1).toEqual(URL3)
    })

    test("Side Bar Button 'About' Testing", async ({ page }) => {
        await page.getByRole('button', { name: 'Open Menu' }).click()
        await page.locator("#about_sidebar_link").click()
        const URL = page.url()
        expect(URL).toEqual("https://saucelabs.com/")
    })

    test("Side Bar Button 'Log out' Testing", async ({ page }) => {
        await page.getByRole('button', { name: 'Open Menu' }).click()
        await page.locator("#logout_sidebar_link").click()
        const URL = page.url()
        expect(URL).toEqual("https://www.saucedemo.com/")
    })

    test("Links to Social Media", async ({ page }) => {
        await expect(page.locator("[data-test='social-twitter']"))
            .toHaveAttribute("href", "https://twitter.com/saucelabs")
        await expect(page.locator("[data-test='social-linkedin']"))
            .toHaveAttribute("href", "https://www.linkedin.com/company/sauce-labs/")
        await expect(page.locator("[data-test='social-facebook']"))
            .toHaveAttribute("href", "https://www.facebook.com/saucelabs")
        expect(await page.locator("[data-test='footer-copy']").textContent()).toContain("2025 Sauce Labs. All Rights")
    })

})
/**
 * @file Swag Labs E2E Test 
 * @description Automated tests for the Swag Labs E2E Testing using Playwright & JS.
 *
 * @author Yazan
 * @created 2025-07-2
 * @tool VSC + Allure Reporter
 */

const { test, expect } = require('@playwright/test');

test.describe("Login Page", () => {
    test.beforeEach("Moving to the Website (Logging Page)", async ({ page }) => {
        await page.goto("https://www.saucedemo.com/")

        await expect(page).toHaveURL("https://www.saucedemo.com/");
        expect(await page.title()).toBe("Swag Labs")
    })
    //Helper Function 1
    async function login(page, username, password) {
        await page.getByPlaceholder("Username").fill(username);
        await page.getByPlaceholder("Password").fill(password);
        await page.getByRole("button", { name: 'Login' }).click();
    }
    //Helper Function 2
    async function Remove_Err_Btn(page) {
        //check weather Error can Be removed
        await page.locator(".error-button").click()
        await expect(page.locator(".error-button")).not.toBeVisible()
    }

    test("Valid Login", async ({ page }) => {
        await login(page, "standard_user", "secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        expect(page.url()).toContain("/inventory")
    })

    test("InValid Login (Wrong Username)", async ({ page }) => {
        await login(page, "standard_user1", "secret_sauce")
        expect(await page.locator("h3").textContent()).toContain("do not match any user in this service")
        await expect(page.locator('.error_icon').first()).toBeVisible()
        //check weather Error can Be removed
        await Remove_Err_Btn(page)
    })

    test("InValid Login (Wrong Password)", async ({ page }) => {
        await login(page, "standard_user", "secret_sauce1")
        expect(await page.locator("h3").textContent()).toContain("do not match any user in this service")
        //check weather Error can Be removed
        await Remove_Err_Btn(page)
    })

    test("InValid Login (Empty Username)", async ({ page }) => {
        await login(page, "", "secret_sauce")
        expect(await page.locator("h3").textContent()).toContain("Username is required")
        //check weather Error can Be removed
        await Remove_Err_Btn(page)
    })

    test("InValid Login (Empty Password)", async ({ page }) => {
        await login(page, "standard_user", "")
        await expect(page.locator("h3")).toContainText("Password is required")
        //check weather Error can Be removed
        await Remove_Err_Btn(page)
    })

    // BUG
    test.fixme("Do Input fields are cleared after error dismissed ?", async ({ page }) => {
        await login(page, "1234", "1234")
        //check weather Error can Be removed
        await page.locator(".error-button").click()
        await expect(page.locator(".error-button")).not.toBeVisible()
        await expect(page.getByPlaceholder("Username")).toHaveValue("")
        await expect(page.getByPlaceholder("Password")).toHaveValue("")
    })

    test("InValid Login (locked_out_user)", async ({ page }) => {
        await login(page, "locked_out_user", "secret_sauce")
        await expect(page.locator("h3")).toContainText("Sorry, this user has been locked out.")
        //check weather Error can Be removed
        await Remove_Err_Btn(page)
    })

    test("problem_user (issue with displaying products)", async ({ page }) => {
        await login(page, "problem_user", "secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        expect(page.url()).toContain("/inventory")
        // 6 Photos with same URL ? Ezzaaaay : OK
        const Photos = await page.$$("//img[@src =  '/static/media/sl-404.168b1cce.jpg']")
        expect(Photos.length).toBe(6)
    })

    // BUG
    test.fixme("error user (Some 'Add to cart' Buttons are not working)", async ({ page }) => {
        await login(page, "error_user", "secret_sauce")
        await expect(page.getByText("Products")).toHaveText("Products")
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        // Test All Add to cart Buttons
        const Buttons = page.locator(".btn.btn_primary.btn_small.btn_inventory")
        const Buttons_Count = await Buttons.count()
        //const Buttons_Count = await Buttons.count()
        for (let i = 0; i < Buttons_Count; i++) {
            const btn = Buttons.nth(i);
            try {
                if (await btn.isVisible()) {
                    await btn.click();
                }
            }
            catch {// ignore
            }
        }
        await expect(page.locator("[data-test='shopping-cart-badge']")).toHaveText('6');
    })
    test.fixme("Visual User (issue with Icons placement)", async ({ page }) => {
        await login(page, "visual_user", "secret_sauce")
        const B1 = await page.locator(".shopping_cart_link").boundingBox()
        await page.locator("#react-burger-menu-btn").click()
        await page.locator("#logout_sidebar_link").click()
        await login(page, "standard_user", "secret_sauce")
        const B2 = await page.locator(".shopping_cart_link").boundingBox()
        expect(B1.x).toBeCloseTo(B2.x, 0);
        expect(B1.y).toBeCloseTo(B2.y, 0);
    })
})


import { expect, test } from "@playwright/test"
import { MainPage } from "../pages/main-page"
import { ProductPage } from "../pages/products-page"
import { ProductDetailsPage } from "../pages/product-details-page"
import { CheckoutPage } from "../pages/checkout-page"
import { SuccessPage } from "../pages/success-page"
import { StoreMenuComponent } from "../components/store-menu-component"
import { HeaderComponent } from "../components/header-component"
import { CompareProductPage } from "../pages/compare-product-page"
import getRandomIndex from "../utils/generate-random-index"
import checkoutData from "../test-data/checkout-data"

test.describe("Playwright_new_L22.POM", () => {
    let mainPage: MainPage;
    let productPage: ProductPage;
    let productDetailsPage: ProductDetailsPage;
    let checkoutPage: CheckoutPage;
    let successPage: SuccessPage;
    let compareProductPage: CompareProductPage;
    let storeMenuComponent: StoreMenuComponent;
    let headerComponent: HeaderComponent;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        productPage = new ProductPage(page);
        productDetailsPage = new ProductDetailsPage(page);
        checkoutPage = new CheckoutPage(page);
        successPage = new SuccessPage(page);
        compareProductPage = new CompareProductPage(page);
        storeMenuComponent = new StoreMenuComponent(page);
        headerComponent = new HeaderComponent(page);
    });

    test("Task 1", async ({ page }) => {
        await test.step("Open the main page", async () => {
            await mainPage.goTo();
            
            expect(await page.title()).toBe(mainPage.homePagetitle);
        });

        await test.step(" Open any product category (Women, Men, Gear)", async () => {
            await storeMenuComponent.clickOnMenCategory();

            expect(await page.title()).toBe("Men");
        });

        await test.step("Find the desired product and go to its page", async () => {
            await productPage.clickOnPantsCategory();
            
            const index: number = getRandomIndex(await productPage.getAmountOfProducts());
            const nameOfProduct: string =  await productPage.getProductName(index);
            
            await productPage.clickOnProduct(index);

            await productDetailsPage.sizeBtns.nth(1).waitFor({ timeout: 60_000 });
            expect(await page.title()).toContain(nameOfProduct);
        });

        await test.step("On the product page, add it to the cart", async () => {
            await productDetailsPage.selectSize(getRandomIndex(4));
            await productDetailsPage.selectColor(getRandomIndex(3));
            await productDetailsPage.clickOnAddToCartBtn();
            await productDetailsPage.addedAlert.waitFor({ timeout: 60_000 });

            expect(await headerComponent.getCartCounterNumber()).toBe("1");
        });

        await test.step("Go to the cart and enter the necessary information during checkout", async () => {
            await headerComponent.clickOnCartBtn();
            await headerComponent.clickOnCheckoutBtn();
            await checkoutPage.email.waitFor({ timeout: 60_000 });

            await checkoutPage.fillEmail(checkoutData.email);
            await checkoutPage.fillFirstName(checkoutData.firstName);
            await checkoutPage.fillLastName(checkoutData.lastName);
            await checkoutPage.fillAddress(checkoutData.streetAddress);
            await checkoutPage.fillCity(checkoutData.city);
            await checkoutPage.selectState(checkoutData.state);
            await checkoutPage.fillZipCode(checkoutData.zipCode);
            await checkoutPage.fillPhone(checkoutData.phone);

            await checkoutPage.checkOnShippRadio();
            await checkoutPage.clickOnNextBtn();
        });

        await test.step("Place the order, and check that the order confirmation is displayed", async () => {
            await checkoutPage.clickOnPlaceOrderBtn();
            await successPage.successMessage.waitFor({ timeout: 60_000 });

            expect(await page.title()).toBe(successPage.pageTitle);
            await expect(successPage.successMessage).toBeVisible();
            // verify that order id is not an empty string
            await expect(successPage.orderId).toContainText(/.*\S.*/);
        });
    });

    test("Taks 2", async ({ page }) => {
        await test.step("Open the main page", async () => {
            await mainPage.goTo();
            
            expect(await page.title()).toBe(mainPage.homePagetitle);
        });

        await test.step(" Open any product category (Women, Men, Gear)", async () => {
            await storeMenuComponent.clickOnMenCategory();

            expect(await page.title()).toBe("Men");
        });

        await test.step("Find the desired product and go to its page", async () => {
            await productPage.clickOnPantsCategory();
            
            const index: number = getRandomIndex(await productPage.getAmountOfProducts());
            const nameOfProduct: string =  await productPage.getProductName(index);
            
            await productPage.clickOnProduct(index);

            await productDetailsPage.sizeBtns.nth(1).waitFor({ timeout: 60_000 });
            expect(await page.title()).toContain(nameOfProduct);
        });

        await test.step("Add it to the comparison on the product page", async () => {
            await productDetailsPage.clickOnAddToCompareBtn();
            await productDetailsPage.addedAlert.waitFor({ timeout: 60_000 });
        });

        await test.step("Find another product, go to its page, and add this product to compare.", async () => {
            await storeMenuComponent.clickOnMenCategory();
            await productPage.clickOnPantsCategory();

            const index: number = getRandomIndex(await productPage.getAmountOfProducts());
            const nameOfProduct: string =  await productPage.getProductName(index);
            
            await productPage.clickOnProduct(index);

            await productDetailsPage.sizeBtns.nth(1).waitFor({ timeout: 60_000 });
            expect(await page.title()).toContain(nameOfProduct);

            await productDetailsPage.clickOnAddToCompareBtn();
            await expect(productDetailsPage.addedAlert).toBeVisible();
        });

        await test.step("Go to the Compare Products page (there should be 2 items)," + 
            "select the cheapest one, and click the Add to Cart button.", async () => {
            await productDetailsPage.clickOnComparePageLink();
            
            const items: number = await compareProductPage.productTable.count();
            expect(items).toBe(2);

            const lowerPrice = await compareProductPage.findLowestPrice();
            await compareProductPage.clickOnAddToCartBtn(lowerPrice);
        });

        await test.step("On the product page, add it to the cart", async () => {
            await page.reload();
            await productDetailsPage.selectSize(getRandomIndex(4));
            await productDetailsPage.selectColor(getRandomIndex(3));
            await productDetailsPage.clickOnAddToCartBtn();
            await productDetailsPage.addedAlert.waitFor({ timeout: 60_000 });

            expect(await headerComponent.getCartCounterNumber()).toBe("1");
        });

        await test.step("Go to the cart and enter the necessary information during checkout", async () => {
            await headerComponent.clickOnCartBtn();
            await headerComponent.clickOnCheckoutBtn();

            await checkoutPage.fillEmail(checkoutData.email);
            await checkoutPage.fillFirstName(checkoutData.firstName);
            await checkoutPage.fillLastName(checkoutData.lastName);
            await checkoutPage.fillAddress(checkoutData.streetAddress);
            await checkoutPage.fillCity(checkoutData.city);
            await checkoutPage.selectState(checkoutData.state);
            await checkoutPage.fillZipCode(checkoutData.zipCode);
            await checkoutPage.fillPhone(checkoutData.phone);

            await checkoutPage.checkOnShippRadio();
            await checkoutPage.clickOnNextBtn();
        });

        await test.step("Place the order, and check that the order confirmation is displayed", async () => {
            await checkoutPage.clickOnPlaceOrderBtn();
            await successPage.successMessage.waitFor({ timeout: 60_000 });

            expect(await page.title()).toBe(successPage.pageTitle);
            await expect(successPage.successMessage).toBeVisible();
            // verify that order id is not an empty string
            await expect(successPage.orderId).toContainText(/.*\S.*/);
        });
    });
});
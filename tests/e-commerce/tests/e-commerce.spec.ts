import { expect, test } from "../fixtures/base-fixture"
import getRandomIndex from "../utils/generate-random-index"
import checkoutData from "../test-data/checkout-data"

test.describe("Playwright_new_L22.POM", () => {

    test("Task 1", async ({ page, mainPage, productPage, productDetailsPage, checkoutPage,
        successPage, storeMenuComponent, headerComponent
     }) => {
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

    test("Taks 2", async ({ page, mainPage, productPage, productDetailsPage, checkoutPage,
        successPage, storeMenuComponent, headerComponent, compareProductPage }) => {
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

    test("Playwright L23, Task 4", async ({ mainPage, storeMenuComponent, productPage,
        logInPage, wishlistPage
     }) => {
        let nameOfProduct: string;

        await test.step("Open the main page", async () => {
            await logInPage.logIn(process.env.EMAIL!, process.env.PASSWORD!);
            await mainPage.goTo();
        });

        await test.step("Open any product category", async () => {
            await storeMenuComponent.clickOnMenCategory();
            await productPage.clickOnPantsCategory();
        });

        await test.step("Add any product to the 'Wishlist'", async () => {
            const index: number = getRandomIndex(await productPage.getAmountOfProducts());
            nameOfProduct =  await productPage.getProductName(index);
            await productPage.product.nth(index).hover();
            await productPage.clickOnAddToWishList(index);
        });

        await test.step("Open the 'Wishlist' and verify that the product is present", async () => {
            await expect(wishlistPage.getProductByName(nameOfProduct)).toBeVisible();
        });
    });
});
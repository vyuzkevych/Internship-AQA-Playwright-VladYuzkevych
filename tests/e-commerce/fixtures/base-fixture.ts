import { test as baseTest } from "@playwright/test";
import { LogInPage } from "../pages/log-in-page";
import { CheckoutPage } from "../pages/checkout-page";
import { CompareProductPage } from "../pages/compare-product-page";
import { MainPage } from "../pages/main-page";
import { ProductDetailsPage } from "../pages/product-details-page";
import { ProductPage } from "../pages/products-page";
import { SuccessPage } from "../pages/success-page";
import { HeaderComponent } from "../components/header-component";
import { StoreMenuComponent } from "../components/store-menu-component";
import { WishlistPage } from "../pages/wishlist-page";

const test = baseTest.extend<{
    logInPage: LogInPage;
    mainPage: MainPage;
    productPage: ProductPage;
    productDetailsPage: ProductDetailsPage;
    checkoutPage: CheckoutPage;
    successPage: SuccessPage;
    compareProductPage: CompareProductPage;
    storeMenuComponent: StoreMenuComponent;
    headerComponent: HeaderComponent;
    wishlistPage: WishlistPage;
}>({
    logInPage: async ({ page }, use) => {
        await use(new LogInPage(page));
    },
    mainPage: async ({ page }, use) => {
        await use(new MainPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    successPage: async ({ page }, use) => {
        await use(new SuccessPage(page));
    },
    compareProductPage: async ({ page }, use) => {
        await use(new CompareProductPage(page));
    },
    storeMenuComponent: async ({ page }, use) => {
        await use(new StoreMenuComponent(page));
    },
    headerComponent: async ({ page }, use) => {
        await use(new HeaderComponent(page));
    },
    wishlistPage: async ({ page }, use) => {
        await use(new WishlistPage(page));
    },
})

export { test };
export { expect } from "@playwright/test";
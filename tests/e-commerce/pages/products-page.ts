import { Locator, Page } from "@playwright/test"

export class ProductPage {
    readonly pantsCategory: Locator;
    readonly product: Locator;
    readonly productName: Locator;
    readonly wishListBtn: Locator;
    
    constructor(private page: Page) {
        this.pantsCategory = this.page.getByRole('link', { name: 'Pants', exact: true });
        this.product = this.page.locator(".product-image-container");
        this.productName = this.page.locator(".product-item-link");
        this.wishListBtn = this.page.getByTitle("Add to Wish List");
    }

    async clickOnPantsCategory(): Promise<void> {
        await this.pantsCategory.click();
    }

    async clickOnProduct(index: number): Promise<void> {
        await this.product.nth(index).click();
    }

    async getAmountOfProducts(): Promise<number> {
        return await this.product.count();
    }

    async getProductName(index: number): Promise<string> {
        return await this.productName.nth(index).innerText();
    }

    async clickOnAddToWishList(index: number): Promise<void> {
        await this.wishListBtn.nth(index).click();
    }
}
import { Locator, Page } from "@playwright/test"

export class ProductPage {
    readonly pantsCategory: Locator = this.page.getByRole('link', { name: 'Pants', exact: true });
    readonly product: Locator = this.page.locator(".product-image-container");
    readonly productName: Locator = this.page.locator(".product-item-link");
    readonly wishListBtn: Locator = this.page.getByTitle("Add to Wish List");
    
    constructor(private page: Page) {}

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
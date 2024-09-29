import { Locator, Page } from "@playwright/test";

export class WishlistPage {
    readonly product: Locator = this.page.locator("a[class='product-item-link']");

    constructor(private page: Page) {}

    getProductByName(name: string): Locator {
        return this.product.filter({ hasText: name });
    }
}
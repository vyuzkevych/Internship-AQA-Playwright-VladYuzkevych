import { Locator, Page } from "@playwright/test";

export class WishlistPage {
    readonly product: Locator;

    constructor(private page: Page) {
        this.product = this.page.locator("a[class='product-item-link']");
    }

    getProductByName(name: string): Locator {
        return this.product.filter({ hasText: name });
    }
}
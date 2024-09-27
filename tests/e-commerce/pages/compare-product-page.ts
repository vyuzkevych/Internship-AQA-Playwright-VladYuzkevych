import { Page, Locator} from "@playwright/test"

export class CompareProductPage {
    readonly pageTitle: Locator = this.page.locator(".page-title-wrapper", { hasText: "Compare Products" });
    readonly productTable: Locator = this.page.locator("tbody tr td .product-item-photo");
    readonly priceOfProducts: Locator = this.page.locator("span[data-price-type='finalPrice'] span");
    readonly addToCartBtn: Locator = this.page.locator("button[type='submit'] span").filter({ hasText: "Add to Cart" });

    constructor(private page: Page) {}

    async findLowestPrice(): Promise<string> {
        const prices: string[] = await this.priceOfProducts.allTextContents();
        const convertedPrices: number[] = prices.map(price => parseFloat(price.replace("$", "")));
        const lowestPrice: number = Math.min(...convertedPrices);

        return `$${lowestPrice.toFixed(2)}`;
    }

    async clickOnAddToCartBtn(price?: string): Promise<void> {
        price === undefined 
            ? await this.addToCartBtn.click()
            : await this.page.getByRole('cell', { name: price }).getByRole('button').click();
    }
}
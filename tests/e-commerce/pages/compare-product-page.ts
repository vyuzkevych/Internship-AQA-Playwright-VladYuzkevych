import { Page, Locator} from "@playwright/test"

export class CompareProductPage {
    readonly pageTitle: Locator;
    readonly productTable: Locator;
    readonly priceOfProducts: Locator;
    readonly addToCartBtn: Locator;

    constructor(private page: Page) {
        this.pageTitle = this.page.locator(".page-title-wrapper", { hasText: "Compare Products" });
        this.productTable = this.page.locator("tbody tr td .product-item-photo");
        this.priceOfProducts = this.page.locator("span[data-price-type='finalPrice'] span");
        this.addToCartBtn = this.page.locator("button[type='submit'] span").filter({ hasText: "Add to Cart" });
    }

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
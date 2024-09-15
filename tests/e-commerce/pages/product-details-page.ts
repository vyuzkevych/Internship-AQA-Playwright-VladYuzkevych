import { Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
    readonly addToCartBtn: Locator = this.page.getByTitle("Add to Cart");
    readonly sizeBtns: Locator = this.page.locator(".swatch-option.text");
    readonly colorBtn: Locator = this.page.locator(".swatch-option.color");
    readonly addedAlert: Locator = this.page.locator("div[role='alert']").first();
    readonly comparePageLink: Locator = this.page.getByRole("link", { name: "comparison list" });
    readonly addToCompareBtn: Locator = this.page.getByText("Add to Compare");

    constructor(readonly page: Page) {}

    async clickOnAddToCompareBtn(): Promise<void> {
        await this.addToCompareBtn.click();
    }
    
    async clickOnComparePageLink(): Promise<void> {
        await this.comparePageLink.click();
    }

    async selectColor(index: number): Promise<void> {
        await this.colorBtn.nth(index).click();
    }

    async selectSize(index: number): Promise<void> {
        await this.sizeBtns.nth(index).click();
    }

    async clickOnAddToCartBtn(): Promise<void> {
        await this.addToCartBtn.click();
    }
}
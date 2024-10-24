import { Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
    readonly addToCartBtn: Locator;
    readonly sizeBtns: Locator;
    readonly colorBtn: Locator;
    readonly addedAlert: Locator;
    readonly comparePageLink: Locator;
    readonly addToCompareBtn: Locator;

    constructor(readonly page: Page) {
        this.addToCartBtn = this.page.getByTitle("Add to Cart");
        this.sizeBtns = this.page.locator(".swatch-option.text");
        this.colorBtn = this.page.locator(".swatch-option.color");
        this.addedAlert = this.page.locator("div[role='alert']").first();
        this.comparePageLink = this.page.getByRole("link", { name: "comparison list" });
        this.addToCompareBtn = this.page.getByText("Add to Compare");
    }

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
import { Locator, Page } from "@playwright/test"

export class HeaderComponent {
    readonly cartBtn: Locator = this.page.locator(".action.showcart");
    readonly cartCounter: Locator = this.page.locator(".counter-number");
    readonly cartPopupCheckoutBtn: Locator = this.page.getByRole("button", { name: "Proceed to Checkout" });

    constructor(private page: Page) {}

    async clickOnCartBtn(): Promise<void> {
        await this.cartBtn.click();
    }

    async getCartCounterNumber(): Promise<string> {
        return await this.cartCounter.innerText();
    }

    async clickOnCheckoutBtn(): Promise<void> {
        await this.cartPopupCheckoutBtn.click();
    }
}
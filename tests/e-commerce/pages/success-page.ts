import { Page, Locator } from "@playwright/test"

export class SuccessPage {
    readonly successMessage: Locator;
    readonly orderId: Locator;
    readonly pageTitle: string = "Success Page";

    constructor(private page: Page) {
        this.successMessage = this.page.getByRole("heading").filter({ hasText: "Thank you for your purchase!" });
        this.orderId = this.page.getByRole("paragraph").locator("span");
    }
}
import { Page, Locator } from "@playwright/test"

export class SuccessPage {
    readonly successMessage: Locator = this.page.getByRole("heading")
        .filter({ hasText: "Thank you for your purchase!" });
    readonly orderId: Locator = this.page.getByRole("paragraph").locator("span");
    readonly pageTitle: string = "Success Page";

    constructor(private page: Page) {}

}
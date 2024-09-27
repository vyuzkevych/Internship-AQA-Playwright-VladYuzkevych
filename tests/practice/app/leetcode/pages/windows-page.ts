import { Page, Locator } from "@playwright/test";

export class WindowsPage {
    readonly homeBtn: Locator = this.page.locator("#home");

    constructor(private page: Page) {}

    async clickOnHomeBtn(): Promise<void> {
        await this.homeBtn.click();
    }
}

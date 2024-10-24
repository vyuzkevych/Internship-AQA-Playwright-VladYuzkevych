import { Page, Locator } from "@playwright/test";

export class WindowsPage {
    readonly homeBtn: Locator;

    constructor(private page: Page) {
        this.homeBtn = this.page.locator("#home");
    }

    async clickOnHomeBtn(): Promise<void> {
        await this.homeBtn.click();
    }
}

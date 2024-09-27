import { Locator, Page } from "@playwright/test"

export class StoreMenuComponent {
    readonly menCategory: Locator = this.page.getByRole('menuitem', { name: ' Men' });

    constructor(private page: Page) {}

    async clickOnMenCategory(): Promise<void> {
        await this.menCategory.click();
    }
}
import { Locator, Page } from "@playwright/test"

export class StoreMenuComponent {
    readonly menCategory: Locator = this.page.getByRole('menuitem', { name: ' Men' }); // getByRole('menuitem', { name: ' Men' })
    // getByRole('link', { name: 'Men', exact: true })

    constructor(private page: Page) {}

    async clickOnMenCategory(): Promise<void> {
        await this.menCategory.click();
    }
}
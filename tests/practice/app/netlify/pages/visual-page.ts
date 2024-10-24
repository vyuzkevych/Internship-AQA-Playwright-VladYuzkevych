import { Page, Locator } from "@playwright/test";

export class VisualPage {
    readonly maskLocator: Locator;
    
    constructor(private page: Page) {
        this.maskLocator = this.page.locator("#dynamic-gif");
    }
}
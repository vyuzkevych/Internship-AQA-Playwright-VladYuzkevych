import { Page, Locator } from "@playwright/test";

export class VisualPage {
    readonly maskLocator: Locator = this.page.locator("#dynamic-gif");
    
    constructor(private page: Page) {}
}
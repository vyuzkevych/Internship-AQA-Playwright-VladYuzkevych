import { Page } from "@playwright/test"

export class MainPage {
    readonly homePagetitle = "Home Page";

    constructor(readonly page: Page) {}

    async goTo() {
        await this.page.goto("/");
    }
    
}
import { Page } from "@playwright/test";

export class BasePage {
    readonly baseUrl: string = "https://letcode.in";

    constructor(private page: Page) {}
}
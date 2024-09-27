import { Page } from "@playwright/test";

export class BasePage {
    readonly baseUrl: string = "https://qa-practice.netlify.app";

    constructor(private page: Page) {}
}
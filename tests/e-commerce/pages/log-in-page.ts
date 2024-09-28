import { Locator, Page } from "@playwright/test";

export class LogInPage {
    readonly emailField: Locator = this.page.getByLabel("Email", { exact: true });
    readonly passwordFied: Locator = this.page.getByLabel("Password");
    readonly signInBtn: Locator = this.page.getByRole("button", { name: "Sign In" });

    constructor(private page: Page) {}

    async logIn(email: string, pwd: string): Promise<void> {
        await this.page.goto("/customer/account/login");

        await this.emailField.fill(email);
        await this.passwordFied.fill(pwd);
        await this.signInBtn.click();
    }
}
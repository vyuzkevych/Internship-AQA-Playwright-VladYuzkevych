import { Locator, Page } from "@playwright/test";

export class LogInPage {
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly signInBtn: Locator;

    constructor(private page: Page) {
        this.emailField = this.page.getByLabel("Email", { exact: true });
        this.passwordField = this.page.getByLabel("Password");
        this.signInBtn = this.page.getByRole("button", { name: "Sign In" });
    }

    async logIn(email: string, pwd: string): Promise<void> {
        await this.page.goto("/customer/account/login");

        await this.emailField.fill(email);
        await this.passwordField.fill(pwd);
        await this.signInBtn.click();
    }
}

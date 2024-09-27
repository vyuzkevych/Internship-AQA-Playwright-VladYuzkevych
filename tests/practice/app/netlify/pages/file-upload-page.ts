import { Page, Locator} from "@playwright/test";

export class FileUploadPage {
    readonly fileUploadBtn: Locator = this.page.locator("#file_upload");
    readonly submitBtn: Locator = this.page.getByRole("button", { name: "Submit" });
    readonly successMessage: Locator = this.page.locator("#file_upload_response");

    constructor(private page: Page) {}

    async clickOnFileUploadBtn(): Promise<void> {
        await this.fileUploadBtn.click();
    }

    async clickOnSubmitBtn(): Promise<void> {
        await this.submitBtn.click();
    }

    async getSuccessMessageText(): Promise<string> {
        return this.successMessage.innerText();
    }
}
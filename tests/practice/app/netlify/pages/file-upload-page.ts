import { Page, Locator} from "@playwright/test";

export class FileUploadPage {
    readonly fileUploadBtn: Locator;
    readonly submitBtn: Locator;
    readonly successMessage: Locator;

    constructor(private page: Page) {
        this.fileUploadBtn = this.page.locator("#file_upload");
        this.submitBtn = this.page.getByRole("button", { name: "Submit" });
        this.successMessage = this.page.locator("#file_upload_response");
    }

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
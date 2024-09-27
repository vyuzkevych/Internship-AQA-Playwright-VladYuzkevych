import { Page, Locator } from "@playwright/test";

export class SliderPage {
    readonly slider: Locator = this.page.locator("#generate");
    readonly getCountriesBtn: Locator = this.page.getByRole("button", { name: "Get Countries" });
    readonly textInfo: Locator = this.page.getByRole("heading", { name: "Word limit :" });
    readonly countries: Locator = this.page.locator("p[class='has-text-primary-light']");

    constructor(private page: Page) {}

    async enterSliderValue(val: string): Promise<void> {
        await this.slider.fill(val);
    }

    async clickOnGetCountriesBtn(): Promise<void> {
        await this.getCountriesBtn.click();
    }

    async getCountryNumber(): Promise<number> {
        const countryNumber = await this.textInfo.innerText();
        return Number(countryNumber.split(" :")[1]);
    }

    async getCountries(): Promise<string[]> {
        const countries: string = await this.countries.innerText();
        return countries.split(" - ");
    }
}
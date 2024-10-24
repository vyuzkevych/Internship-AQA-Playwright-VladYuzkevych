import { Page, Locator } from "@playwright/test";

export class SliderPage {
    readonly slider: Locator;
    readonly getCountriesBtn: Locator;
    readonly textInfo: Locator;
    readonly countries: Locator;

    constructor(private page: Page) {
        this.slider = this.page.locator("#generate");
        this.getCountriesBtn = this.page.getByRole("button", { name: "Get Countries" });
        this.textInfo = this.page.getByRole("heading", { name: "Word limit :" });
        this.countries = this.page.locator("p[class='has-text-primary-light']");
    }

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
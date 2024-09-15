import { Page, Locator } from "@playwright/test"

export class CheckoutPage {
    readonly email: Locator = this.page.locator(".control._with-tooltip input[type='email']");
    readonly firstName: Locator = this.page.locator("input[name='firstname']");
    readonly lastName: Locator = this.page.locator("input[name='lastname']");
    readonly streetAddress: Locator = this.page.locator("input[name='street[0]']");
    readonly city: Locator = this.page.locator("input[name='city']");
    readonly state: Locator = this.page.locator("select[name='region_id']");
    readonly zipCode: Locator = this.page.locator("input[name='postcode']");
    readonly country: Locator = this.page.locator("select[name='country_id']");
    readonly phone: Locator = this.page.locator("input[name='telephone']");
    readonly shippMethodRadio: Locator = this.page.locator("input[type='radio']");
    readonly nextBtn: Locator = this.page.getByRole("button").filter({ hasText: "Next" });
    readonly placeOrderBtn: Locator = this.page.getByRole("button").filter({ hasText: "Place Order" });
    readonly pageTitle: string = "Checkout";
    
    constructor(private page: Page) {}

    async fillEmail(email: string): Promise<void> {
        await this.email.fill(email);
    }

    async fillFirstName(firstName: string): Promise<void> {
        await this.firstName.fill(firstName);
    }

    async fillLastName(lastName: string): Promise<void> {
        await this.lastName.fill(lastName);
    }

    async fillAddress(address: string): Promise<void> {
        await this.streetAddress.fill(address);
    }

    async fillCity(city: string): Promise<void> {
        await this.city.fill(city);
    }

    async selectState(state: string): Promise<void> {
        await this.state.selectOption(state);
    }

    async fillZipCode(zip: string): Promise<void> {
        await this.zipCode.fill(zip);
    }

    async selectCountry(counry: string): Promise<void> {
        await this.country.selectOption(counry);
    }

    async fillPhone(phone: string): Promise<void> {
        await this.phone.fill(phone);
    }

    async checkOnShippRadio(): Promise<void> {
        await this.shippMethodRadio.first().click();
    }

    async clickOnNextBtn(): Promise<void> {
        await this.nextBtn.click();
    }

    async clickOnPlaceOrderBtn(): Promise<void> {
        await this.placeOrderBtn.click()
    }

}
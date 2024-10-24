import { Page, Locator } from "@playwright/test"

export class CheckoutPage {
    readonly email: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly streetAddress: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipCode: Locator;
    readonly country: Locator;
    readonly phone: Locator;
    readonly shippMethodRadio: Locator;
    readonly nextBtn: Locator;
    readonly placeOrderBtn: Locator;
    readonly pageTitle: string = "Checkout";
    
    constructor(private page: Page) {
        this.email = this.page.locator(".control._with-tooltip input[type='email']");
        this.firstName = this.page.locator("input[name='firstname']");
        this.lastName = this.page.locator("input[name='lastname']");
        this.streetAddress = this.page.locator("input[name='street[0]']");
        this.city = this.page.locator("input[name='city']");
        this.state = this.page.locator("select[name='region_id']");
        this.zipCode = this.page.locator("input[name='postcode']");
        this.country = this.page.locator("select[name='country_id']");
        this.phone = this.page.locator("input[name='telephone']");
        this.shippMethodRadio = this.page.locator("input[type='radio']");
        this.nextBtn = this.page.getByRole("button").filter({ hasText: "Next" });
        this.placeOrderBtn = this.page.getByRole("button").filter({ hasText: "Place Order" });
    }

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
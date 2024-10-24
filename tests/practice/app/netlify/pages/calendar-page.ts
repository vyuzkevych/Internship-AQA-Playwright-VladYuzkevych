import { Page, Locator } from "@playwright/test";
import dayjs from 'dayjs';

export class CalendarPage {
    readonly calendar: Locator;
    readonly datepickerHeaderDate: Locator;
    readonly datePickerPrev: Locator;
    readonly datePickerNext: Locator;
    readonly datePickerDay: Locator;

    constructor(private page: Page) {
        this.calendar = this.page.locator("#calendar");
        this.datepickerHeaderDate = this.page.locator("table[class=' table-condensed'] th[class='datepicker-switch']");
        this.datePickerPrev = this.page.locator("table[class=' table-condensed'] th[class='prev']");
        this.datePickerNext = this.page.locator("table[class=' table-condensed'] th[class='next']");
        this.datePickerDay = this.page.locator("td[class='day']");
    }

    async selectDate (day: string, month: string, year: string): Promise<string> {
        const currentDate = dayjs();
        const dateFull = dayjs(`${month} ${day} ${year}`);
        const dateFullFormatted = dateFull.format("MMMM YYYY");

        await this.calendar.click();
        
        while (await this.datepickerHeaderDate.innerText() !== dateFullFormatted) {
            if (currentDate.isAfter(dateFull)) {
                await this.datePickerPrev.click();
            } else {
                await this.datePickerNext.click();
            }
        }

        const dayValue: string = await this.datePickerDay.filter({ hasText: `${day}` }).innerText();
        const calendarHeaderValue: string = await this.datepickerHeaderDate.innerText();
        
        const finalDate = dayjs(`${dayValue} ${calendarHeaderValue}`);
        await this.datePickerDay.filter({ hasText: `${day}` }).click();
        return finalDate.format("DD MMMM YYYY");
    }
}
import { expect, Locator, test } from "@playwright/test";
import dayjs from 'dayjs';
import path from "path";

test.describe("Playwright: Advanced features", () => {
    
    test("Task 1", async ({ page, context }) => {
        const pagePromise = context.waitForEvent("page");
        await page.goto("https://letcode.in/windows");
        await page.locator("#home").click();
        const newPage = await pagePromise;
        await newPage.waitForURL("https://letcode.in/test");
        const newPageTitle = await newPage.title();

        expect(newPageTitle).toBe("LetCode - Testing Hub");
    });

    
    test("Taks 2", async ({ page }) => {
        await page.goto("https://qa-practice.netlify.app/calendar");
        
        const calendar: Locator = page.locator("#calendar");
        const datepickerHeaderDate: Locator = page.locator("table[class=' table-condensed'] th[class='datepicker-switch']");
        const datePickerPrev: Locator = page.locator("table[class=' table-condensed'] th[class='prev']");
        const datePickerNext: Locator = page.locator("table[class=' table-condensed'] th[class='next']");
        const datePickerDay: Locator = page.locator("td[class='day']");

        const currentDate = dayjs();

        async function selectDate (day: string, month: string, year: string) {    
            const dateFull = dayjs(`${month} ${day} ${year}`);
            const dateFullFormatted = dateFull.format("MMMM YYYY");

            await calendar.click();
            
            while (await datepickerHeaderDate.innerText() !== dateFullFormatted) {
                if (currentDate.isAfter(dateFull)) {
                    await datePickerPrev.click();
                } else {
                    await datePickerNext.click();
                }
            }

            const finalDate = dayjs(`${await datePickerDay.filter({ hasText: `${day}` }).innerText()} ${await datepickerHeaderDate.innerText()}`);
            await datePickerDay.filter({ hasText: `${day}` }).click();
            return finalDate.format("DD MMMM YYYY");
        }

        const date = await selectDate("28", "May", "2024");
        expect(date).toBe("28 May 2024")
    });

    test("Task 3", async ({ page }) => {
        await page.goto("https://qa-practice.netlify.app/file-upload");

        const fileChooserPromise = page.waitForEvent("filechooser");
        await page.locator("#file_upload").click();
        const filechooser = await fileChooserPromise;
        await filechooser.setFiles(path.join("cat.jpg"));

        await page.getByRole("button", { name: "Submit" }).click();
        const successMessage = await page.locator("#file_upload_response").innerText();
        expect(successMessage).toBe(`You have successfully uploaded "cat.jpg"`);
    });

    test("Task 4", async ({ page }) => {
        await page.goto("https://qa-practice.netlify.app/visual");

        await expect(page).toHaveScreenshot({ mask: [page.locator("#dynamic-gif")]});
    });

    test("Task 5", async ({ page }) => {
        await page.goto('https://letcode.in/slider');
        await page.locator("#generate").fill("4");
        await page.getByRole("button", { name: "Get Countries" }).click();

        const textInfo = await page.getByRole("heading", { name: "Word limit :" }).innerText();
        const number = Number(textInfo.split(" :")[1]);
        const countries = await page.locator("p[class='has-text-primary-light']").innerText();
        const countriesArr = countries.split(" - ")

        expect(countriesArr.length).toBe(number);
    });
})
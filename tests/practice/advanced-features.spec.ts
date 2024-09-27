import { expect, test } from "@playwright/test";
import path from "path";
import { WindowsPage } from "./app/leetcode/pages/windows-page";
import { CalendarPage } from "./app/netlify/pages/calendar-page";
import { FileUploadPage } from "./app/netlify/pages/file-upload-page";
import { SliderPage } from "./app/leetcode/pages/slider-page";
import { BasePage as leetcode } from "./app/leetcode/pages/base-page";
import { BasePage as netlify } from "./app/netlify/pages/base-page";
import { VisualPage } from "./app/netlify/pages/visual-page";

test.describe("Playwright: Advanced features", () => {
    let baseNetlifyPage;
    let baseLeetcodePage;

    test.beforeEach(async ({ page }) => {
        baseNetlifyPage = new netlify(page);
        baseLeetcodePage = new leetcode(page);
    })
    
    test("Task 1", async ({ page, context }) => {
        const windowsPage: WindowsPage = new WindowsPage(page);
        const pagePromise = context.waitForEvent("page");
        await page.goto(`${baseLeetcodePage.baseUrl}/windows`);

        await windowsPage.clickOnHomeBtn();
        const newPage = await pagePromise;
        await newPage.waitForURL(`${baseLeetcodePage.baseUrl}/test`);
        const newPageTitle = await newPage.title();

        expect(newPageTitle).toBe("LetCode - Testing Hub");
    });
    
    test("Taks 2", async ({ page }) => {
        const calendarPage: CalendarPage = new CalendarPage(page);
        await page.goto(`${baseNetlifyPage.baseUrl}/calendar`);
        
        const date = await calendarPage.selectDate("28", "May", "2024");
        expect(date).toBe("28 May 2024")
    });

    test("Task 3", async ({ page }) => {
        const fileUploadPage: FileUploadPage = new FileUploadPage(page);
        await page.goto(`${baseNetlifyPage.baseUrl}/file-upload`);

        const fileChooserPromise = page.waitForEvent("filechooser");
        await fileUploadPage.clickOnFileUploadBtn();
        const filechooser = await fileChooserPromise;
        await filechooser.setFiles(path.join("cat.jpg"));

        await fileUploadPage.clickOnSubmitBtn();
        const successMessage = await fileUploadPage.getSuccessMessageText();
        expect(successMessage).toBe(`You have successfully uploaded "cat.jpg"`);
    });

    test("Task 4", async ({ page }) => {
        const visualPage = new VisualPage(page)
        await page.goto(`${baseNetlifyPage.baseUrl}/visual`);

        await expect(page).toHaveScreenshot({ mask: [visualPage.maskLocator]});
    });

    test("Task 5", async ({ page }) => {
        const sliderPage: SliderPage = new SliderPage(page);
        await page.goto(`${baseLeetcodePage.baseUrl}/slider`);

        await sliderPage.enterSliderValue("4");
        await sliderPage.clickOnGetCountriesBtn();

        const countryNumber: number = await sliderPage.getCountryNumber();
        const countries: string[] = await sliderPage.getCountries();

        expect(countries.length).toBe(countryNumber);
    });
})
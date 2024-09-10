import { test, expect, FrameLocator, Locator } from "@playwright/test"
import { userData } from "../../test-data/user-data";

test.describe("HW Playwright_L21.Locators.and.actions", () => {

    test("register form", async ({ page }) => {
        await page.goto("https://qa-practice.netlify.app/register");

        await page.locator("#firstName").fill(userData.firstName);
        await page.locator("#lastName").fill(userData.lastName);
        await page.locator("#phone").fill(userData.phone);
        await page.locator("#countries_dropdown_menu").selectOption("Ukraine");
        await page.locator("#emailAddress").fill(userData.email);
        await page.locator("#password").fill(userData.password);

        await page.locator("#exampleCheck1").check();
        await page.locator("#registerBtn").click();
        
        await expect(page.locator("#message")).toHaveText("The account has been successfully created!");
    });

    test("iFrame", async ({ page }) => {
        await page.goto("https://qa-practice.netlify.app/iframe");

        const iFrame: FrameLocator = page.frameLocator("#iframe-checkboxes");

        await iFrame.locator("#learn-more").click();
        await expect(iFrame.locator("#show-text")).toContainText('This text appears when you click the "Learn more" button');
    });

    test("Checkboxes", async ({ page }) => {
        await page.goto("https://www.qa-practice.com/elements/checkbox/mult_checkbox");

        await test.step("There should be three checkboxes on the page.", async () => {
            const amountOfCheckboxes: number = await page.locator("input[type='checkbox']").count();
            expect(amountOfCheckboxes).toBe(3);
        });

        await test.step("The label of the checkboxes should be: 'One', 'Two', 'Three'", async () => {
            const labels: string[] = await page.locator("label[class='form-check-label']").allInnerTexts();
            expect(labels).toEqual(["One", "Two", "Three"]);
        });

        await test.step("The user should be able to select any checkbox", async () => {
            await page.locator("#id_checkboxes_1").check();
            await expect(page.locator("#id_checkboxes_1")).toBeChecked();
        });

        await test.step("The Submit button should always be enabled", async () => {
            await expect(page.locator("#submit-id-submit")).toBeEnabled();
        });

        await test.step("After submitting the user should get the following result:" + 
            "if no checkbox was selected, then the result is not displayed", async () => {
                await page.reload();
                await page.locator("#submit-id-submit").click();
                await expect(page.locator("#result")).toBeHidden();
            }
        );

        await test.step("After submitting the user should get the following result:" +
            "if a checkbox has been selected, the name(s) of the selected checkbox(es) is(are) displayed to the user",
            async () => {
                await page.locator("#id_checkboxes_0").check();
                await page.locator("#id_checkboxes_2").check();
                await page.locator("#submit-id-submit").click();

                await expect(page.locator("#result")).toBeVisible();
                await expect(page.locator("#result-text")).toContainText("one, three");
            }
        );
    });

    test("Sortable Tables task", async ({ page }) => {
        await page.goto("https://letcode.in/table");

        const sortNumbers = (arr: string[]) => {
            let converted: number[] = arr.map(el => Number(el));
            const sorted: number[] = converted.sort((a, b) => a - b);

            return sorted.map(String);
        }

        await test.step("sort by desert column", async () => {
            const columnLocator: Locator = page.locator(".card-conetnt > div > table > tr > td:nth-child(1)");

            const desertColumnValues: string[] = await columnLocator.allInnerTexts();
            const sortedString: string[] = desertColumnValues.sort();

            await page.getByText("Dessert (100g)").click();
            const sortedColumnValues: string[] = await columnLocator.allInnerTexts();
            
            expect.soft(sortedColumnValues).toStrictEqual(sortedString);
        });

        await test.step("sort by calories column", async () => {
            const columnLocator: Locator = page.locator(".card-conetnt > div > table > tr > td:nth-child(3)");

            const sortedCaloriesColumn: string[] = sortNumbers(await columnLocator.allInnerTexts());
            await page.getByText("Calories").click();
            const caloriesColumnValues: string[] = await columnLocator.allInnerTexts();
            
            expect.soft(caloriesColumnValues).toStrictEqual(sortedCaloriesColumn);
        });

        await test.step("sort by fat column", async () => {
            const columnLocator: Locator = page.locator(".card-conetnt > div > table > tr > td:nth-child(5)");

            const sortedFatColumn: string[] = sortNumbers(await columnLocator.allInnerTexts());
            await page.getByText("Fat (g)").click();
            const fatColumnValues: string[] = await columnLocator.allInnerTexts();
            
            expect.soft(fatColumnValues).toStrictEqual(sortedFatColumn);
        });

        await test.step("sort by carbs column", async () => {
            const columnLocator: Locator = page.locator(".card-conetnt > div > table > tr > td:nth-child(7)");

            const sortedCarbsColumn: string[] = sortNumbers(await columnLocator.allInnerTexts());
            await page.getByText("Carbs (g)").click();
            const carbsColumnValues: string[] = await columnLocator.allInnerTexts();
            
            expect.soft(carbsColumnValues).toStrictEqual(sortedCarbsColumn);
        });

        await test.step("sort by protein column", async () => {
            const columnLocator: Locator = page.locator(".card-conetnt > div > table > tr > td:nth-child(9)");

            const sortedProteinColumn: string[] = sortNumbers(await columnLocator.allInnerTexts());
            await page.getByText("Protein (g)").click();
            const proteinColumnValues: string[] = await columnLocator.allInnerTexts();
            
            expect.soft(proteinColumnValues).toStrictEqual(sortedProteinColumn);
        });

        await test.step("sort by cholesterol column", async () => {
            const columnLocator: Locator = page.locator(".card-conetnt > div > table > tr > td:nth-child(11)");

            const sortedCholColumn: string[] = sortNumbers(await columnLocator.allInnerTexts());
            await page.getByText("Cholesterol(mg)").click();
            const cholColumnValues: string[] = await columnLocator.allInnerTexts();
            
            expect.soft(cholColumnValues).toStrictEqual(sortedCholColumn);
        });
    });
});
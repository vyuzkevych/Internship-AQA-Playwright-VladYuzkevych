import { expect, test } from "@playwright/test";

test.describe("Task 3 | mocking", () => {
    const mockData = {
        name: "test",
        email: "test@test.com",
        body: "lorem ipsum"
    }

    test("mocking data", async ({ page }) => {
        await page.route("https://jsonplaceholder.typicode.com/comments", async route => {
            const json = [{
                postId: 666, 
                id: 999, 
                name: mockData.name, 
                email: mockData.email, 
                body: mockData.body
            }];
            await route.fulfill({ json });
        });
        await page.goto("https://qa-practice.netlify.app/fetch-api");
        
        const name = await page.getByRole("cell", { name: mockData.name, exact: true }).innerText();
        const email = await page.getByRole("cell", { name: mockData.email, exact: true }).innerText();
        const body = await page.getByRole("cell", { name: mockData.body, exact: true }).innerText();
        
        expect(name).toBe(mockData.name);
        expect(email).toBe(mockData.email);
        expect(body).toBe(mockData.body);
    });
});
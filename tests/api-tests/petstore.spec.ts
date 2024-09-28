import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.describe("Playwright_L26.API.testing", () => {
    const baseUrl = "https://petstore.swagger.io/v2/pet"

    test("Implement any 2 negative tests", async ({ request }) => {
        await test.step("delete non existing pet", async () => {
            const resp = await request.delete(`${baseUrl}/0`);
            expect(resp.status()).toBe(404);
        });
        await test.step("update pet with invalid ID format", async () => {
            const resp = await request.put(baseUrl, {
                data: {
                    id: "asd"
                }
            });
            const jsonResp = await resp.json();
            expect(resp.status()).toBe(500);
            expect(jsonResp.message).toContain("something bad happened");
        });
    });

    test("Implement Pet endpoint flow", async ({ request }) => {
        const petId = faker.number.int({ min: 3, max: 10 });
        const petName = "testPet";

        await test.step("Add a new pet to the store", async () => {
            const resp = await request.post(baseUrl, {
                data: {
                    id: petId,
                    name: petName
                }
            });
            const jsonResp = await resp.json();
            expect(resp.status()).toBe(200);
            expect(jsonResp).toMatchObject({
                id: petId,
                name: petName
            });
        });
        await test.step("Get a pet by ID", async () => {
            const resp = await request.get(`${baseUrl}/${petId}`);
            const jsonResp = await resp.json();

            expect(jsonResp).toMatchObject({
                id: petId,
                name: petName
            });
            expect(resp.ok);
        });
        await test.step("Update a pet", async () => {
            const updatedName = "updatedName"
            const resp = await request.put(baseUrl, {
                data: {
                    id: petId,
                    name: updatedName
                }
            });
            const jsonResp = await resp.json();
            expect(jsonResp.name).toBe(updatedName);
        });
        await test.step("Delete a pet", async () => {
            const resp = await request.delete(`${baseUrl}/${petId}`);
            expect(resp.ok);
        });
    });
});
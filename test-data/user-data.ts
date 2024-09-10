import { faker } from "@faker-js/faker"

export const userData: { firstName: string, lastName: string, phone: string,
    email: string, password: string } = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }
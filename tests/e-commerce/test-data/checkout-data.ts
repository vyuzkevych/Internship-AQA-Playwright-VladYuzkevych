import { faker } from "@faker-js/faker"
import { Checkout } from "../interfaces/checkout"

const checkoutData: Checkout = {
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    streetAddress: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country(),
    phone: faker.phone.number({ style: "international" })
}

export default checkoutData;
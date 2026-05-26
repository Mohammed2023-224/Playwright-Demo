import { faker } from '@faker-js/faker';


export function generateFakeName() {
    return faker.person.fullName();
}

export function generateFakeEmail() {
    return faker.internet.email();
}
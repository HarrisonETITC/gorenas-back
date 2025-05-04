import { setSeederFactory } from "typeorm-extension";
import { PersonEntity } from "../../entities/person.entity";
import { PersonModel } from "@Domain/models/person.model";

export const PersonFactory = setSeederFactory(PersonEntity, (faker) => {
    const person = new PersonEntity();
    person.names = `${faker.person.firstName()} ${faker.person.middleName()}`;
    person.surnames = `${faker.person.lastName()} ${faker.person.lastName()}`;
    person.identification = faker.string.numeric(15);
    person.typeIdentification = faker.helpers.arrayElement(PersonModel.TYPES_IDENTIFICATION);
    person.phoneNumber = `3${faker.string.numeric(9)}`;
    person.rh = faker.helpers.arrayElement(PersonModel.RH_TYPES);
    person.address = faker.location.streetAddress({ useFullAddress: true });
    person.roleId = faker.helpers.arrayElement([2,])

    return person;
})
import { IBuilder } from "@Domain/interfaces/builder.interface";
import { PersonModel } from "../person.model";

export class PersonBuilder implements IBuilder<PersonModel> {
    private person: PersonModel;

    constructor() {
        this.reset();
    }

    setId(id: number) {
        this.person.id = id;
        return this;
    }
    setNames(names: string) {
        this.person.names = names;
        return this;
    }
    setSurnames(surnames: string) {
        this.person.surnames = surnames;
        return this;
    }
    setIdentification(identification: string) {
        this.person.identification = identification;
        return this;
    }
    setTypeIdentification(typeIdentification: string) {
        this.person.typeIdentification = typeIdentification;
        return this;
    }
    setPhoneNumber(phoneNumber: string) {
        this.person.phoneNumber = phoneNumber;
        return this;
    }
    setRh(rh: string) {
        this.person.rh = rh;
        return this;
    }
    setAddress(address: string) {
        this.person.address = address;
        return this;
    }
    setBorn(born: Date) {
        this.person.born = born;
        return this;
    }
    setCreated(created: Date) {
        this.person.created = created;
        return this;
    }
    build(): PersonModel {
        const builded = this.person;
        this.reset();
        return builded;
    }
    reset(): void {
        this.person = new PersonModel();
    }
}
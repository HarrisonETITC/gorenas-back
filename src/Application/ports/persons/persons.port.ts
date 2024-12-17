import { PersonModelView } from "@Application/model-view/person.mv";

export interface PersonsPort {
    getByUserId(id: number): Promise<PersonModelView>;
}
import { PersonModelView } from "@Application/model-view/person.mv";
import { PersonModel } from "@Domain/models/person.model";

export interface PersonsPort {
    getByUserId(id: number): Promise<PersonModelView>;
}
import { CreatedModel } from "./general/created.model";
import { GeneralModel } from "./general/general.model";

export class PersonModel implements GeneralModel, CreatedModel {
    id: number;
    names: string;
    surnames: string;
    identification: string;
    typeIdentification: string;
    phoneNumber: string;
    rh: string;
    address: string;
    born: Date;
    created: Date;
}
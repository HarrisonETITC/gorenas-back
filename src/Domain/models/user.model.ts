import { CreatedModel } from "./general/created.model";
import { GeneralModel } from "./general/general.model";
import { StateModel } from "./general/state.model";

export class UserModel implements GeneralModel, StateModel, CreatedModel {
    id: number;
    email: string;
    password: string;
    state: string;
    created: Date;
}

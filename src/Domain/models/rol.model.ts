import { GeneralModel } from "./general/general.model";
import { StateModel } from "./general/state.model";

export class RolModel implements GeneralModel, StateModel {
    id: number;
    name: string;
    state: string;
    created: Date;
    modified: Date;
}
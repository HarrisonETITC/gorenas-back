import { CreatedModel } from "./general/created.model";
import { GeneralModel } from "./general/general.model";
import { ModifiedModel } from "./general/modified.model";
import { StateModel } from "./general/state.model";

export class BranchModel implements GeneralModel, StateModel, CreatedModel, ModifiedModel {
    id: number;
    state: string;
    name: string;
    address: string;
    earnings: number;
    created: Date;
    modified: Date;
}
import { GeneralModel } from "./general/general.model";
import { StateModel } from "./general/state.model";

export class EmployeeModel implements GeneralModel, StateModel {
    id: number;
    salary: number;
    state: string;
}
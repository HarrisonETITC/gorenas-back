import { GeneralModel } from "./general/general.model";
import { StateModel } from "./general/state.model";

export class EmployeeModel implements GeneralModel, StateModel {
    id: number;
    salary: number;
    state: string;
    branchId?: number; // Texto desde el front (dirección), se convierte a ID en el repositorio
    personId?: number; // Texto desde el front (nombre), se convierte a ID en el repositorio
}
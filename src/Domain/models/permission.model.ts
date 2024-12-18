import { GeneralModel } from "./general/general.model";

export class PermissionModel implements GeneralModel {
    id: number;
    name: string;
    created: Date;
}
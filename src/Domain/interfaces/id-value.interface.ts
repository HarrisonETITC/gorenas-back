import { GeneralModel } from "@Domain/models/general/general.model";

export interface IdValue extends GeneralModel {
    id: number;
    value: string;
}
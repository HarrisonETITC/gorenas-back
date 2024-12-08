import { GeneralModel } from "@Domain/models/general/general.model";

export interface GenerateModelViewPort<T extends GeneralModel, U = T> {
    generateModelView(models: Array<T>): Promise<Array<U>>;
}
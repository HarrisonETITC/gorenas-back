import { GeneralModel } from "@Domain/models/general/general.model";

export interface DtoMapperPort<T extends GeneralModel, U = T, K = T> {
    fromModelToCreate(base: T, params?: Map<string, string>): U;
    fromModelToUpdate(base: T, params?: Map<string, string>): K;
    fromCreateToModel(create: U, params?: Map<string, string>): T;
    fromUpdateToModel(update: K, params?: Map<string, string>): T;
}
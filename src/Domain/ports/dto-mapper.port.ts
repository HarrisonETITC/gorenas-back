import { GeneralModel } from "@Domain/models/general/general.model";

export interface DtoMapperPort<T extends GeneralModel, U = T, K = T> {
    fromModelToCreate(base: T): U;
    fromModelToUpdate(base: T): K;
    fromCreateToModel(create: U): T;
    fromUpdateToModel(update: K): T;
}
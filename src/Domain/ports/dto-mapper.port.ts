import { GeneralModel } from "@Domain/models/general/general.model";

export interface DtoMapperPort<T extends GeneralModel, U = T, K = T> {
    fromBaseToCreate(base: T): U;
    fromBaseToUpdate(base: T): K;
    fromCreateToBase(create: U): T;
    fromUpdateToBase(update: K): T;
}
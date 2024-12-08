import { GeneralModel } from "@Domain/models/general/general.model";

export interface EntityMapperPort<T extends GeneralModel, U = T, J = T> {
    fromEntityToDomain(entity: U): T;
    fromDomainToEntity(domain: T): U;
    fromDomainToMv(domain: T, extra?: Map<string, string>): J;
}
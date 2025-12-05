import { GeneralModel } from "@Domain/models/general/general.model";

export interface EntityMapperPort<T extends GeneralModel, U = T, J = T, K = T> {
    fromEntityToDomain(entity: U): T;
    fromDomainToEntity(domain: T, params?: Map<string, string>): U;
    fromDomainToMv(domain: T, extra?: K): J;
}
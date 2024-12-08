import { ROLE_DTO_MAPPER, ROLE_ENTITY_MAPPER, ROLE_REPOSITORY, ROLE_SERVICE } from "@Application/config/inject-tokens/role.tokens";
import { Provider } from "@nestjs/common";
import { RoleEntityMapper } from "../../mappers/role-entity.mapper";
import { RoleRepository } from "../../repositories/role.repository";
import { RoleDtoMapper } from "@Application/mappers/role-dto.mapper";
import { RoleServiceAdapter } from "@Application/adapters/role-service.adapter";

export const RoleProviders: Array<Provider> = [
    {
        provide: ROLE_ENTITY_MAPPER,
        useClass: RoleEntityMapper
    },
    {
        provide: ROLE_REPOSITORY,
        useClass: RoleRepository
    },
    {
        provide: ROLE_DTO_MAPPER,
        useClass: RoleDtoMapper
    },
    {
        provide: ROLE_SERVICE,
        useClass: RoleServiceAdapter
    }
]

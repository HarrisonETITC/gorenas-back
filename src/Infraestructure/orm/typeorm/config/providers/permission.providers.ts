import { PermissionServiceAdapter } from "@Application/adapters/permission-service.adapter";
import { PERMISSION_ENTITY_MAPPER, PERMISSION_REPOSITORY, PERMISSION_DTO_MAPPER, PERMISSION_SERVICE } from "@Application/config/inject-tokens/permission.tokens";
import { PermissionDtoMapper } from "@Application/mappers/permission-dto.mapper";
import { Provider } from "@nestjs/common";
import { PermissionEntityMapper } from "../../mappers/permission-entity.mapper";
import { PermissionRepository } from "../../repositories/permission.repository";

export const PermissionProviders: Array<Provider> = [
    {
        provide: PERMISSION_ENTITY_MAPPER,
        useClass: PermissionEntityMapper
    },
    {
        provide: PERMISSION_REPOSITORY,
        useClass: PermissionRepository
    },
    {
        provide: PERMISSION_DTO_MAPPER,
        useClass: PermissionDtoMapper
    },
    {
        provide: PERMISSION_SERVICE,
        useClass: PermissionServiceAdapter
    }
]

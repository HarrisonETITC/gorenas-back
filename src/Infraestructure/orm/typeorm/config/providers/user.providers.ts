import { Provider } from "@nestjs/common";
import { UserEntityMapper } from "../../mappers/user-entity.mapper";
import { UserRepository } from "../../repositories/user.repository";
import { USER_DTO_MAPPER, USER_ENTITY_MAPPER, USER_REPOSITORY, USER_SERVICE } from "@Application/config/inject-tokens/user.tokens";
import { UserDtoMapper } from "@Application/mappers/user-dto.mapper";
import { UserServiceAdapter } from "@Application/adapters/user-service.adapter";

export const UserProviders: Array<Provider> = [
    {
        provide: USER_DTO_MAPPER,
        useClass: UserDtoMapper
    },
    {
        provide: USER_SERVICE,
        useClass: UserServiceAdapter
    },
    {
        provide: USER_ENTITY_MAPPER,
        useClass: UserEntityMapper
    },
    {
        provide: USER_REPOSITORY,
        useClass: UserRepository
    }
];

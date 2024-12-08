import { BRANCH_DTO_MAPPER, BRANCH_ENTITY_MAPPER, BRANCH_REPOSITORY, BRANCH_SERVICE } from "@Application/config/inject-tokens/branch.tokens";
import { Provider } from "@nestjs/common";
import { BranchEntityMapper } from "../../mappers/branch-entity.mapper";
import { BranchRepository } from "../../repositories/branch.repository";
import { BranchDtoMapper } from "@Application/mappers/branch-dto.mapper";
import { BranchServiceAdapter } from "@Application/adapters/branch-service.adapter";

export const BranchProviders: Array<Provider> = [
    {
        provide: BRANCH_ENTITY_MAPPER,
        useClass: BranchEntityMapper
    },
    {
        provide: BRANCH_REPOSITORY,
        useClass: BranchRepository
    },
    {
        provide: BRANCH_DTO_MAPPER,
        useClass: BranchDtoMapper
    },
    {
        provide: BRANCH_SERVICE,
        useClass: BranchServiceAdapter
    }
]

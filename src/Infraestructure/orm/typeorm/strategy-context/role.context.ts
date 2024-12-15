import { GetDataStrategy } from "@Application/core/strategies/available.strategy";
import { RoleEntity } from "../entities/role.entity";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { RoleRepository } from "../repositories/role.repository";
import { Like } from "typeorm";
import { RoleModel } from "@Domain/models/role.model";

export const RoleCanSeeContext = (role: string): GetDataStrategy<RoleEntity> => {
    if([RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_PROPIETARY].includes(role))
        return new RoleAdministratorCanSeeStrategy();
    if (role == RoleModel.ROLE_MANAGER)
        return new RoleManagerCanSeeStrategy();

    return new RoleBasicCanSeeStrategy();
}

class RoleAdministratorCanSeeStrategy implements GetDataStrategy<RoleEntity> {
    async getData(args: BasicSearchParams, repository: RoleRepository): Promise<RoleEntity[]> {
        return await repository.manager.findBy({ name: Like(`%${args.query ?? ''}%`) })
    }
}

class RoleManagerCanSeeStrategy implements GetDataStrategy<RoleEntity> {
    async getData(args: BasicSearchParams, repository: RoleRepository): Promise<RoleEntity[]> {
        return await repository.manager.createQueryBuilder("r")
            .where("r.name NOT IN (:...excludedValues)", { excludedValues: [RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_PROPIETARY, RoleModel.ROLE_MANAGER] })
            .andWhere("r.name LIKE :searchValue", { searchValue: `%${args.query}%` })
            .getMany();
    }
}

class RoleBasicCanSeeStrategy implements GetDataStrategy<RoleEntity> {
    async getData(args: BasicSearchParams, repository: RoleRepository): Promise<RoleEntity[]> {
        return [];
    }
}
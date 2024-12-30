import { GetDataStrategy } from "@Application/core/strategies/available.strategy";
import { BranchEntity } from "../entities/branch.entity";
import { RoleModel } from "@Domain/models/role.model";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { BranchRepository } from "../repositories/branch.repository";
import { BranchSearchParams } from "@Application/core/params/search/branch-search.params";
import { AppUtil } from "@Application/core/utils/app.util";
import { FindManyOptions, Like } from "typeorm";

export const BranchCanSeeContext = (role: string): GetDataStrategy<BranchEntity> => {
    if ([RoleModel.ROLE_MANAGER, RoleModel.ROLE_CASHIER].includes(role))
        return new BaseStrategy();

    return new AdministratorStrategy();
}

export class BaseStrategy implements GetDataStrategy<BranchEntity> {
    async getData(args: BranchSearchParams, repository: BranchRepository): Promise<BranchEntity[]> {
        const basicQuery = repository.manager
            .createQueryBuilder('s')
            .leftJoinAndSelect('s.employees', 'e')
            .leftJoinAndSelect('e.person', 'p')
            .where('p.user_id = :userId', { userId: args.userId })

        if (!AppUtil.verifyEmptySimple(args.address))
            basicQuery.andWhere('s.address LIKE :address', { address: `%${args.address}%` });
        if (!AppUtil.verifyEmptySimple(args.name))
            basicQuery.andWhere('s.name LIKE :name', { name: `%${args.name}%` });

        return await basicQuery.getMany();
    }
}

export class AdministratorStrategy implements GetDataStrategy<BranchEntity> {
    async getData(args: BranchSearchParams, repository: BranchRepository): Promise<BranchEntity[]> {
        const basicQuery = repository.manager.createQueryBuilder('s')

        if (!AppUtil.verifyEmptySimple(args.address))
            basicQuery.andWhere('s.address LIKE :address', { address: `%${args.address}%` });
        if (!AppUtil.verifyEmptySimple(args.name))
            basicQuery.andWhere('s.name LIKE :name', { name: `%${args.name}%` });

        return await basicQuery.getMany();;
    }
}
import { GetDataStrategy } from "@Application/core/strategies/available.strategy";
import { BranchEntity } from "../entities/branch.entity";
import { RoleModel } from "@Domain/models/role.model";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { BranchRepository } from "../repositories/branch.repository";
import { BranchSearchParams } from "@Application/core/params/search/branch-search.params";
import { AppUtil } from "@Application/core/utils/app.util";
import { FindManyOptions, Like, QueryBuilder, SelectQueryBuilder } from "typeorm";
import { query } from "express";

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
            .where('p.user_id = :userId', { userId: args.userId });

        processFilters(basicQuery, args);

        return await basicQuery.getMany();
    }
}

export class AdministratorStrategy implements GetDataStrategy<BranchEntity> {
    async getData(args: BranchSearchParams, repository: BranchRepository): Promise<BranchEntity[]> {
        const basicQuery = repository.manager.createQueryBuilder('s');

        processFilters(basicQuery, args);

        return await basicQuery.getMany();;
    }
}

const processFilters = (query: SelectQueryBuilder<BranchEntity>, filters: BranchSearchParams) => {
    if (!AppUtil.verifyEmptySimple(filters.address))
        query.andWhere('s.address LIKE :address', { address: `%${filters.address}%` });
    if (!AppUtil.verifyEmptySimple(filters.name))
        query.andWhere('s.name LIKE :name', { name: `%${filters.name}%` });
    if (!AppUtil.verifyEmpty(filters.earningsLessThan))
        query.andWhere('s.earnings < :less', { less: filters.earningsLessThan });
    if (!AppUtil.verifyEmpty(filters.earningsGreatherThan))
        query.andWhere('s.earnings > :greather', { greather: filters.earningsGreatherThan });

    query.addOrderBy('s.earnings', "DESC");
}
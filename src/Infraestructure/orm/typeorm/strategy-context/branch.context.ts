import { GetDataStrategy } from "@Application/core/strategies/available.strategy";
import { BranchEntity } from "../entities/branch.entity";
import { RoleModel } from "@Domain/models/role.model";
import { BranchRepository } from "../repositories/branch.repository";
import { BranchSearchParams } from "@Application/core/params/search/branch-search.params";

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

        await repository.processFilter(basicQuery, args);

        return await basicQuery.getMany();
    }
}

export class AdministratorStrategy implements GetDataStrategy<BranchEntity> {
    async getData(args: BranchSearchParams, repository: BranchRepository): Promise<BranchEntity[]> {
        const basicQuery = repository.manager.createQueryBuilder('s');

        await repository.processFilter(basicQuery, args);

        return await basicQuery.getMany();;
    }
}

import { GetDataStrategy } from "@Application/core/strategies/available.strategy";
import { BranchEntity } from "../entities/branch.entity";
import { RoleModel } from "@Domain/models/role.model";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { BranchRepository } from "../repositories/branch.repository";

export const BranchCanSeeContext = (role: string): GetDataStrategy<BranchEntity> => {
    if ([RoleModel.ROLE_MANAGER, RoleModel.ROLE_CASHIER].includes(role))
        return new BaseStrategy();

    return new AdministratorStrategy();
}

export class BaseStrategy implements GetDataStrategy<BranchEntity> {
    async getData(args: BasicSearchParams, repository: BranchRepository): Promise<BranchEntity[]> {
        return await repository.manager
            .createQueryBuilder('s')
            .leftJoinAndSelect('s.employees', 'e')
            .leftJoinAndSelect('e.person', 'p')
            .where('p.user_id = :userId', { userId: args.userId })
            .getMany();
    }
}

export class AdministratorStrategy implements GetDataStrategy<BranchEntity> {
    async getData(args: BasicSearchParams, repository: BranchRepository): Promise<BranchEntity[]> {
        return await repository.manager.find();
    }
}
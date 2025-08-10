import { GetDataStrategy } from "@Application/core/strategies/available.strategy";
import { BranchEntity } from "../entities/branch.entity";
import { RoleModel } from "@Domain/models/role.model";
import { BranchSearchParams } from "@Application/core/params/search/branch-search.params";
import { BranchModelView } from "@Application/model-view/branch.mv";
import { BranchTransformParams } from "@Application/core/params/transform/branch-transform.params";
import { BranchModel } from "@Domain/models/branch.model";
import { GeneralRepository } from "../repositories/general.repository";
import { ProcessFilterPort } from "../ports/process-filter.port";

type BranchRepository = GeneralRepository<BranchModel, BranchEntity, BranchModelView, BranchTransformParams>
    & ProcessFilterPort<BranchEntity>;

export const BranchCanSeeContext = (role: string): GetDataStrategy<BranchEntity, BranchModelView> => {
    if ([RoleModel.ROLE_MANAGER, RoleModel.ROLE_CASHIER].includes(role))
        return new BaseStrategy();

    return new AdministratorStrategy();
}

export class BaseStrategy implements GetDataStrategy<BranchEntity, BranchModelView> {
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

export class AdministratorStrategy implements GetDataStrategy<BranchEntity, BranchModelView> {
    async getData(args: BranchSearchParams, repository: BranchRepository): Promise<BranchEntity[]> {
        const basicQuery = repository.manager.createQueryBuilder('s');

        await repository.processFilter(basicQuery, args);

        return await basicQuery.getMany();
    }
}

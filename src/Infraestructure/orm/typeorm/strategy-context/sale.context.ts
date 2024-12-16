import { GetDataStrategy } from "@Application/core/strategies/available.strategy";
import { SaleEntity } from "../entities/sale.entity";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { SaleRepository } from "../repositories/sale.repository";
import { EmployeeEntity } from "../entities/employee.entity";
import { RoleModel } from "@Domain/models/role.model";

export const SaleCanSeeContext = (role: string): GetDataStrategy<SaleEntity> => {
    if ([RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_PROPIETARY].includes(role))
        return new SaleAdministratorCanSeeStrategy();
    if (RoleModel.ROLE_MANAGER == role)
        return new SaleManagerCanSeeStrategy();

    return new SaleBasicCanSeeStrategy();
}

class SaleAdministratorCanSeeStrategy implements GetDataStrategy<SaleEntity> {
    async getData(args: BasicSearchParams, repository: SaleRepository): Promise<SaleEntity[]> {
        return await repository.manager.find();
    }
}

class SaleManagerCanSeeStrategy implements GetDataStrategy<SaleEntity> {
    async getData(args: BasicSearchParams, repository: SaleRepository): Promise<SaleEntity[]> {
        const employee = await repository.source.getRepository(EmployeeEntity).findOneBy({ person: { userId: args.userId } });
        return await repository.manager.findBy({ employee: { branchId: employee.branchId } });
    }
}

class SaleBasicCanSeeStrategy implements GetDataStrategy<SaleEntity> {
    async getData(args: BasicSearchParams, repository: SaleRepository): Promise<SaleEntity[]> {
        return await repository.manager.findBy({ employee: { person: { userId: args.userId } } });
    }
}

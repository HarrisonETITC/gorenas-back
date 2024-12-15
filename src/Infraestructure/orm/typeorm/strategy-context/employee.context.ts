import { GetDataStrategy } from "@Application/core/strategies/available.strategy";
import { EmployeeEntity } from "../entities/employee.entity";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { EmployeeRepository } from "../repositories/employee.repository";
import { RoleModel } from "@Domain/models/role.model";
import { Not, In } from "typeorm";

export const EmployeeCanSeeContext = (role: string): GetDataStrategy<EmployeeEntity> => {
    if ([RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_MANAGER].includes(role))
        return new AdministratorStrategy();
    if (role == RoleModel.ROLE_MANAGER)
        return new ManagerStrategy();

    return new BasicStrategy();
}

class AdministratorStrategy implements GetDataStrategy<EmployeeEntity> {
    async getData(args: BasicSearchParams, repository: EmployeeRepository): Promise<EmployeeEntity[]> {
        return await repository.manager.findBy({ person: { role: Not(In([RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_PROPIETARY])) } });
    }
}

class ManagerStrategy implements GetDataStrategy<EmployeeEntity> {
    async getData(args: BasicSearchParams, repository: EmployeeRepository): Promise<EmployeeEntity[]> {
        const manager = await repository.manager.findOneBy({ person: { userId: args.id } });

        return await repository.manager.findBy({ branchId: manager.branchId });
    }
}

class BasicStrategy implements GetDataStrategy<EmployeeEntity> {
    async getData(args: BasicSearchParams, repository: EmployeeRepository): Promise<EmployeeEntity[]> {
        return await repository.manager.findBy({ person: { userId: args.id } });
    }
}

export const EmployeeAvailableContext = (role: string): GetDataStrategy<EmployeeEntity> => {
    if ([RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_MANAGER].includes(role))
        return new AdministratorAvailableStrategy();
    if (role == RoleModel.ROLE_MANAGER)
        return new ManagerAvailableStrategy();

    return new BasicAvailableStrategy();
}

class AdministratorAvailableStrategy implements GetDataStrategy<EmployeeEntity> {
    async getData(args: BasicSearchParams, repository: EmployeeRepository): Promise<EmployeeEntity[]> {
        return await repository.manager.createQueryBuilder("e")
            .innerJoinAndSelect("e.person", "p")
            .where("p.names LIKE :names", { names: `%${args.query ?? ''}%` })
            .orWhere("p.surnames LIKE :surnames", { surnames: `%${args.query ?? ''}%` })
            .getMany();
    }
}

class ManagerAvailableStrategy implements GetDataStrategy<EmployeeEntity> {
    async getData(args: BasicSearchParams, repository: EmployeeRepository): Promise<EmployeeEntity[]> {
        const manager = await repository.manager.findOneBy({ person: { userId: args.id } });
        return await repository.manager.createQueryBuilder("e")
            .innerJoinAndSelect("e.person", "p")
            .where("(p.names LIKE :names OR p.surnames LIKE :surnames)", { names: `%${args.query}%`, surnames: `%${args.query}%` })
            .andWhere("e.branch_id = :branchId", { branchId: manager.branchId })
            .getMany();
    }
}

class BasicAvailableStrategy implements GetDataStrategy<EmployeeEntity> {
    async getData(args: BasicSearchParams, repository: EmployeeRepository): Promise<EmployeeEntity[]> {
        return await repository.manager.findBy({ person: { userId: args.id } });
    }
}

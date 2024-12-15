import { GetDataStrategy } from "@Application/core/strategies/available.strategy"
import { PersonEntity } from "../entities/person.entity"
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params"
import { PersonRepository } from "../repositories/person.repository"
import { RoleModel } from "@Domain/models/role.model"
import { BranchEntity } from "../entities/branch.entity"

export const PersonCanSeeContext = (role: string): GetDataStrategy<PersonEntity> => {
    if ([RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_PROPIETARY].includes(role))
        return new AdministratorStrategy();
    if (role == RoleModel.ROLE_MANAGER)
        return new ManagerStrategy();

    return new CashierStrategy();
}

export class AdministratorStrategy implements GetDataStrategy<PersonEntity> {
    async getData(args: BasicSearchParams, repository: PersonRepository): Promise<PersonEntity[]> {
        return await repository.manager.createQueryBuilder("p")
            .innerJoin("p.role", "r")
            .orderBy(`FIELD(r.name, '${RoleModel.ROLE_ADMINISTRATOR}', '${RoleModel.ROLE_PROPIETARY}', '${RoleModel.ROLE_MANAGER}', '${RoleModel.ROLE_CASHIER}')`, "ASC")
            .addOrderBy("p.id", "ASC")
            .getMany();
    }
}

export class ManagerStrategy implements GetDataStrategy<PersonEntity> {
    async getData(args: BasicSearchParams, repository: PersonRepository): Promise<PersonEntity[]> {
        const branch = await repository.source.getRepository(BranchEntity)
            .createQueryBuilder("s")
            .innerJoin("s.employees", "e")
            .innerJoin("e.person", "p")
            .where("p.userId = :userId", { userId: args.id })
            .select("s.id")
            .getOne();

        return await repository.manager.createQueryBuilder("p")
            .innerJoinAndSelect("p.employee", "e")
            .innerJoinAndSelect("e.branch", "s")
            .where("s.id = :branchId", { branchId: branch.id })
            .getMany();
    }
}

export class CashierStrategy implements GetDataStrategy<PersonEntity> {
    async getData(args: BasicSearchParams, repository: PersonRepository): Promise<PersonEntity[]> {
        return [await repository.manager.findOneBy({ userId: args.id })];
    }
}

import { GetDataStrategy } from "@Application/core/strategies/available.strategy"
import { PersonEntity } from "../entities/person.entity"
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params"
import { RoleModel } from "@Domain/models/role.model"
import { BranchEntity } from "../entities/branch.entity"
import { PersonModelView } from "@Application/model-view/person.mv"
import { PersonTransformParams } from "@Application/core/params/transform/person-transform.params"
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port"
import { PersonModel } from "@Domain/models/person.model"
import { GeneralRepository } from "../repositories/general.repository"
import { PersonsPort } from "@Application/ports/persons/persons.port"
import { DataSource } from "typeorm"

type PersonRepository = GeneralRepository<PersonModel, PersonEntity, PersonModelView, PersonTransformParams> &
    GetAvailableCanSeePort<PersonModelView> &
    PersonsPort & {
        source: DataSource;
    };

export const PersonCanSeeContext = (role: string): GetDataStrategy<PersonEntity, PersonModelView> => {
    if ([RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_PROPIETARY].includes(role))
        return new AdministratorStrategy();
    if (role == RoleModel.ROLE_MANAGER)
        return new ManagerStrategy();

    return new CashierStrategy();
}

export class AdministratorStrategy implements GetDataStrategy<PersonEntity, PersonModelView> {
    async getData(args: BasicSearchParams, repository: PersonRepository): Promise<PersonEntity[]> {
        return await repository.manager.createQueryBuilder("p")
            .innerJoin("p.role", "r")
            .orderBy(`FIELD(r.name, '${RoleModel.ROLE_ADMINISTRATOR}', '${RoleModel.ROLE_PROPIETARY}', '${RoleModel.ROLE_MANAGER}', '${RoleModel.ROLE_CASHIER}')`, "ASC")
            .addOrderBy("p.id", "ASC")
            .getMany();
    }
}

export class ManagerStrategy implements GetDataStrategy<PersonEntity, PersonModelView> {
    async getData(args: BasicSearchParams, repository: PersonRepository): Promise<PersonEntity[]> {
        const branch = await repository.source.getRepository(BranchEntity)
            .createQueryBuilder("s")
            .innerJoin("s.employees", "e")
            .innerJoin("e.person", "p")
            .where("p.userId = :userId", { userId: args.userId })
            .select("s.id")
            .getOne();

        return await repository.manager.createQueryBuilder("p")
            .innerJoinAndSelect("p.employee", "e")
            .innerJoinAndSelect("e.branch", "s")
            .where("s.id = :branchId", { branchId: branch.id })
            .getMany();
    }
}

export class CashierStrategy implements GetDataStrategy<PersonEntity, PersonModelView> {
    async getData(args: BasicSearchParams, repository: PersonRepository): Promise<PersonEntity[]> {
        return [await repository.manager.findOneBy({ userId: args.userId })];
    }
}

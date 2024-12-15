import { Inject, Injectable } from "@nestjs/common";
import { GeneralRepository } from "./general.repository";
import { EmployeeModel } from "@Domain/models/employee.model";
import { EmployeeEntity } from "../entities/employee.entity";
import { EmployeeModelView } from "@Application/model-view/employee.mv";
import { DataSource, In } from "typeorm";
import { EMPLOYEE_ENTITY_MAPPER } from "@Application/config/inject-tokens/employee.tokens";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { GetAvailableCanSeePort } from "@Application/ports/cansee-available.port";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";
import { EmployeeAvailableContext, EmployeeCanSeeContext } from "../strategy-context/employee.context";
import { AppUtil } from "@Application/core/utils/app.util";
import { RoleModel } from "@Domain/models/role.model";
import { PersonEntity } from "../entities/person.entity";
import { UserEntity } from "../entities/user.entity";
import { BranchEntity } from "../entities/branch.entity";
import { EmployeeTransformParams } from "@Application/core/params/transform/employee-transform.params";

@Injectable()
export class EmployeeRepository extends GeneralRepository<EmployeeModel, EmployeeEntity, EmployeeModelView, EmployeeTransformParams> implements GetAvailableCanSeePort<EmployeeModelView> {
    constructor(
        @Inject(DataSource) protected source: DataSource,
        @Inject(EMPLOYEE_ENTITY_MAPPER) protected mapper: EntityMapperPort<EmployeeModel, EmployeeEntity, EmployeeModelView, EmployeeTransformParams>
    ) {
        super(source, EmployeeEntity, mapper);
    }

    async getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        const data = await EmployeeAvailableContext(params.role).getData(params, this);
        const persons = await this.source.getRepository(PersonEntity).findBy({ id: In(AppUtil.extractIds(data, 'personId')) });

        return data.map(e => {
            const person = persons.find(p => p.id == e.personId)
            return {
                id: e.id,
                value: `${person.names} ${person.surnames}`
            }
        })
    }
    async getCanSee(params: BasicSearchParams): Promise<EmployeeModelView[]> {
        const basic = await EmployeeCanSeeContext(params.role).getData(params, this);
        const sales: Array<EmployeeEntity> = await this.manager
            .createQueryBuilder("e")
            .innerJoin("e.sales", "s")
            .innerJoin("e.person", "p")
            .innerJoin("p.role", "r")
            .select("e.id", "id")
            .addSelect("COUNT(*)", "branchId")
            .addSelect("SUM(s.amount)", "personId")
            .where("e.id IN (:...employeeIds)", { employeeIds: AppUtil.extractIds(basic) })
            .andWhere("r.name NOT IN (:...roles)", { roles: [RoleModel.ROLE_PROPIETARY, RoleModel.ROLE_ADMINISTRATOR] })
            .groupBy("e.id")
            .orderBy("COUNT(*)", "DESC")
            .addOrderBy("SUM(s.amount)", "DESC")
            .getRawMany();
        const persons = await this.source.getRepository(PersonEntity).findBy({ id: In(AppUtil.extractIds(basic, 'personId')) });
        const users = await this.source.getRepository(UserEntity).findBy({ id: In(AppUtil.extractIds(persons, 'userId')) });
        const branches = await this.source.getRepository(BranchEntity).findBy({ id: In(AppUtil.extractIds(basic, 'branchId')) });

        return basic.map(e => {
            const branch = branches.find(b => b.id == e.branchId);
            const person = persons.find(p => p.id == e.personId);
            const user = users.find(u => u.id == person?.userId);
            const saleData = sales.find(s => s.id == e.id);

            return this.mapper.fromDomainToMv(e, {
                branch: branch.name ?? '',
                name: `${person.names} ${person.surnames}`,
                sales: +(saleData?.branchId ?? 0),
                salesAmmounth: +(saleData?.personId ?? 0),
                user: user.email
            })
        })

    }
}
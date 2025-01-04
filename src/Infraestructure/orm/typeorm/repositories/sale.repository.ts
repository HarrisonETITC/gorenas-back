import { Inject, Injectable } from "@nestjs/common";
import { GeneralRepository } from "./general.repository";
import { SaleModel } from "@Domain/models/sale.model";
import { SaleEntity } from "../entities/sale.entity";
import { SaleModelView } from "@Application/model-view/sale.mv";
import { DataSource, In } from "typeorm";
import { SALE_ENTITY_MAPPER } from "@Application/config/inject-tokens/sale.tokens";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { SaleTransformParams } from "@Application/core/params/transform/sale-transform.params";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";
import { SaleCanSeeContext } from "../strategy-context/sale.context";
import { EmployeeEntity } from "../entities/employee.entity";
import { AppUtil } from "@Application/core/utils/app.util";
import { PersonEntity } from "../entities/person.entity";
import { BranchEntity } from "../entities/branch.entity";

@Injectable()
export class SaleRepository extends GeneralRepository<SaleModel, SaleEntity, SaleModelView, SaleTransformParams> implements GetAvailableCanSeePort<SaleModelView> {
    constructor(
        @Inject(DataSource)
        public source: DataSource,
        @Inject(SALE_ENTITY_MAPPER)
        protected mapper: EntityMapperPort<SaleModel, SaleEntity, SaleModelView, SaleTransformParams>
    ) {
        super(source, SaleEntity, mapper);
    }

    async getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        throw new Error("Method not implemented.");
    }
    async getCanSee(params: BasicSearchParams): Promise<SaleModelView[]> {
        const basicData = await SaleCanSeeContext(params.role).getData(params, this);
        const employees = await this.source.getRepository(EmployeeEntity).findBy({ id: In(AppUtil.extractIds(basicData, 'employeeId')) });
        const persons = await this.source.getRepository(PersonEntity).findBy({ id: In(AppUtil.extractIds(employees, 'personId')) });
        const branches = await this.source.getRepository(BranchEntity).findBy({ id: In(AppUtil.extractIds(employees, 'branchId')) });

        return basicData.map(s => {
            const employee = employees.find(e => e.id == s.employeeId);
            const person = persons.find(p => p.id == employee.personId);
            const branch = branches.find(b => b.id == employee.branchId);

            return this.mapper.fromDomainToMv(s, {
                branch: branch?.name ?? '',
                employee: `${person.names} ${person.surnames}`
            })
        })
    }
    async getIdValueMany(ids: Array<IdValue>): Promise<Array<IdValue>> {
        return [];
    }
}

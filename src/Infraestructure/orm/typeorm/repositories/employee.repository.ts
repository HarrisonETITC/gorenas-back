import { Inject, Injectable } from "@nestjs/common";
import { GeneralRepository } from "./general.repository";
import { EmployeeModel } from "@Domain/models/employee.model";
import { EmployeeEntity } from "../entities/employee.entity";
import { EmployeeModelView } from "@Application/model-view/employee.mv";
import { DataSource, In } from "typeorm";
import { EMPLOYEE_ENTITY_MAPPER } from "@Application/config/inject-tokens/employee.tokens";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
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
export class EmployeeRepository extends GeneralRepository<EmployeeModel, EmployeeEntity, EmployeeModelView, EmployeeTransformParams> implements
    GetAvailableCanSeePort<EmployeeModelView> {
    constructor(
        @Inject(DataSource)
        protected source: DataSource,
        @Inject(EMPLOYEE_ENTITY_MAPPER)
        protected mapper: EntityMapperPort<EmployeeModel, EmployeeEntity, EmployeeModelView, EmployeeTransformParams>
    ) {
        super(source, EmployeeEntity, mapper);
    }

    async create(obj: EmployeeModel): Promise<EmployeeModel> {
        const created = this.manager.create(this.mapper.fromDomainToEntity(obj));
        const saved = await this.manager.save(created);
        return this.mapper.fromEntityToDomain(saved);
    }

    /**
     * Sobrescribe el método modify para buscar Person por nombre y Branch por dirección
     * antes de actualizar el empleado.
     */
    async modify(id: number, obj: EmployeeModel): Promise<EmployeeModel> {
        obj.id = id;

        const entity = this.mapper.fromDomainToEntity(obj);
        const saved = await this.manager.save(entity);
        return this.mapper.fromEntityToDomain(saved);
    }

    /**
     * Sobrescribe generateModelView para obtener los datos relacionados
     * necesarios para construir el EmployeeModelView
     */
    async generateModelView(models: EmployeeModel[]): Promise<EmployeeModelView[]> {
        if (!models || models.length === 0) return [];

        const personIds = models.map(m => m.personId ? +m.personId : null).filter(id => id !== null);
        const branchIds = models.map(m => m.branchId ? +m.branchId : null).filter(id => id !== null);

        const persons = personIds.length > 0
            ? await this.source.getRepository(PersonEntity).findBy({ id: In(personIds) })
            : [];
        const users = persons.length > 0
            ? await this.source.getRepository(UserEntity).findBy({ id: In(AppUtil.extractIds(persons, 'userId')) })
            : [];
        const branches = branchIds.length > 0
            ? await this.source.getRepository(BranchEntity).findBy({ id: In(branchIds) })
            : [];

        return models.map(m => {
            const branch = branches.find(b => b.id === (m.branchId ? +m.branchId : null));
            const person = persons.find(p => p.id === (m.personId ? +m.personId : null));
            const user = users.find(u => u.id === person?.userId);

            return this.mapper.fromDomainToMv(m, {
                branch: branch?.address ?? '',
                name: person ? `${person.names} ${person.surnames}` : '',
                sales: 0,
                salesAmmounth: 0,
                user: user?.email ?? ''
            });
        });
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

            // Convertir entidad a modelo antes de pasar al mapper
            const model = this.mapper.fromEntityToDomain(e);

            return this.mapper.fromDomainToMv(model, {
                branch: branch?.address ?? '',
                name: `${person?.names ?? ''} ${person?.surnames ?? ''}`,
                sales: +(saleData?.branchId ?? 0),
                salesAmmounth: +(saleData?.personId ?? 0),
                user: user?.email ?? ''
            })
        })
    }
    async getIdValueMany(ids: Array<IdValue>): Promise<Array<IdValue>> {
        throw new Error("Method not implemented.");
    }
}
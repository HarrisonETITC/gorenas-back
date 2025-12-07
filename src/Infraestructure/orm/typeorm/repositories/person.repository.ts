import { Inject, Injectable } from "@nestjs/common";
import { GeneralRepository } from "./general.repository";
import { PersonModel } from "@Domain/models/person.model";
import { PersonEntity } from "../entities/person.entity";
import { PersonModelView } from "@Application/model-view/person.mv";
import { DataSource, In } from "typeorm";
import { PERSON_ENTITY_MAPPER } from "@Application/config/inject-tokens/person.tokens";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { IdValue } from "@Domain/interfaces/id-value.interface";
import { RoleModel } from "@Domain/models/role.model";
import { AppUtil } from "@Application/core/utils/app.util";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { PersonCanSeeContext } from "../strategy-context/person.context";
import { UserEntity } from "../entities/user.entity";
import { RoleEntity } from "../entities/role.entity";
import { BranchEntity } from "../entities/branch.entity";
import { EmployeeEntity } from "../entities/employee.entity";
import { PersonTransformParams } from "@Application/core/params/transform/person-transform.params";
import { PersonsPort } from "@Application/ports/persons/persons.port";
import { GetOriginalByIdPort } from "@Application/ports/get-original-byid.port";

@Injectable()
export class PersonRepository extends GeneralRepository<PersonModel, PersonEntity, PersonModelView, PersonTransformParams> implements
    GetAvailableCanSeePort<PersonModelView>,
    PersonsPort, GetOriginalByIdPort<PersonModel> {
    constructor(
        @Inject(DataSource)
        readonly source: DataSource,
        @Inject(PERSON_ENTITY_MAPPER)
        personEntityMapper: EntityMapperPort<PersonModel, PersonEntity, PersonModelView, PersonTransformParams>
    ) {
        super(source, PersonEntity, personEntityMapper);
    }

    override async modify(id: number, obj: PersonModel): Promise<PersonModel> {
        const original = await this.source.getRepository(PersonEntity).findOneBy({ id });
        const entity = this.mapper.fromDomainToEntity(obj);

        if (AppUtil.verifyEmpty(entity.created)) entity.created = original.created;

        await this.manager.update({ id }, entity);
        const updated = await this.manager.findOneBy({ id });

        return this.mapper.fromEntityToDomain(updated);
    }

    async getOriginalById(id: number): Promise<PersonModel> {
        const finded = await this.manager.findOneBy({ id });

        if (AppUtil.verifyEmpty(finded))
            return null;

        return this.mapper.fromEntityToDomain(finded);
    }

    async getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        const baseData = await this.manager
            .createQueryBuilder("p")
            .leftJoin("p.employee", "e")
            .innerJoin("p.role", "r")
            .where("r.name NOT IN (:...roles)", { roles: [RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_PROPIETARY] })
            .andWhere("e.id IS NULL")
            .andWhere("(p.names LIKE :search OR p.surnames LIKE :search)", { search: `%${params.query}%` })
            .getMany();

        return AppUtil.transformToIdValue(baseData, 'id', ['names', 'surnames']);
    }
    async getCanSee(params: BasicSearchParams): Promise<Array<PersonModelView>> {
        const basic = await PersonCanSeeContext(params.role).getData(params, this);

        const users = await this.source.getRepository(UserEntity).find({
            where: {
                person: {
                    id: In(
                        AppUtil.extractIds(basic)
                    )
                }
            }, select: { id: true, email: true }
        });
        const roles = await this.source.getRepository(RoleEntity).find({
            where: {
                id: In(
                    AppUtil.extractIds(basic, 'roleId')
                )
            }
        });
        const branches = (await this.source.getRepository(BranchEntity)
            .createQueryBuilder("s")
            .innerJoin("s.employees", "e")
            .where("e.person_id IN (:...personsId)", { personsId: AppUtil.extractIds(basic) })
            .getMany());
        const employees = (await this.source.getRepository(EmployeeEntity).findBy({ branchId: In(AppUtil.extractIds(branches)), personId: In(AppUtil.extractIds(basic)) }));

        return basic.map(p => {
            return this.mapper.fromDomainToMv(p, {
                branch: branches.find(s => s.id == employees.find(e => e.personId == p.id)?.branchId)?.name ?? '',
                email: users.find(u => u.id == p.userId)?.email ?? '',
                role: roles.find(r => r.id == p.roleId)?.name ?? ''
            });
        });
    }
    async getIdValueMany(ids: Array<IdValue>): Promise<Array<IdValue>> {
        return [];
    }
    async getByUserId(id: number): Promise<PersonModelView> {
        const finded = await this.manager.findOneBy({ userId: id });
        if (AppUtil.verifyEmpty(finded))
            return null;

        return (await this.generateModelView([finded]))[0];
    }
    override async generateModelView(models: PersonModel[]): Promise<PersonModelView[]> {
        const users = await this.source.getRepository(UserEntity).find({
            where: {
                person: {
                    id: In(
                        AppUtil.extractIds(models)
                    )
                }
            }, select: { id: true, email: true }
        });
        const roles = await this.source.getRepository(RoleEntity).find({
            where: {
                id: In(
                    AppUtil.extractIds(models, 'roleId')
                )
            }
        });
        const branches = (await this.source.getRepository(BranchEntity)
            .createQueryBuilder("s")
            .innerJoin("s.employees", "e")
            .where("e.person_id IN (:...personsId)", { personsId: AppUtil.extractIds(models) })
            .getMany());
        const employees = (await this.source.getRepository(EmployeeEntity).findBy({ branchId: In(AppUtil.extractIds(branches)), personId: In(AppUtil.extractIds(models)) }));

        return models.map(p => {
            return this.mapper.fromDomainToMv(p, {
                branch: branches.find(s => s.id == employees.find(e => e.personId == p.id)?.branchId)?.address ?? '',
                email: users.find(u => u.id == p['userId'])?.email ?? '',
                role: roles.find(r => r.id == p['roleId'])?.name ?? ''
            });
        });
    }
}

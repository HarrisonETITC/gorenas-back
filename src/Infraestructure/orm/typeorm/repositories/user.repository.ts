import { UserModel } from "@Domain/models/user.model";
import { GeneralRepository } from "./general.repository";
import { UserEntity } from "../entities/user.entity";
import { UserModelView } from "@Application/model-view/user.mv";
import { Inject, Injectable } from "@nestjs/common";
import { DataSource, In } from "typeorm";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { USER_ENTITY_MAPPER } from "@Application/config/inject-tokens/user.tokens";
import { UsersPort } from "@Application/ports/users/users.port";
import { AppUtil } from "@Application/core/utils/app.util";
import { UserTransformParams } from "@Application/core/params/transform/users-transform.params";
import { RoleEntity } from "../entities/role.entity";
import { PersonEntity } from "../entities/person.entity";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";
import { UserCanSeeContext } from "../strategy-context/user.context";

@Injectable()
export class UserRepository extends GeneralRepository<UserModel, UserEntity, UserModelView, UserTransformParams> implements UsersPort, GetAvailableCanSeePort<UserModelView> {
    constructor(
        @Inject(DataSource)
        public source: DataSource,
        @Inject(USER_ENTITY_MAPPER)
        userEntityMapper: EntityMapperPort<UserModel, UserEntity, UserModelView, UserTransformParams>
    ) {
        super(source, UserEntity, userEntityMapper);
    }

    async findByEmail(email: string): Promise<UserModel> {
        const finded = await this.manager.findOneBy({ email });

        if (AppUtil.verifyEmpty(finded))
            return null;

        return this.mapper.fromEntityToDomain(finded);
    }
    async getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        return (await this.manager
            .createQueryBuilder('u')
            .leftJoin('u.person', 'p')
            .where('u.email LIKE :email', { email: `%${params.query}%` })
            .andWhere('p.id IS NULL')
            .getMany())
            .map(u => {
                return {
                    id: u.id,
                    value: u.email
                }
            });
    }
    async getCanSee(params: BasicSearchParams): Promise<UserModelView[]> {
        const data = await UserCanSeeContext(params.role).getData(params, this);

        return await this.generateModelView(data);
    }
    override async generateModelView(models: UserModel[]): Promise<UserModelView[]> {
        const roles = await this.source.getRepository(RoleEntity).findBy({
            persons: { userId: In(AppUtil.extractIds(models)) }
        });
        const persons = await this.source.getRepository(PersonEntity).findBy({
            userId: In(AppUtil.extractIds(models))
        })

        return models.map(u => {
            const person = persons.find(p => p.userId == u.id);
            const role = roles.find(r => person.roleId == r.id);

            return this.mapper.fromDomainToMv(u, {
                name: `${person.names} ${person.surnames}`,
                role: role.name
            })
        })
    }
}

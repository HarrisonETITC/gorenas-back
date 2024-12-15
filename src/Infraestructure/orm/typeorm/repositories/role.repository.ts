import { Inject, Injectable } from "@nestjs/common";
import { GeneralRepository } from "./general.repository";
import { RoleModel } from "@Domain/models/role.model";
import { RoleEntity } from "../entities/role.entity";
import { RoleModelView } from "@Application/model-view/role.mv";
import { DataSource } from "typeorm";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { ROLE_ENTITY_MAPPER } from "@Application/config/inject-tokens/role.tokens";
import { GetAvailableCanSeePort } from "@Application/ports/cansee-available.port";
import { RoleTransformParams } from "@Application/core/params/transform/role-transform.params";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";
import { RoleAvailableContext, RoleCanSeeContext } from "../strategy-context/role.context";
import { AppUtil } from "@Application/core/utils/app.util";

@Injectable()
export class RoleRepository extends GeneralRepository<RoleModel, RoleEntity, RoleModelView, RoleTransformParams> implements GetAvailableCanSeePort<RoleModelView> {
    constructor(
        @Inject(DataSource) protected source: DataSource,
        @Inject(ROLE_ENTITY_MAPPER) protected mapper: EntityMapperPort<RoleModel, RoleEntity, RoleModelView, RoleTransformParams>
    ) {
        super(source, RoleEntity, mapper);
    }

    async getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        const data = await RoleAvailableContext(params.role).getData(params, this);

        return AppUtil.transformToIdValue(data, 'id', 'name');
    }
    async getCanSee(params: BasicSearchParams): Promise<RoleModelView[]> {
        const basicRoles = await RoleCanSeeContext(params.role).getData(params, this);
        const infoRoles = await this.manager.createQueryBuilder("r")
            .innerJoin("r.persons", "p")
            .select("r.id", "id")
            .addSelect("r.name", "name")
            .addSelect("COUNT(p.id)", "usedBy")
            .groupBy("r.id")
            .addGroupBy("r.name")
            .getRawMany();

        return basicRoles.map(r => {
            const info = infoRoles.find(sub => sub.id == r.id);
            return this.mapper.fromDomainToMv(r, {
                users: +(info['usedBy'] ?? 0)
            })
        })
    }
}

import { PermissionModel } from "@Domain/models/permission.model";
import { GeneralRepository } from "./general.repository";
import { PermissionEntity } from "../entities/permission.entity";
import { PermissionModelView } from "@Application/model-view/permission.mv";
import { PermissionTransformParams } from "@Application/core/params/transform/permission-transform.params";
import { Inject, Injectable } from "@nestjs/common";
import { DataSource, In } from "typeorm";
import { PERMISSION_ENTITY_MAPPER } from "@Application/config/inject-tokens/permission.tokens";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { RoleEntity } from "../entities/role.entity";
import { AppUtil } from "@Application/core/utils/app.util";

@Injectable()
export class PermissionRepository extends GeneralRepository<PermissionModel, PermissionEntity, PermissionModelView, PermissionTransformParams> {
    constructor(
        @Inject(DataSource)
        protected readonly source: DataSource,
        @Inject(PERMISSION_ENTITY_MAPPER)
        protected readonly mapper: EntityMapperPort<PermissionModel, PermissionEntity, PermissionModelView, PermissionTransformParams>
    ) {
        super(source, PermissionEntity, mapper);
    }

    override async generateModelView(models: PermissionModel[]): Promise<PermissionModelView[]> {
        const roles = await this.source.getRepository(RoleEntity).findBy({ id: In(AppUtil.extractIds(models, 'roleId')) });

        return models.map(
            p => this.mapper.fromDomainToMv(p, { role: roles.find(r => r.id == p['roleId'])?.name ?? '' })
        );
    }
}
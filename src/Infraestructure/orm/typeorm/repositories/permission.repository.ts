import { PermissionModel } from "@Domain/models/permission.model";
import { GeneralRepository } from "./general.repository";
import { PermissionEntity } from "../entities/permission.entity";
import { PermissionModelView } from "@Application/model-view/permission.mv";
import { PermissionTransformParams } from "@Application/core/params/transform/permission-transform.params";
import { Inject, Injectable } from "@nestjs/common";
import { DataSource, FindOptionsWhere, In, Like } from "typeorm";
import { PERMISSION_ENTITY_MAPPER } from "@Application/config/inject-tokens/permission.tokens";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { RoleEntity } from "../entities/role.entity";
import { AppUtil } from "@Application/core/utils/app.util";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";
import { PermissionSearchParams } from "@Application/core/params/search/permission-search.params";

@Injectable()
export class PermissionRepository extends GeneralRepository<PermissionModel, PermissionEntity, PermissionModelView, PermissionTransformParams>
    implements GetAvailableCanSeePort<PermissionModelView> {
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
    async getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        throw new Error("Method not implemented.");
    }
    async getCanSee(params: PermissionSearchParams): Promise<PermissionModelView[]> {
        const searchParams: FindOptionsWhere<PermissionEntity> = {};
        if (!AppUtil.verifyEmpty(params.roleName)) {
            searchParams.role = { name: Like(`%${params.roleName}%`) };
        }
        if (!AppUtil.verifyEmpty(params.module) || !AppUtil.verifyEmpty(params.permission)) {
            let search = '';
            if (!AppUtil.verifyEmpty(params.module) && AppUtil.verifyEmpty(params.permission))
                search = `${params.module}%`;
            if (AppUtil.verifyEmpty(params.module) && !AppUtil.verifyEmpty(params.permission))
                search = `%${params.permission}%`;
            if (!AppUtil.verifyEmpty(params.module) && !AppUtil.verifyEmpty(params.permission))
                search = `%${params.module}:${params.permission}%`;

            searchParams.name = Like(search);
        }

        const baseModels = await this.manager.findBy(searchParams);

        return await this.generateModelView(baseModels);
    }
}
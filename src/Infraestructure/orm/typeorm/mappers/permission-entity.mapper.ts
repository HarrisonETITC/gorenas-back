import { PermissionTransformParams } from "@Application/core/params/transform/permission-transform.params";
import { PermissionModelView } from "@Application/model-view/permission.mv";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { PermissionModel } from "@Domain/models/permission.model";
import { PermissionEntity } from "../entities/permission.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PermissionEntityMapper implements EntityMapperPort<PermissionModel, PermissionEntity, PermissionModelView, PermissionTransformParams> {
    fromEntityToDomain(entity: PermissionEntity): PermissionModel {
        return {
            created: entity.created,
            id: entity.id,
            name: entity.name,
            roleId: entity.roleId || null
        }
    }
    fromDomainToEntity(domain: PermissionModel): PermissionEntity {
        return {
            created: domain.created,
            id: domain.id,
            name: domain.name,
            roleId: domain.roleId || null
        }
    }
    fromDomainToMv(domain: PermissionModel, extra?: PermissionTransformParams): PermissionModelView {
        return {
            id: domain.id,
            name: domain.name,
            role: extra?.role ?? null
        }
    }
}
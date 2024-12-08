import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { Injectable } from "@nestjs/common";
import { RoleEntity } from "../entities/role.entity";
import { RoleModelView } from "@Application/model-view/role.mv";
import { RoleModel } from "@Domain/models/role.model";
import { RoleBuilder } from "@Domain/models/builders/role.builder";
import { AppUtil } from "@Application/core/utils/app.util";

@Injectable()
export class RoleEntityMapper implements EntityMapperPort<RoleModel, RoleEntity, RoleModelView> {
    fromEntityToDomain(entity: RoleEntity): RoleModel {
        return new RoleBuilder()
            .setId(entity.id ?? null)
            .setName(entity.name ?? null)
            .setState(entity.state ?? null)
            .build();
    }
    fromDomainToEntity(domain: RoleModel): RoleEntity {
        return {
            id: domain.id ?? null,
            name: domain.name ?? null,
            state: domain.state ?? null,
            created: null,
            modified: null
        };
    }
    fromDomainToMv(domain: RoleModel, extra?: Map<string, string>): RoleModelView {
        return {
            id: domain.id ?? null,
            name: domain.name,
            state: domain.state,
            users: AppUtil.findNumberField(extra, 'users')
        };
    }
}

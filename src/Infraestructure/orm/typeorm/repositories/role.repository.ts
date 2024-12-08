import { Inject, Injectable } from "@nestjs/common";
import { GeneralRepository } from "./general.repository";
import { RoleModel } from "@Domain/models/role.model";
import { RoleEntity } from "../entities/role.entity";
import { RoleModelView } from "@Application/model-view/role.mv";
import { DataSource } from "typeorm";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { ROLE_ENTITY_MAPPER } from "@Application/config/inject-tokens/role.tokens";

@Injectable()
export class RoleRepository extends GeneralRepository<RoleModel, RoleEntity, RoleModelView> {
    constructor(
        @Inject(DataSource) protected source: DataSource,
        @Inject(ROLE_ENTITY_MAPPER) protected mapper: EntityMapperPort<RoleModel, RoleEntity, RoleModelView>
    ) {
        super(source, RoleEntity, mapper);
    }
}

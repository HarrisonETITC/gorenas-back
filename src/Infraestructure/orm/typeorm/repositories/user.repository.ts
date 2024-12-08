import { UserModel } from "@Domain/models/user.model";
import { GeneralRepository } from "./general.repository";
import { UserEntity } from "../entities/user.entity";
import { UserModelView } from "@Application/model-view/user.mv";
import { Inject } from "@nestjs/common";
import { DataSource } from "typeorm";
import { USER_ENTITY_MAPPER } from "@Application/config/inject-tokens/user.tokens";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";

export class UserRepository extends GeneralRepository<UserModel, UserEntity, UserModelView> {
    constructor(
        @Inject(DataSource) source: DataSource,
        @Inject(USER_ENTITY_MAPPER) userEntityMapper: EntityMapperPort<UserModel, UserEntity, UserModelView>
    ) {
        super(source, UserEntity, userEntityMapper);
    }
}
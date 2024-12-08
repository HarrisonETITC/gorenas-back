import { UserModel } from "@Domain/models/user.model";
import { GeneralRepository } from "./general.repository";
import { UserEntity } from "../entities/user.entity";
import { UserModelView } from "@Application/model-view/user.mv";
import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { USER_ENTITY_MAPPER } from "@Application/config/user-app.providers";

@Injectable()
export class UserRepository extends GeneralRepository<UserModel, UserEntity, UserModelView> {
    constructor(
        @Inject(DataSource) source: DataSource,
        @Inject(USER_ENTITY_MAPPER) userEntityMapper: EntityMapperPort<UserModel, UserEntity, UserModelView>
    ) {
        super(source, UserEntity, userEntityMapper);
    }
}
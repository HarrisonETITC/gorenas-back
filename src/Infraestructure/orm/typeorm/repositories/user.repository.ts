import { UserModel } from "@Domain/models/user.model";
import { GeneralRepository } from "./general.repository";
import { UserEntity } from "../entities/user.entity";
import { UserModelView } from "@Application/model-view/user.mv";
import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { USER_ENTITY_MAPPER } from "@Application/config/inject-tokens/user.tokens";
import { UsersPort } from "@Application/ports/users/Users.port";
import { AppUtil } from "@utils/app.util";

@Injectable()
export class UserRepository extends GeneralRepository<UserModel, UserEntity, UserModelView> implements UsersPort {
    constructor(
        @Inject(DataSource) source: DataSource,
        @Inject(USER_ENTITY_MAPPER) private readonly userEntityMapper: EntityMapperPort<UserModel, UserEntity, UserModelView>
    ) {
        super(source, UserEntity, userEntityMapper);
    }

    async findByEmail(email: string): Promise<UserModel> {
        const finded = await this.manager.findOneBy({ email });

        if (AppUtil.verifyEmpty(finded))
            return null;

        return this.userEntityMapper.fromEntityToDomain(finded);
    }
}
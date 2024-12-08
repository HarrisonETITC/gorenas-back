import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { UserModel } from "@Domain/models/user.model";
import { UserEntity } from "../entities/user.entity";
import { UserModelView } from "@Application/model-view/user.mv";
import { UserBuilder } from "@Domain/models/builders/user.builder";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserEntityMapper implements EntityMapperPort<UserModel, UserEntity, UserModelView> {
    fromEntityToDomain(entity: UserEntity): UserModel {
        return new UserBuilder()
            .setId(entity.id ?? null)
            .setEmail(entity.email ?? null)
            .setPassword(entity.password ?? null)
            .setState(entity.state ?? null)
            .setCreated(entity.created ?? null)
            .build();
    }
    fromDomainToEntity(domain: UserModel): UserEntity {
        const entity: UserEntity = {
            id: domain.id ?? null,
            email: domain.email ?? null,
            password: domain.password ?? null,
            state: domain.state ?? null,
            created: domain.created ?? null
        }

        return entity;
    }
    fromDomainToMv(domain: UserModel, extra?: Map<string, string>): UserModelView {
        const mv: UserModelView = {
            id: domain.id,
            email: domain.email,
            name: extra?.get('name') ?? null,
            state: domain.state
        }

        return mv;
    }
}
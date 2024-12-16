import { EntityMapperPort } from "@Application/ports/entity-mapper.port";
import { UserModel } from "@Domain/models/user.model";
import { UserEntity } from "../entities/user.entity";
import { UserModelView } from "@Application/model-view/user.mv";
import { UserBuilder } from "@Domain/models/builders/user.builder";
import { Injectable } from "@nestjs/common";
import { UserTransformParams } from "@Application/core/params/transform/users-transform.params";

@Injectable()
export class UserEntityMapper implements EntityMapperPort<UserModel, UserEntity, UserModelView, UserTransformParams> {
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
    fromDomainToMv(domain: UserModel, extra?: UserTransformParams): UserModelView {
        const mv: UserModelView = {
            id: domain.id,
            email: domain.email,
            name: extra?.name ?? '',
            state: domain.state,
            role: extra?.role ?? ''
        }

        return mv;
    }
}
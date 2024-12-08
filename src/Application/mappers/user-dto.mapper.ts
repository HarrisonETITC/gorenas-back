import { UserBuilder } from "@Domain/models/builders/user.builder";
import { UserCreateDto } from "@Domain/models/create-dto/user-create.dto";
import { UserUpdateDto } from "@Domain/models/update-dto/user-update.dto";
import { UserModel } from "@Domain/models/user.model";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserDtoMapper implements DtoMapperPort<UserModel, UserCreateDto, UserUpdateDto> {
    fromModelToCreate(base: UserModel): UserCreateDto {
        const create: UserCreateDto = {
            email: base.email,
            password: base.password,
            state: base.state ?? null,
            created: base.created ?? null
        };
        return create;
    }
    fromModelToUpdate(base: UserModel): UserUpdateDto {
        const update: UserUpdateDto = {
            id: base.id,
            email: base.email,
            password: base.password,
            state: base.state ?? null,
            created: base.created ?? null
        };
        return update;
    }
    fromCreateToModel(create: UserCreateDto): UserModel {
        return new UserBuilder()
            .setId(null)
            .setEmail(create.email)
            .setPassword(create.password)
            .setState(create.state ?? null)
            .setCreated(create.created ?? null)
            .build();
    }
    fromUpdateToModel(update: UserUpdateDto): UserModel {
        return new UserBuilder()
            .setId(update.id)
            .setEmail(update.email)
            .setPassword(update.password)
            .setState(update.state ?? null)
            .setCreated(update.created ?? null)
            .build();
    }
}
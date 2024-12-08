import { RoleBuilder } from "@Domain/models/builders/role.builder";
import { RoleCreateDto } from "@Domain/models/create-dto/role-create.dto";
import { RoleModel } from "@Domain/models/role.model";
import { RoleUpdateDto } from "@Domain/models/update-dto/role-update.dto";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoleDtoMapper implements DtoMapperPort<RoleModel, RoleCreateDto, RoleUpdateDto> {
    fromModelToCreate(base: RoleModel, params?: Map<string, string>): RoleCreateDto {
        return {
            name: base.name ?? null,
            state: base.state ?? null
        };
    }
    fromModelToUpdate(base: RoleModel, params?: Map<string, string>): RoleUpdateDto {
        return {
            id: base.id ?? null,
            name: base.name ?? null,
            state: base.state ?? null
        }
    }
    fromCreateToModel(create: RoleCreateDto, params?: Map<string, string>): RoleModel {
        return new RoleBuilder()
            .setId(null)
            .setName(create.name ?? null)
            .setState(create.state ?? null)
            .build();
    }
    fromUpdateToModel(update: RoleUpdateDto, params?: Map<string, string>): RoleModel {
        return new RoleBuilder()
            .setId(update.id)
            .setName(update.name ?? null)
            .setState(update.state ?? null)
            .build();
    }
}

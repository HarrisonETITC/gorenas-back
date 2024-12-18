import { PermissionCreateDto } from "@Domain/models/create-dto/permission-create.dto";
import { PermissionModel } from "@Domain/models/permission.model";
import { PermissionUpdateDto } from "@Domain/models/update-dto/permission-update.dto";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PermissionDtoMapper implements DtoMapperPort<PermissionModel, PermissionCreateDto, PermissionUpdateDto> {
    fromModelToCreate(base: PermissionModel, params?: Map<string, string>): PermissionCreateDto {
        return {
            name: base.name,
            created: base.created
        }
    }
    fromModelToUpdate(base: PermissionModel, params?: Map<string, string>): PermissionUpdateDto {
        return {
            id: base.id,
            name: base.name,
            created: base.created
        }
    }
    fromCreateToModel(create: PermissionCreateDto, params?: Map<string, string>): PermissionModel {
        return {
            id: null,
            name: create.name,
            created: create.created
        }
    }
    fromUpdateToModel(update: PermissionUpdateDto, params?: Map<string, string>): PermissionModel {
        return {
            id: update.id,
            name: update.name,
            created: update.created
        }
    }
}
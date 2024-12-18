import { PermissionModelView } from "@Application/model-view/permission.mv";
import { PermissionModel } from "@Domain/models/permission.model";
import { GeneralServiceAdapter } from "./general-service.adapter";
import { PermissionCreateDto } from "@Domain/models/create-dto/permission-create.dto";
import { PermissionUpdateDto } from "@Domain/models/update-dto/permission-update.dto";
import { Inject, Injectable } from "@nestjs/common";
import { PERMISSION_DTO_MAPPER, PERMISSION_REPOSITORY } from "@Application/config/inject-tokens/permission.tokens";
import { PermissionTransformParams } from "@Application/core/params/transform/permission-transform.params";
import { PermissionEntity } from "@Infraestructure/orm/typeorm/entities/permission.entity";
import { GeneralRepository } from "@Infraestructure/orm/typeorm/repositories/general.repository";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";

@Injectable()
export class PermissionServiceAdapter extends GeneralServiceAdapter<PermissionModel, PermissionCreateDto, PermissionUpdateDto, PermissionModelView> {
    constructor(
        @Inject(PERMISSION_REPOSITORY)
        protected readonly repository: GeneralRepository<PermissionModel, PermissionEntity, PermissionModelView, PermissionTransformParams>,
        @Inject(PERMISSION_DTO_MAPPER)
        private readonly dtoMapper: DtoMapperPort<PermissionModel, PermissionCreateDto, PermissionUpdateDto>
    ) {
        super(repository, dtoMapper);
    }
}
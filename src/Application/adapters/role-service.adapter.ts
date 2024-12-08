import { RoleModel } from "@Domain/models/role.model";
import { GeneralServiceAdapter } from "./general-service.adapter";
import { RoleCreateDto } from "@Domain/models/create-dto/role-create.dto";
import { RoleUpdateDto } from "@Domain/models/update-dto/role-update.dto";
import { RoleModelView } from "@Application/model-view/role.mv";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { ROLE_DTO_MAPPER, ROLE_REPOSITORY } from "@Application/config/inject-tokens/role.tokens";
import { Inject, Injectable } from "@nestjs/common";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";

@Injectable()
export class RoleServiceAdapter extends GeneralServiceAdapter<RoleModel, RoleCreateDto, RoleUpdateDto, RoleModelView> {
    constructor(
        @Inject(ROLE_REPOSITORY) private readonly roleRepository: GeneralRepositoryPort<RoleModel> & GenerateModelViewPort<RoleModel, RoleModelView>,
        @Inject(ROLE_DTO_MAPPER) private readonly roleMapper: DtoMapperPort<RoleModel, RoleCreateDto, RoleUpdateDto>
    ) {
        super(roleRepository, roleMapper);
    }
}
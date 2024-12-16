import { Controller, Inject } from "@nestjs/common";
import { GeneralControllerAdapter } from "./general-controller.adapter";
import { RoleModel } from "@Domain/models/role.model";
import { RoleCreateDto } from "@Domain/models/create-dto/role-create.dto";
import { RoleUpdateDto } from "@Domain/models/update-dto/role-update.dto";
import { RoleModelView } from "@Application/model-view/role.mv";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { ROLE_SERVICE } from "@Application/config/inject-tokens/role.tokens";
import { ROUTE_ROLE } from "@Application/api/api.routes";

@Controller(ROUTE_ROLE)
export class RoleController extends GeneralControllerAdapter(RoleModel, RoleCreateDto, RoleUpdateDto, RoleModelView) {
    constructor(
        @Inject(ROLE_SERVICE) private readonly roleService: GeneralServicePort<RoleModel, RoleCreateDto, RoleUpdateDto> & GenerateModelViewPort<RoleModel, RoleModelView>
    ) {
        super(roleService)
    }
}

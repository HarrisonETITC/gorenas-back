import { ROUTE_PERMISSION } from "@Application/api/api.routes";
import { PERMISSION_SERVICE } from "@Application/config/inject-tokens/permission.tokens";
import { PermissionModelView } from "@Application/model-view/permission.mv";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { PermissionCreateDto } from "@Domain/models/create-dto/permission-create.dto";
import { PermissionModel } from "@Domain/models/permission.model";
import { PermissionUpdateDto } from "@Domain/models/update-dto/permission-update.dto";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { Controller, Inject } from "@nestjs/common";
import { GeneralControllerAdapter } from "./general-controller.adapter";

@Controller(ROUTE_PERMISSION)
export class PermissionController extends GeneralControllerAdapter(PermissionModel, PermissionCreateDto, PermissionUpdateDto, PermissionModelView) {
    constructor(
        @Inject(PERMISSION_SERVICE)
        private readonly service: GeneralServicePort<PermissionModel, PermissionCreateDto, PermissionUpdateDto> & GenerateModelViewPort<PermissionModel, PermissionModelView>
    ) {
        super(service)
    }
}

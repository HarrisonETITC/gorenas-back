import { ROUTE_PERMISSION } from "@Application/api/api.routes";
import { PERMISSION_SERVICE } from "@Application/config/inject-tokens/permission.tokens";
import { PermissionModelView } from "@Application/model-view/permission.mv";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { PermissionCreateDto } from "@Domain/models/create-dto/permission-create.dto";
import { PermissionModel } from "@Domain/models/permission.model";
import { PermissionUpdateDto } from "@Domain/models/update-dto/permission-update.dto";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { Controller, Get, Inject, Query } from "@nestjs/common";
import { GeneralControllerAdapter } from "./general-controller.adapter";
import { PermissionSearchParams } from "@Application/core/params/search/permission-search.params";
import { SetTypedQuery } from "@Application/core/decorators/set-type-query.decorator";
import { DataResponse } from "@Domain/interfaces/data-response.interface";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { Roles } from "@Application/core/decorators/role.decorator";
import { RoleModel } from "@Domain/models/role.model";
import { IdValue } from "@Domain/interfaces/id-value.interface";

@Controller(ROUTE_PERMISSION)
export class PermissionController extends GeneralControllerAdapter(PermissionModel, PermissionCreateDto, PermissionUpdateDto, PermissionModelView) {
    constructor(
        @Inject(PERMISSION_SERVICE)
        private readonly service: GeneralServicePort<PermissionModel, PermissionCreateDto, PermissionUpdateDto>
            & GenerateModelViewPort<PermissionModel, PermissionModelView>
            & GetAvailableCanSeePort<PermissionModelView>
    ) {
        super(service)
    }

    @Get('can-see')
    @SetTypedQuery(PermissionSearchParams)
    @Roles([RoleModel.ROLE_ADMINISTRATOR])
    override async getCanSee(@Query() params: PermissionSearchParams): Promise<DataResponse<Array<PermissionModelView>>> {
        return { data: (await this.service.getCanSee(params)) };
    }


    @Get('available')
    @Roles(RoleModel.BASE_ROLES)
    @SetTypedQuery(PermissionSearchParams)
    override async getAvailable(@Query() params: PermissionSearchParams): Promise<DataResponse<Array<IdValue>>> {
        return { data: (await this.service.getAvailable(params)) };
    }
}

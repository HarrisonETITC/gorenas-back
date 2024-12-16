import { Controller, Get, Inject, Query, UseGuards } from "@nestjs/common";
import { GeneralControllerAdapter } from "./general-controller.adapter";
import { UserModel } from "@Domain/models/user.model";
import { UserCreateDto } from "@Domain/models/create-dto/user-create.dto";
import { UserUpdateDto } from "@Domain/models/update-dto/user-update.dto";
import { UserModelView } from "@Application/model-view/user.mv";
import { USER_SERVICE } from "@Application/config/inject-tokens/user.tokens";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { GeneralServicePort } from "@Domain/ports/general-service.port";
import { ROUTE_USER } from "@Application/api/api.routes";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";
import { JwtGuard } from "@Application/api/guards/jwt.guard";
import { RolesGuard } from "@Application/api/guards/rol.guard";
import { Roles } from "@Application/core/decorators/role.decorator";
import { SetTypedQuery } from "@Application/core/decorators/set-type-query.decorator";
import { RoleModel } from "@Domain/models/role.model";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { DataResponse } from "@Domain/interfaces/data-response.interface";

@Controller(ROUTE_USER)
@UseGuards(JwtGuard, RolesGuard)
export class UserController extends GeneralControllerAdapter(UserModel, UserCreateDto, UserUpdateDto, UserModelView) {
    constructor(
        @Inject(USER_SERVICE)
        private readonly userService: GeneralServicePort<UserModel, UserCreateDto, UserUpdateDto> & GenerateModelViewPort<UserModel, UserModelView> & GetAvailableCanSeePort<UserModelView>
    ) {
        super(userService);
    }

    @Get('available')
    @Roles([RoleModel.ROLE_ADMINISTRATOR, RoleModel.ROLE_MANAGER, RoleModel.ROLE_PROPIETARY])
    @SetTypedQuery(BasicSearchParams)
    override async getAvailable(@Query() params: BasicSearchParams): Promise<DataResponse<Array<IdValue>>> {
        return { data: (await this.userService.getAvailable(params)) }
    }
}
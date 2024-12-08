import { Controller, Inject } from "@nestjs/common";
import { GeneralControllerAdapter } from "./general-controller.adapter";
import { UserModel } from "@Domain/models/user.model";
import { UserCreateDto } from "@Domain/models/create-dto/user-create.dto";
import { UserUpdateDto } from "@Domain/models/update-dto/user-update.dto";
import { UserModelView } from "@Application/model-view/user.mv";
import { USER_SERVICE } from "@Application/config/user-app.providers";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { GeneralServicePort } from "@Domain/ports/general-service.port";

@Controller('user')
export class UserController extends GeneralControllerAdapter<UserModel, UserCreateDto, UserUpdateDto, UserModelView> {
    constructor(
        @Inject(USER_SERVICE) private readonly userService: GeneralServicePort<UserModel, UserCreateDto, UserUpdateDto> & GenerateModelViewPort<UserModel, UserModelView> 
    ) {
        super(userService);
    }
}
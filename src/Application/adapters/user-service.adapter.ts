import { UserModel } from "@Domain/models/user.model";
import { GeneralServiceAdapter } from "./general-service.adapter";
import { UserCreateDto } from "@Domain/models/create-dto/user-create.dto";
import { UserUpdateDto } from "@Domain/models/update-dto/user-update.dto";
import { UserModelView } from "@Application/model-view/user.mv";
import { Inject, Injectable } from "@nestjs/common";
import { USER_DTO_MAPPER, USER_REPOSITORY } from "@Application/config/user-app.providers";
import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";

@Injectable()
export class UserServiceAdapter extends GeneralServiceAdapter<UserModel, UserCreateDto, UserUpdateDto, UserModelView> {
    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: GeneralRepositoryPort<UserModel> & GenerateModelViewPort<UserModel, UserModelView>,
        @Inject(USER_DTO_MAPPER) private readonly userMapper: DtoMapperPort<UserModel, UserCreateDto, UserUpdateDto>
    ) {
        super(userRepository, userMapper);
    }
}
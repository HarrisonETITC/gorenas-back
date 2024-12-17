import { UserModel } from "@Domain/models/user.model";
import { GeneralServiceAdapter } from "./general-service.adapter";
import { UserCreateDto } from "@Domain/models/create-dto/user-create.dto";
import { UserUpdateDto } from "@Domain/models/update-dto/user-update.dto";
import { UserModelView } from "@Application/model-view/user.mv";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { USER_DTO_MAPPER, USER_REPOSITORY } from "@Application/config/inject-tokens/user.tokens";
import { GeneralRepositoryPort } from "@Domain/ports/general-repository.port";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { DtoMapperPort } from "@Domain/ports/dto-mapper.port";
import { UsersPort } from "@Application/ports/users/users.port";
import { AppUtil } from "@Application/core/utils/app.util";
import { GetAvailableCanSeePort } from "@Application/ports/available-cansee.port";
import { BasicSearchParams } from "@Application/core/params/search/basic-search.params";
import { IdValue } from "@Domain/interfaces/id-value.interface";

@Injectable()
export class UserServiceAdapter extends GeneralServiceAdapter<UserModel, UserCreateDto, UserUpdateDto, UserModelView> implements UsersPort, GetAvailableCanSeePort<UserModelView> {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: GeneralRepositoryPort<UserModel> & GenerateModelViewPort<UserModel, UserModelView> & UsersPort & GetAvailableCanSeePort<UserModelView>,
        @Inject(USER_DTO_MAPPER)
        private readonly userMapper: DtoMapperPort<UserModel, UserCreateDto, UserUpdateDto>
    ) {
        super(userRepository, userMapper);
    }

    async findByEmail(email: string): Promise<UserModel> {
        const finded = await this.userRepository.findByEmail(email);

        if (AppUtil.verifyEmpty(finded))
            throw new BadRequestException(`No existe un usuario con el email '${email}'`);

        return finded;
    }
    async getAvailable(params: BasicSearchParams): Promise<Array<IdValue>> {
        return await this.userRepository.getAvailable(params);
    }
    async getCanSee(params: BasicSearchParams): Promise<UserModelView[]> {
        return await this.userRepository.getCanSee(params);
    }
}
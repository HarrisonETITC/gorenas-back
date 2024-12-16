import { ENCRYPTER } from "@Application/config/inject-tokens/auth.tokens";
import { USER_SERVICE } from "@Application/config/inject-tokens/user.tokens";
import { AuthManagerPort } from "@Application/ports/auth/auth-manager.port";
import { EncrypterPort } from "@Application/ports/encrypter.port";
import { UsersPort } from "@Application/ports/users/Users.port";
import { UserModel } from "@Domain/models/user.model";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AppUtil } from "@Application/core/utils/app.util";
import { GenerateModelViewPort } from "@Application/ports/generate-mv.por";
import { UserModelView } from "@Application/model-view/user.mv";

@Injectable()
export class AuthManagerAdapter implements AuthManagerPort {

    constructor(
        @Inject(USER_SERVICE) private readonly usersService: UsersPort & GenerateModelViewPort<UserModel, UserModelView>,
        @Inject(ENCRYPTER) private readonly encrypter: EncrypterPort
    ) { }

    async validate(username: string, password: string): Promise<UserModelView> {
        if (AppUtil.verifyEmpty(username) || AppUtil.verifyEmpty(password))
            throw new BadRequestException(`Debe proveer los valores de email y contraseña para poder realizar esta acción`)

        const user = await this.usersService.findByEmail(username);

        if (!(await this.encrypter.compare(password, user.password)))
            throw new BadRequestException(`La contraseña ingresada para el usuario '${username}' no es correcta.`);

        return (await this.usersService.generateModelView([user]))[0];
    }
}
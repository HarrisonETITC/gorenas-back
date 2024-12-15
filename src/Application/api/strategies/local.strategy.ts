import { AUTH_MANAGER } from "@Application/config/inject-tokens/auth.tokens";
import { UserModelView } from "@Application/model-view/user.mv";
import { AuthManagerPort } from "@Application/ports/auth/auth-manager.port";
import { UserModel } from "@Domain/models/user.model";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(AUTH_MANAGER) private readonly manager: AuthManagerPort
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<UserModelView> {
        return await this.manager.validate(username, password);
    }
}
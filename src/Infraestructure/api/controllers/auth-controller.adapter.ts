import { ROUTE_AUTH } from "@Application/api/api.routes";
import { LocalGuard } from "@Application/api/guards/local.guard";
import { AUTH_SERVICE, ENCRYPTER } from "@Application/config/inject-tokens/auth.tokens";
import { UserModelView } from "@Application/model-view/user.mv";
import { AuthControllerPort } from "@Application/ports/auth/auth-controller.port";
import { AuthServicePort } from "@Application/ports/auth/auth-service.port";
import { EncrypterPort } from "@Application/ports/encrypter.port";
import { UserModel } from "@Domain/models/user.model";
import { TokenResponse } from "@Domain/types/token-response.type";
import { Controller, Get, Inject, Post, Query, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";

@Controller(ROUTE_AUTH)
export class AuthController implements AuthControllerPort {

    constructor(
        @Inject(AUTH_SERVICE) private readonly authService: AuthServicePort,
        @Inject(ENCRYPTER) private readonly encrypter: EncrypterPort
    ) { }

    @Post('authenticate')
    @UseGuards(LocalGuard)
    async authenticate(@Req() req: Request): Promise<TokenResponse> {
        const user = (req.user as UserModel);

        return {
            token: await this.authService.generateToken(user)
        }
    }

    @Get('get-hash')
    async getHash(
        @Query('data') data: string
    ) {
        return { hashed: await this.encrypter.encrypt(data) }
    }

    createUser(newUser: UserModel): Promise<UserModelView> {
        throw new Error("Method not implemented.");
    }
}
import { AuthProviders } from "@Infraestructure/orm/typeorm/config/providers/auth.providers";
import { Module } from "@nestjs/common";
import { UserModule } from "./user.module";
import { AuthController } from "../controllers/auth-controller.adapter";

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: AuthProviders,
    exports: AuthProviders
})
export class AuthModule { }
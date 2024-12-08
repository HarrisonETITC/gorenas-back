import { UserEntity } from "@Infraestructure/orm/typeorm/entities/user.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "../controllers/user-controller.adapter";
import { UserProviders } from "@Infraestructure/orm/typeorm/config/providers/user.providers";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [UserController],
    providers: UserProviders.concat([])
})
export class UserModule { }
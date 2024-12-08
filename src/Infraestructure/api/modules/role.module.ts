import { RoleEntity } from "@Infraestructure/orm/typeorm/entities/role.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleController } from "../controllers/role-controller.adapter";
import { RoleProviders } from "@Infraestructure/orm/typeorm/config/providers/role.providers";

@Module({
    imports: [
        TypeOrmModule.forFeature([RoleEntity])
    ],
    controllers: [RoleController],
    providers: RoleProviders.concat([]),
    exports: RoleProviders.concat([])
})
export class RoleModule { }
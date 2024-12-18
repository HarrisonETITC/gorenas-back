import { PermissionProviders } from "@Infraestructure/orm/typeorm/config/providers/permission.providers";
import { PermissionEntity } from "@Infraestructure/orm/typeorm/entities/permission.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionController } from "../controllers/permission-controller.adapter";

@Module({
    imports: [
        TypeOrmModule.forFeature([PermissionEntity])
    ],
    controllers: [PermissionController],
    providers: PermissionProviders.concat([]),
    exports: PermissionProviders.concat([])
})
export class PermissionModule { }
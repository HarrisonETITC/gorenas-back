import { RolEntity } from "@Infraestructure/orm/typeorm/entities/rol.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([RolEntity])
    ]
})
export class RolModule { }
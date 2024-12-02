import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolEntity } from '@orm/entities/rol.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([RolEntity])
    ]
})
export class RolModule { }

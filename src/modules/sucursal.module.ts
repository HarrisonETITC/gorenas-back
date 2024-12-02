import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucursalEntity } from '@orm/entities/sucursal.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([SucursalEntity])
    ]
})
export class SucursalModule { }

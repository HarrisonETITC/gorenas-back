import { SucursalController } from '@controllers/sucursal.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SucursalEntity } from '@orm/entities/sucursal.entity';
import { SucursalService } from '@services/sucursal.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SucursalEntity])
    ],
    controllers: [SucursalController],
    providers: [SucursalService]
})
export class SucursalModule { }

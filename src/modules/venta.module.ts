import { VentaController } from '@controllers/venta.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaEntity } from '@orm/entities/venta.entity';
import { VentaService } from '@services/venta.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([VentaEntity])
    ],
    controllers: [VentaController],
    providers: [VentaService]
})
export class VentaModule {}

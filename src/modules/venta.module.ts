import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaEntity } from '@orm/entities/venta.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([VentaEntity])
    ]
})
export class VentaModule {}

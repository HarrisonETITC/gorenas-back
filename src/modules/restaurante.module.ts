import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteEntity } from '@orm/entities/restaurante.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([RestauranteEntity])
    ]
})
export class RestauranteModule { }

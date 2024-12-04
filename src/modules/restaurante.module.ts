import { RestauranteController } from '@controllers/restaurante.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteEntity } from '@orm/entities/restaurante.entity';
import { RestauranteService } from '@services/restaurante.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RestauranteEntity])
    ],
    controllers: [RestauranteController],
    providers: [RestauranteService]
})
export class RestauranteModule { }

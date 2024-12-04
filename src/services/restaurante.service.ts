import { Inject, Injectable, Res } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GeneralService } from './general/general.service';
import { RestauranteEntity } from '@orm/entities/restaurante.entity';

@Injectable()
export class RestauranteService extends GeneralService<RestauranteEntity> {
    constructor(
        @Inject(DataSource) source: DataSource
    ){
        super(source, RestauranteEntity)
    }

    async buscarDisponibles() {
        return await this.repositorio.find();
    }
}

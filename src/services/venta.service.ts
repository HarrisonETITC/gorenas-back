import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GeneralService } from './general/general.service';
import { VentaEntity } from '@orm/entities/venta.entity';

@Injectable()
export class VentaService extends GeneralService<VentaEntity> {
    constructor(
        @Inject(DataSource) private readonly source: DataSource
    ) {
        super(source, VentaEntity)
    }
}

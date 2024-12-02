import { Inject, Injectable } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { RolEntity } from '@orm/entities/rol.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class RolService extends GeneralService<RolEntity> {
    constructor(
        @Inject(DataSource) source: DataSource
    ) {
        super(source, RolEntity);
    }
}

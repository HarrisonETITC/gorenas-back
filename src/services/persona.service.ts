import { Inject, Injectable } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { PersonaEntity } from '@orm/entities/persona.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PersonaService extends GeneralService<PersonaEntity> {
    constructor(
        @Inject(DataSource) source: DataSource
    ) {
        super(source, PersonaEntity);
    }
}

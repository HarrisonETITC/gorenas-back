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
    async generateScript(tableName: string): Promise<string> {
        const data = await this.repositorio.find();
        let script = '';
        data.forEach(single => {
            const cols = Object.keys(single);
            const values = Object.values(single).map(val => {
                if (typeof val === 'string')
                    return `'${val.replace(/'/g, "''")}'`;
                if (val instanceof Date) {
                    return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
                }
                return val;
            }
            );

            const insertStatement = `INSERT INTO ${tableName} (${cols.join(', ')}) VALUES (${values.join(', ')});\n`;
            script = insertStatement;
        });

        return script;
    }
}

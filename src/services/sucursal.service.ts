import { Inject, Injectable } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { DataSource, Like } from 'typeorm';
import { SucursalEntity } from '@orm/entities/sucursal.entity';
import { RolEntity } from '@orm/entities/rol.entity';
import { RestauranteEntity } from '@orm/entities/restaurante.entity';

@Injectable()
export class SucursalService extends GeneralService<SucursalEntity> {
    constructor(
        @Inject(DataSource) private readonly source: DataSource
    ) {
        super(source, SucursalEntity)
    }

    async sucursalesPersona(id: number, rol: string) {
        if (rol === RolEntity.ROL_GERENTE || rol === RolEntity.ROL_CAJERO)
            return await this.repositorio
                .createQueryBuilder('s')
                .leftJoinAndSelect('s.empleados', 'e')
                .leftJoinAndSelect('e.persona', 'p')
                .where('p.usuario_id = :usuarioId', { usuarioId: id })
                .getMany();

        return await this.repositorio.find();
    }

    async restaurantePorSucursalId(id: number) {
        const restaurante = await this.source.getRepository(RestauranteEntity)
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.sucursales', 's')
            .where('s.id = :id', { id })
            .getOne();

        return { nombre: 'Gorenas Centro', id: restaurante.id };
    }

    async buscarDisponibles(filtro: string) {
        return await this.repositorio.findBy({ direccion: Like(`%${filtro}%`) });
    }

    async getByEmpleadoId(id: number) {
        return await this.repositorio.findOneBy({ empleados: { id } });
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

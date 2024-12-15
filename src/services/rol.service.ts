import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { RolEntity } from '@orm/entities/rol.entity';
import { DataSource, In, Like, Not } from 'typeorm';
import { Roles } from '@complements/decoradores/rol.decorator';
import { AppUtil } from '@utils/app.util';

@Injectable()
export class RolService extends GeneralService<RolEntity> {
    constructor(
        @Inject(DataSource) source: DataSource
    ) {
        super(source, RolEntity);
    }

    async rolByUsuarioId(id: number) {
        return await this.repositorio
            .createQueryBuilder("r")
            .leftJoinAndSelect("r.personas", "p")
            .leftJoinAndSelect("p.usuario", "u")
            .where("u.id = :userId", { userId: id })
            .getOne();
    }

    async rolesDisponibles(rol: string, query: string) {
        if (rol === RolEntity.ROL_ADMINISTRADOR || rol === RolEntity.ROL_PROPIETARIO) {
            return await this.repositorio.findBy({
                nombre: Like(`%${query}%`)
            });
        }

        if (rol === RolEntity.ROL_GERENTE)
            return this.repositorio.createQueryBuilder("r")
                .where("r.nombre NOT IN (:...excludedValues)", { excludedValues: [RolEntity.ROL_PROPIETARIO, RolEntity.ROL_ADMINISTRADOR, RolEntity.ROL_GERENTE] })
                .andWhere("r.nombre LIKE :searchValue", { searchValue: `%${query}%` })
                .getMany();

        return []
    }

    async rolByPersonaId(id: number) {
        return await this.repositorio.findOneBy({ personas: { id } });
    }

    async mostrar(rol: string) {
        if ([RolEntity.ROL_ADMINISTRADOR, RolEntity.ROL_PROPIETARIO].includes(rol)) {
            return await this.repositorio.find();
        }
        return this.repositorio.findBy({ nombre: RolEntity.ROL_CAJERO });
    }

    override async crear(nuevo: RolEntity): Promise<RolEntity> {
        const buscar = await this.repositorio.findOneBy({ nombre: nuevo.nombre });

        if (!AppUtil.verificarVacio(buscar))
            throw new BadRequestException(`Ya existe un rol con el nombre '${nuevo.nombre}'`)

        return await this.crear(nuevo);
    }

    override async modificar(id: number, cambiar: RolEntity): Promise<RolEntity> {
        const buscar = await this.repositorio.findOneBy({ nombre: cambiar.nombre });

        if (!AppUtil.verificarVacio(buscar) && buscar.nombre != cambiar.nombre)
            throw new BadRequestException(`Ya existe un rol con el nombre '${cambiar.nombre}'`)

        return await this.repositorio.save(buscar);
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

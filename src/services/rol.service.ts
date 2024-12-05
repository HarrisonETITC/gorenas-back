import { Inject, Injectable } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { RolEntity } from '@orm/entities/rol.entity';
import { DataSource, In, Like, Not } from 'typeorm';
import { Roles } from '@complements/decoradores/rol.decorator';

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
}

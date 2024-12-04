import { Inject, Injectable } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { DataSource } from 'typeorm';
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
                .where('p.usuario_id = :usuarioId', { usuarioId: 1 })
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
}

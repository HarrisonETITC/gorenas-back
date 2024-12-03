import { Inject, Injectable } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { PersonaEntity } from '@orm/entities/persona.entity';
import { DataSource } from 'typeorm';
import { PersonaMv } from 'src/core/models/persona.modelview';
import { UsuarioEntity } from '@orm/entities/usuario.entity';
import { RolEntity } from '@orm/entities/rol.entity';

@Injectable()
export class PersonaService extends GeneralService<PersonaEntity> {
    constructor(
        @Inject(DataSource) private source: DataSource
    ) {
        super(source, PersonaEntity);
    }

    async infoPorIdUsuario(id: number) {
        const data = new PersonaMv();
        const usuario = await this.source.getRepository(UsuarioEntity).findOne({ where: { id: id }, select: { id: true, email: true } });
        const persona = await this.repositorio.findOneBy({ usuarioId: id });
        const rol = await this.source.getRepository(RolEntity).findOne({ where: { id: persona.rolId }, select: { nombre: true } });

        data.id = persona.id;
        data.email = usuario.email;
        data.nombres = persona.nombres;
        data.apellidos = persona.apellidos;
        data.rol = rol.nombre;

        return data;
    }
}

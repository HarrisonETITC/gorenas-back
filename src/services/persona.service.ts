import { Inject, Injectable } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { PersonaEntity } from '@orm/entities/persona.entity';
import { DataSource } from 'typeorm';
import { PersonaMv } from 'src/core/models/persona.modelview';
import { UsuarioEntity } from '@orm/entities/usuario.entity';
import { RolEntity } from '@orm/entities/rol.entity';
import { SucursalEntity } from '@orm/entities/sucursal.entity';

@Injectable()
export class PersonaService extends GeneralService<PersonaEntity> {
    constructor(
        @Inject(DataSource) private readonly source: DataSource
    ) {
        super(source, PersonaEntity);
    }

    async infoPorIdUsuario(id: number) {
        const data = new PersonaMv();
        const usuario = await this.source.getRepository(UsuarioEntity).findOne({ where: { id: id }, select: { id: true, email: true } });
        const persona = await this.repositorio.findOneBy({ usuarioId: usuario.id });
        const rol = await this.source.getRepository(RolEntity).findOne({ where: { id: persona.rolId } });

        data.id = persona.id;
        data.email = usuario.email;
        data.nombres = persona.nombres;
        data.apellidos = persona.apellidos;
        data.rol = rol.nombre;

        return data;
    }

    async getUsuarioByPersona(id: number) {
        return await this.source.getRepository(UsuarioEntity).findOneBy({ persona: { id } });
    }

    async personasMostrar(usuarioId: number, rol: string) {
        if (rol == RolEntity.ROL_ADMINISTRADOR || rol == RolEntity.ROL_PROPIETARIO) {
            const personas = await this.repositorio.find();
            const valores = [];

            for (const p of personas) {
                const data = new PersonaMv();
                const usuario = await this.source.getRepository(UsuarioEntity).findOne({ where: { persona: { id: p.id } }, select: { id: true, email: true } });
                const rol = await this.source.getRepository(RolEntity).findOne({ where: { id: p.rolId } });
                const sucursal = await this.source.getRepository(SucursalEntity).createQueryBuilder("s")
                    .innerJoinAndSelect("s.empleados", "e")
                    .where("e.persona_id = :personaId", { personaId: p.id })
                    .getOne();

                data.id = p.id;
                data.email = usuario.email;
                data.nombres = p.nombres;
                data.apellidos = p.apellidos;
                data.rol = rol.nombre;
                data.identificacion = p.identificacion;
                data.sucursal = sucursal?.direccion ?? '';

                valores.push(data);
            }

            return valores;
        }

        if (rol == RolEntity.ROL_GERENTE) {
            const sucursal = await this.source.getRepository(SucursalEntity)
                .createQueryBuilder("s")
                .innerJoin("s.empleados", "e")
                .innerJoin("e.persona", "p")
                .where("p.usuario_id = :usuarioId", { usuarioId })
                .select("s.id")
                .getOne();

            return await this.repositorio.createQueryBuilder("p")
                .innerJoinAndSelect("p.empleado", "e")
                .innerJoinAndSelect("e.sucursal", "s")
                .where("s.id = :sucursalId", { sucursalId: sucursal.id })
                .getMany();
        }

        return await this.repositorio.findOneBy({ usuario: { id: usuarioId } });
    }

    async getDisponibles(usuarioId: number, rol: string) {
        if (rol == RolEntity.ROL_ADMINISTRADOR || rol == RolEntity.ROL_PROPIETARIO)
            return await this.repositorio.createQueryBuilder("p")
                .leftJoin("p.empleado", "e")
                .where("e.id IS NULL")
                .getMany();

        const sucursal = await this.source.getRepository(SucursalEntity)
            .createQueryBuilder("s")
            .innerJoin("s.empleados", "e")
            .innerJoin("e.persona", "p")
            .where("p.usuario_id = :usuarioId", { usuarioId })
            .select("s.id")
            .getOne();

        return await this.repositorio.createQueryBuilder("p")
            .innerJoinAndSelect("p.empleado", "e")
            .where("e.sucursal_id = :sucursalId", { sucursalId: sucursal.id })
            .getMany();
    }

}

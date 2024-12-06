import { Inject, Injectable } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { PersonaEntity } from '@orm/entities/persona.entity';
import { DataSource, In } from 'typeorm';
import { PersonaMv } from 'src/core/models/persona.modelview';
import { UsuarioEntity } from '@orm/entities/usuario.entity';
import { RolEntity } from '@orm/entities/rol.entity';
import { SucursalEntity } from '@orm/entities/sucursal.entity';
import { EmpleadoEntity } from '@orm/entities/empleado.entity';
import { AppUtil } from '@utils/app.util';

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
        let basico: Array<PersonaEntity> = [];
        const valores = [];
        if (rol == RolEntity.ROL_ADMINISTRADOR || rol == RolEntity.ROL_PROPIETARIO) {
            basico = await this.repositorio.createQueryBuilder("p")
                .innerJoin("p.rol", "r")
                .orderBy("FIELD(r.nombre, 'administrador', 'propietario', 'gerente', 'cajero')", "ASC")
                .addOrderBy("p.id", "ASC")
                .getMany();
        } else if (rol == RolEntity.ROL_GERENTE) {
            const sucursal = await this.source.getRepository(SucursalEntity)
                .createQueryBuilder("s")
                .innerJoin("s.empleados", "e")
                .innerJoin("e.persona", "p")
                .where("p.usuario_id = :usuarioId", { usuarioId })
                .select("s.id")
                .getOne();

            basico = await this.repositorio.createQueryBuilder("p")
                .innerJoinAndSelect("p.empleado", "e")
                .innerJoinAndSelect("e.sucursal", "s")
                .where("s.id = :sucursalId", { sucursalId: sucursal.id })
                .getMany();
        } else {
            basico.push(await this.repositorio.findOneBy({ usuario: { id: usuarioId } }));
        }

        const usuarios = await this.source.getRepository(UsuarioEntity).find({
            where: {
                persona: {
                    id: In(
                        AppUtil.extraerIds(basico)
                    )
                }
            }, select: { id: true, email: true }
        });
        const roles = await this.source.getRepository(RolEntity).find({
            where: {
                id: In(
                    AppUtil.extraerIds(basico, 'rolId')
                )
            }
        });
        const sucursales = (await this.source.getRepository(SucursalEntity)
            .createQueryBuilder("s")
            .innerJoin("s.empleados", "e")
            .where("e.persona_id IN (:...personaIds)", { personaIds: AppUtil.extraerIds(basico) })
            .getMany());
        const empleados = (await this.source.getRepository(EmpleadoEntity).findBy({ sucursalId: In(AppUtil.extraerIds(sucursales)), personaId: In(AppUtil.extraerIds(basico)) }));

        for (const p of basico) {
            const data = new PersonaMv();
            const usuario = usuarios.find(u => u.id == p.usuarioId);
            const rol = roles.find(r => r.id = p.rolId);
            const sucursal = sucursales.find(s => s.id == empleados.find(e => e.personaId == p.id)?.sucursalId);

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

    async getDisponibles(usuarioId: number, rol: string, filtro: string) {
        return await this.repositorio
            .createQueryBuilder("p")
            .leftJoin("p.empleado", "e")
            .innerJoin("p.rol", "r")
            .where("r.nombre NOT IN (:...roles)", { roles: [RolEntity.ROL_ADMINISTRADOR, RolEntity.ROL_PROPIETARIO] })
            .andWhere("e.id IS NULL")
            .andWhere("(p.nombres LIKE :search OR p.apellidos LIKE :search)", { search: `%${filtro}%` })
            .getMany();
    }

    async buscarPorEmpleadoId(id: number) {
        return await this.repositorio.findOneBy({ empleado: { id } });
    }

}

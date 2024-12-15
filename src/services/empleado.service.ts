import { Inject, Injectable } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { EmpleadoEntity } from '@orm/entities/empleado.entity';
import { DataSource, In, Like, Not } from 'typeorm';
import source from '@config/dbconfig';
import { RolEntity } from '@orm/entities/rol.entity';
import { EmpleadoMv } from 'src/core/models/empleado.modelview';
import { PersonaEntity } from '@orm/entities/persona.entity';
import { SucursalEntity } from '@orm/entities/sucursal.entity';
import { AppUtil } from '@utils/app.util';
import { UsuarioEntity } from '@orm/entities/usuario.entity';

@Injectable()
export class EmpleadoService extends GeneralService<EmpleadoEntity> {
    constructor(
        @Inject(DataSource) private readonly source: DataSource
    ) {
        super(source, EmpleadoEntity);
    }

    async getDisponibles(usuarioId: number, rol: string, consulta: string) {
        let basico: Array<EmpleadoEntity> = [];
        const data: Array<EmpleadoMv> = [];
        if ([RolEntity.ROL_ADMINISTRADOR, RolEntity.ROL_PROPIETARIO].includes(rol)) {
            basico = await this.repositorio.createQueryBuilder("e")
                .innerJoinAndSelect("e.persona", "p")
                .where("p.nombres LIKE :nombres", { nombres: `%${consulta}%` })
                .orWhere("p.apellidos LIKE :apellidos", { apellidos: `%${consulta}%` })
                .getMany();
        } else if (rol == RolEntity.ROL_GERENTE) {
            const gerente = await this.repositorio.findOneBy({ persona: { usuarioId } });
            basico = (await this.repositorio.createQueryBuilder("e")
                .innerJoinAndSelect("e.persona", "p")
                .where("(p.nombres LIKE :nombres OR p.apellidos LIKE :apellidos)", { nombres: '%%', apellidos: '%%' })
                .andWhere("e.sucursal_id = :sucursalId", { sucursalId: gerente.sucursalId })
                .getMany());
        } else {
            basico = await this.repositorio.findBy({ persona: { usuarioId } });
        }
        const personas = await this.source.getRepository(PersonaEntity).find({
            where: {
                id: In(AppUtil.extraerIds(basico, 'personaId'))
            }
        })

        basico.forEach((emp) => {
            const mv = new EmpleadoMv();
            const persona = personas.find(p => p.id == emp.personaId)
            mv.id = emp.id;
            mv.nombre = `${persona.nombres} ${persona.apellidos}`;

            data.push(mv);
        })

        return data;
    }

    async getEmpleadosMostrar(userId: number, rol: string) {
        let basico: Array<EmpleadoEntity> = [];
        const result: Array<EmpleadoMv> = [];

        if ([RolEntity.ROL_ADMINISTRADOR, RolEntity.ROL_PROPIETARIO].includes(rol)) {
            basico = await this.repositorio.findBy({ persona: { rol: Not(In([RolEntity.ROL_ADMINISTRADOR, RolEntity.ROL_PROPIETARIO])) } });
        } else if ([RolEntity.ROL_GERENTE].includes(rol)) {
            const gerente = await this.repositorio.findOneBy({ persona: { usuarioId: userId } })
            basico = await this.repositorio.findBy({ sucursalId: gerente.sucursalId });
        } else {
            basico = await this.repositorio.findBy({ persona: { usuarioId: userId } });
        }

        const ventas: Array<EmpleadoEntity> = await this.repositorio
            .createQueryBuilder("e")
            .innerJoin("e.ventas", "v")
            .innerJoin("e.persona", "p")
            .innerJoin("p.rol", "r")
            .select("e.id", "id")
            .addSelect("COUNT(*)", "sucursalId")
            .addSelect("SUM(v.monto)", "personaId")
            .where("e.id IN (:...empleadoIds)", { empleadoIds: AppUtil.extraerIds(basico) })
            .andWhere("r.nombre NOT IN (:...roles)", { roles: [RolEntity.ROL_ADMINISTRADOR, RolEntity.ROL_PROPIETARIO] })
            .groupBy("e.id")
            .orderBy("COUNT(*)", "DESC")
            .addOrderBy("SUM(v.monto)", "DESC")
            .getRawMany();
        const personas = await this.source.getRepository(PersonaEntity).findBy({ id: In(AppUtil.extraerIds(basico, 'personaId')) });
        const usuarios = await this.source.getRepository(UsuarioEntity).findBy({ id: In(AppUtil.extraerIds(personas, 'usuarioId')) });
        const sucursales = await this.source.getRepository(SucursalEntity).findBy({ id: In(AppUtil.extraerIds(basico, 'sucursalId')) });

        for (const emp of basico) {
            const venta = ventas.find(v => v.id == emp.id);
            const persona = personas.find(p => p.id == emp.personaId);
            const usuario = usuarios.find(u => u.id == persona?.usuarioId);
            const sucursal = sucursales.find(s => s.id == emp.sucursalId);
            const mv = new EmpleadoMv();

            mv.id = emp.id;
            mv.nombre = `${persona.nombres} ${persona.apellidos}`;
            mv.ventas = venta?.sucursalId ?? 0;
            mv.montoVentas = venta?.personaId ?? 0;
            mv.sucursal = sucursal?.direccion ?? '';
            mv.usuario = usuario?.email ?? '';

            result.push(mv);
        }

        return result;
    }

    async getByVentaId(id: number) {
        const data = await this.repositorio.findOneBy({ ventas: { id } });
        const persona = await this.source.getRepository(PersonaEntity).findOneBy({ id: data.personaId });
        const sucursal = await this.source.getRepository(SucursalEntity).findOneBy({ id: data.sucursalId });
        const mv = new EmpleadoMv();
        mv.id = data.id;
        mv.nombre = persona.nombres;
        mv.sucursal = sucursal.direccion;

        return mv;
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

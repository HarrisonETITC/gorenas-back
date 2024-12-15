import { Inject, Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { GeneralService } from './general/general.service';
import { VentaEntity } from '@orm/entities/venta.entity';
import { RolEntity } from '@orm/entities/rol.entity';
import { VentaMv } from 'src/core/models/venta.modelview';
import { EmpleadoEntity } from '@orm/entities/empleado.entity';
import { SucursalEntity } from '@orm/entities/sucursal.entity';
import { PersonaEntity } from '@orm/entities/persona.entity';

@Injectable()
export class VentaService extends GeneralService<VentaEntity> {
    constructor(
        @Inject(DataSource) private readonly source: DataSource
    ) {
        super(source, VentaEntity)
    }

    async getVentasMostrar(usuarioId: number, rol: string): Promise<Array<VentaMv>> {
        let info: Array<VentaEntity> = [];
        let result = [];
        if ([RolEntity.ROL_ADMINISTRADOR, RolEntity.ROL_PROPIETARIO].includes(rol))
            info = await this.repositorio.find();
        else {
            const empleado = await this.source.getRepository(EmpleadoEntity).findOneBy({ persona: { usuarioId } });
            if (rol == RolEntity.ROL_GERENTE) {
                info = await this.repositorio.findBy({ empleado: { sucursalId: empleado.sucursalId } });
            } else {
                info = await this.repositorio.findBy({ empleado: { sucursalId: empleado.sucursalId, persona: { usuarioId } } })
            }
        }

        const empleados = await this.source.getRepository(EmpleadoEntity).findBy({
            id: In(
                info.map((inf) => inf.empleadoId)
            )
        });
        const personas = await this.source.getRepository(PersonaEntity).findBy({
            id: In(
                empleados.map(emp => emp.personaId)
            )
        });
        const sucursales = await this.source.getRepository(SucursalEntity).findBy({
            id: In(
                empleados.map(emp => emp.sucursalId)
            )
        });

        for (const v of info) {
            const emp = empleados.find(e => e.id == v.empleadoId);
            const per = personas.find(p => p.id == emp.personaId);
            const suc = sucursales.find(s => s.id == emp.sucursalId);
            const mv = new VentaMv();
            mv.id = v.id;
            mv.empleado = `${per.nombres} ${per.apellidos}`;
            mv.monto = v.monto;
            mv.sucursal = suc.direccion;
            mv.metodo = v.metodoPago;
            mv.realizada = v.creado;

            result.push(mv);
        }

        return result;
    }

    override async modificar(id: number, cambiar: VentaEntity): Promise<VentaEntity> {
        const anterior = await this.buscarPorId(id);
        const diferencia = cambiar.monto - anterior.monto;
        const sucursal = await this.source.getRepository(SucursalEntity).findOneBy({ empleados: { ventas: { id } } });
        sucursal.mes += diferencia;

        await this.source.getRepository(SucursalEntity).save(sucursal);
        return await this.modificar(id, cambiar);
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

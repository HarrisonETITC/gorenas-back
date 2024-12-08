import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { GeneralEntity } from "../../Infraestructure/orm/typeorm/entities/general/general.entity";
import { EstadoModel } from "src/core/models/estado.model";
import { SucursalEntity } from "./sucursal.entity";
import { VentaEntity } from "./venta.entity";
import { PersonaEntity } from "./persona.entity";

@Entity({ name: 'empleado' })
export class EmpleadoEntity extends GeneralEntity {
    @Column({ type: 'decimal', precision: 16, scale: 2, nullable: true })
    salario: number;

    @Column({ length: 1, default: EstadoModel.ESTADO_ACTIVO })
    estado: string;

    @Column({ name: 'sucursal_id', nullable: true })
    sucursalId: number;

    @ManyToOne(() => SucursalEntity, sucursal => sucursal.empleados)
    @JoinColumn({ name: 'sucursal_id' })
    sucursal?: SucursalEntity;

    @Column({ name: 'persona_id', nullable: true })
    personaId: number;

    @OneToOne(() => PersonaEntity, persona => persona.empleado, { eager: true })
    @JoinColumn({ name: 'persona_id' })
    persona?: PersonaEntity;

    @OneToMany(() => VentaEntity, venta => venta.empleado, { eager: true })
    ventas?: Array<VentaEntity>;
}
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, UpdateDateColumn } from "typeorm";
import { GeneralEntity } from "../../Infraestructure/orm/typeorm/entities/general/general.entity";
import { EmpleadoEntity } from "./empleado.entity";

@Entity({ name: 'venta' })
export class VentaEntity extends GeneralEntity {
    public static readonly METODO_CREDITO = 'credito';
    public static readonly METODO_DEBITO = 'debito';
    public static readonly METODO_TRANSFERENCIA = 'transferencia';
    public static readonly METODO_EFECTIVO = 'efectivo';
    public static readonly METODO_PLATAFORMAS = 'plataformas';

    @Column({ type: 'decimal', precision: 16, scale: 2, nullable: true })
    monto: number;

    @Column({ name: 'metodo_pago', length: 30, nullable: true, default: VentaEntity.METODO_EFECTIVO })
    metodoPago: string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    creado: Date;

    @UpdateDateColumn({ name: 'fecha_modif' })
    modificacion: Date;

    @Column({ name: 'empleado_id', nullable: true })
    empleadoId: number;

    @ManyToOne(() => EmpleadoEntity, empleado => empleado.ventas)
    @JoinColumn(({ name: 'empleado_id' }))
    empleado?: EmpleadoEntity;

}
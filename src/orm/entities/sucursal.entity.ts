import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";
import { GeneralEntity } from "../../Infraestructure/orm/typeorm/entities/general/general.entity";
import { EstadoModel } from "src/core/models/estado.model";
import { RestauranteEntity } from "./restaurante.entity";
import { EmpleadoEntity } from "./empleado.entity";

@Entity({ name: 'sucursal' })
export class SucursalEntity extends GeneralEntity {
    @Column({ length: 255, nullable: true })
    direccion: string;

    @Column({ length: 1, default: EstadoModel.ESTADO_ACTIVO })
    estado: string;

    @Column({ name: 'ganancias_mes', type: 'decimal', precision: 16, scale: 2, nullable: true })
    mes: number;

    @CreateDateColumn({ name: 'fecha_creacion' })
    creado: Date;

    @UpdateDateColumn({ name: 'fecha_modif' })
    modificacion: Date;

    @Column({ name: 'restaurante_id', nullable: true })
    restauranteId: number

    @ManyToOne(() => RestauranteEntity, restaurante => restaurante.sucursales)
    @JoinColumn({ name: 'restaurante_id' })
    restaurante?: RestauranteEntity;

    @OneToMany(() => EmpleadoEntity, empleado => empleado.sucursal, { eager: true })
    empleados?: Array<EmpleadoEntity>;

    persona_id?: number;
}
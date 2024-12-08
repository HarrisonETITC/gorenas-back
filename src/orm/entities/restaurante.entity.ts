import { Column, Entity, OneToMany } from "typeorm";
import { GeneralEntity } from "../../Infraestructure/orm/typeorm/entities/general/general.entity";
import { SucursalEntity } from "./sucursal.entity";

@Entity({ name: 'restaurante' })
export class RestauranteEntity extends GeneralEntity {
    @Column({ length: 255, nullable: true })
    direccion: string;

    @Column({ name: 'ganancias_totales', type: 'decimal', precision: 16, scale: 2, nullable: true })
    total: number;

    @Column({ name: 'ganancias_mes', type: 'decimal', precision: 16, scale: 2, nullable: true })
    mes: number;

    @OneToMany(() => SucursalEntity, sucursal => sucursal.restaurante)
    sucursales?: Array<SucursalEntity>;
}
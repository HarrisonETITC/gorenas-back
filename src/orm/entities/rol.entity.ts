import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { GeneralEntity } from "../../Infraestructure/orm/typeorm/entities/general/general.entity";
import { PersonaEntity } from "./persona.entity";
import { EstadoModel } from "src/core/models/estado.model";

@Entity({ name: 'rol' })
export class RolEntity extends GeneralEntity {
    public static readonly ROL_ADMINISTRADOR = 'administrador';
    public static readonly ROL_PROPIETARIO = 'propietario';
    public static readonly ROL_GERENTE = 'gerente';
    public static readonly ROL_CAJERO = 'cajero';

    public static readonly ROLES = new Array<string>();

    static {
        RolEntity.ROLES.push(RolEntity.ROL_ADMINISTRADOR);
        RolEntity.ROLES.push(RolEntity.ROL_PROPIETARIO);
        RolEntity.ROLES.push(RolEntity.ROL_GERENTE);
        RolEntity.ROLES.push(RolEntity.ROL_CAJERO);
    }

    @Column({ length: 20, unique: true })
    nombre: string;

    @Column({ length: 1, default: EstadoModel.ESTADO_ACTIVO })
    estado: string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    creado: Date;

    @UpdateDateColumn({ name: 'fecha_modif' })
    modificacion: Date;

    @OneToMany(() => PersonaEntity, persona => persona.rol)
    personas?: Array<PersonaEntity>;
}
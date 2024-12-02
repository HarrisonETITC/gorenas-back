import { Column, CreateDateColumn, Entity, OneToOne, UpdateDateColumn } from "typeorm";
import { GeneralEntity } from "./general/general.entity";
import { PersonaEntity } from "./persona.entity";
import { EstadoModel } from "src/core/models/estado.model";

@Entity({ name: 'rol' })
export class RolEntity extends GeneralEntity {
    @Column({ length: 20 })
    nombre: string;

    @Column({ length: 1, default: EstadoModel.ESTADO_ACTIVO })
    estado: string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    creado: Date;

    @UpdateDateColumn({ name: 'fecha_modif' })
    modificacion: Date;

    @OneToOne(() => PersonaEntity, persona => persona.rol)
    persona?: string;
}
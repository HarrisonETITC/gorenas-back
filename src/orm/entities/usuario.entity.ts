import { Column, CreateDateColumn, Entity, OneToOne } from "typeorm";
import { GeneralEntity } from "@orm/entities/general/general.entity";
import { EstadoModel } from "src/core/models/estado.model";
import { PersonaEntity } from "./persona.entity";

@Entity({ name: 'usuario' })
export class UsuarioEntity extends GeneralEntity {
    @Column({ length: 200, unique: true })
    email: string;

    @Column({ name: 'contrasena', length: 255 })
    pass: string;

    @Column({ length: 1, default: EstadoModel.ESTADO_ACTIVO })
    estado: string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    creado: Date;

    @OneToOne(() => PersonaEntity, person => person.usuario)
    persona?: PersonaEntity;

    constructor() {
        super();
    }
    
    oldPass?: string;
}
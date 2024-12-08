import { Column, CreateDateColumn, Entity, OneToOne } from "typeorm";
import { GeneralEntity } from "@Infraestructure/orm/typeorm/entities/general/general.entity";
import { EstadoModel } from "src/core/models/estado.model";
import { PersonEntity } from "./person.entity";

@Entity({ name: 'usertable' })
export class UserEntity extends GeneralEntity {
    @Column({ length: 200, unique: true })
    email: string;

    @Column({ length: 255 })
    password: string;

    @Column({ length: 1, default: EstadoModel.ESTADO_ACTIVO })
    state: string;

    @CreateDateColumn({ name: 'fecha_creacion' })
    created: Date;

    @OneToOne(() => PersonEntity, person => person.user)
    person?: PersonEntity;

    constructor() {
        super();
    }
    
    oldPass?: string;
}
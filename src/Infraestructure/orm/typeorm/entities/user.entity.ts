import { Column, CreateDateColumn, Entity, OneToOne } from "typeorm";
import { GeneralEntity } from "@Infraestructure/orm/typeorm/entities/general/general.entity";
import { PersonEntity } from "./person.entity";
import { StateModel } from "@Domain/models/general/state.model";

@Entity({ name: 'usertable' })
export class UserEntity extends GeneralEntity {
    @Column({ length: 200, unique: true })
    email: string;

    @Column({ length: 255 })
    password: string;

    @Column({ length: 1, default: StateModel.STATE_ACTIVE })
    state: string;

    @CreateDateColumn({})
    created: Date;

    @OneToOne(() => PersonEntity, person => person.user)
    person?: PersonEntity;

    constructor() {
        super();
    }
    
    oldPass?: string;
}
import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { StateModel } from "@Domain/models/general/state.model";
import { GeneralEntity } from "./general/general.entity";
import { PersonEntity } from "./person.entity";
import { PermissionEntity } from "./permission.entity";

@Entity({ name: 'role' })
export class RoleEntity extends GeneralEntity {
    @Column({ length: 20, unique: true })
    name: string;

    @Column({ length: 1, default: StateModel.STATE_ACTIVE })
    state: string;

    @CreateDateColumn({})
    created: Date;

    @UpdateDateColumn({})
    modified: Date;

    @OneToMany(() => PersonEntity, person => person.role)
    persons?: Array<PersonEntity>;

    @OneToMany(() => PermissionEntity, permission => permission.role)
    permissions?: Array<PermissionEntity>;
}
import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { StateModel } from "@Domain/models/general/state.model";
import { GeneralEntity } from "./general/general.entity";
import { PersonEntity } from "./person.entity";

@Entity({ name: 'role' })
export class RoleEntity extends GeneralEntity {
    public static readonly ROL_ADMINISTRATOR = 'administrador';
    public static readonly ROL_PROPIETARY = 'propietario';
    public static readonly ROL_MANAGER = 'gerente';
    public static readonly ROL_CASHIER = 'cashier';

    public static readonly ROLES = new Array<string>();

    static {
        RoleEntity.ROLES.push(RoleEntity.ROL_ADMINISTRATOR);
        RoleEntity.ROLES.push(RoleEntity.ROL_PROPIETARY);
        RoleEntity.ROLES.push(RoleEntity.ROL_MANAGER);
        RoleEntity.ROLES.push(RoleEntity.ROL_CASHIER);
    }

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
}
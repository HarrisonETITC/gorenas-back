import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { StateModel } from "@Domain/models/general/state.model";
import { GeneralEntity } from "./general/general.entity";
import { PersonEntity } from "./person.entity";

@Entity({ name: 'rol' })
export class RolEntity extends GeneralEntity {
    public static readonly ROL_ADMINISTRATOR = 'administrador';
    public static readonly ROL_PROPIETARY = 'propietario';
    public static readonly ROL_MANAGER = 'gerente';
    public static readonly ROL_CASHIER = 'cashier';

    public static readonly ROLES = new Array<string>();

    static {
        RolEntity.ROLES.push(RolEntity.ROL_ADMINISTRATOR);
        RolEntity.ROLES.push(RolEntity.ROL_PROPIETARY);
        RolEntity.ROLES.push(RolEntity.ROL_MANAGER);
        RolEntity.ROLES.push(RolEntity.ROL_CASHIER);
    }

    @Column({ length: 20, unique: true })
    name: string;

    @Column({ length: 1, default: StateModel.STATE_ACTIVE })
    state: string;

    @CreateDateColumn({})
    created: Date;

    @UpdateDateColumn({})
    modified: Date;

    @OneToMany(() => PersonEntity, person => person.rol)
    persons?: Array<PersonEntity>;
}
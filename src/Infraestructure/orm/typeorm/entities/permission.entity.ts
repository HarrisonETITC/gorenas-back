import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { GeneralEntity } from "./general/general.entity";
import { RoleEntity } from "./role.entity";

@Entity({ name: 'permission' })
@Unique("UQ_permission_name_role_id", ["name", "roleId"])
export class PermissionEntity extends GeneralEntity {
    @Column({ length: 200, nullable: false })
    name: string;

    @CreateDateColumn()
    created: Date;

    @Column({ name: 'role_id' })
    roleId?: number;

    @ManyToOne(() => RoleEntity, role => role.permissions)
    @JoinColumn({ name: 'role_id' })
    role?: RoleEntity;
}
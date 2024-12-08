import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { GeneralEntity } from "./general/general.entity";
import { UserEntity } from "./user.entity";
import { RolEntity } from "./rol.entity";
import { EmployeeEntity } from "./employee.entity";

@Entity({ name: 'person' })
export class PersonEntity extends GeneralEntity {
    public static readonly TYPE_ID_CC = 'C.C';
    public static readonly TYPE_ID_TI = 'T.I';
    public static readonly TIPO_ID_CE = 'C.E';

    public static readonly RH_O_PLUS = 'O+';
    public static readonly RH_O_MINUS = 'O-';

    @Column({ length: 200, nullable: true })
    names: string;

    @Column({ length: 200, nullable: true })
    surnames: string;

    @Column({ length: 15, nullable: true })
    identification: string;

    @Column({ name: 'type_identification', length: 4, nullable: true, default: PersonEntity.TYPE_ID_CC })
    typeIdentification: string;

    @Column({ name: 'phone_number', length: 10, nullable: true })
    phoneNumber: string;

    @Column({ length: 3, default: PersonEntity.RH_O_PLUS, nullable: true })
    rh: string;

    @Column({ length: 255, nullable: true })
    address: string;

    @Column({ nullable: true })
    born: Date;

    @CreateDateColumn({})
    created: Date;

    @Column({ name: 'user_id', nullable: true })
    userId: number;

    @OneToOne(() => UserEntity, user => user.person)
    @JoinColumn({ name: 'user_id' })
    user?: UserEntity;

    @Column({ name: 'rol_id', nullable: true })
    rolId: number;

    @ManyToOne(() => RolEntity, rol => rol.persons)
    @JoinColumn({ name: 'rol_id' })
    rol?: RolEntity;

    @OneToOne(() => EmployeeEntity, employee => employee.person)
    employee?: EmployeeEntity;

    constructor() {
        super();
    }
}
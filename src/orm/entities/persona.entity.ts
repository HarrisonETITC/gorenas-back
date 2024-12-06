import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { GeneralEntity } from "./general/general.entity";
import { UsuarioEntity } from "./usuario.entity";
import { RolEntity } from "./rol.entity";
import { EmpleadoEntity } from "./empleado.entity";

@Entity({ name: 'persona' })
export class PersonaEntity extends GeneralEntity {
    public static readonly TIPO_ID_CC = 'C.C';
    public static readonly TIPO_ID_TI = 'T.I';
    public static readonly TIPO_ID_CE = 'C.E';

    public static readonly RH_OMAS = 'O+';
    public static readonly RH_OMENOS = 'O-';

    @Column({ length: 200, nullable: true })
    nombres: string;

    @Column({ length: 200, nullable: true })
    apellidos: string;

    @Column({ name: 'tipo_identificacion', length: 4, nullable: true, default: PersonaEntity.TIPO_ID_CC })
    tipoId: string;

    @Column({ length: 15, nullable: true })
    identificacion: string;

    @Column({ name: 'numero_contacto', length: 10, nullable: true })
    numContacto: string;

    @Column({ length: 3, default: PersonaEntity.RH_OMAS, nullable: true })
    rh: string;

    @Column({ length: 255, nullable: true })
    direccion: string;

    @Column({ nullable: true })
    nacimiento: Date;

    @CreateDateColumn({ name: 'fecha_creacion' })
    creado: Date;

    @Column({ name: 'usuario_id', nullable: true })
    usuarioId: number;

    @OneToOne(() => UsuarioEntity, usuario => usuario.persona)
    @JoinColumn({ name: 'usuario_id' })
    usuario?: UsuarioEntity;

    @Column({ name: 'rol_id', nullable: true })
    rolId: number;

    @ManyToOne(() => RolEntity, rol => rol.personas)
    @JoinColumn({ name: 'rol_id' })
    rol?: RolEntity;

    @OneToOne(() => EmpleadoEntity, empleado => empleado.persona)
    empleado?: EmpleadoEntity;

    constructor() {
        super();
    }
}
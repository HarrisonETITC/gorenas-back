import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { UsuarioEntity } from '@orm/entities/usuario.entity';
import { DataSource, In, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { AppUtil } from '@utils/app.util';
import { UsuarioMv } from 'src/core/models/usuario.modelview';
import { RolEntity } from '@orm/entities/rol.entity';
import { SucursalEntity } from '@orm/entities/sucursal.entity';
import { PersonaEntity } from '@orm/entities/persona.entity';

export type authData = {
    username: string,
    password: string
}

config()
@Injectable()
export class UsuarioService extends GeneralService<UsuarioEntity> {
    constructor(
        @Inject(DataSource) private readonly source: DataSource
    ) {
        super(source, UsuarioEntity);
    }

    override async crear(nuevo: UsuarioEntity): Promise<UsuarioEntity> {
        const buscar = this.repositorio.findOneBy({email: nuevo.email});

        if (!AppUtil.verificarVacio(buscar))
            throw new BadRequestException(`Ya existe un usuario con el email '${nuevo.email}'`);

        const nuevaContra = await bcrypt.hash(nuevo.pass, await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS) ?? 10));
        nuevo.pass = nuevaContra;
        const created = this.repositorio.create(nuevo);

        return await this.repositorio.save(created);
    }

    async validarUsuario(info: authData): Promise<UsuarioEntity> {
        const encontrado = await this.repositorio.findOneBy({ email: info.username });

        if (AppUtil.verificarVacio(encontrado))
            throw new UnauthorizedException(`El usuario con el email ${info.username} no existe`);

        if (!(await bcrypt.compare(info.password, encontrado.pass)))
            throw new BadRequestException(`La contraseña brindada no es correcta para el usuario ${info.username}`)

        return encontrado;
    }

    async cambiarPass(idUsuario: number, nueva: string) {
        const nuevaContra = await bcrypt.hash(nueva, await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS) ?? 10));
        const actualizar: UsuarioEntity = await this.buscarPorId(idUsuario);
        actualizar.pass = nuevaContra;

        return await this.modificar(idUsuario, actualizar);
    }

    async buscarDisponibles(email: string) {
        return await this.repositorio
            .createQueryBuilder('u')
            .leftJoin('u.persona', 'p')
            .where('u.email LIKE :email', { email: `%${email}%` })
            .andWhere('p.id IS NULL')
            .getMany();
    }

    async buscarPorIdPersona(id: number) {
        return await this.repositorio.findOneBy({ persona: { id } });
    }

    async getHash(valor: string) {
        return await bcrypt.hash(valor, await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS) ?? 10));
    }

    async buscarUsuariosMostrar(id: number, rol: string) {
        let data: Array<UsuarioEntity> = [];
        const result: Array<UsuarioMv> = [];

        if ([RolEntity.ROL_ADMINISTRADOR, RolEntity.ROL_PROPIETARIO].includes(rol))
            data = await this.repositorio.find();
        else if (rol == RolEntity.ROL_GERENTE) {
            const sucursal = await this.source.getRepository(SucursalEntity).findOneBy({ empleados: { persona: { usuarioId: id } } });
            data = await this.repositorio.findBy({ persona: { empleado: { sucursalId: sucursal.id } } });
        }
        else {
            data.push(await this.repositorio.findOneBy({ id }));
        }

        const personas = await this.source.getRepository(PersonaEntity).findBy({ usuarioId: In(AppUtil.extraerIds(data)) });
        for (const u of data) {
            const mv = new UsuarioMv();
            const persona = personas.find(p => p.usuarioId == u.id);
            mv.id = u.id;
            mv.email = u.email;
            mv.estado = u.estado;
            mv.nombre = !AppUtil.verificarVacio(persona) ? `${persona.nombres} ${persona.apellidos}` : '';

            result.push(mv);
        }

        return result;
    }

    override async modificar(id: number, cambiar: UsuarioEntity): Promise<UsuarioEntity> {
        const actual = await this.buscarPorId(id);
        const buscar = await this.repositorio.findOneBy({email: cambiar.email});

        if (!AppUtil.verificarVacio(buscar) && buscar.email !== cambiar.email)
            throw new BadRequestException(`Ya existe un usuario con el email '${cambiar.email}'`);

        if (!(await bcrypt.compare(cambiar.pass, actual.pass))) {
            if (AppUtil.verificarVacio(cambiar.oldPass))
                throw new BadRequestException('Debe proveer su contraseña actual para poder cambiarla');
            if (!(await bcrypt.compare(cambiar.oldPass, actual.pass)))
                throw new BadRequestException('La contraseña ingresada no coincide con la contraseña actual');

            const nuevaContra = await bcrypt.hash(cambiar.pass, await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS) ?? 10));
            actual.pass = nuevaContra;
        }

        actual.estado = cambiar.estado;
        actual.email = cambiar.email;

        return await this.modificar(id, actual);
    }
}

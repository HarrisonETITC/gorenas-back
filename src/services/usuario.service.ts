import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { UsuarioEntity } from '@orm/entities/usuario.entity';
import { DataSource, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { AppUtil } from '@utils/app.util';

export type authData = {
    username: string,
    password: string
}

config()
@Injectable()
export class UsuarioService extends GeneralService<UsuarioEntity> {
    constructor(
        @Inject(DataSource) source: DataSource
    ) {
        super(source, UsuarioEntity);
    }

    override async crear(nuevo: UsuarioEntity): Promise<UsuarioEntity> {
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

    async buscarDisponibles(email: string) {
        return await this.repositorio
            .createQueryBuilder('u')
            .leftJoin('u.persona', 'p')
            .where('u.email LIKE :email', { email: `%${email}%` })
            .andWhere('p.id IS NULL')
            .getMany();
    }
}

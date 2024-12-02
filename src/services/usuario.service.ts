import { Inject, Injectable } from '@nestjs/common';
import { GeneralService } from './general/general.service';
import { UsuarioEntity } from '@orm/entities/usuario.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';

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
}

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioEntity } from '@orm/entities/usuario.entity';
import { config } from 'dotenv';

config()
@Injectable()
export class JwtImplService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async generarToken(info: UsuarioEntity): Promise<string> {
        const firmado = { id: info.id, email: info.email };

        return await this.jwtService.signAsync(firmado, { expiresIn: '1w', secret: process.env.JWT_SECRET });
    }
}

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsuarioEntity } from "@orm/entities/usuario.entity";
import { UsuarioService } from "@services/usuario.service";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authManejador: UsuarioService
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<UsuarioEntity> {
        return await this.authManejador.validarUsuario({ username, password });
    }
}
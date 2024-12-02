import { UsuarioController } from '@controllers/usuario.controller';
import { Module } from '@nestjs/common';
import { UsuarioService } from '@services/usuario.service';

@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService]
})
export class UsuarioModule { }

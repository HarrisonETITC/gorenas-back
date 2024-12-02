import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsuarioEntity } from '@orm/entities/usuario.entity';
import { UsuarioService } from '@services/usuario.service';
import { AppUtil } from '@utils/app.util';

@Controller('usuario')
export class UsuarioController {

    constructor(
        private readonly usuarioServicio: UsuarioService
    ) { }

    @Get('test')
    async test(@Query() id: number) {
        console.log((await this.usuarioServicio.buscarPorId(id)));
    }

    @Post('crear')
    async crearUsuario(@Body() nuevo: UsuarioEntity) {
        if (AppUtil.verificarVacio(nuevo.email) || AppUtil.verificarVacio(nuevo.pass))
            throw new BadRequestException(`Los campos email y pass son obligatorios para poder realizar esta acción.`);

        return await this.usuarioServicio.crear(nuevo);
    }
}

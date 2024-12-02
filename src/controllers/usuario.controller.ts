import { Roles } from '@complements/decoradores/rol.decorator';
import { JwtGuard } from '@complements/guards/jwt.guard';
import { LocalGuard } from '@complements/guards/local.guard';
import { RolesGuard } from '@complements/guards/rol.guard';
import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { RolEntity } from '@orm/entities/rol.entity';
import { UsuarioEntity } from '@orm/entities/usuario.entity';
import { JwtImplService } from '@services/jwt-impl.service';
import { UsuarioService } from '@services/usuario.service';
import { AppUtil } from '@utils/app.util';
import { Request } from 'express';

@Controller('usuario')
@UseGuards(RolesGuard)
export class UsuarioController {

    constructor(
        private readonly usuarioServicio: UsuarioService,
        private readonly jwtServiceImpl: JwtImplService
    ) { }

    @Post('autenticar')
    @UseGuards(LocalGuard)
    async enviarToken(@Req() req: Request) {
        const ingreso = (req.user as UsuarioEntity);

        return await this.jwtServiceImpl.generarToken(ingreso);
    }

    @Post('crear')
    @Roles(RolEntity.ROL_ADMINISTRADOR, RolEntity.ROL_PROPIETARIO, RolEntity.ROL_GERENTE)
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.CREATED)
    async crearUsuario(@Body() nuevo: UsuarioEntity) {
        if (AppUtil.verificarVacio(nuevo.email) || AppUtil.verificarVacio(nuevo.pass))
            throw new BadRequestException(`Los campos email y pass son obligatorios para poder realizar esta acción.`);

        return await this.usuarioServicio.crear(nuevo);
    }
}

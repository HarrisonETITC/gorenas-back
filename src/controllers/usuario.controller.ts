import { Roles } from '@complements/decoradores/rol.decorator';
import { JwtGuard } from '@complements/guards/jwt.guard';
import { LocalGuard } from '@complements/guards/local.guard';
import { RolesGuard } from '@complements/guards/rol.guard';
import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import { RolEntity } from '@orm/entities/rol.entity';
import { UsuarioEntity } from '@orm/entities/usuario.entity';
import { JwtImplService } from '@services/jwt-impl.service';
import { UsuarioService } from '@services/usuario.service';
import { AppUtil } from '@utils/app.util';
import { Request } from 'express';
import { get } from 'http';

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
        const { pass, ...campos } = ingreso;

        return { token: await this.jwtServiceImpl.generarToken(ingreso), usuario: campos };
    }

    @Post('crear')
    @Roles(RolEntity.ROL_ADMINISTRADOR, RolEntity.ROL_PROPIETARIO, RolEntity.ROL_GERENTE)
    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.CREATED)
    async crearUsuario(@Body() nuevo: UsuarioEntity) {
        if (AppUtil.verificarVacio(nuevo.email) || AppUtil.verificarVacio(nuevo.pass))
            throw new BadRequestException(`Los campos email y pass son obligatorios para poder realizar esta acción.`);

        const { pass, ...valores } = await this.usuarioServicio.crear(nuevo);

        return valores;
    }

    @Get('disponibles')
    @UseGuards(JwtGuard)
    async buscarUsuariosDisponibles(
        @Query('consulta') buscar: string
    ) {
        const disponibles = await this.usuarioServicio.buscarDisponibles(buscar);
        return disponibles;
    }

    @Get('persona')
    async getByIdPersona(
        @Query('personaId') id: string
    ) {
        const entero = await this.usuarioServicio.buscarPorIdPersona(parseInt(id));
        const { pass, ...resto } = entero;

        return resto;
    }

}

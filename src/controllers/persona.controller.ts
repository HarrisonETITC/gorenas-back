import { Roles } from '@complements/decoradores/rol.decorator';
import { JwtGuard } from '@Application/api/guards/jwt.guard';
import { RolesGuard } from '@Application/api/guards/rol.guard';
import { BadRequestException, Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PersonaEntity } from '@orm/entities/persona.entity';
import { PersonaService } from '@services/persona.service';
import { AppUtil } from '@utils/app.util';

@Controller('persona')
@UseGuards(RolesGuard)
@UseGuards(JwtGuard)
export class PersonaController {
    constructor(
        private readonly personaService: PersonaService
    ) { }

    @Post('crear')
    async crearPersona(@Body() nuevo: PersonaEntity) {
        if (AppUtil.verificarVacio(nuevo.usuarioId) || AppUtil.verificarVacio(nuevo.rolId))
            throw new BadRequestException(`Los campos 'usuarioId' y 'rolId' son requeridos para realizar esta acción`)

        return await this.personaService.crear(nuevo);
    }

    @Get('info')
    async informacionPersona(@Query('id') id: string) {
        if (AppUtil.verificarVacio(id))
            throw new BadRequestException('El id del usuario es requerido para realizar esta acción');

        return await this.personaService.infoPorIdUsuario(parseInt(id));
    }

    @Get('usuario')
    async getUsuarioByPersona(
        @Query('idPersona') id: string
    ) {
        const completo = await this.personaService.getUsuarioByPersona(parseInt(id));
        const { pass, ...retorno } = completo;
        return retorno;
    }

    @Get('mostrar')
    async personasAMostrar(
        @Query('userId') userId: string,
        @Query('rol') rol: string
    ) {
        const valores = await this.personaService.personasMostrar(parseInt(userId), rol);
        return valores;
    }

    @Get('disponibles')
    async getDisponibles(
        @Query('userId') userId: string,
        @Query('rol') rol: string,
        @Query('query') filtro: string
    ) {
        return await this.personaService.getDisponibles(parseInt(userId), rol, filtro);
    }

    @Put('actualizar')
    async actualizarPersona(@Body() persona: PersonaEntity) {
        return await this.personaService.modificar(persona.id, persona);
    }

    @Get('id')
    async getById(
        @Query('personaId') id: string
    ) {
        return await this.personaService.buscarPorId(parseInt(id));
    }

    @Get('empleadoId')
    async getByEmpleadoId(
        @Query('id') id: string
    ) {
        return await this.personaService.buscarPorEmpleadoId(parseInt(id));
    }
}

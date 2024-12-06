import { JwtGuard } from '@complements/guards/jwt.guard';
import { Body, Controller, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { RolEntity } from '@orm/entities/rol.entity';
import { RolService } from '@services/rol.service';

@Controller('rol')
@UseGuards(JwtGuard)
export class RolController {

    constructor(
        private readonly rolService: RolService
    ) { }

    @Get('rol-usuario')
    async getRolByUsuario(
        @Query('userId') id: string
    ) {
        return await this.rolService.rolByUsuarioId(parseInt(id));
    }

    @Get('disponibles')
    async rolesDisponibles(
        @Query('rol') rol: string,
        @Query('consulta') query: string
    ) {
        return await this.rolService.rolesDisponibles(rol, query);
    }

    @Get('persona')
    async getByPersonaId(
        @Query('personaId') id: string
    ) {
        return await this.rolService.rolByPersonaId(parseInt(id));
    }

    @Get('mostrar')
    async getRoles(
        @Query('rol') rol: string
    ): Promise<Array<RolEntity>> {
        return await this.rolService.mostrar(rol);
    }

    @Post('crear')
    async crearRol(@Body() nuevo: RolEntity) {
        return await this.rolService.crear(nuevo);
    }

    @Put('actualizar')
    async actualizarRol(@Body() actualizar: RolEntity) {
        return await this.rolService.modificar(actualizar.id, actualizar);
    }

    @Get('id')
    async getById(
        @Query('id') id: string
    ) {
        return await this.rolService.buscarPorId(parseInt(id));
    }
}

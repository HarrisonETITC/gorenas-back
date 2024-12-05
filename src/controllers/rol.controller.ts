import { JwtGuard } from '@complements/guards/jwt.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
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
}

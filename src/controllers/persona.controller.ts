import { Roles } from '@complements/decoradores/rol.decorator';
import { JwtGuard } from '@complements/guards/jwt.guard';
import { RolesGuard } from '@complements/guards/rol.guard';
import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PersonaEntity } from '@orm/entities/persona.entity';
import { RolEntity } from '@orm/entities/rol.entity';
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
    @Roles(RolEntity.ROL_ADMINISTRADOR, RolEntity.ROL_GERENTE, RolEntity.ROL_PROPIETARIO)
    async crearPersona(@Body() nuevo: PersonaEntity) {
        if (AppUtil.verificarVacio(nuevo.usuarioId) || AppUtil.verificarVacio(nuevo.rolId))
            throw new BadRequestException(`Los campos 'usuarioId' y 'rolId' son requeridos para realizar esta acción`)

        return await this.personaService.crear(nuevo);
    }
}

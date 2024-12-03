import { JwtGuard } from '@complements/guards/jwt.guard';
import { RolesGuard } from '@complements/guards/rol.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SucursalService } from '@services/sucursal.service';

@Controller('sucursal')
@UseGuards(JwtGuard)
@UseGuards(RolesGuard)
export class SucursalController {
    constructor(
        private readonly sucursalService: SucursalService
    ) { }

    @Get('todos-restringido')
    async todosConParametros(
        @Query() userId: string,
        @Query() rol: string
    ) {
        return await this.sucursalService.sucursalesPersona(parseInt(userId), rol);
    }
}
